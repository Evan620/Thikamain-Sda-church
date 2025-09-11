import React, { useState, useEffect } from 'react'
import { supabase } from '../../services/supabaseClient'
import SkeletonLoader from '../../components/common/SkeletonLoader'

const FinancialDashboard = () => {
  const [financialData, setFinancialData] = useState({
    totalDonations: 0,
    monthlyTrend: [],
    donationsByType: {},
    recentDonations: [],
    topDonors: [],
    anonymousTotal: 0
  })
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('month')

  // Fetch financial data
  const fetchFinancialData = async () => {
    try {
      setLoading(true)

      // Calculate date ranges
      const now = new Date()
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      const startOfYear = new Date(now.getFullYear(), 0, 1)
      const startDate = selectedPeriod === 'month' ? startOfMonth : startOfYear
      const last12MonthsStart = new Date(now.getFullYear(), now.getMonth() - 11, 1)

      // Fetch period and recent donations in parallel
      const [
        periodDataResult,
        recentDataResult
      ] = await Promise.all([
        // Get period data (current month/year) with type breakdown
        supabase
          .from('giving_records')
          .select('amount, giving_type')
          .gte('giving_date', startDate.toISOString().split('T')[0])
          .eq('is_verified', true),

        // Get recent donations with member info
        supabase
          .from('giving_records')
          .select(`
            *,
            member:members(first_name, last_name)
          `)
          .order('created_at', { ascending: false })
          .limit(10)
      ])

      if (periodDataResult.error) throw periodDataResult.error
      if (recentDataResult.error) throw recentDataResult.error

      // Build monthly trend using SQL aggregation (RPC) with fallback to client-side aggregation
      const last12MonthsStartStr = last12MonthsStart.toISOString().split('T')[0]
      const monthlyTrend = []
      const monthlyTotals = {}

      // Initialize all months with 0
      for (let i = 11; i >= 0; i--) {
        const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1)
        const monthKey = monthStart.toISOString().slice(0, 7) // YYYY-MM
        monthlyTotals[monthKey] = {
          month: monthStart.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          amount: 0
        }
      }

      try {
        // Attempt to use SQL aggregation via RPC
        const { data: monthlyAgg, error: monthlyErr } = await supabase.rpc('get_monthly_giving', {
          from_date: last12MonthsStartStr
        })
        if (monthlyErr) throw monthlyErr
        // monthlyAgg expected rows: { month_key: 'YYYY-MM', total: number }
        monthlyAgg?.forEach(row => {
          const key = row.month_key
          const total = Number(row.total) || 0
          if (monthlyTotals[key] !== undefined) {
            monthlyTotals[key].amount = total
          }
        })
      } catch (e) {
        // Fallback to client-side aggregation
        const { data: yearlyDataFallback, error: yearlyError } = await supabase
          .from('giving_records')
          .select('amount, giving_date')
          .gte('giving_date', last12MonthsStartStr)
          .eq('is_verified', true)
        if (!yearlyError) {
          yearlyDataFallback.forEach(record => {
            const monthKey = record.giving_date.slice(0, 7)
            if (monthlyTotals[monthKey]) {
              monthlyTotals[monthKey].amount += record.amount
            }
          })
        }
      }

      Object.values(monthlyTotals).forEach(month => monthlyTrend.push(month))

      // Process period data
      const totalDonations = periodDataResult.data.reduce((sum, record) => sum + record.amount, 0)
      const donationsByType = periodDataResult.data.reduce((acc, record) => {
        acc[record.giving_type] = (acc[record.giving_type] || 0) + record.amount
        return acc
      }, {})

      // Monthly trend was built above using RPC with fallback

      // Process top donors from period data
      const donorTotals = {}
      periodDataResult.data.forEach(record => {
        // We'll need to fetch member data separately for top donors
        // For now, we'll use a simplified approach
      })

      // Fetch top donors for the selected period (exclude anonymous here)
      const periodStartStr = startDate.toISOString().split('T')[0]
      const { data: donorData } = await supabase
        .from('giving_records')
        .select(`
          member_id,
          amount,
          member:members(first_name, last_name)
        `)
        .not('member_id', 'is', null)
        .eq('is_verified', true)
        .gte('giving_date', periodStartStr)

      // Also compute Anonymous total for the same period
      const { data: anonData } = await supabase
        .from('giving_records')
        .select('amount')
        .is('member_id', null)
        .eq('is_verified', true)
        .gte('giving_date', periodStartStr)

      const donorTotalsMap = {}
      donorData?.forEach(record => {
        if (record.member_id && record.member) {
          if (!donorTotalsMap[record.member_id]) {
            donorTotalsMap[record.member_id] = {
              member: record.member,
              total: 0
            }
          }
          donorTotalsMap[record.member_id].total += record.amount
        }
      })

      const topDonors = Object.values(donorTotalsMap)
        .sort((a, b) => b.total - a.total)
        .slice(0, 5)

      const anonymousTotal = (anonData || []).reduce((sum, r) => sum + r.amount, 0)

      setFinancialData({
        totalDonations,
        monthlyTrend,
        donationsByType,
        recentDonations: recentDataResult.data || [],
        topDonors,
        anonymousTotal
      })
    } catch (error) {
      console.error('Error fetching financial data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFinancialData()
  }, [selectedPeriod])

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES'
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="admin-loading-container">
        <div className="admin-loading-spinner"></div>
        <p>Loading financial data...</p>
      </div>
    )
  }

  return (
    <div className="admin-content-management">
      {/* Header */}
      <div className="admin-content-header">
        <div>
          <h1>Financial Dashboard</h1>
          <p>Overview of church finances and donation trends</p>
        </div>
        <div className="admin-filter-controls">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="admin-form-select"
          >
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="financial-summary-cards">
        <div className="financial-card total">
          <div className="financial-card-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="financial-card-content">
            <h3>Total Donations</h3>
            <p className="financial-amount">{formatCurrency(financialData.totalDonations)}</p>
            <span className="financial-period">{selectedPeriod === 'month' ? 'This Month' : 'This Year'}</span>
          </div>
        </div>

        <div className="financial-card tithe">
          <div className="financial-card-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <div className="financial-card-content">
            <h3>Tithes</h3>
            <p className="financial-amount">{formatCurrency(financialData.donationsByType.tithe || 0)}</p>
            <span className="financial-period">{selectedPeriod === 'month' ? 'This Month' : 'This Year'}</span>
          </div>
        </div>

        <div className="financial-card offering">
          <div className="financial-card-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <div className="financial-card-content">
            <h3>Offerings</h3>
            <p className="financial-amount">{formatCurrency(financialData.donationsByType.offering || 0)}</p>
            <span className="financial-period">{selectedPeriod === 'month' ? 'This Month' : 'This Year'}</span>
          </div>
        </div>

        <div className="financial-card special">
          <div className="financial-card-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <div className="financial-card-content">
            <h3>Special Projects</h3>
            <p className="financial-amount">{formatCurrency(financialData.donationsByType.special_project || 0)}</p>
            <span className="financial-period">{selectedPeriod === 'month' ? 'This Month' : 'This Year'}</span>
          </div>
        </div>
      </div>

      {/* Charts and Analytics */}
      <div className="financial-analytics-grid">
        {/* Monthly Trend Chart */}
        <div className="financial-chart-card">
          <div className="financial-chart-header">
            <h3>Monthly Donation Trend</h3>
            <p>Last 12 months</p>
          </div>
          <div className="financial-chart">
            <div className="financial-chart-bars">
              {financialData.monthlyTrend.map((month, index) => {
                const maxAmount = Math.max(...financialData.monthlyTrend.map(m => m.amount))
                const height = maxAmount > 0 ? (month.amount / maxAmount) * 100 : 0
                
                return (
                  <div key={index} className="financial-chart-bar-container">
                    <div 
                      className="financial-chart-bar"
                      style={{ height: `${height}%` }}
                      title={`${month.month}: ${formatCurrency(month.amount)}`}
                    ></div>
                    <span className="financial-chart-label">{month.month.split(' ')[0]}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Top Donors */}
        <div className="financial-list-card">
          <div className="financial-chart-header">
            <h3>Top Donors</h3>
            <p>Highest contributors</p>
          </div>
          <div className="financial-donors-list">
            {financialData.topDonors.length === 0 && financialData.anonymousTotal === 0 ? (
              <p className="financial-empty-message">No donor data available</p>
            ) : (
              <>
                {financialData.topDonors.map((donor, index) => (
                  <div key={index} className="financial-donor-item">
                    <div className="financial-donor-rank">#{index + 1}</div>
                    <div className="financial-donor-info">
                      <span className="financial-donor-name">
                        {donor.member.first_name} {donor.member.last_name}
                      </span>
                      <span className="financial-donor-amount">
                        {formatCurrency(donor.total)}
                      </span>
                    </div>
                  </div>
                ))}
                {financialData.anonymousTotal > 0 && (
                  <div className="financial-donor-item">
                    <div className="financial-donor-rank">—</div>
                    <div className="financial-donor-info">
                      <span className="financial-donor-name">Anonymous</span>
                      <span className="financial-donor-amount">
                        {formatCurrency(financialData.anonymousTotal)}
                      </span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Recent Donations */}
      <div className="financial-recent-donations">
        <div className="financial-section-header">
          <h3>Recent Donations</h3>
          <p>Latest donation records</p>
        </div>
        
        {financialData.recentDonations.length === 0 ? (
          <div className="admin-empty-state">
            <svg className="admin-empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3>No recent donations</h3>
            <p>Recent donations will appear here</p>
          </div>
        ) : (
          <div className="financial-recent-list">
            {financialData.recentDonations.map((donation) => (
              <div key={donation.id} className="financial-recent-item">
                <div className="financial-recent-icon">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="financial-recent-content">
                  <div className="financial-recent-header">
                    <span className="financial-recent-member">
                      {donation.member ? 
                        `${donation.member.first_name} ${donation.member.last_name}` : 
                        'Anonymous'
                      }
                    </span>
                    <span className="financial-recent-amount">
                      {formatCurrency(donation.amount)}
                    </span>
                  </div>
                  <div className="financial-recent-details">
                    <span className="financial-recent-type">
                      {donation.giving_type.replace('_', ' ')}
                    </span>
                    <span className="financial-recent-date">
                      {new Date(donation.giving_date).toLocaleDateString()}
                    </span>
                    <span className={`financial-recent-status ${donation.is_verified ? 'verified' : 'pending'}`}>
                      {donation.is_verified ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FinancialDashboard
