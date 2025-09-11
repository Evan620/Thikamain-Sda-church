import React, { useEffect, useMemo, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../services/supabaseClient'
import '../../styles/admin-layout.css'

function getMostRecentSaturdayISO() {
  const d = new Date()
  const day = d.getDay() // 0..6, Sat=6
  const delta = (day - 6 + 7) % 7
  const sat = new Date(d)
  sat.setDate(d.getDate() - delta)
  return sat.toISOString().split('T')[0]
}

function addDaysISO(isoDate, days) {
  try {
    const d = new Date(isoDate + 'T00:00:00')
    d.setDate(d.getDate() + days)
    return d.toISOString().split('T')[0]
  } catch {
    const d = new Date()
    d.setDate(d.getDate() + days)
    return d.toISOString().split('T')[0]
  }
}

function getNextSabbathFromISO(isoDate) {
  // Assuming previous records are saved on Saturdays, next Sabbath is +7 days
  return addDaysISO(isoDate, 7)
}

const Counter = ({ label, value, setValue, color }) => {
  const increment = (step = 1) => setValue(Math.max(0, (Number(value) || 0) + step))
  const decrement = (step = 1) => setValue(Math.max(0, (Number(value) || 0) - step))

  return (
    <div className="clean-stat-card" style={{ borderTop: `4px solid ${color || '#10b981'}` }}>
      <div className="clean-stat-header">
        <h3 className="clean-stat-title">{label}</h3>
        <div className="clean-stat-icon">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <button type="button" className="clean-btn" style={{ background: '#6b7280', color: 'white', padding: '0.25rem 0.5rem' }} onClick={() => decrement(10)}>-10</button>
        <button type="button" className="clean-btn" style={{ background: '#9ca3af', color: 'white', padding: '0.25rem 0.5rem' }} onClick={() => decrement(1)}>-1</button>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(Math.max(0, parseInt(e.target.value || '0', 10)))}
          className="admin-form-input"
          style={{ textAlign: 'center', maxWidth: '140px' }}
          min={0}
        />
        <button type="button" className="clean-btn" style={{ background: '#10b981', color: 'white', padding: '0.25rem 0.5rem' }} onClick={() => increment(1)}>+1</button>
        <button type="button" className="clean-btn" style={{ background: '#059669', color: 'white', padding: '0.25rem 0.5rem' }} onClick={() => increment(10)}>+10</button>
      </div>
    </div>
  )
}

