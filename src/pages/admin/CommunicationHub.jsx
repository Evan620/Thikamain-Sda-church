import React, { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useSMS } from '../../hooks/useSMS'
import { getMessages, getMessageStats, markMessageAsRead, sendMessageToLeader, copyEmailToClipboard, isEmailConfigured } from '../../services/centralizedMessagingService'
import '../../styles/CommunicationHub.css'

const CommunicationHub = () => {
  const { hasPermission } = useAuth()
  const {
    sendSMS,
    sendToGroup,
    testConnection,
    getServiceStatus,
    getMessageInfo,
    isLoading: smsLoading,
    error: smsError
  } = useSMS()
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(false)
  const [communicationData, setCommunicationData] = useState({
    smsStats: {
      totalSent: 0,
      thisMonth: 0,
      deliveryRate: 0,
      balance: 0
    },
    emailStats: {
      totalSent: 0,
      thisMonth: 0,
      openRate: 0,
      clickRate: 0
    },
    recentMessages: [],
    templates: []
  })

  // Messages state
  const [messages, setMessages] = useState([])
  const [messageStats, setMessageStats] = useState({})
  const [messageFilters, setMessageFilters] = useState({
    status: 'all',
    department: 'all',
    recipient: 'all'
  })

  // Modal and selection state
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [messagesByType, setMessagesByType] = useState({
    visitation: [],
    counseling: [],
    reports: [],
    events: [],
    maintenance: [],
    general: []
  })

  // Load real data from database
  useEffect(() => {
    // Get SMS service status
    const smsStatus = getServiceStatus()

    // Initialize with empty data - will be populated from database
    const initialData = {
      smsStats: {
        totalSent: 0,
        thisMonth: 0,
        deliveryRate: 0,
        balance: 0
      },
      emailStats: {
        totalSent: 0,
        thisMonth: 0,
        openRate: 0,
        clickRate: 0
      },
      recentMessages: [],
      templates: []
    }
    setCommunicationData(initialData)

    // Load real data from database
    loadMessages()
    loadMessageStats()
    loadRecentMessages()
  }, [])

  // Load messages from database
  const loadMessages = async () => {
    try {
      const filters = {}
      if (messageFilters.status !== 'all') filters.status = messageFilters.status
      if (messageFilters.department !== 'all') filters.department = messageFilters.department
      if (messageFilters.recipient !== 'all') filters.recipient = messageFilters.recipient

      const messagesData = await getMessages(filters)
      setMessages(messagesData)

      // Categorize messages by type based on recipient, department, and subject content
      const categorized = {
        visitation: [],
        counseling: [],
        reports: [],
        events: [],
        maintenance: [],
        general: []
      }

      messagesData.forEach(msg => {
        const subject = msg.subject.toLowerCase()
        const recipient = msg.recipient_name?.toLowerCase() || ''
        const department = msg.department || ''

        // Department Reports: Check for department field or Church Secretary recipient
        if (department || recipient.includes('church secretary') || recipient.includes('administrative coordinator')) {
          categorized.reports.push(msg)
        }
        // Visitation Requests: Check recipient and subject keywords
        else if (recipient.includes('pastoral care') || recipient.includes('visitation coordinator') ||
                 subject.includes('visit') || subject.includes('hospital') || subject.includes('home')) {
          categorized.visitation.push(msg)
        }
        // Counseling Requests: Check recipient and subject keywords
        else if (recipient.includes('pastor') || recipient.includes('senior pastor') ||
                 subject.includes('counsel') || subject.includes('guidance') || subject.includes('therapy')) {
          categorized.counseling.push(msg)
        }
        // Event Proposals: Check recipient and subject keywords
        else if (recipient.includes('events committee') || recipient.includes('events coordinator') ||
                 subject.includes('event') || subject.includes('proposal') || subject.includes('program')) {
          categorized.events.push(msg)
        }
        // Maintenance Requests: Check recipient and subject keywords
        else if (recipient.includes('facilities team') || recipient.includes('maintenance coordinator') ||
                 subject.includes('maintenance') || subject.includes('facility') || subject.includes('repair') ||
                 subject.includes('broken') || subject.includes('issue')) {
          categorized.maintenance.push(msg)
        }
        // General Inquiries: Everything else
        else {
          categorized.general.push(msg)
        }
      })

      setMessagesByType(categorized)
    } catch (error) {
      console.error('Error loading messages:', error)
    }
  }

  // Reload messages when filters change
  useEffect(() => {
    loadMessages()
  }, [messageFilters])

  // Load message statistics
  const loadMessageStats = async () => {
    try {
      const stats = await getMessageStats()
      setMessageStats(stats)
    } catch (error) {
      console.error('Error loading message stats:', error)
    }
  }

  // Load recent messages for overview
  const loadRecentMessages = async () => {
    try {
      const recentMessagesData = await getMessages({ limit: 5 })

      // Transform database messages to match the expected format
      const transformedMessages = recentMessagesData.map(msg => ({
        id: msg.id,
        type: 'Email', // All submissions are currently email-based
        subject: msg.subject,
        recipients: 1, // Each message has one recipient
        status: msg.status === 'sent' ? 'Sent' : msg.status === 'pending' ? 'Pending' : 'Failed',
        timestamp: new Date(msg.created_at).toLocaleString('en-KE', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }),
        openRate: msg.status === 'sent' ? 85 : 0 // Default open rate for sent messages
      }))

      setCommunicationData(prev => ({
        ...prev,
        recentMessages: transformedMessages
      }))
    } catch (error) {
      console.error('Error loading recent messages:', error)
    }
  }

  // Handle message status update
  const handleMarkAsRead = async (messageId) => {
    try {
      await markMessageAsRead(messageId)
      loadMessages() // Refresh messages
      loadMessageStats() // Refresh stats
    } catch (error) {
      console.error('Error marking message as read:', error)
    }
  }

  // Handle sending message to leader via Gmail
  const handleSendToLeader = async (messageId) => {
    try {
      setLoading(true)
      const result = await sendMessageToLeader(messageId)

      if (result.success) {
        alert('✅ Gmail opened with pre-filled email! Please click Send in Gmail to deliver the message.')
        loadMessages() // Refresh messages
        loadMessageStats() // Refresh stats
      } else {
        alert(`❌ Failed to open Gmail: ${result.error}`)
      }
    } catch (error) {
      console.error('Error opening Gmail:', error)
      alert(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  // Handle copying email to clipboard
  const handleCopyEmail = async (message) => {
    try {
      const result = await copyEmailToClipboard(message)
      if (result.success) {
        alert('✅ Email content copied to clipboard! You can paste it into any email client.')
      } else {
        alert(`❌ ${result.error}`)
      }
    } catch (error) {
      console.error('Error copying email:', error)
      alert(`❌ Error: ${error.message}`)
    }
  }

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setMessageFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  // Handle viewing message details
  const handleViewMessage = (message) => {
    setSelectedMessage(message)
    setShowMessageModal(true)
  }

  // Handle updating message status
  const handleUpdateStatus = async (messageId, newStatus) => {
    try {
      await markMessageAsRead(messageId)
      loadMessages() // Refresh data
      loadMessageStats()
    } catch (error) {
      console.error('Error updating message status:', error)
    }
  }

  // Handle assigning message
  const handleAssignMessage = async (messageId) => {
    try {
      // For now, just mark as read - can be expanded later
      await handleUpdateStatus(messageId, 'read')
    } catch (error) {
      console.error('Error assigning message:', error)
    }
  }



  // Render message detail modal
  const renderMessageModal = () => {
    if (!selectedMessage || !showMessageModal) return null

    return (
      <div className="admin-modal-overlay" onClick={() => setShowMessageModal(false)}>
        <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
          <div className="admin-modal-header">
            <h3>{selectedMessage.subject}</h3>
            <button
              className="admin-modal-close"
              onClick={() => setShowMessageModal(false)}
            >
              ×
            </button>
          </div>

          <div className="admin-modal-body">
            <div className="message-details">
              <div className="message-meta">
                <div className="message-meta-item">
                  <strong>From:</strong> {selectedMessage.sender_name}
                </div>
                {selectedMessage.sender_email && (
                  <div className="message-meta-item">
                    <strong>Email:</strong> {selectedMessage.sender_email}
                  </div>
                )}
                {selectedMessage.sender_phone && (
                  <div className="message-meta-item">
                    <strong>Phone:</strong> {selectedMessage.sender_phone}
                  </div>
                )}
                <div className="message-meta-item">
                  <strong>Date:</strong> {new Date(selectedMessage.created_at).toLocaleString()}
                </div>
                <div className="message-meta-item">
                  <strong>Status:</strong>
                  <span className={`status-badge status-${selectedMessage.status}`}>
                    {selectedMessage.status}
                  </span>
                </div>
              </div>

              <div className="message-content">
                <h4>Message:</h4>
                <div className="message-text">
                  {selectedMessage.message}
                </div>
              </div>

              {selectedMessage.attachments && selectedMessage.attachments.length > 0 && (
                <div className="message-attachments">
                  <h4>Attachments ({selectedMessage.attachments.length}):</h4>
                  <div className="attachments-list">
                    {selectedMessage.attachments.map((file, index) => (
                      <div key={index} className="attachment-item">
                        <div className="attachment-info">
                          <span className="attachment-icon">
                            {file.type?.startsWith('image/') ? '🖼️' : '📄'}
                          </span>
                          <div className="attachment-details">
                            <div className="attachment-name">{file.name}</div>
                            <div className="attachment-meta">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </div>
                          </div>
                        </div>
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="attachment-download"
                          title="Download file"
                        >
                          ⬇️ Download
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="admin-modal-footer">
            <button
              onClick={() => handleSendToLeader(selectedMessage.id)}
              className="admin-btn admin-btn-primary"
            >
              Copy Email to Respond
            </button>
            {selectedMessage.status === 'pending' && (
              <button
                onClick={() => {
                  handleUpdateStatus(selectedMessage.id, 'read')
                  setShowMessageModal(false)
                }}
                className="admin-btn admin-btn-success"
              >
                Mark as Complete
              </button>
            )}
            <button
              onClick={() => setShowMessageModal(false)}
              className="admin-btn admin-btn-secondary"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'visitation', name: 'Visitation Requests', icon: '🏠' },
    { id: 'counseling', name: 'Counseling Requests', icon: '💬' },
    { id: 'reports', name: 'Department Reports', icon: '📊' },
    { id: 'events', name: 'Event Proposals', icon: '📅' },
    { id: 'maintenance', name: 'Facility Issues', icon: '🔧' },
    { id: 'general', name: 'General Inquiries', icon: '❓' },
    { id: 'templates', name: 'Templates', icon: '📝' }
  ]

  // Render visitation requests
  const renderVisitationRequests = () => (
    <div className="submission-requests-container">
      <div className="admin-content-header">
        <div>
          <h2>Visitation Requests</h2>
          <p>Manage pastoral visits, hospital visits, and home visits</p>
        </div>
        <div className="admin-stats-mini">
          <span className="admin-badge admin-badge-info">
            {messagesByType.visitation.length} requests
          </span>
        </div>
      </div>

      <div className="requests-grid">
        {messagesByType.visitation.length === 0 ? (
          <div className="admin-empty-state">
            <svg className="admin-empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4" />
            </svg>
            <h3>No visitation requests</h3>
            <p>Visitation requests will appear here when submitted</p>
          </div>
        ) : (
          messagesByType.visitation.map((request) => (
            <div key={request.id} className="request-card">
              <div className="request-card-header">
                <div className="request-meta">
                  <h4>{request.subject}</h4>
                  <span className={`status-badge status-${request.status}`}>
                    {request.status}
                  </span>
                </div>
                <div className="request-timestamp">
                  {new Date(request.created_at).toLocaleDateString()}
                </div>
              </div>

              <div className="request-card-body">
                <div className="request-sender">
                  <strong>From:</strong> {request.sender_name}
                  {request.sender_email && <span> ({request.sender_email})</span>}
                </div>

                {/* Extract and display visitation details */}
                {request.message.includes('--- VISITATION DETAILS ---') && (
                  <div className="submission-details">
                    {request.message.match(/Type:\s*([^\n]+)/)?.[1] && (
                      <span className="detail-badge detail-type">
                        {request.message.match(/Type:\s*([^\n]+)/)[1].trim()}
                      </span>
                    )}
                    {request.message.match(/Preferred Date:\s*([^\n]+)/)?.[1] && (
                      <span className="detail-badge detail-date">
                        📅 {request.message.match(/Preferred Date:\s*([^\n]+)/)[1].trim()}
                      </span>
                    )}
                  </div>
                )}

                <div className="request-preview">
                  {/* Show only the main message, not the technical details */}
                  {(() => {
                    const mainMessage = request.message.split('--- COUNSELING DETAILS ---')[0].trim()
                    return mainMessage.length > 100
                      ? mainMessage.substring(0, 100) + '...'
                      : mainMessage
                  })()}
                </div>
                {request.attachments && request.attachments.length > 0 && (
                  <div className="request-attachments-indicator">
                    📎 {request.attachments.length} attachment{request.attachments.length > 1 ? 's' : ''}
                  </div>
                )}
              </div>

              <div className="request-card-actions">
                <button
                  onClick={() => handleViewMessage(request)}
                  className="admin-btn-sm admin-btn-secondary"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleSendToLeader(request.id)}
                  className="admin-btn-sm admin-btn-primary"
                >
                  Respond
                </button>
                {request.status === 'pending' && (
                  <button
                    onClick={() => handleUpdateStatus(request.id, 'read')}
                    className="admin-btn-sm admin-btn-success"
                  >
                    Mark Complete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )

  // Render counseling requests
  const renderCounselingRequests = () => (
    <div className="submission-requests-container">
      <div className="admin-content-header">
        <div>
          <h2>Counseling Requests</h2>
          <p>Manage pastoral counseling and spiritual guidance requests</p>
        </div>
        <div className="admin-stats-mini">
          <span className="admin-badge admin-badge-warning">
            {messagesByType.counseling.length} requests
          </span>
        </div>
      </div>

      <div className="requests-grid">
        {messagesByType.counseling.length === 0 ? (
          <div className="admin-empty-state">
            <svg className="admin-empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h3>No counseling requests</h3>
            <p>Counseling requests will appear here when submitted</p>
          </div>
        ) : (
          messagesByType.counseling.map((request) => (
            <div key={request.id} className="request-card">
              <div className="request-card-header">
                <div className="request-meta">
                  <h4>{request.subject}</h4>
                  <span className={`status-badge status-${request.status}`}>
                    {request.status}
                  </span>
                </div>
                <div className="request-timestamp">
                  {new Date(request.created_at).toLocaleDateString()}
                </div>
              </div>

              <div className="request-card-body">
                <div className="request-sender">
                  <strong>From:</strong> {request.sender_name}
                  {request.sender_email && <span> ({request.sender_email})</span>}
                </div>
                <div className="request-preview">
                  {request.message.length > 100
                    ? request.message.substring(0, 100) + '...'
                    : request.message
                  }
                </div>
              </div>

              <div className="request-card-actions">
                <button
                  onClick={() => handleViewMessage(request)}
                  className="admin-btn-sm admin-btn-secondary"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleSendToLeader(request.id)}
                  className="admin-btn-sm admin-btn-primary"
                >
                  Respond
                </button>
                {request.status === 'pending' && (
                  <button
                    onClick={() => handleUpdateStatus(request.id, 'read')}
                    className="admin-btn-sm admin-btn-success"
                  >
                    Mark Complete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )

  // Render department reports
  const renderDepartmentReports = () => (
    <div className="submission-requests-container">
      <div className="admin-content-header">
        <div>
          <h2>Department Reports</h2>
          <p>Manage ministry reports and department submissions</p>
        </div>
        <div className="admin-stats-mini">
          <span className="admin-badge admin-badge-success">
            {messagesByType.reports.length} reports
          </span>
        </div>
      </div>

      <div className="requests-grid">
        {messagesByType.reports.length === 0 ? (
          <div className="admin-empty-state">
            <svg className="admin-empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3>No department reports</h3>
            <p>Department reports will appear here when submitted</p>
          </div>
        ) : (
          messagesByType.reports.map((request) => (
            <div key={request.id} className="request-card">
              <div className="request-card-header">
                <div className="request-meta">
                  <h4>{request.subject}</h4>
                  <span className={`status-badge status-${request.status}`}>
                    {request.status}
                  </span>
                </div>
                <div className="request-timestamp">
                  {new Date(request.created_at).toLocaleDateString()}
                </div>
              </div>

              <div className="request-card-body">
                <div className="request-sender">
                  <strong>From:</strong> {request.sender_name}
                  {request.sender_email && <span> ({request.sender_email})</span>}
                </div>
                <div className="request-preview">
                  {request.message.length > 100
                    ? request.message.substring(0, 100) + '...'
                    : request.message
                  }
                </div>
              </div>

              <div className="request-card-actions">
                <button
                  onClick={() => handleViewMessage(request)}
                  className="admin-btn-sm admin-btn-secondary"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleSendToLeader(request.id)}
                  className="admin-btn-sm admin-btn-primary"
                >
                  Respond
                </button>
                {request.status === 'pending' && (
                  <button
                    onClick={() => handleUpdateStatus(request.id, 'read')}
                    className="admin-btn-sm admin-btn-success"
                  >
                    Mark Complete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )

  // Render event proposals
  const renderEventProposals = () => (
    <div className="submission-requests-container">
      <div className="admin-content-header">
        <div>
          <h2>Event Proposals</h2>
          <p>Manage event proposals and program suggestions</p>
        </div>
        <div className="admin-stats-mini">
          <span className="admin-badge admin-badge-info">
            {messagesByType.events.length} proposals
          </span>
        </div>
      </div>

      <div className="requests-grid">
        {messagesByType.events.length === 0 ? (
          <div className="admin-empty-state">
            <svg className="admin-empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-4 12H8m0 0V9a2 2 0 012-2h4a2 2 0 012 2v3" />
            </svg>
            <h3>No event proposals</h3>
            <p>Event proposals will appear here when submitted</p>
          </div>
        ) : (
          messagesByType.events.map((request) => (
            <div key={request.id} className="request-card">
              <div className="request-card-header">
                <div className="request-meta">
                  <h4>{request.subject}</h4>
                  <span className={`status-badge status-${request.status}`}>
                    {request.status}
                  </span>
                </div>
                <div className="request-timestamp">
                  {new Date(request.created_at).toLocaleDateString()}
                </div>
              </div>

              <div className="request-card-body">
                <div className="request-sender">
                  <strong>From:</strong> {request.sender_name}
                  {request.sender_email && <span> ({request.sender_email})</span>}
                </div>

                {/* Extract and display event details */}
                {request.message.includes('--- EVENT DETAILS ---') && (
                  <div className="submission-details">
                    {request.message.match(/Event Title:\s*([^\n]+)/)?.[1] && (
                      <span className="detail-badge detail-title">
                        📅 {request.message.match(/Event Title:\s*([^\n]+)/)[1].trim()}
                      </span>
                    )}
                    {request.message.match(/Proposed Date:\s*([^\n]+)/)?.[1] && (
                      <span className="detail-badge detail-date">
                        📅 {request.message.match(/Proposed Date:\s*([^\n]+)/)[1].trim()}
                      </span>
                    )}
                    {request.message.match(/Estimated Budget:\s*([^\n]+)/)?.[1] && (
                      <span className="detail-badge detail-budget">
                        💰 {request.message.match(/Estimated Budget:\s*([^\n]+)/)[1].trim()}
                      </span>
                    )}
                  </div>
                )}

                <div className="request-preview">
                  {/* Show only the main message, not the technical details */}
                  {(() => {
                    const mainMessage = request.message.split('--- EVENT DETAILS ---')[0].trim()
                    return mainMessage.length > 100
                      ? mainMessage.substring(0, 100) + '...'
                      : mainMessage
                  })()}
                </div>
                {request.attachments && request.attachments.length > 0 && (
                  <div className="request-attachments-indicator">
                    📎 {request.attachments.length} attachment{request.attachments.length > 1 ? 's' : ''}
                  </div>
                )}
              </div>

              <div className="request-card-actions">
                <button
                  onClick={() => handleViewMessage(request)}
                  className="admin-btn-sm admin-btn-secondary"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleSendToLeader(request.id)}
                  className="admin-btn-sm admin-btn-primary"
                >
                  Respond
                </button>
                {request.status === 'pending' && (
                  <button
                    onClick={() => handleUpdateStatus(request.id, 'read')}
                    className="admin-btn-sm admin-btn-success"
                  >
                    Mark Complete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )

  // Render maintenance requests
  const renderMaintenanceRequests = () => (
    <div className="submission-requests-container">
      <div className="admin-content-header">
        <div>
          <h2>Facility Issues</h2>
          <p>Manage facility maintenance and infrastructure issues</p>
        </div>
        <div className="admin-stats-mini">
          <span className="admin-badge admin-badge-info">
            {messagesByType.maintenance.length} issues
          </span>
        </div>
      </div>

      <div className="requests-grid">
        {messagesByType.maintenance.length === 0 ? (
          <div className="admin-empty-state">
            <svg className="admin-empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3>No facility issues</h3>
            <p>Facility maintenance requests will appear here when submitted</p>
          </div>
        ) : (
          messagesByType.maintenance.map((request) => (
            <div key={request.id} className="request-card">
              <div className="request-card-header">
                <div className="request-meta">
                  <h4>{request.subject}</h4>
                  <span className={`status-badge status-${request.status}`}>
                    {request.status}
                  </span>
                </div>
                <div className="request-timestamp">
                  {new Date(request.created_at).toLocaleDateString()}
                </div>
              </div>

              <div className="request-card-body">
                <div className="request-sender">
                  <strong>From:</strong> {request.sender_name}
                  {request.sender_email && <span> ({request.sender_email})</span>}
                </div>

                {/* Extract and display maintenance details */}
                {request.message.includes('--- MAINTENANCE DETAILS ---') && (
                  <div className="submission-details">
                    {request.message.match(/Location:\s*([^\n]+)/)?.[1] && (
                      <span className="detail-badge detail-location">
                        📍 {request.message.match(/Location:\s*([^\n]+)/)[1].trim()}
                      </span>
                    )}
                    {request.message.match(/Priority:\s*([^\n]+)/)?.[1] && (
                      <span className={`detail-badge detail-priority priority-${request.message.match(/Priority:\s*([^\n]+)/)[1].trim().toLowerCase()}`}>
                        {request.message.match(/Priority:\s*([^\n]+)/)[1].trim()}
                      </span>
                    )}
                  </div>
                )}

                <div className="request-preview">
                  {/* Show only the main message, not the technical details */}
                  {(() => {
                    const mainMessage = request.message.split('--- MAINTENANCE DETAILS ---')[0].trim()
                    return mainMessage.length > 100
                      ? mainMessage.substring(0, 100) + '...'
                      : mainMessage
                  })()}
                </div>
                {request.attachments && request.attachments.length > 0 && (
                  <div className="request-attachments-indicator">
                    📎 {request.attachments.length} attachment{request.attachments.length > 1 ? 's' : ''} (photos)
                  </div>
                )}
              </div>

              <div className="request-card-actions">
                <button
                  onClick={() => handleViewMessage(request)}
                  className="admin-btn-sm admin-btn-secondary"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleSendToLeader(request.id)}
                  className="admin-btn-sm admin-btn-primary"
                >
                  Respond
                </button>
                {request.status === 'pending' && (
                  <button
                    onClick={() => handleUpdateStatus(request.id, 'read')}
                    className="admin-btn-sm admin-btn-success"
                  >
                    Mark Complete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )

  // Render general inquiries
  const renderGeneralInquiries = () => (
    <div className="submission-requests-container">
      <div className="admin-content-header">
        <div>
          <h2>General Inquiries</h2>
          <p>Manage general questions and other communications</p>
        </div>
        <div className="admin-stats-mini">
          <span className="admin-badge admin-badge-gray">
            {messagesByType.general.length} inquiries
          </span>
        </div>
      </div>

      <div className="requests-grid">
        {messagesByType.general.length === 0 ? (
          <div className="admin-empty-state">
            <svg className="admin-empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3>No general inquiries</h3>
            <p>General inquiries will appear here when submitted</p>
          </div>
        ) : (
          messagesByType.general.map((request) => (
            <div key={request.id} className="request-card">
              <div className="request-card-header">
                <div className="request-meta">
                  <h4>{request.subject}</h4>
                  <span className={`status-badge status-${request.status}`}>
                    {request.status}
                  </span>
                </div>
                <div className="request-timestamp">
                  {new Date(request.created_at).toLocaleDateString()}
                </div>
              </div>

              <div className="request-card-body">
                <div className="request-sender">
                  <strong>From:</strong> {request.sender_name}
                  {request.sender_email && <span> ({request.sender_email})</span>}
                </div>
                <div className="request-preview">
                  {request.message.length > 100
                    ? request.message.substring(0, 100) + '...'
                    : request.message
                  }
                </div>
              </div>

              <div className="request-card-actions">
                <button
                  onClick={() => handleViewMessage(request)}
                  className="admin-btn-sm admin-btn-secondary"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleSendToLeader(request.id)}
                  className="admin-btn-sm admin-btn-primary"
                >
                  Respond
                </button>
                {request.status === 'pending' && (
                  <button
                    onClick={() => handleUpdateStatus(request.id, 'read')}
                    className="admin-btn-sm admin-btn-success"
                  >
                    Mark Complete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )

  const renderOverview = () => (
    <div className="communication-overview">
      <div className="admin-content-header">
        <div>
          <h2>Communication Hub Overview</h2>
          <p>Manage all church communications and submissions</p>
        </div>
      </div>

      {/* Submission Type Cards */}
      <div className="admin-stats-grid">
        {/* Visitation Requests */}
        <div
          className="clean-card submission-overview-card"
          style={{background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white', cursor: 'pointer'}}
          onClick={() => setActiveTab('visitation')}
        >
          <div className="admin-card-header">
            <div className="admin-card-icon">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4" />
              </svg>
            </div>
            <div>
              <h3>Visitation Requests</h3>
              <p className="admin-card-value">{messagesByType.visitation.length}</p>
            </div>
          </div>
          <div className="admin-card-content">
            <p style={{opacity: 0.9, fontSize: '0.9rem'}}>
              Hospital visits, home visits, and pastoral care requests
            </p>
          </div>
        </div>

        {/* Counseling Requests */}
        <div
          className="clean-card submission-overview-card"
          style={{background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: 'white', cursor: 'pointer'}}
          onClick={() => setActiveTab('counseling')}
        >
          <div className="admin-card-header">
            <div className="admin-card-icon">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h3>Counseling Requests</h3>
              <p className="admin-card-value">{messagesByType.counseling.length}</p>
            </div>
          </div>
          <div className="admin-card-content">
            <p style={{opacity: 0.9, fontSize: '0.9rem'}}>
              Pastoral counseling and spiritual guidance requests
            </p>
          </div>
        </div>

        {/* Department Reports */}
        <div
          className="clean-card submission-overview-card"
          style={{background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', color: 'white', cursor: 'pointer'}}
          onClick={() => setActiveTab('reports')}
        >
          <div className="admin-card-header">
            <div className="admin-card-icon">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3>Department Reports</h3>
              <p className="admin-card-value">{messagesByType.reports.length}</p>
            </div>
          </div>
          <div className="admin-card-content">
            <p style={{opacity: 0.9, fontSize: '0.9rem'}}>
              Ministry reports and department submissions
            </p>
          </div>
        </div>

        {/* Event Proposals */}
        <div
          className="clean-card submission-overview-card"
          style={{background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)', color: 'white', cursor: 'pointer'}}
          onClick={() => setActiveTab('events')}
        >
          <div className="admin-card-header">
            <div className="admin-card-icon">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-4 12H8m0 0V9a2 2 0 012-2h4a2 2 0 012 2v3" />
              </svg>
            </div>
            <div>
              <h3>Event Proposals</h3>
              <p className="admin-card-value">{messagesByType.events.length}</p>
            </div>
          </div>
          <div className="admin-card-content">
            <p style={{opacity: 0.9, fontSize: '0.9rem'}}>
              Event proposals and program suggestions
            </p>
          </div>
        </div>

        {/* Facility Issues */}
        <div
          className="clean-card submission-overview-card"
          style={{background: 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)', color: 'white', cursor: 'pointer'}}
          onClick={() => setActiveTab('maintenance')}
        >
          <div className="admin-card-header">
            <div className="admin-card-icon">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3>Facility Issues</h3>
              <p className="admin-card-value">{messagesByType.maintenance.length}</p>
            </div>
          </div>
          <div className="admin-card-content">
            <p style={{opacity: 0.9, fontSize: '0.9rem'}}>
              Maintenance requests and facility issues
            </p>
          </div>
        </div>

        {/* General Inquiries */}
        <div
          className="clean-card submission-overview-card"
          style={{background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)', color: 'white', cursor: 'pointer'}}
          onClick={() => setActiveTab('general')}
        >
          <div className="admin-card-header">
            <div className="admin-card-icon">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3>General Inquiries</h3>
              <p className="admin-card-value">{messagesByType.general.length}</p>
            </div>
          </div>
          <div className="admin-card-content">
            <p style={{opacity: 0.9, fontSize: '0.9rem'}}>
              General questions and other communications
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="clean-card">
          <div className="admin-card-header">
            <div className="admin-card-icon" style={{color: '#f59e0b'}}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3>Quick Actions</h3>
              <p className="admin-card-subtitle">Send messages instantly</p>
            </div>
          </div>
          <div className="admin-card-content">
            <div className="admin-quick-actions-grid">
              <button 
                className="admin-quick-action-btn"
                onClick={() => setActiveTab('send-message')}
              >
                <span>📱</span>
                <span>Send SMS</span>
              </button>
              <button 
                className="admin-quick-action-btn"
                onClick={() => setActiveTab('send-message')}
              >
                <span>📧</span>
                <span>Send Email</span>
              </button>
              <button 
                className="admin-quick-action-btn"
                onClick={() => setActiveTab('templates')}
              >
                <span>📝</span>
                <span>Use Template</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Messages */}
      <div className="clean-card" style={{marginTop: '2rem'}}>
        <div className="admin-card-header">
          <h3>Recent Messages</h3>
          <button 
            className="admin-btn-secondary"
            onClick={() => setActiveTab('history')}
          >
            View All
          </button>
        </div>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Subject</th>
                <th>Recipients</th>
                <th>Status</th>
                <th>Sent</th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody>
              {communicationData.recentMessages.map(message => (
                <tr key={message.id}>
                  <td>
                    <span className={`admin-badge ${message.type === 'SMS' ? 'admin-badge-success' : 'admin-badge-info'}`}>
                      {message.type}
                    </span>
                  </td>
                  <td>{message.subject}</td>
                  <td>{message.recipients}</td>
                  <td>
                    <span className="admin-badge admin-badge-success">
                      {message.status}
                    </span>
                  </td>
                  <td>{message.timestamp}</td>
                  <td>
                    {message.type === 'SMS' ? (
                      <span className="admin-performance-metric">
                        {message.deliveryRate}% delivered
                      </span>
                    ) : (
                      <span className="admin-performance-metric">
                        {message.openRate}% opened
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderMessages = () => (
    <div className="messages-management">
      {/* Header with Stats */}
      <div className="admin-stats-grid" style={{marginBottom: '2rem'}}>
        <div className="clean-card" style={{background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', color: 'white'}}>
          <div className="admin-card-header">
            <div className="admin-card-icon">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-5.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H1" />
              </svg>
            </div>
            <div>
              <h3>Total Messages</h3>
              <p className="admin-card-value">{messageStats.total_messages || 0}</p>
            </div>
          </div>
        </div>

        <div className="clean-card" style={{background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: 'white'}}>
          <div className="admin-card-header">
            <div className="admin-card-icon">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3>Pending</h3>
              <p className="admin-card-value">{messageStats.pending_messages || 0}</p>
            </div>
          </div>
        </div>

        <div className="clean-card" style={{background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white'}}>
          <div className="admin-card-header">
            <div className="admin-card-icon">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3>Sent</h3>
              <p className="admin-card-value">{messageStats.sent_messages || 0}</p>
            </div>
          </div>
        </div>

        <div className="clean-card" style={{background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', color: 'white'}}>
          <div className="admin-card-header">
            <div className="admin-card-icon">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3>Failed</h3>
              <p className="admin-card-value">{messageStats.failed_messages || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="clean-card" style={{marginBottom: '2rem'}}>
        <div className="admin-card-header">
          <h3>Filter Messages</h3>
          <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
            <select
              value={messageFilters.status}
              onChange={(e) => setMessageFilters(prev => ({...prev, status: e.target.value}))}
              className="admin-select"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="sent">Sent</option>
              <option value="failed">Failed</option>
              <option value="read">Read</option>
            </select>

            <select
              value={messageFilters.department}
              onChange={(e) => setMessageFilters(prev => ({...prev, department: e.target.value}))}
              className="admin-select"
            >
              <option value="all">All Departments</option>
              <option value="Youth Ministry">Youth Ministry</option>
              <option value="Women's Ministry">Women's Ministry</option>
              <option value="Men's Ministry">Men's Ministry</option>
              <option value="Children's Ministry">Children's Ministry</option>
              <option value="Music Ministry">Music Ministry</option>
            </select>

            <button
              className="admin-btn-primary"
              onClick={loadMessages}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Messages Table */}
      <div className="clean-card">
        <div className="admin-card-header">
          <h3>Contact Form Messages</h3>
          <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
            <span className="admin-badge admin-badge-success">Gmail Ready</span>
            <button
              className="admin-btn-secondary"
              onClick={loadMessages}
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>From</th>
                <th>To</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{textAlign: 'center', padding: '2rem', color: '#666'}}>
                    No messages found. Messages from contact forms will appear here.
                  </td>
                </tr>
              ) : (
                messages.map(message => (
                  <tr key={message.id}>
                    <td>
                      {new Date(message.created_at).toLocaleDateString('en-KE', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td>
                      <div>
                        <strong>{message.sender_name}</strong>
                        <br />
                        <small style={{color: '#666'}}>{message.sender_email}</small>
                      </div>
                    </td>
                    <td>
                      <div>
                        <strong>{message.recipient_name}</strong>
                        <br />
                        <small style={{color: '#666'}}>{message.recipient_role}</small>
                      </div>
                    </td>
                    <td>
                      <div style={{maxWidth: '200px'}}>
                        <strong>{message.subject}</strong>
                        <br />
                        <small style={{color: '#666'}}>
                          {message.message.length > 50
                            ? message.message.substring(0, 50) + '...'
                            : message.message}
                        </small>
                      </div>
                    </td>
                    <td>
                      <div style={{display: 'flex', flexDirection: 'column', gap: '0.25rem'}}>
                        <span className={`admin-badge ${
                          message.status === 'sent' ? 'admin-badge-success' :
                          message.status === 'pending' ? 'admin-badge-warning' :
                          message.status === 'failed' ? 'admin-badge-danger' :
                          'admin-badge-info'
                        }`}>
                          {message.status === 'sent' ? '✅ Sent to Leader' :
                           message.status === 'pending' ? '⏳ Not Sent to Leader' :
                           message.status === 'failed' ? '❌ Failed to Send' :
                           message.status === 'read' ? '👁️ Read by Admin' :
                           message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                        </span>
                        {message.email_sent_at && (
                          <small style={{color: '#666', fontSize: '0.75rem'}}>
                            Sent: {new Date(message.email_sent_at).toLocaleString('en-KE', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </small>
                        )}
                        {message.email_error && (
                          <small style={{color: '#dc2626', fontSize: '0.75rem'}}>
                            Error: {message.email_error.substring(0, 50)}...
                          </small>
                        )}
                      </div>
                    </td>
                    <td>
                      <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                        {/* Send via Gmail Button */}
                        {(message.status === 'pending' || message.status === 'failed') && (
                          <button
                            className="admin-btn-sm admin-btn-primary"
                            onClick={() => handleSendToLeader(message.id)}
                            disabled={loading}
                            title="Open Gmail with pre-filled email"
                            style={{
                              background: '#ea4335',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              padding: '4px 8px',
                              fontSize: '12px',
                              cursor: loading ? 'not-allowed' : 'pointer',
                              opacity: loading ? 0.6 : 1
                            }}
                          >
                            {loading ? '⏳' : '📧 Gmail'}
                          </button>
                        )}

                        {/* Copy Email Button */}
                        {(message.status === 'pending' || message.status === 'failed') && (
                          <button
                            className="admin-btn-sm admin-btn-secondary"
                            onClick={() => handleCopyEmail(message)}
                            title="Copy email content to clipboard"
                            style={{
                              background: '#6b7280',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              padding: '4px 8px',
                              fontSize: '12px',
                              cursor: 'pointer'
                            }}
                          >
                            📋 Copy
                          </button>
                        )}

                        {/* Mark as Read Button */}
                        {message.status !== 'read' && (
                          <button
                            className="admin-btn-sm admin-btn-secondary"
                            onClick={() => handleMarkAsRead(message.id)}
                            title="Mark as read"
                          >
                            👁️
                          </button>
                        )}

                        {/* View Full Message Button */}
                        <button
                          className="admin-btn-sm admin-btn-info"
                          onClick={() => {
                            alert(`Full Message:\n\nFrom: ${message.sender_name} (${message.sender_email})\nPhone: ${message.sender_phone || 'Not provided'}\nTo: ${message.recipient_name} (${message.recipient_email})\nSubject: ${message.subject}\n\nMessage:\n${message.message}\n\nStatus: ${message.status}\nCreated: ${new Date(message.created_at).toLocaleString()}${message.email_sent_at ? `\nSent: ${new Date(message.email_sent_at).toLocaleString()}` : ''}${message.email_error ? `\nError: ${message.email_error}` : ''}`)
                          }}
                          title="View full message details"
                        >
                          👁️‍🗨️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderSendMessage = () => {
    const [messageForm, setMessageForm] = useState({
      type: 'SMS',
      recipients: 'all',
      customRecipients: '',
      subject: '',
      message: '',
      template: '',
      scheduleType: 'now',
      scheduleDate: '',
      scheduleTime: ''
    })

    const handleFormChange = (field, value) => {
      setMessageForm(prev => ({ ...prev, [field]: value }))
    }

    const handleSendMessage = async () => {
      try {
        setLoading(true)

        // Validate form
        if (!messageForm.message.trim()) {
          alert('Please enter a message')
          return
        }

        let recipients = []

        // Determine recipients
        if (messageForm.recipients === 'custom') {
          if (!messageForm.customRecipients.trim()) {
            alert('Please enter recipient phone numbers')
            return
          }
          recipients = messageForm.customRecipients
            .split(',')
            .map(num => num.trim())
            .filter(num => num.length > 0)
        } else {
          // Use predefined groups
          const result = await sendToGroup(messageForm.recipients, messageForm.message, {
            allowLongMessages: true
          })

          if (result.success) {
            alert(result.message)
            // Reset form
            setMessageForm({
              type: 'SMS',
              recipients: 'all',
              customRecipients: '',
              subject: '',
              message: '',
              template: '',
              scheduleType: 'now',
              scheduleDate: '',
              scheduleTime: ''
            })
          } else {
            alert(`Failed to send message: ${result.message}`)
          }
          return
        }

        // Send to custom recipients
        if (messageForm.type === 'SMS') {
          const result = await sendSMS(recipients, messageForm.message, {
            allowLongMessages: true
          })

          if (result.success) {
            alert(result.message)
            // Reset form
            setMessageForm({
              type: 'SMS',
              recipients: 'all',
              customRecipients: '',
              subject: '',
              message: '',
              template: '',
              scheduleType: 'now',
              scheduleDate: '',
              scheduleTime: ''
            })
          } else {
            alert(`Failed to send SMS: ${result.message}`)
          }
        } else {
          // Email functionality would go here
          alert('Email sending functionality will be implemented')
        }

      } catch (error) {
        console.error('Send message error:', error)
        alert('Failed to send message. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    return (
      <div className="send-message-container">
        <div className="clean-card">
          <div className="admin-card-header">
            <h3>Compose Message</h3>
            <p className="admin-card-subtitle">Send SMS or Email to your church members</p>
          </div>

          <div className="admin-form-grid">
            {/* Message Type */}
            <div className="admin-form-group">
              <label className="admin-form-label">Message Type</label>
              <div className="admin-radio-group">
                <label className="admin-radio-option">
                  <input
                    type="radio"
                    name="messageType"
                    value="SMS"
                    checked={messageForm.type === 'SMS'}
                    onChange={(e) => handleFormChange('type', e.target.value)}
                  />
                  <span>📱 SMS</span>
                </label>
                <label className="admin-radio-option">
                  <input
                    type="radio"
                    name="messageType"
                    value="Email"
                    checked={messageForm.type === 'Email'}
                    onChange={(e) => handleFormChange('type', e.target.value)}
                  />
                  <span>📧 Email</span>
                </label>
              </div>
            </div>

            {/* Recipients */}
            <div className="admin-form-group">
              <label className="admin-form-label">Recipients</label>
              <select
                className="admin-form-input"
                value={messageForm.recipients}
                onChange={(e) => handleFormChange('recipients', e.target.value)}
              >
                <option value="all">All Members</option>
                <option value="youth">Youth Ministry</option>
                <option value="elders">Elders</option>
                <option value="deacons">Deacons</option>
                <option value="choir">Choir Members</option>
                <option value="custom">Custom List</option>
              </select>
            </div>

            {/* Custom Recipients */}
            {messageForm.recipients === 'custom' && (
              <div className="admin-form-group admin-form-group-full">
                <label className="admin-form-label">Phone Numbers / Email Addresses</label>
                <textarea
                  className="admin-form-textarea"
                  placeholder="Enter phone numbers or email addresses separated by commas"
                  value={messageForm.customRecipients}
                  onChange={(e) => handleFormChange('customRecipients', e.target.value)}
                  rows={3}
                />
              </div>
            )}

            {/* Subject (for Email) */}
            {messageForm.type === 'Email' && (
              <div className="admin-form-group admin-form-group-full">
                <label className="admin-form-label">Subject</label>
                <input
                  type="text"
                  className="admin-form-input"
                  placeholder="Enter email subject"
                  value={messageForm.subject}
                  onChange={(e) => handleFormChange('subject', e.target.value)}
                />
              </div>
            )}

            {/* Template Selection */}
            <div className="admin-form-group admin-form-group-full">
              <label className="admin-form-label">Use Template (Optional)</label>
              <select
                className="admin-form-input"
                value={messageForm.template}
                onChange={(e) => handleFormChange('template', e.target.value)}
              >
                <option value="">Select a template...</option>
                {communicationData.templates
                  .filter(t => t.type === messageForm.type)
                  .map(template => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Message Content */}
            <div className="admin-form-group admin-form-group-full">
              <label className="admin-form-label">
                Message Content
                {messageForm.type === 'SMS' && (
                  <span className="admin-form-hint">
                    (160 characters recommended for single SMS)
                  </span>
                )}
              </label>
              <textarea
                className="admin-form-textarea"
                placeholder={messageForm.type === 'SMS'
                  ? "Enter your SMS message..."
                  : "Enter your email content..."
                }
                value={messageForm.message}
                onChange={(e) => handleFormChange('message', e.target.value)}
                rows={messageForm.type === 'SMS' ? 4 : 8}
              />
              {messageForm.type === 'SMS' && (
                <div className="admin-form-hint">
                  {(() => {
                    const messageInfo = getMessageInfo(messageForm.message)
                    return (
                      <div>
                        <span>Characters: {messageInfo.characterCount}</span>
                        <span style={{marginLeft: '1rem'}}>SMS Count: {messageInfo.smsCount}</span>
                        {messageInfo.isLongMessage && (
                          <span style={{marginLeft: '1rem', color: '#f59e0b'}}>
                            ⚠️ Long message (will be sent as {messageInfo.smsCount} SMS)
                          </span>
                        )}
                      </div>
                    )
                  })()}
                </div>
              )}
            </div>

            {/* Scheduling */}
            <div className="admin-form-group">
              <label className="admin-form-label">Send Time</label>
              <div className="admin-radio-group">
                <label className="admin-radio-option">
                  <input
                    type="radio"
                    name="scheduleType"
                    value="now"
                    checked={messageForm.scheduleType === 'now'}
                    onChange={(e) => handleFormChange('scheduleType', e.target.value)}
                  />
                  <span>Send Now</span>
                </label>
                <label className="admin-radio-option">
                  <input
                    type="radio"
                    name="scheduleType"
                    value="schedule"
                    checked={messageForm.scheduleType === 'schedule'}
                    onChange={(e) => handleFormChange('scheduleType', e.target.value)}
                  />
                  <span>Schedule</span>
                </label>
              </div>
            </div>

            {/* Schedule Date/Time */}
            {messageForm.scheduleType === 'schedule' && (
              <>
                <div className="admin-form-group">
                  <label className="admin-form-label">Date</label>
                  <input
                    type="date"
                    className="admin-form-input"
                    value={messageForm.scheduleDate}
                    onChange={(e) => handleFormChange('scheduleDate', e.target.value)}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Time</label>
                  <input
                    type="time"
                    className="admin-form-input"
                    value={messageForm.scheduleTime}
                    onChange={(e) => handleFormChange('scheduleTime', e.target.value)}
                  />
                </div>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="admin-form-actions">
            <button className="admin-btn-secondary">
              Save as Draft
            </button>
            <button
              className="admin-btn-primary"
              onClick={handleSendMessage}
              disabled={loading || smsLoading}
            >
              {loading || smsLoading
                ? 'Sending...'
                : (messageForm.scheduleType === 'now' ? 'Send Message' : 'Schedule Message')
              }
            </button>
          </div>
        </div>
      </div>
    )
  }

  const renderTemplates = () => {
    const [showTemplateForm, setShowTemplateForm] = useState(false)
    const [editingTemplate, setEditingTemplate] = useState(null)
    const [templateForm, setTemplateForm] = useState({
      name: '',
      type: 'SMS',
      content: '',
      category: 'general'
    })

    const handleTemplateFormChange = (field, value) => {
      setTemplateForm(prev => ({ ...prev, [field]: value }))
    }

    const handleSaveTemplate = () => {
      // TODO: Implement template saving
      alert('Template saving functionality will be implemented')
      setShowTemplateForm(false)
      setEditingTemplate(null)
    }

    const handleEditTemplate = (template) => {
      setTemplateForm({
        name: template.name,
        type: template.type,
        content: template.content,
        category: 'general'
      })
      setEditingTemplate(template)
      setShowTemplateForm(true)
    }

    const handleDeleteTemplate = (templateId) => {
      if (confirm('Are you sure you want to delete this template?')) {
        // TODO: Implement template deletion
        alert('Template deletion functionality will be implemented')
      }
    }

    return (
      <div className="templates-container">
        {/* Header */}
        <div className="clean-card">
          <div className="admin-card-header">
            <div>
              <h3>Message Templates</h3>
              <p className="admin-card-subtitle">Create and manage reusable message templates</p>
            </div>
            <button
              className="admin-btn-primary"
              onClick={() => {
                setTemplateForm({ name: '', type: 'SMS', content: '', category: 'general' })
                setEditingTemplate(null)
                setShowTemplateForm(true)
              }}
            >
              <svg className="admin-btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Template
            </button>
          </div>

          {/* Template Form */}
          {showTemplateForm && (
            <div className="admin-form-section">
              <h4>{editingTemplate ? 'Edit Template' : 'Create New Template'}</h4>
              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label className="admin-form-label">Template Name</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    placeholder="e.g., Service Reminder"
                    value={templateForm.name}
                    onChange={(e) => handleTemplateFormChange('name', e.target.value)}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Type</label>
                  <select
                    className="admin-form-input"
                    value={templateForm.type}
                    onChange={(e) => handleTemplateFormChange('type', e.target.value)}
                  >
                    <option value="SMS">SMS</option>
                    <option value="Email">Email</option>
                  </select>
                </div>
                <div className="admin-form-group admin-form-group-full">
                  <label className="admin-form-label">
                    Template Content
                    <span className="admin-form-hint">
                      Use {'{name}'} for member name, {'{date}'} for dates, {'{event_name}'} for events
                    </span>
                  </label>
                  <textarea
                    className="admin-form-textarea"
                    placeholder="Enter your template content with placeholders..."
                    value={templateForm.content}
                    onChange={(e) => handleTemplateFormChange('content', e.target.value)}
                    rows={6}
                  />
                </div>
              </div>
              <div className="admin-form-actions">
                <button
                  className="admin-btn-secondary"
                  onClick={() => setShowTemplateForm(false)}
                >
                  Cancel
                </button>
                <button
                  className="admin-btn-primary"
                  onClick={handleSaveTemplate}
                >
                  {editingTemplate ? 'Update Template' : 'Save Template'}
                </button>
              </div>
            </div>
          )}

          {/* Templates List */}
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Content Preview</th>
                  <th>Last Used</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
                    <div>
                      <svg style={{ width: '3rem', height: '3rem', margin: '0 auto 1rem', opacity: 0.5 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem', fontWeight: '600' }}>Message Templates</h3>
                      <p style={{ margin: 0, fontSize: '0.9rem' }}>Template management will be available in a future update</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  const renderHistory = () => {
    const [historyFilter, setHistoryFilter] = useState('all')
    const [searchTerm, setSearchTerm] = useState('')
    const [dateRange, setDateRange] = useState('all')

    // Use real messages from database
    const allMessages = messages.map(msg => ({
      id: msg.id,
      type: 'Email', // All submissions are currently email-based
      subject: msg.subject,
      recipients: 1,
      status: msg.status === 'sent' ? 'Sent' : msg.status === 'pending' ? 'Pending' : 'Failed',
      timestamp: new Date(msg.created_at).toLocaleString('en-KE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      sender: msg.sender_name,
      recipient: msg.recipient_name,
      department: msg.department
    }))

    const filteredMessages = allMessages.filter(message => {
      const matchesType = historyFilter === 'all' || message.type === historyFilter
      const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           message.sender?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           message.recipient?.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesType && matchesSearch
    })

    return (
      <div className="history-container">
        <div className="clean-card">
          <div className="admin-card-header">
            <div>
              <h3>Message History</h3>
              <p className="admin-card-subtitle">View all sent messages and their performance</p>
            </div>
            <div className="admin-header-actions">
              <button className="admin-btn-secondary">
                <svg className="admin-btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="admin-filters">
            <div className="admin-filter-group">
              <label className="admin-filter-label">Type</label>
              <select
                className="admin-filter-select"
                value={historyFilter}
                onChange={(e) => setHistoryFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="SMS">SMS Only</option>
                <option value="Email">Email Only</option>
              </select>
            </div>
            <div className="admin-filter-group">
              <label className="admin-filter-label">Date Range</label>
              <select
                className="admin-filter-select"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
              </select>
            </div>
            <div className="admin-filter-group admin-filter-search">
              <label className="admin-filter-label">Search</label>
              <input
                type="text"
                className="admin-filter-input"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Messages Table */}
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Subject</th>
                  <th>Recipients</th>
                  <th>Status</th>
                  <th>Sent Date</th>
                  <th>Performance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMessages.map(message => (
                  <tr key={message.id}>
                    <td>
                      <span className={`admin-badge ${message.type === 'SMS' ? 'admin-badge-success' : 'admin-badge-info'}`}>
                        {message.type}
                      </span>
                    </td>
                    <td>
                      <div className="admin-message-subject">
                        {message.subject}
                      </div>
                    </td>
                    <td>
                      <div className="admin-recipient-count">
                        {message.recipients} {message.recipients === 1 ? 'recipient' : 'recipients'}
                      </div>
                    </td>
                    <td>
                      <span className="admin-badge admin-badge-success">
                        {message.status}
                      </span>
                    </td>
                    <td>{message.timestamp}</td>
                    <td>
                      {message.type === 'SMS' ? (
                        <div className="admin-performance-metric">
                          <span className="admin-metric-value">{message.deliveryRate}%</span>
                          <span className="admin-metric-label">delivered</span>
                        </div>
                      ) : (
                        <div className="admin-performance-metric">
                          <span className="admin-metric-value">{message.openRate}%</span>
                          <span className="admin-metric-label">opened</span>
                        </div>
                      )}
                    </td>
                    <td>
                      <div className="admin-action-buttons">
                        <button
                          className="admin-btn-icon admin-btn-view"
                          title="View details"
                        >
                          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button
                          className="admin-btn-icon admin-btn-resend"
                          title="Resend message"
                        >
                          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="admin-pagination">
            <div className="admin-pagination-info">
              Showing {filteredMessages.length} of {allMessages.length} messages
            </div>
            <div className="admin-pagination-controls">
              <button className="admin-pagination-btn" disabled>Previous</button>
              <span className="admin-pagination-current">1</span>
              <button className="admin-pagination-btn" disabled>Next</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderSettings = () => {
    const [settings, setSettings] = useState({
      sms: {
        provider: 'africas_talking',
        apiKey: '',
        senderId: 'THIKA_SDA',
        enabled: true
      },
      email: {
        smtpHost: 'smtp.gmail.com',
        smtpPort: '587',
        username: '',
        password: '',
        fromName: 'Thika Main SDA Church',
        fromEmail: '',
        enabled: true
      },
      notifications: {
        paymentConfirmations: true,
        eventReminders: true,
        birthdayWishes: true,
        attendanceFollowup: false
      }
    })

    const handleSettingChange = (section, field, value) => {
      setSettings(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }))
    }

    const handleSaveSettings = () => {
      // TODO: Implement settings saving
      alert('Settings saving functionality will be implemented')
    }

    const testSMSConnection = async () => {
      try {
        setLoading(true)
        const result = await testConnection()

        if (result.success) {
          alert(`✅ ${result.message}`)
        } else {
          alert(`❌ ${result.message}`)
        }
      } catch (error) {
        alert(`❌ Connection test failed: ${error.message}`)
      } finally {
        setLoading(false)
      }
    }

    const testEmailConnection = () => {
      // TODO: Implement email connection testing
      alert('Email connection test will be implemented')
    }

    return (
      <div className="settings-container">
        {/* SMS Settings */}
        <div className="clean-card">
          <div className="admin-card-header">
            <div>
              <h3>SMS Configuration</h3>
              <p className="admin-card-subtitle">Configure SMS service provider and settings</p>
            </div>
            <div className="admin-toggle-switch">
              <input
                type="checkbox"
                id="sms-enabled"
                checked={settings.sms.enabled}
                onChange={(e) => handleSettingChange('sms', 'enabled', e.target.checked)}
              />
              <label htmlFor="sms-enabled">Enable SMS</label>
            </div>
          </div>

          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label className="admin-form-label">SMS Provider</label>
              <select
                className="admin-form-input"
                value={settings.sms.provider}
                onChange={(e) => handleSettingChange('sms', 'provider', e.target.value)}
                disabled={!settings.sms.enabled}
              >
                <option value="africas_talking">Africa's Talking</option>
                <option value="twilio">Twilio</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Sender ID</label>
              <input
                type="text"
                className="admin-form-input"
                placeholder="THIKA_SDA"
                value={settings.sms.senderId}
                onChange={(e) => handleSettingChange('sms', 'senderId', e.target.value)}
                disabled={!settings.sms.enabled}
              />
            </div>
            <div className="admin-form-group admin-form-group-full">
              <label className="admin-form-label">API Key</label>
              <input
                type="password"
                className="admin-form-input"
                placeholder="Enter your SMS API key"
                value={settings.sms.apiKey}
                onChange={(e) => handleSettingChange('sms', 'apiKey', e.target.value)}
                disabled={!settings.sms.enabled}
              />
            </div>
          </div>

          <div className="admin-form-actions">
            <button
              className="admin-btn-secondary"
              onClick={testSMSConnection}
              disabled={!settings.sms.enabled || loading}
            >
              {loading ? 'Testing...' : 'Test Connection'}
            </button>
          </div>
        </div>

        {/* Email Settings */}
        <div className="clean-card">
          <div className="admin-card-header">
            <div>
              <h3>Email Configuration</h3>
              <p className="admin-card-subtitle">Configure SMTP settings for email delivery</p>
            </div>
            <div className="admin-toggle-switch">
              <input
                type="checkbox"
                id="email-enabled"
                checked={settings.email.enabled}
                onChange={(e) => handleSettingChange('email', 'enabled', e.target.checked)}
              />
              <label htmlFor="email-enabled">Enable Email</label>
            </div>
          </div>

          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label className="admin-form-label">SMTP Host</label>
              <input
                type="text"
                className="admin-form-input"
                placeholder="smtp.gmail.com"
                value={settings.email.smtpHost}
                onChange={(e) => handleSettingChange('email', 'smtpHost', e.target.value)}
                disabled={!settings.email.enabled}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">SMTP Port</label>
              <input
                type="number"
                className="admin-form-input"
                placeholder="587"
                value={settings.email.smtpPort}
                onChange={(e) => handleSettingChange('email', 'smtpPort', e.target.value)}
                disabled={!settings.email.enabled}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Username</label>
              <input
                type="email"
                className="admin-form-input"
                placeholder="your-email@gmail.com"
                value={settings.email.username}
                onChange={(e) => handleSettingChange('email', 'username', e.target.value)}
                disabled={!settings.email.enabled}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Password</label>
              <input
                type="password"
                className="admin-form-input"
                placeholder="App password"
                value={settings.email.password}
                onChange={(e) => handleSettingChange('email', 'password', e.target.value)}
                disabled={!settings.email.enabled}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">From Name</label>
              <input
                type="text"
                className="admin-form-input"
                placeholder="Thika Main SDA Church"
                value={settings.email.fromName}
                onChange={(e) => handleSettingChange('email', 'fromName', e.target.value)}
                disabled={!settings.email.enabled}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">From Email</label>
              <input
                type="email"
                className="admin-form-input"
                placeholder="noreply@thikamainsdachurch.org"
                value={settings.email.fromEmail}
                onChange={(e) => handleSettingChange('email', 'fromEmail', e.target.value)}
                disabled={!settings.email.enabled}
              />
            </div>
          </div>

          <div className="admin-form-actions">
            <button
              className="admin-btn-secondary"
              onClick={testEmailConnection}
              disabled={!settings.email.enabled || loading}
            >
              {loading ? 'Testing...' : 'Test Connection'}
            </button>
          </div>
        </div>

        {/* Automated Notifications */}
        <div className="clean-card">
          <div className="admin-card-header">
            <h3>Automated Notifications</h3>
            <p className="admin-card-subtitle">Configure automatic message triggers</p>
          </div>

          <div className="admin-notification-settings">
            <div className="admin-notification-item">
              <div className="admin-notification-info">
                <h4>Payment Confirmations</h4>
                <p>Send SMS confirmation when M-Pesa payments are received</p>
              </div>
              <div className="admin-toggle-switch">
                <input
                  type="checkbox"
                  id="payment-confirmations"
                  checked={settings.notifications.paymentConfirmations}
                  onChange={(e) => handleSettingChange('notifications', 'paymentConfirmations', e.target.checked)}
                />
                <label htmlFor="payment-confirmations">Enable</label>
              </div>
            </div>

            <div className="admin-notification-item">
              <div className="admin-notification-info">
                <h4>Event Reminders</h4>
                <p>Send reminders 24 hours before church events</p>
              </div>
              <div className="admin-toggle-switch">
                <input
                  type="checkbox"
                  id="event-reminders"
                  checked={settings.notifications.eventReminders}
                  onChange={(e) => handleSettingChange('notifications', 'eventReminders', e.target.checked)}
                />
                <label htmlFor="event-reminders">Enable</label>
              </div>
            </div>

            <div className="admin-notification-item">
              <div className="admin-notification-info">
                <h4>Birthday Wishes</h4>
                <p>Send birthday messages to members on their special day</p>
              </div>
              <div className="admin-toggle-switch">
                <input
                  type="checkbox"
                  id="birthday-wishes"
                  checked={settings.notifications.birthdayWishes}
                  onChange={(e) => handleSettingChange('notifications', 'birthdayWishes', e.target.checked)}
                />
                <label htmlFor="birthday-wishes">Enable</label>
              </div>
            </div>

            <div className="admin-notification-item">
              <div className="admin-notification-info">
                <h4>Attendance Follow-up</h4>
                <p>Send messages to members who missed recent services</p>
              </div>
              <div className="admin-toggle-switch">
                <input
                  type="checkbox"
                  id="attendance-followup"
                  checked={settings.notifications.attendanceFollowup}
                  onChange={(e) => handleSettingChange('notifications', 'attendanceFollowup', e.target.checked)}
                />
                <label htmlFor="attendance-followup">Enable</label>
              </div>
            </div>
          </div>
        </div>

        {/* Save Settings */}
        <div className="admin-form-actions" style={{marginTop: '2rem'}}>
          <button
            className="admin-btn-primary"
            onClick={handleSaveSettings}
          >
            Save All Settings
          </button>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview()
      case 'visitation':
        return renderVisitationRequests()
      case 'counseling':
        return renderCounselingRequests()
      case 'reports':
        return renderDepartmentReports()
      case 'events':
        return renderEventProposals()
      case 'maintenance':
        return renderMaintenanceRequests()
      case 'general':
        return renderGeneralInquiries()
      case 'templates':
        return renderTemplates()
      default:
        return renderOverview()
    }
  }

  return (
    <div className="admin-content-management">
      {/* Header */}
      <div className="admin-content-header">
        <div>
          <h1>Communication Hub</h1>
          <p>Manage SMS, email, and messaging for your church community</p>
        </div>
        <button
          className="admin-btn-primary"
          onClick={() => setActiveTab('send-message')}
        >
          <svg className="admin-btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Send Message
        </button>
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

      {/* Message Detail Modal */}
      {renderMessageModal()}
    </div>
  )
}

export default CommunicationHub
