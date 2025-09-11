import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../services/supabaseClient'
import '../../styles/admin-layout.css'

const PAGE_SIZE = 20

const AttendanceList = () => {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(false)
  const [page, setPage] = useState(0)
  const [dbReady, setDbReady] = useState(true)

  const loadPage = async (pageIndex = 0) => {
    try {
      setLoading(true)
      setError(null)

      const from = pageIndex * PAGE_SIZE
      const to = from + PAGE_SIZE - 1

      const { data, error, count } = await supabase
        .from('attendance_aggregates')
        .select('*', { count: 'exact' })
        .order('attendance_date', { ascending: false })
        .range(from, to)

      if (error) {
        if (error.message && (error.message.includes('relation') || error.message.includes('does not exist'))) {
          setDbReady(false)
          setRows([])
          setHasMore(false)
          return
        }
        throw error
      }

      setDbReady(true)
      setRows(data || [])
      setHasMore((count || 0) > (to + 1))
    } catch (e) {
      console.error('Attendance list load error:', e)
      setError(e.message || 'Failed to load attendance')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPage(page)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const formatDate = (iso) => {
    try {
      return new Date(iso + 'T00:00:00').toLocaleDateString()
    } catch {
      return iso
    }
  }

  return (
    <div className="clean-admin-container">
      <div className="clean-donations-header">
        <div>
          <h1 className="clean-donations-title">Attendance Records</h1>
          <p className="clean-donations-subtitle">View previous Sabbaths and add new attendance</p>
        </div>
        <div className="clean-donations-actions">
          <Link to="/admin/attendance/new" className="clean-record-donation-btn">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Attendance
          </Link>
        </div>
      </div>

      {!dbReady && (
        <div className="admin-error-banner">
          Attendance aggregates table not found. Please run fix_attendance_aggregates.sql in Supabase.
        </div>
      )}

      {loading ? (
        <div className="admin-loading-container">
          <div className="admin-loading-spinner"></div>
          <p>Loading attendance records...</p>
        </div>
      ) : error ? (
        <div className="admin-error-banner">{error}</div>
      ) : rows.length === 0 ? (
        <div className="clean-donations-empty">
          <svg className="clean-donations-empty-icon" width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="clean-donations-empty-title">No attendance records yet</h3>
          <p className="clean-donations-empty-text">Click "Add Attendance" to create your first record.</p>
        </div>
      ) : (
        <div className="clean-donations-table-container">
          <div className="clean-donations-table-header">
            <h2 className="clean-donations-table-title">Recent Sabbaths</h2>
          </div>
          <table className="clean-donations-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Sabbath School</th>
                <th>Children</th>
                <th>Youth</th>
                <th>Adults</th>
                <th>Divine Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => {
                const total = (row.divine_children_count || 0) + (row.divine_youth_count || 0) + (row.divine_adults_count || 0)
                return (
                  <tr key={row.attendance_date}>
                    <td>{formatDate(row.attendance_date)}</td>
                    <td>{row.sabbath_school_count || 0}</td>
                    <td>{row.divine_children_count || 0}</td>
                    <td>{row.divine_youth_count || 0}</td>
                    <td>{row.divine_adults_count || 0}</td>
                    <td style={{ fontWeight: 600 }}>{total}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Link
                          to={`/admin/attendance/${row.attendance_date}`}
                          className="clean-btn"
                          style={{ padding: '0.25rem 0.75rem', background: '#3b82f6', color: 'white' }}
                        >
                          View/Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

                  </div>
      )}
    </div>
  )
}

export default AttendanceList
