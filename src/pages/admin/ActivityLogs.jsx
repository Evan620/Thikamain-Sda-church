import React, { useState, useEffect } from 'react'
import { supabase } from '../../services/supabaseClient'
import { useAuth } from '../../hooks/useAuth'

const ActivityLogs = () => {
  const { hasRole } = useAuth()
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Last 7 days
    end: new Date().toISOString().split('T')[0]
  })
  const [selectedLog, setSelectedLog] = useState(null)
  const [showDetails, setShowDetails] = useState(false)

  // Activity types and their display info
  const activityTypes = {
    // Authentication
    'admin_login': { label: 'Admin Login', icon: '🔐', color: 'blue', category: 'Authentication' },
    'admin_logout': { label: 'Admin Logout', icon: '🚪', color: 'gray', category: 'Authentication' },
    'password_changed': { label: 'Password Changed', icon: '🔑', color: 'orange', category: 'Authentication' },
    
    // Admin Management
    'admin_created': { label: 'Admin Created', icon: '👤', color: 'green', category: 'Admin Management' },
    'admin_updated': { label: 'Admin Updated', icon: '✏️', color: 'blue', category: 'Admin Management' },
    'admin_activated': { label: 'Admin Activated', icon: '✅', color: 'green', category: 'Admin Management' },
    'admin_deactivated': { label: 'Admin Deactivated', icon: '❌', color: 'red', category: 'Admin Management' },
    
    // Content Management
    'sermon_created': { label: 'Sermon Created', icon: '🎤', color: 'purple', category: 'Content' },
    'sermon_updated': { label: 'Sermon Updated', icon: '📝', color: 'blue', category: 'Content' },
    'sermon_deleted': { label: 'Sermon Deleted', icon: '🗑️', color: 'red', category: 'Content' },
    'event_created': { label: 'Event Created', icon: '📅', color: 'green', category: 'Content' },
    'event_updated': { label: 'Event Updated', icon: '📝', color: 'blue', category: 'Content' },
    'event_deleted': { label: 'Event Deleted', icon: '🗑️', color: 'red', category: 'Content' },
    'announcement_created': { label: 'Announcement Created', icon: '📢', color: 'green', category: 'Content' },
    'announcement_updated': { label: 'Announcement Updated', icon: '📝', color: 'blue', category: 'Content' },
    'announcement_deleted': { label: 'Announcement Deleted', icon: '🗑️', color: 'red', category: 'Content' },
    
    // Member Management
    'member_created': { label: 'Member Added', icon: '👥', color: 'green', category: 'Members' },
    'member_updated': { label: 'Member Updated', icon: '✏️', color: 'blue', category: 'Members' },
    'member_deleted': { label: 'Member Deleted', icon: '🗑️', color: 'red', category: 'Members' },
    
    // Financial Management
    'donation_recorded': { label: 'Donation Recorded', icon: '💰', color: 'green', category: 'Financial' },
    'donation_updated': { label: 'Donation Updated', icon: '💱', color: 'blue', category: 'Financial' },
    'donation_deleted': { label: 'Donation Deleted', icon: '🗑️', color: 'red', category: 'Financial' },
    'budget_created': { label: 'Budget Created', icon: '📊', color: 'green', category: 'Financial' },
    'budget_updated': { label: 'Budget Updated', icon: '📈', color: 'blue', category: 'Financial' },
    'expense_recorded': { label: 'Expense Recorded', icon: '💸', color: 'orange', category: 'Financial' },
    
    // System
    'settings_updated': { label: 'Settings Updated', icon: '⚙️', color: 'blue', category: 'System' },
    'backup_created': { label: 'Backup Created', icon: '💾', color: 'green', category: 'System' },
    'system_maintenance': { label: 'System Maintenance', icon: '🔧', color: 'orange', category: 'System' }
  }

  // Fetch activity logs
  const fetchLogs = async () => {
    try {
      setLoading(true)
      
      let query = supabase
        .from('admin_activity_logs')
        .select(`
          *,
          admin:users(full_name, email)
        `)
        .order('created_at', { ascending: false })
        .limit(100)

      if (filter !== 'all') {
        const categoryActions = Object.entries(activityTypes)
          .filter(([_, info]) => info.category === filter)
          .map(([action, _]) => action)
        
        if (categoryActions.length > 0) {
          query = query.in('action', categoryActions)
        }
      }

      if (dateRange.start) {
        query = query.gte('created_at', `${dateRange.start}T00:00:00`)
      }
      if (dateRange.end) {
        query = query.lte('created_at', `${dateRange.end}T23:59:59`)
      }

      const { data, error } = await query

      if (error) throw error
      setLogs(data || [])
    } catch (error) {
      console.error('Error fetching activity logs:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [filter, dateRange])

  // Get activity info
  const getActivityInfo = (action) => {
    return activityTypes[action] || { 
      label: action.replace('_', ' '), 
      icon: '📝', 
      color: 'gray', 
      category: 'Other' 
    }
  }

  // Format details for display
  const formatDetails = (details) => {
    if (!details) return 'No additional details'
    
    if (typeof details === 'string') return details
    
    return Object.entries(details).map(([key, value]) => (
      <div key={key} className="activity-detail-item">
        <span className="activity-detail-key">{key.replace('_', ' ')}:</span>
        <span className="activity-detail-value">
          {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
        </span>
      </div>
    ))
  }

  // Get unique categories for filter
  const categories = ['all', ...new Set(Object.values(activityTypes).map(info => info.category))]

  if (loading) {
    return (
      <div className="admin-loading-container">
        <div className="admin-loading-spinner"></div>
        <p>Loading activity logs...</p>
      </div>
    )
  }

  // Only Super Admins can access activity logs
  if (!hasRole('SUPER_ADMIN')) {
    return (
      <div className="admin-access-denied">
        <div className="admin-access-denied-content">
          <svg className="admin-access-denied-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h2>Access Denied</h2>
          <p>You need Super Admin privileges to view activity logs.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-content-management">
      {/* Header */}
      <div className="admin-content-header">
        <div>
          <h1>Activity Logs</h1>
          <p>Monitor all admin actions and system activities</p>
        </div>
        <div className="admin-header-actions">
          <button
            onClick={fetchLogs}
            className="admin-btn-secondary"
            title="Refresh logs"
          >
            <svg className="admin-btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="activity-logs-filters">
        <div className="admin-filter-controls">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="admin-form-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Activities' : category}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
            className="admin-form-input"
          />

          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
            className="admin-form-input"
          />
        </div>
      </div>

      {/* Activity Summary Cards */}
      <div className="activity-summary-cards">
        {categories.slice(1).map(category => {
          const categoryLogs = logs.filter(log => {
            const activityInfo = getActivityInfo(log.action)
            return activityInfo.category === category
          })
          
          return (
            <div key={category} className="activity-summary-card">
              <div className="activity-summary-header">
                <h3>{category}</h3>
                <span className="activity-summary-count">{categoryLogs.length}</span>
              </div>
              <div className="activity-summary-recent">
                {categoryLogs.slice(0, 3).map(log => {
                  const activityInfo = getActivityInfo(log.action)
                  return (
                    <div key={log.id} className="activity-summary-item">
                      <span className="activity-summary-icon">{activityInfo.icon}</span>
                      <span className="activity-summary-text">{activityInfo.label}</span>
                      <span className="activity-summary-time">
                        {new Date(log.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Activity Logs List */}
      <div className="admin-content-list">
        {logs.length === 0 ? (
          <div className="admin-empty-state">
            <svg className="admin-empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3>No activity logs found</h3>
            <p>No activities match your current filters</p>
          </div>
        ) : (
          <div className="activity-logs-timeline">
            {logs.map((log) => {
              const activityInfo = getActivityInfo(log.action)
              return (
                <div key={log.id} className="activity-log-item">
                  <div className="activity-log-timeline">
                    <div className={`activity-log-dot ${activityInfo.color}`}>
                      <span className="activity-log-icon">{activityInfo.icon}</span>
                    </div>
                    <div className="activity-log-line"></div>
                  </div>
                  
                  <div className="activity-log-content">
                    <div className="activity-log-header">
                      <div className="activity-log-main">
                        <h4 className="activity-log-title">{activityInfo.label}</h4>
                        <p className="activity-log-admin">
                          by {log.admin?.full_name || log.admin?.email || 'Unknown Admin'}
                        </p>
                      </div>
                      <div className="activity-log-meta">
                        <span className="activity-log-time">
                          {new Date(log.created_at).toLocaleString()}
                        </span>
                        <button
                          onClick={() => {
                            setSelectedLog(log)
                            setShowDetails(true)
                          }}
                          className="activity-log-details-btn"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                    
                    {log.details && (
                      <div className="activity-log-summary">
                        {typeof log.details === 'object' && log.details.admin_email && (
                          <span className="activity-log-detail">Admin: {log.details.admin_email}</span>
                        )}
                        {typeof log.details === 'object' && log.details.admin_role && (
                          <span className="activity-log-detail">Role: {log.details.admin_role}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Activity Details Modal */}
      {showDetails && selectedLog && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2>Activity Details</h2>
              <button
                onClick={() => {
                  setShowDetails(false)
                  setSelectedLog(null)
                }}
                className="admin-modal-close"
              >
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="activity-details-content">
              <div className="activity-details-header">
                <div className={`activity-details-icon ${getActivityInfo(selectedLog.action).color}`}>
                  {getActivityInfo(selectedLog.action).icon}
                </div>
                <div>
                  <h3>{getActivityInfo(selectedLog.action).label}</h3>
                  <p>Performed by {selectedLog.admin?.full_name || selectedLog.admin?.email || 'Unknown Admin'}</p>
                  <p className="activity-details-time">
                    {new Date(selectedLog.created_at).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="activity-details-info">
                <div className="activity-detail-section">
                  <h4>Basic Information</h4>
                  <div className="activity-detail-grid">
                    <div className="activity-detail-item">
                      <span className="activity-detail-key">Action:</span>
                      <span className="activity-detail-value">{selectedLog.action}</span>
                    </div>
                    <div className="activity-detail-item">
                      <span className="activity-detail-key">Timestamp:</span>
                      <span className="activity-detail-value">{new Date(selectedLog.created_at).toLocaleString()}</span>
                    </div>
                    <div className="activity-detail-item">
                      <span className="activity-detail-key">IP Address:</span>
                      <span className="activity-detail-value">{selectedLog.ip_address || 'Unknown'}</span>
                    </div>
                    <div className="activity-detail-item">
                      <span className="activity-detail-key">User Agent:</span>
                      <span className="activity-detail-value">{selectedLog.user_agent || 'Unknown'}</span>
                    </div>
                  </div>
                </div>

                {selectedLog.details && (
                  <div className="activity-detail-section">
                    <h4>Additional Details</h4>
                    <div className="activity-detail-details">
                      {formatDetails(selectedLog.details)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ActivityLogs
