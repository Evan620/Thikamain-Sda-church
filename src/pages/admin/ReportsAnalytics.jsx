import React, { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'

const ReportsAnalytics = () => {
  const { hasPermission } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(false)
  const [dateRange, setDateRange] = useState('month')
  const [reportData, setReportData] = useState({
    financial: {
      totalIncome: 0,
      totalExpenses: 0,
      netIncome: 0,
      monthlyTrend: [],
      categoryBreakdown: []
    },
    membership: {
      totalMembers: 0,
      newMembers: 0,
      activeMembers: 0,
      membershipGrowth: [],
      ageDistribution: [],
      ministryParticipation: []
    },
    attendance: {
      averageAttendance: 0,
      attendanceTrend: [],
      serviceComparison: [],
      seasonalTrends: []
    },
    communication: {
      totalMessages: 0,
      deliveryRate: 0,
      engagementRate: 0,
      channelPerformance: []
    }
  })

  // Mock data for demonstration
  useEffect(() => {
    const mockData = {
      financial: {
        totalIncome: 2450000,
        totalExpenses: 1890000,
        netIncome: 560000,
        monthlyTrend: [
          { month: 'Jan', income: 180000, expenses: 150000 },
          { month: 'Feb', income: 220000, expenses: 160000 },
          { month: 'Mar', income: 195000, expenses: 155000 },
          { month: 'Apr', income: 240000, expenses: 170000 },
          { month: 'May', income: 210000, expenses: 165000 },
          { month: 'Jun', income: 235000, expenses: 175000 }
        ],
        categoryBreakdown: [
          { category: 'Tithes', amount: 1800000, percentage: 73.5 },
          { category: 'Offerings', amount: 450000, percentage: 18.4 },
          { category: 'Special Projects', amount: 150000, percentage: 6.1 },
          { category: 'Other', amount: 50000, percentage: 2.0 }
        ]
      },
      membership: {
        totalMembers: 456,
        newMembers: 23,
        activeMembers: 389,
        membershipGrowth: [
          { month: 'Jan', total: 433, new: 5 },
          { month: 'Feb', total: 438, new: 5 },
          { month: 'Mar', total: 442, new: 4 },
          { month: 'Apr', total: 448, new: 6 },
          { month: 'May', total: 453, new: 5 },
          { month: 'Jun', total: 456, new: 3 }
        ],
        ageDistribution: [
          { range: '0-17', count: 89, percentage: 19.5 },
          { range: '18-35', count: 156, percentage: 34.2 },
          { range: '36-55', count: 134, percentage: 29.4 },
          { range: '56+', count: 77, percentage: 16.9 }
        ],
        ministryParticipation: [
          { ministry: 'Choir', members: 45, percentage: 9.9 },
          { ministry: 'Youth', members: 89, percentage: 19.5 },
          { ministry: 'Women\'s Ministry', members: 67, percentage: 14.7 },
          { ministry: 'Men\'s Ministry', members: 54, percentage: 11.8 }
        ]
      },
      attendance: {
        averageAttendance: 312,
        attendanceTrend: [
          { date: '2025-01-04', attendance: 298 },
          { date: '2025-01-11', attendance: 315 },
          { date: '2025-01-18', attendance: 289 },
          { date: '2025-01-25', attendance: 334 }
        ],
        serviceComparison: [
          { service: 'Sabbath School', average: 245 },
          { service: 'Divine Service', average: 312 },
          { service: 'Prayer Meeting', average: 89 },
          { service: 'Youth Service', average: 67 }
        ],
        seasonalTrends: [
          { season: 'Q1', attendance: 295 },
          { season: 'Q2', attendance: 318 },
          { season: 'Q3', attendance: 287 },
          { season: 'Q4', attendance: 342 }
        ]
      },
      communication: {
        totalMessages: 234,
        deliveryRate: 97.8,
        engagementRate: 84.2,
        channelPerformance: [
          { channel: 'SMS', sent: 156, delivered: 153, opened: 145 },
          { channel: 'Email', sent: 78, delivered: 76, opened: 64 }
        ]
      }
    }
    setReportData(mockData)
  }, [dateRange])

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'financial', name: 'Financial', icon: '💰' },
    { id: 'membership', name: 'Membership', icon: '👥' },
    { id: 'attendance', name: 'Attendance', icon: '📅' },
    { id: 'communication', name: 'Communication', icon: '📱' }
  ]

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const renderOverview = () => (
    <div className="reports-overview">
      {/* Key Metrics Cards */}
      <div className="admin-stats-grid">
        {/* Financial Summary */}
        <div className="clean-card" style={{background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white'}}>
          <div className="admin-card-header">
            <div className="admin-card-icon">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div>
              <h3>Net Income</h3>
              <p className="admin-card-value">{formatCurrency(reportData.financial.netIncome)}</p>
            </div>
          </div>
          <div className="admin-card-content">
            <div className="admin-content-breakdown">
              <div className="admin-breakdown-item">
                <span>Total Income:</span>
                <span>{formatCurrency(reportData.financial.totalIncome)}</span>
              </div>
              <div className="admin-breakdown-item">
                <span>Total Expenses:</span>
                <span>{formatCurrency(reportData.financial.totalExpenses)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Membership Summary */}
        <div className="clean-card" style={{background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', color: 'white'}}>
          <div className="admin-card-header">
            <div className="admin-card-icon">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h3>Total Members</h3>
              <p className="admin-card-value">{reportData.membership.totalMembers}</p>
            </div>
          </div>
          <div className="admin-card-content">
            <div className="admin-content-breakdown">
              <div className="admin-breakdown-item">
                <span>New This Month:</span>
                <span>{reportData.membership.newMembers}</span>
              </div>
              <div className="admin-breakdown-item">
                <span>Active Members:</span>
                <span>{reportData.membership.activeMembers}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Summary */}
        <div className="clean-card" style={{background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: 'white'}}>
          <div className="admin-card-header">
            <div className="admin-card-icon">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3>Avg Attendance</h3>
              <p className="admin-card-value">{reportData.attendance.averageAttendance}</p>
            </div>
          </div>
          <div className="admin-card-content">
            <div className="admin-content-breakdown">
              <div className="admin-breakdown-item">
                <span>Attendance Rate:</span>
                <span>{Math.round((reportData.attendance.averageAttendance / reportData.membership.totalMembers) * 100)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Communication Summary */}
        <div className="clean-card" style={{background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', color: 'white'}}>
          <div className="admin-card-header">
            <div className="admin-card-icon">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h3>Messages Sent</h3>
              <p className="admin-card-value">{reportData.communication.totalMessages}</p>
            </div>
          </div>
          <div className="admin-card-content">
            <div className="admin-content-breakdown">
              <div className="admin-breakdown-item">
                <span>Delivery Rate:</span>
                <span>{reportData.communication.deliveryRate}%</span>
              </div>
              <div className="admin-breakdown-item">
                <span>Engagement:</span>
                <span>{reportData.communication.engagementRate}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Insights */}
      <div className="clean-card" style={{marginTop: '2rem'}}>
        <div className="admin-card-header">
          <h3>Quick Insights</h3>
          <p className="admin-card-subtitle">Key trends and highlights</p>
        </div>
        <div className="admin-insights-grid">
          <div className="admin-insight-item">
            <div className="admin-insight-icon" style={{color: '#10b981'}}>📈</div>
            <div className="admin-insight-content">
              <h4>Growing Membership</h4>
              <p>23 new members joined this month, showing healthy church growth</p>
            </div>
          </div>
          <div className="admin-insight-item">
            <div className="admin-insight-icon" style={{color: '#3b82f6'}}>💰</div>
            <div className="admin-insight-content">
              <h4>Strong Finances</h4>
              <p>Income exceeded expenses by {formatCurrency(reportData.financial.netIncome)} this period</p>
            </div>
          </div>
          <div className="admin-insight-item">
            <div className="admin-insight-icon" style={{color: '#f59e0b'}}>👥</div>
            <div className="admin-insight-content">
              <h4>High Engagement</h4>
              <p>85% of members actively participate in church activities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderFinancialReports = () => (
    <div className="financial-reports">
      {/* Financial Summary Cards */}
      <div className="admin-stats-grid">
        <div className="clean-card">
          <div className="admin-card-header">
            <div className="admin-card-icon" style={{color: '#10b981'}}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <h3>Total Income</h3>
              <p className="admin-card-value">{formatCurrency(reportData.financial.totalIncome)}</p>
            </div>
          </div>
        </div>

        <div className="clean-card">
          <div className="admin-card-header">
            <div className="admin-card-icon" style={{color: '#ef4444'}}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            </div>
            <div>
              <h3>Total Expenses</h3>
              <p className="admin-card-value">{formatCurrency(reportData.financial.totalExpenses)}</p>
            </div>
          </div>
        </div>

        <div className="clean-card">
          <div className="admin-card-header">
            <div className="admin-card-icon" style={{color: '#3b82f6'}}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h3>Net Income</h3>
              <p className="admin-card-value">{formatCurrency(reportData.financial.netIncome)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Income Breakdown */}
      <div className="clean-card" style={{marginTop: '2rem'}}>
        <div className="admin-card-header">
          <h3>Income Breakdown by Category</h3>
          <button className="admin-btn-secondary">
            <svg className="admin-btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export
          </button>
        </div>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Amount</th>
                <th>Percentage</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              {reportData.financial.categoryBreakdown.map((category, index) => (
                <tr key={index}>
                  <td>
                    <div className="admin-category-name">
                      {category.category}
                    </div>
                  </td>
                  <td>
                    <div className="admin-amount">
                      {formatCurrency(category.amount)}
                    </div>
                  </td>
                  <td>
                    <div className="admin-percentage">
                      {category.percentage}%
                    </div>
                  </td>
                  <td>
                    <div className="admin-trend-indicator">
                      <span className="admin-trend-up">↗ +5.2%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="clean-card" style={{marginTop: '2rem'}}>
        <div className="admin-card-header">
          <h3>Monthly Financial Trend</h3>
          <p className="admin-card-subtitle">Income vs Expenses over time</p>
        </div>
        <div className="admin-chart-placeholder">
          <div className="admin-chart-info">
            <p>📊 Interactive chart showing monthly income and expense trends</p>
            <p>Chart visualization will be implemented with a charting library</p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderMembershipReports = () => (
    <div className="membership-reports">
      {/* Membership Summary */}
      <div className="admin-stats-grid">
        <div className="clean-card">
          <div className="admin-card-header">
            <div className="admin-card-icon" style={{color: '#3b82f6'}}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h3>Total Members</h3>
              <p className="admin-card-value">{reportData.membership.totalMembers}</p>
            </div>
          </div>
        </div>

        <div className="clean-card">
          <div className="admin-card-header">
            <div className="admin-card-icon" style={{color: '#10b981'}}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <div>
              <h3>New Members</h3>
              <p className="admin-card-value">{reportData.membership.newMembers}</p>
            </div>
          </div>
        </div>

        <div className="clean-card">
          <div className="admin-card-header">
            <div className="admin-card-icon" style={{color: '#f59e0b'}}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3>Active Members</h3>
              <p className="admin-card-value">{reportData.membership.activeMembers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Age Distribution */}
      <div className="clean-card" style={{marginTop: '2rem'}}>
        <div className="admin-card-header">
          <h3>Age Distribution</h3>
          <p className="admin-card-subtitle">Member demographics by age group</p>
        </div>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Age Range</th>
                <th>Count</th>
                <th>Percentage</th>
                <th>Visual</th>
              </tr>
            </thead>
            <tbody>
              {reportData.membership.ageDistribution.map((group, index) => (
                <tr key={index}>
                  <td>{group.range}</td>
                  <td>{group.count}</td>
                  <td>{group.percentage}%</td>
                  <td>
                    <div className="admin-progress-bar">
                      <div
                        className="admin-progress-fill"
                        style={{width: `${group.percentage}%`}}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ministry Participation */}
      <div className="clean-card" style={{marginTop: '2rem'}}>
        <div className="admin-card-header">
          <h3>Ministry Participation</h3>
          <p className="admin-card-subtitle">Member involvement in church ministries</p>
        </div>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Ministry</th>
                <th>Members</th>
                <th>Participation Rate</th>
                <th>Growth</th>
              </tr>
            </thead>
            <tbody>
              {reportData.membership.ministryParticipation.map((ministry, index) => (
                <tr key={index}>
                  <td>{ministry.ministry}</td>
                  <td>{ministry.members}</td>
                  <td>{ministry.percentage}%</td>
                  <td>
                    <span className="admin-trend-up">↗ +2.1%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderAttendanceReports = () => (
    <div className="attendance-reports">
      {/* Attendance Summary */}
      <div className="admin-stats-grid">
        <div className="clean-card">
          <div className="admin-card-header">
            <div className="admin-card-icon" style={{color: '#f59e0b'}}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3>Average Attendance</h3>
              <p className="admin-card-value">{reportData.attendance.averageAttendance}</p>
            </div>
          </div>
        </div>

        <div className="clean-card">
          <div className="admin-card-header">
            <div className="admin-card-icon" style={{color: '#10b981'}}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div>
              <h3>Attendance Rate</h3>
              <p className="admin-card-value">
                {Math.round((reportData.attendance.averageAttendance / reportData.membership.totalMembers) * 100)}%
              </p>
            </div>
          </div>
        </div>

        <div className="clean-card">
          <div className="admin-card-header">
            <div className="admin-card-icon" style={{color: '#3b82f6'}}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <h3>Trend</h3>
              <p className="admin-card-value">+5.2%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Service Comparison */}
      <div className="clean-card" style={{marginTop: '2rem'}}>
        <div className="admin-card-header">
          <h3>Attendance by Service Type</h3>
          <p className="admin-card-subtitle">Average attendance across different services</p>
        </div>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Service Type</th>
                <th>Average Attendance</th>
                <th>Percentage of Members</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              {reportData.attendance.serviceComparison.map((service, index) => (
                <tr key={index}>
                  <td>
                    <div className="admin-service-name">
                      {service.service}
                    </div>
                  </td>
                  <td>
                    <div className="admin-attendance-number">
                      {service.average}
                    </div>
                  </td>
                  <td>
                    <div className="admin-percentage">
                      {Math.round((service.average / reportData.membership.totalMembers) * 100)}%
                    </div>
                  </td>
                  <td>
                    <div className="admin-trend-indicator">
                      <span className="admin-trend-up">↗ +3.1%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Attendance Trend */}
      <div className="clean-card" style={{marginTop: '2rem'}}>
        <div className="admin-card-header">
          <h3>Recent Attendance Trend</h3>
          <p className="admin-card-subtitle">Weekly attendance over the past month</p>
        </div>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Attendance</th>
                <th>Change from Previous</th>
                <th>Percentage of Members</th>
              </tr>
            </thead>
            <tbody>
              {reportData.attendance.attendanceTrend.map((record, index) => (
                <tr key={index}>
                  <td>{new Date(record.date).toLocaleDateString()}</td>
                  <td>{record.attendance}</td>
                  <td>
                    {index > 0 ? (
                      <span className={record.attendance > reportData.attendance.attendanceTrend[index-1]?.attendance ? 'admin-trend-up' : 'admin-trend-down'}>
                        {record.attendance > reportData.attendance.attendanceTrend[index-1]?.attendance ? '↗' : '↘'}
                        {Math.abs(record.attendance - (reportData.attendance.attendanceTrend[index-1]?.attendance || 0))}
                      </span>
                    ) : '-'}
                  </td>
                  <td>{Math.round((record.attendance / reportData.membership.totalMembers) * 100)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderCommunicationReports = () => (
    <div className="communication-reports">
      {/* Communication Summary */}
      <div className="admin-stats-grid">
        <div className="clean-card">
          <div className="admin-card-header">
            <div className="admin-card-icon" style={{color: '#8b5cf6'}}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h3>Total Messages</h3>
              <p className="admin-card-value">{reportData.communication.totalMessages}</p>
            </div>
          </div>
        </div>

        <div className="clean-card">
          <div className="admin-card-header">
            <div className="admin-card-icon" style={{color: '#10b981'}}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div>
              <h3>Delivery Rate</h3>
              <p className="admin-card-value">{reportData.communication.deliveryRate}%</p>
            </div>
          </div>
        </div>

        <div className="clean-card">
          <div className="admin-card-header">
            <div className="admin-card-icon" style={{color: '#f59e0b'}}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <h3>Engagement Rate</h3>
              <p className="admin-card-value">{reportData.communication.engagementRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Channel Performance */}
      <div className="clean-card" style={{marginTop: '2rem'}}>
        <div className="admin-card-header">
          <h3>Channel Performance</h3>
          <p className="admin-card-subtitle">Performance metrics by communication channel</p>
        </div>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Channel</th>
                <th>Messages Sent</th>
                <th>Delivered</th>
                <th>Opened/Read</th>
                <th>Delivery Rate</th>
                <th>Engagement Rate</th>
              </tr>
            </thead>
            <tbody>
              {reportData.communication.channelPerformance.map((channel, index) => (
                <tr key={index}>
                  <td>
                    <span className={`admin-badge ${channel.channel === 'SMS' ? 'admin-badge-success' : 'admin-badge-info'}`}>
                      {channel.channel}
                    </span>
                  </td>
                  <td>{channel.sent}</td>
                  <td>{channel.delivered}</td>
                  <td>{channel.opened}</td>
                  <td>
                    <div className="admin-percentage">
                      {Math.round((channel.delivered / channel.sent) * 100)}%
                    </div>
                  </td>
                  <td>
                    <div className="admin-percentage">
                      {Math.round((channel.opened / channel.delivered) * 100)}%
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Communication Insights */}
      <div className="clean-card" style={{marginTop: '2rem'}}>
        <div className="admin-card-header">
          <h3>Communication Insights</h3>
          <p className="admin-card-subtitle">Key insights and recommendations</p>
        </div>
        <div className="admin-insights-grid">
          <div className="admin-insight-item">
            <div className="admin-insight-icon" style={{color: '#10b981'}}>📱</div>
            <div className="admin-insight-content">
              <h4>SMS Performing Well</h4>
              <p>SMS messages have a 98% delivery rate and high engagement</p>
            </div>
          </div>
          <div className="admin-insight-item">
            <div className="admin-insight-icon" style={{color: '#3b82f6'}}>📧</div>
            <div className="admin-insight-content">
              <h4>Email Engagement</h4>
              <p>Email open rates are above average at 84%</p>
            </div>
          </div>
          <div className="admin-insight-item">
            <div className="admin-insight-icon" style={{color: '#f59e0b'}}>⏰</div>
            <div className="admin-insight-content">
              <h4>Optimal Timing</h4>
              <p>Messages sent between 9-11 AM have highest engagement</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview()
      case 'financial':
        return renderFinancialReports()
      case 'membership':
        return renderMembershipReports()
      case 'attendance':
        return renderAttendanceReports()
      case 'communication':
        return renderCommunicationReports()
      default:
        return renderOverview()
    }
  }

  return (
    <div className="admin-content-management">
      {/* Header */}
      <div className="admin-content-header">
        <div>
          <h1>Reports & Analytics</h1>
          <p>Comprehensive insights into your church's performance and growth</p>
        </div>
        <div className="admin-header-actions">
          <select
            className="admin-filter-select"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="admin-btn-primary">
            <svg className="admin-btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export Report
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`admin-tab ${activeTab === tab.id ? 'admin-tab-active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="admin-tab-icon">{tab.icon}</span>
            <span className="admin-tab-text">{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="admin-tab-content">
        {renderContent()}
      </div>
    </div>
  )
}

export default ReportsAnalytics