const AttendanceManagement = () => {
  const params = useParams()
  const navigate = useNavigate()
  const initialDate = params.date || getMostRecentSaturdayISO()
  const [date, setDate] = useState(initialDate)
  const isNew = !params.date

  // Counts
  const [sabbathSchool, setSabbathSchool] = useState(0)
  const [children, setChildren] = useState(0)
  const [youth, setYouth] = useState(0)
  const [adults, setAdults] = useState(0)

  // Previous week for deltas
  const [prevSabbathSchool, setPrevSabbathSchool] = useState(null)
  const [prevDivineTotal, setPrevDivineTotal] = useState(null)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [dbReady, setDbReady] = useState(true) // becomes false if table missing

  const divineTotal = useMemo(() => (Number(children) || 0) + (Number(youth) || 0) + (Number(adults) || 0), [children, youth, adults])

  const wowChange = (current, prev) => {
    if (prev === null || prev === 0) return { pct: null, dir: null }
    const diff = current - prev
    const pct = (diff / prev) * 100
    return { pct: Math.round(pct * 10) / 10, dir: diff >= 0 ? 'up' : 'down' }
  }

  const loadForDate = async (theDate) => {
    try {
      setError(null)
      // Try select row for the date
      const { data, error } = await supabase
        .from('attendance_aggregates')
        .select('*')
        .eq('attendance_date', theDate)
        .single()

      if (error) {
        // If relation/table missing, mark not ready
        if (error.message && (error.message.includes('relation') || error.message.includes('does not exist'))) {
          setDbReady(false)
          setSabbathSchool(0); setChildren(0); setYouth(0); setAdults(0)
          return
        }
        // No row for date is fine
        setSabbathSchool(0); setChildren(0); setYouth(0); setAdults(0)
        return
      }

      setDbReady(true)
      setSabbathSchool(data.sabbath_school_count || 0)
      setChildren(data.divine_children_count || 0)
      setYouth(data.divine_youth_count || 0)
      setAdults(data.divine_adults_count || 0)
    } catch (e) {
      console.error('Load error:', e)
      setError(e.message || 'Failed to load attendance')
    }
  }

  const loadPreviousWeek = async (theDate) => {
    try {
      const d = new Date(theDate)
      d.setDate(d.getDate() - 7)
      const prevDate = d.toISOString().split('T')[0]

      const { data, error } = await supabase
        .from('attendance_aggregates')
        .select('sabbath_school_count, divine_children_count, divine_youth_count, divine_adults_count')
        .eq('attendance_date', prevDate)
        .single()

      if (error) {
        setPrevSabbathSchool(null)
        setPrevDivineTotal(null)
        return
      }

      setPrevSabbathSchool(data.sabbath_school_count || 0)
      setPrevDivineTotal((data.divine_children_count || 0) + (data.divine_youth_count || 0) + (data.divine_adults_count || 0))
    } catch (e) {
      setPrevSabbathSchool(null)
      setPrevDivineTotal(null)
    }
  }

  const save = async () => {
    try {
      setSaving(true)
      setError(null)
      const payload = {
        attendance_date: date,
        sabbath_school_count: Number(sabbathSchool) || 0,
        divine_children_count: Number(children) || 0,
        divine_youth_count: Number(youth) || 0,
        divine_adults_count: Number(adults) || 0
      }
      const { error } = await supabase
        .from('attendance_aggregates')
        .upsert([payload], { onConflict: 'attendance_date' })

      if (error) throw error
      await loadForDate(date)
      await loadPreviousWeek(date)
      alert('Attendance saved')
    } catch (e) {
      console.error('Save error:', e)
      setError(e.message || 'Failed to save attendance')
      alert('Error saving attendance. Ensure database table exists (see migration instructions).')
    } finally {
      setSaving(false)
    }
  }

  // Reset date when route param changes (or when opening /new)
  useEffect(() => {
    const resetDate = async () => {
      if (params.date) {
        // Editing a specific date
        setSabbathSchool(0); setChildren(0); setYouth(0); setAdults(0)
        setDate(params.date)
        return
      }
      // For /new: Prefill with next Sabbath after latest saved record
      try {
        const { data, error } = await supabase
          .from('attendance_aggregates')
          .select('attendance_date')
          .order('attendance_date', { ascending: false })
          .limit(1)
        if (!error && Array.isArray(data) && data.length > 0 && data[0].attendance_date) {
          const next = getNextSabbathFromISO(data[0].attendance_date)
          setSabbathSchool(0); setChildren(0); setYouth(0); setAdults(0)
          setDate(next)
        } else {
          setSabbathSchool(0); setChildren(0); setYouth(0); setAdults(0)
          setDate(getMostRecentSaturdayISO())
        }
      } catch {
        setSabbathSchool(0); setChildren(0); setYouth(0); setAdults(0)
        setDate(getMostRecentSaturdayISO())
      }
    }
    resetDate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.date])

  
  useEffect(() => {
    (async () => {
      setLoading(true)
      // Clear current counters to avoid showing previous Sabbath data momentarily
      setSabbathSchool(0); setChildren(0); setYouth(0); setAdults(0)

      if (isNew) {
        // In create mode, do not load existing counts for this date; only load previous week
        await loadPreviousWeek(date)
        setLoading(false)
        return
      }

      await loadForDate(date)
      await loadPreviousWeek(date)
      setLoading(false)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

  const sabbathDelta = wowChange(Number(sabbathSchool) || 0, prevSabbathSchool)
  const divineDelta = wowChange(Number(divineTotal) || 0, prevDivineTotal)

  if (loading) {
    return (
      <div className="admin-loading-container">
        <div className="admin-loading-spinner"></div>
        <p>Loading attendance...</p>
      </div>
    )
  }

  return (
    <div className="clean-admin-container">
      <div className="clean-donations-header">
        <div>
          <h1 className="clean-donations-title">Attendance Management (Aggregates)</h1>
          <p className="clean-donations-subtitle">Record aggregate counts per service (no per-person tracking)</p>
        </div>
        <div className="clean-donations-actions" style={{ gap: '0.5rem' }}>
          <Link to="/admin/attendance" className="admin-btn-secondary">Back to List</Link>
          <button onClick={save} disabled={saving || !dbReady} className="clean-record-donation-btn">
            {saving ? 'Saving...' : 'Save Counts'}
          </button>
        </div>
      </div>

      <div className="financial-filters">
        <div className="admin-filter-controls">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="admin-form-input"
          />
          <button
            type="button"
            className="admin-btn-secondary"
            onClick={async () => {
              try {
                const { data, error } = await supabase
                  .from('attendance_aggregates')
                  .select('attendance_date')
                  .order('attendance_date', { ascending: false })
                  .limit(1)
                if (!error && Array.isArray(data) && data.length > 0 && data[0].attendance_date) {
                  // Navigate to edit mode for the latest recorded Sabbath so counts load
                  navigate(`/admin/attendance/${data[0].attendance_date}`)
                } else {
                  // Fallback: set to most recent Saturday and try loading (may be 0 if no record)
                  const recent = getMostRecentSaturdayISO()
                  setDate(recent)
                  await loadForDate(recent)
                }
              } catch {
                const recent = getMostRecentSaturdayISO()
                setDate(recent)
                await loadForDate(recent)
              }
            }}
          >
            Last Sabbath
          </button>
        </div>
      </div>

      {!dbReady && (
        <div className="admin-error-banner">
          Attendance aggregates table not found. Create it in Supabase using a migration file named fix_attendance_aggregates.sql with this schema:
          <pre style={{ whiteSpace: 'pre-wrap', marginTop: '0.5rem' }}>
CREATE TABLE IF NOT EXISTS attendance_aggregates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  attendance_date DATE UNIQUE NOT NULL,
  sabbath_school_count INTEGER NOT NULL DEFAULT 0,
  divine_children_count INTEGER NOT NULL DEFAULT 0,
  divine_youth_count INTEGER NOT NULL DEFAULT 0,
  divine_adults_count INTEGER NOT NULL DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE attendance_aggregates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage attendance aggregates" ON attendance_aggregates
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role IN ('SUPER_ADMIN','ADMIN')
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role IN ('SUPER_ADMIN','ADMIN')
    )
  );
          </pre>
        </div>
      )}

      {/* Summary Cards */}
      <div className="clean-donations-stats">
        <div className="clean-stat-card" style={{ borderTop: '4px solid #0ea5e9' }}>
          <div className="clean-stat-header">
            <h3 className="clean-stat-title">Sabbath School</h3>
            <div className="clean-stat-icon">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="clean-stat-amount">{Number(sabbathSchool) || 0}</p>
          <p className="clean-stat-label">{sabbathDelta.pct !== null ? (
            <span style={{ color: sabbathDelta.dir === 'up' ? '#10b981' : '#ef4444' }}>
              {sabbathDelta.dir === 'up' ? '↗' : '↘'} {Math.abs(sabbathDelta.pct)}%
            </span>
          ) : '—'}</p>
        </div>

        <div className="clean-stat-card" style={{ borderTop: '4px solid #10b981' }}>
          <div className="clean-stat-header">
            <h3 className="clean-stat-title">Divine Service (Total)</h3>
            <div className="clean-stat-icon">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="clean-stat-amount">{divineTotal}</p>
          <p className="clean-stat-label">{divineDelta.pct !== null ? (
            <span style={{ color: divineDelta.dir === 'up' ? '#10b981' : '#ef4444' }}>
              {divineDelta.dir === 'up' ? '↗' : '↘'} {Math.abs(divineDelta.pct)}%
            </span>
          ) : '—'}</p>
        </div>
      </div>

      {/* Inputs */}
      <div className="clean-donations-stats" style={{ marginTop: '1rem' }}>
        <Counter label="Sabbath School (everyone)" value={sabbathSchool} setValue={setSabbathSchool} color="#0ea5e9" />
      </div>

      <div className="clean-donations-stats" style={{ marginTop: '0.5rem' }}>
        <Counter label="Divine Service - Children" value={children} setValue={setChildren} color="#f59e0b" />
        <Counter label="Divine Service - Youth" value={youth} setValue={setYouth} color="#6366f1" />
        <Counter label="Divine Service - Adults" value={adults} setValue={setAdults} color="#10b981" />
      </div>

      <div className="clean-donations-table-container" style={{ marginTop: '1rem' }}>
        <div className="clean-donations-table-header">
          <h2 className="clean-donations-table-title">Summary</h2>
        </div>
        <table className="clean-donations-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Count</th>
              <th>Share of Divine Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sabbath School</td>
              <td>{Number(sabbathSchool) || 0}</td>
              <td>—</td>
            </tr>
            <tr>
              <td>Children</td>
              <td>{Number(children) || 0}</td>
              <td>{divineTotal > 0 ? Math.round((Number(children) / divineTotal) * 100) : 0}%</td>
            </tr>
            <tr>
              <td>Youth</td>
              <td>{Number(youth) || 0}</td>
              <td>{divineTotal > 0 ? Math.round((Number(youth) / divineTotal) * 100) : 0}%</td>
            </tr>
            <tr>
              <td>Adults</td>
              <td>{Number(adults) || 0}</td>
              <td>{divineTotal > 0 ? Math.round((Number(adults) / divineTotal) * 100) : 0}%</td>
            </tr>
            <tr>
              <td><strong>Divine Service Total</strong></td>
              <td><strong>{divineTotal}</strong></td>
              <td><strong>100%</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AttendanceManagement
