import React, { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { supabase } from '../../services/supabaseClient'
import SkeletonLoader from '../common/SkeletonLoader'
import cacheService, { CACHE_TTL, CACHE_KEYS } from '../../services/cacheService'

const PermissionBasedDashboard = () => {
  const { userProfile, hasPermission, hasAnyPermission, getUserPermissions } = useAuth()
  const [dashboardData, setDashboardData] = useState({
    members: { total: 0, recent: [] },
    content: { sermons: 0, events: 0, announcements: 0 },
    financial: { totalDonations: 0, monthlyDonations: 0, budgetUtilization: 0 },
    prayers: { total: 0, pending: 0 },
    activities: []
  })
  const [loading, setLoading] = useState(true)

  // Fetch dashboard data based on permissions
  useEffect(() => {
    fetchDashboardData()
  }, [userProfile])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const data = {}
      const promises = []

      // Fetch member data if user has member permissions
      if (hasAnyPermission(['manage_members', 'view_member_details'])) {
        promises.push(
          cacheService.cachedFetch(
            cacheService.generateKey(CACHE_KEYS.MEMBERS_COUNT),
            () => Promise.all([
              supabase
                .from('members')
                .select('id, first_name, last_name, created_at')
                .order('created_at', { ascending: false })
                .limit(5),
              supabase
                .from('members')
                .select('*', { count: 'exact', head: true })
            ]),
            CACHE_TTL.MEMBERS
          ).then(([membersResult, countResult]) => {
            data.members = {
              total: countResult.count || 0,
              recent: membersResult.data || []
            }
          })
        )
      }

      // Fetch content data if user has content permissions
      if (hasAnyPermission(['manage_sermons', 'manage_events', 'manage_announcements'])) {
        const contentPromises = []

        if (hasPermission('manage_sermons')) {
          contentPromises.push(
            supabase
              .from('sermons')
              .select('*', { count: 'exact', head: true })
              .then(result => ({ sermons: result.count || 0 }))
          )
        }

        if (hasPermission('manage_events')) {
          contentPromises.push(
            supabase
              .from('events')
              .select('*', { count: 'exact', head: true })
              .then(result => ({ events: result.count || 0 }))
          )
        }

        if (hasPermission('manage_announcements')) {
          contentPromises.push(
            supabase
              .from('announcements')
              .select('*', { count: 'exact', head: true })
              .then(result => ({ announcements: result.count || 0 }))
          )
        }

        if (contentPromises.length > 0) {
          promises.push(
            Promise.all(contentPromises).then(results => {
              data.content = results.reduce((acc, result) => ({ ...acc, ...result }), {})
            })
          )
        }
      }

      // Fetch financial data if user has financial permissions
      if (hasAnyPermission(['manage_finances', 'view_financial_reports', 'manage_donations'])) {
        const currentDate = new Date()
        const currentYear = currentDate.getFullYear()
        const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0')
        const daysInMonth = new Date(currentYear, currentDate.getMonth() + 1, 0).getDate()

        promises.push(
          cacheService.cachedFetch(
            cacheService.generateKey(CACHE_KEYS.FINANCIAL_SUMMARY, { month: currentMonth, year: currentYear }),
            async () => {
              try {
                const [donationsResult, monthlyResult] = await Promise.all([
                  supabase
                    .from('giving_records')
                    .select('amount')
                    .eq('is_verified', true),
                  supabase
                    .from('giving_records')
                    .select('amount')
                    .gte('giving_date', `${currentYear}-${currentMonth}-01`)
                    .lte('giving_date', `${currentYear}-${currentMonth}-${daysInMonth}`)
                    .eq('is_verified', true)
                ])

                // Try to fetch budget and expense data, but handle gracefully if tables don't exist
                let budgetResult = { data: [] }
                let expensesResult = { data: [] }

                try {
                  budgetResult = await supabase
                    .from('budgets')
                    .select('allocated_amount')
                    .eq('year', currentYear)
                } catch (budgetError) {
                  console.warn('Budgets table not found, using default values')
                }

                try {
                  expensesResult = await supabase
                    .from('expenses')
                    .select('amount')
                    .gte('expense_date', `${currentYear}-01-01`)
                    .eq('is_approved', true)
                } catch (expenseError) {
                  console.warn('Expenses table not found, using default values')
                }

                return [donationsResult, monthlyResult, budgetResult, expensesResult]
              } catch (error) {
                console.warn('Error fetching financial data:', error)
                return [{ data: [] }, { data: [] }, { data: [] }, { data: [] }]
              }
            },
            CACHE_TTL.FINANCIAL
          ).then(([donationsResult, monthlyResult, budgetResult, expensesResult]) => {
            const totalDonations = donationsResult.data?.reduce((sum, record) => sum + (record.amount || 0), 0) || 0
            const monthlyDonations = monthlyResult.data?.reduce((sum, record) => sum + (record.amount || 0), 0) || 0
            const totalBudget = budgetResult.data?.reduce((sum, budget) => sum + (budget.allocated_amount || 0), 0) || 1
            const totalExpenses = expensesResult.data?.reduce((sum, expense) => sum + (expense.amount || 0), 0) || 0
            const budgetUtilization = Math.round((totalExpenses / totalBudget) * 100)

            data.financial = {
              totalDonations,
              monthlyDonations,
              budgetUtilization
            }
          }).catch(error => {
            console.warn('Financial data fetch failed:', error)
            data.financial = {
              totalDonations: 0,
              monthlyDonations: 0,
              budgetUtilization: 0
            }
          })
        )
      }

      // Fetch prayer requests if user has permission
      if (hasPermission('manage_prayer_requests')) {
        promises.push(
          Promise.all([
            supabase
              .from('prayer_requests')
              .select('*', { count: 'exact', head: true }),
            supabase
              .from('prayer_requests')
              .select('*', { count: 'exact', head: true })
              .eq('status', 'pending')
          ]).then(([totalResult, pendingResult]) => {
            data.prayers = {
              total: totalResult.count || 0,
              pending: pendingResult.count || 0
            }
          })
        )
      }

      // Wait for all promises to complete
      await Promise.all(promises)
      setDashboardData(data)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Get role-specific welcome message
  const getWelcomeMessage = () => {
    const permissions = getUserPermissions()
    
    if (userProfile?.role === 'SUPER_ADMIN') {
      return {
        title: 'Super Admin Dashboard',
        subtitle: 'Complete system oversight and management'
      }
    }
    
    if (permissions.includes('manage_finances') && permissions.includes('manage_donations')) {
      return {
        title: 'Financial Management Dashboard',
        subtitle: 'Monitor church finances and stewardship'
      }
    }
    
    if (permissions.includes('manage_sermons') && permissions.includes('manage_events')) {
      return {
        title: 'Content Management Dashboard',
        subtitle: 'Manage sermons, events, and announcements'
      }
    }
    
    if (permissions.includes('manage_members')) {
      return {
        title: 'Member Management Dashboard',
        subtitle: 'Oversee church membership and engagement'
      }
    }
    
    return {
      title: 'Admin Dashboard',
      subtitle: 'Church management system'
    }
  }

  const welcomeMessage = getWelcomeMessage()

  if (loading) {
    return (
      <div className="admin-loading-container">
        <div className="admin-loading-spinner"></div>
        <p>Loading your personalized dashboard...</p>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      {/* Welcome Section */}
      <div className="admin-dashboard-header">
        <div>
          <h1>{welcomeMessage.title}</h1>
          <p>{welcomeMessage.subtitle}</p>
        </div>
        <div className="admin-user-info">
          <div className="admin-user-avatar">
            {userProfile?.full_name?.charAt(0)?.toUpperCase() || 'A'}
          </div>
          <div>
            <div className="admin-user-name">{userProfile?.full_name || 'Admin User'}</div>
            <div className="admin-user-role">
              {userProfile?.role?.replace('_', ' ') || 'Admin'}
            </div>
          </div>
        </div>
      </div>

      {/* Permission-Based Dashboard Cards */}
      <div className="clean-grid clean-grid-3">
        {/* Member Management Card */}
        {hasAnyPermission(['manage_members', 'view_member_details']) && (
          <div className="clean-card"
               style={{background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', color: 'white'}}>
            <div className="clean-card-header">
              <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <div style={{width: '48px', height: '48px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <div>
                  <h3 style={{margin: '0 0 0.5rem 0', fontSize: '1.125rem', fontWeight: '600'}}>Members</h3>
                  <p style={{margin: '0', fontSize: '2rem', fontWeight: '800'}}>{dashboardData.members?.total || 0}</p>
                </div>
              </div>
            </div>
            <div className="clean-card-body">
              <p style={{margin: '0 0 1rem 0', opacity: '0.9', fontSize: '0.875rem'}}>Total church members</p>
              {dashboardData.members?.recent?.length > 0 && (
                <div style={{marginTop: '1rem'}}>
                  <p style={{margin: '0 0 0.5rem 0', fontSize: '0.75rem', fontWeight: '600', opacity: '0.8'}}>Recent additions:</p>
                  {dashboardData.members.recent.slice(0, 3).map(member => (
                    <div key={member.id} style={{padding: '0.25rem 0', fontSize: '0.875rem', opacity: '0.9'}}>
                      {member.full_name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Content Management Card */}
        {hasAnyPermission(['manage_sermons', 'manage_events', 'manage_announcements']) && (
          <div className="clean-card"
               style={{background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white'}}>
            <div className="admin-card-header">
              <div className="admin-card-icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <div>
                <h3>Content</h3>
                <p className="admin-card-value">
                  {(dashboardData.content?.sermons || 0) + 
                   (dashboardData.content?.events || 0) + 
                   (dashboardData.content?.announcements || 0)}
                </p>
              </div>
            </div>
            <div className="admin-card-content">
              <div className="admin-content-breakdown">
                {hasPermission('manage_sermons') && (
                  <div className="admin-breakdown-item">
                    <span>Sermons:</span>
                    <span>{dashboardData.content?.sermons || 0}</span>
                  </div>
                )}
                {hasPermission('manage_events') && (
                  <div className="admin-breakdown-item">
                    <span>Events:</span>
                    <span>{dashboardData.content?.events || 0}</span>
                  </div>
                )}
                {hasPermission('manage_announcements') && (
                  <div className="admin-breakdown-item">
                    <span>Announcements:</span>
                    <span>{dashboardData.content?.announcements || 0}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Financial Management Card */}
        {hasAnyPermission(['manage_finances', 'view_financial_reports', 'manage_donations']) && (
          <div className="clean-card"
               style={{background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: 'white'}}>
            <div className="admin-card-header">
              <div className="admin-card-icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3>Finances</h3>
                <p className="admin-card-value">
                  KES {(dashboardData.financial?.totalDonations || 0).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="admin-card-content">
              <div className="admin-financial-breakdown">
                <div className="admin-breakdown-item">
                  <span>This Month:</span>
                  <span>KES {(dashboardData.financial?.monthlyDonations || 0).toLocaleString()}</span>
                </div>
                <div className="admin-breakdown-item">
                  <span>Budget Used:</span>
                  <span>{dashboardData.financial?.budgetUtilization || 0}%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Prayer Requests Card */}
        {hasPermission('manage_prayer_requests') && (
          <div className="admin-dashboard-card prayers">
            <div className="admin-card-header">
              <div className="admin-card-icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h3>Prayer Requests</h3>
                <p className="admin-card-value">{dashboardData.prayers?.total || 0}</p>
              </div>
            </div>
            <div className="admin-card-content">
              <div className="admin-breakdown-item">
                <span>Pending:</span>
                <span className="admin-pending-count">{dashboardData.prayers?.pending || 0}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions based on permissions */}
      <div className="admin-quick-actions">
        <h2>Quick Actions</h2>
        <div className="admin-actions-grid">
          {hasPermission('manage_sermons') && (
            <a href="/admin/sermons" className="admin-action-card">
              <div className="admin-action-icon">🎤</div>
              <div>
                <h3>Manage Sermons</h3>
                <p>Add and edit sermon content</p>
              </div>
            </a>
          )}
          
          {hasPermission('manage_events') && (
            <a href="/admin/events" className="admin-action-card">
              <div className="admin-action-icon">📅</div>
              <div>
                <h3>Manage Events</h3>
                <p>Create and organize church events</p>
              </div>
            </a>
          )}
          
          {hasPermission('manage_donations') && (
            <a href="/admin/donations" className="admin-action-card">
              <div className="admin-action-icon">💰</div>
              <div>
                <h3>Record Donations</h3>
                <p>Track tithes and offerings</p>
              </div>
            </a>
          )}
          
          {hasPermission('manage_members') && (
            <a href="/admin/members" className="admin-action-card">
              <div className="admin-action-icon">👥</div>
              <div>
                <h3>Manage Members</h3>
                <p>Add and update member information</p>
              </div>
            </a>
          )}
          
          {hasPermission('manage_admins') && (
            <a href="/admin/admin-users" className="admin-action-card">
              <div className="admin-action-icon">👑</div>
              <div>
                <h3>Manage Admins</h3>
                <p>Create and configure admin users</p>
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default PermissionBasedDashboard
