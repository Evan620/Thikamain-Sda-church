import React, { useState, useEffect } from 'react'
import { supabase } from '../../services/supabaseClient'
import { useAuth } from '../../hooks/useAuth'

const PrayerRequestsManagement = () => {
  const { user } = useAuth()
  const [prayerRequests, setPrayerRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [showDetails, setShowDetails] = useState(false)
  const [filter, setFilter] = useState('all')

  // Fetch prayer requests
  const fetchPrayerRequests = async () => {
    try {
      setLoading(true)
      let query = supabase
        .from('prayer_requests')
        .select(`
          *,
          requester:users(full_name, email),
          assigned_user:users!prayer_requests_assigned_to_fkey(full_name, email)
        `)
        .order('created_at', { ascending: false })

      if (filter !== 'all') {
        query = query.eq('status', filter)
      }

      const { data, error } = await query

      if (error) throw error
      setPrayerRequests(data || [])
    } catch (error) {
      console.error('Error fetching prayer requests:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPrayerRequests()
  }, [filter])

  // Update prayer request status
  const updateStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('prayer_requests')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)

      if (error) throw error
      fetchPrayerRequests()
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Error updating status. Please try again.')
    }
  }

  // Assign prayer request
  const assignRequest = async (id) => {
    try {
      const { error } = await supabase
        .from('prayer_requests')
        .update({ 
          assigned_to: user.id,
          status: 'in_progress',
          updated_at: new Date().toISOString()
        })
        .eq('id', id)

      if (error) throw error
      fetchPrayerRequests()
    } catch (error) {
      console.error('Error assigning request:', error)
      alert('Error assigning request. Please try again.')
    }
  }

  // Get urgency color
  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'urgent': return 'red'
      case 'high': return 'orange'
      case 'normal': return 'blue'
      case 'low': return 'gray'
      default: return 'blue'
    }
  }

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'blue'
      case 'in_progress': return 'yellow'
      case 'answered': return 'green'
      case 'closed': return 'gray'
      default: return 'blue'
    }
  }

  if (loading) {
    return (
      <div className="admin-loading-container">
        <div className="admin-loading-spinner"></div>
        <p>Loading prayer requests...</p>
      </div>
    )
  }

  return (
    <div className="admin-content-management">
      {/* Header */}
      <div className="admin-content-header">
        <div>
          <h1>Prayer Requests Management</h1>
          <p>Manage and respond to prayer requests from the community</p>
        </div>
        <div className="admin-filter-controls">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="admin-form-select"
          >
            <option value="all">All Requests</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="answered">Answered</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Prayer Requests List */}
      <div className="admin-content-list">
        {prayerRequests.length === 0 ? (
          <div className="admin-empty-state">
            <svg className="admin-empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h3>No prayer requests</h3>
            <p>Prayer requests will appear here when submitted</p>
          </div>
        ) : (
          <div className="admin-prayer-requests-grid">
            {prayerRequests.map((request) => (
              <div key={request.id} className="admin-prayer-card">
                <div className="admin-prayer-card-header">
                  <div className="admin-prayer-meta">
                    <span className={`admin-urgency-badge ${getUrgencyColor(request.urgency)}`}>
                      {request.urgency}
                    </span>
                    <span className={`admin-status-badge ${getStatusColor(request.status)}`}>
                      {request.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="admin-prayer-date">
                    {new Date(request.created_at).toLocaleDateString()}
                  </div>
                </div>

                <div className="admin-prayer-content">
                  <h3 className="admin-prayer-title">{request.title}</h3>
                  <p className="admin-prayer-description">
                    {request.description.length > 150 
                      ? `${request.description.substring(0, 150)}...`
                      : request.description
                    }
                  </p>
                </div>

                <div className="admin-prayer-footer">
                  <div className="admin-prayer-requester">
                    <span className="admin-prayer-label">Requested by:</span>
                    <span className="admin-prayer-name">
                      {request.requester?.full_name || 'Anonymous'}
                    </span>
                  </div>

                  {request.assigned_user && (
                    <div className="admin-prayer-assigned">
                      <span className="admin-prayer-label">Assigned to:</span>
                      <span className="admin-prayer-name">
                        {request.assigned_user.full_name}
                      </span>
                    </div>
                  )}
                </div>

                <div className="admin-prayer-actions">
                  <button
                    onClick={() => {
                      setSelectedRequest(request)
                      setShowDetails(true)
                    }}
                    className="admin-btn-sm admin-btn-secondary"
                  >
                    View Details
                  </button>

                  {request.status === 'open' && (
                    <button
                      onClick={() => assignRequest(request.id)}
                      className="admin-btn-sm admin-btn-primary"
                    >
                      Assign to Me
                    </button>
                  )}

                  <div className="admin-status-actions">
                    {request.status !== 'answered' && (
                      <button
                        onClick={() => updateStatus(request.id, 'answered')}
                        className="admin-btn-sm admin-btn-success"
                      >
                        Mark Answered
                      </button>
                    )}
                    
                    {request.status !== 'closed' && (
                      <button
                        onClick={() => updateStatus(request.id, 'closed')}
                        className="admin-btn-sm admin-btn-warning"
                      >
                        Close
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Prayer Request Details Modal */}
      {showDetails && selectedRequest && (
        <div className="admin-modal-overlay">
          <div className="admin-modal admin-modal-large">
            <div className="admin-modal-header">
              <h2>Prayer Request Details</h2>
              <button
                onClick={() => {
                  setShowDetails(false)
                  setSelectedRequest(null)
                }}
                className="admin-modal-close"
              >
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="admin-prayer-details">
              <div className="admin-prayer-details-header">
                <h3>{selectedRequest.title}</h3>
                <div className="admin-prayer-details-meta">
                  <span className={`admin-urgency-badge ${getUrgencyColor(selectedRequest.urgency)}`}>
                    {selectedRequest.urgency} priority
                  </span>
                  <span className={`admin-status-badge ${getStatusColor(selectedRequest.status)}`}>
                    {selectedRequest.status.replace('_', ' ')}
                  </span>
                  <span className="admin-privacy-badge">
                    {selectedRequest.privacy_level.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div className="admin-prayer-details-content">
                <div className="admin-prayer-details-section">
                  <h4>Request Details</h4>
                  <p>{selectedRequest.description}</p>
                </div>

                <div className="admin-prayer-details-info">
                  <div className="admin-prayer-info-item">
                    <span className="admin-prayer-label">Submitted by:</span>
                    <span>{selectedRequest.requester?.full_name || 'Anonymous'}</span>
                  </div>
                  
                  <div className="admin-prayer-info-item">
                    <span className="admin-prayer-label">Email:</span>
                    <span>{selectedRequest.requester?.email || 'Not provided'}</span>
                  </div>

                  <div className="admin-prayer-info-item">
                    <span className="admin-prayer-label">Submitted on:</span>
                    <span>{new Date(selectedRequest.created_at).toLocaleString()}</span>
                  </div>

                  {selectedRequest.assigned_user && (
                    <div className="admin-prayer-info-item">
                      <span className="admin-prayer-label">Assigned to:</span>
                      <span>{selectedRequest.assigned_user.full_name}</span>
                    </div>
                  )}

                  <div className="admin-prayer-info-item">
                    <span className="admin-prayer-label">Last updated:</span>
                    <span>{new Date(selectedRequest.updated_at).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="admin-prayer-details-actions">
                {selectedRequest.status === 'open' && (
                  <button
                    onClick={() => {
                      assignRequest(selectedRequest.id)
                      setShowDetails(false)
                    }}
                    className="admin-btn-primary"
                  >
                    Assign to Me
                  </button>
                )}

                <button
                  onClick={() => updateStatus(selectedRequest.id, 'in_progress')}
                  className="admin-btn-secondary"
                  disabled={selectedRequest.status === 'in_progress'}
                >
                  Mark In Progress
                </button>

                <button
                  onClick={() => updateStatus(selectedRequest.id, 'answered')}
                  className="admin-btn-success"
                  disabled={selectedRequest.status === 'answered'}
                >
                  Mark as Answered
                </button>

                <button
                  onClick={() => updateStatus(selectedRequest.id, 'closed')}
                  className="admin-btn-warning"
                  disabled={selectedRequest.status === 'closed'}
                >
                  Close Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PrayerRequestsManagement
