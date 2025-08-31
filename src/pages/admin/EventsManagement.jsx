import React, { useState, useEffect } from 'react'
import { supabase } from '../../services/supabaseClient'
import { useAuth } from '../../hooks/useAuth'

const EventsManagement = () => {
  const { user } = useAuth()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    location: '',
    event_type: '',
    max_attendees: '',
    cost: '',
    requires_registration: false,
    is_published: false
  })

  // Fetch events
  const fetchEvents = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('start_date', { ascending: false })

      if (error) throw error
      setEvents(data || [])
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const eventData = {
        ...formData,
        max_attendees: formData.max_attendees ? parseInt(formData.max_attendees) : null,
        cost: formData.cost ? parseFloat(formData.cost) : 0,
        created_by: user.id
      }

      if (editingEvent) {
        // Update existing event
        const { error } = await supabase
          .from('events')
          .update(eventData)
          .eq('id', editingEvent.id)

        if (error) throw error
      } else {
        // Create new event
        const { error } = await supabase
          .from('events')
          .insert([eventData])

        if (error) throw error
      }

      // Reset form and refresh data
      setFormData({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        location: '',
        event_type: '',
        max_attendees: '',
        cost: '',
        requires_registration: false,
        is_published: false
      })
      setShowForm(false)
      setEditingEvent(null)
      fetchEvents()
    } catch (error) {
      console.error('Error saving event:', error)
      alert('Error saving event. Please try again.')
    }
  }

  // Handle edit
  const handleEdit = (event) => {
    setEditingEvent(event)
    setFormData({
      title: event.title || '',
      description: event.description || '',
      start_date: event.start_date ? new Date(event.start_date).toISOString().slice(0, 16) : '',
      end_date: event.end_date ? new Date(event.end_date).toISOString().slice(0, 16) : '',
      location: event.location || '',
      event_type: event.event_type || '',
      max_attendees: event.max_attendees || '',
      cost: event.cost || '',
      requires_registration: event.requires_registration || false,
      is_published: event.is_published || false
    })
    setShowForm(true)
  }

  // Handle delete
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this event?')) return

    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchEvents()
    } catch (error) {
      console.error('Error deleting event:', error)
      alert('Error deleting event. Please try again.')
    }
  }

  // Toggle publish status
  const togglePublish = async (event) => {
    try {
      const { error } = await supabase
        .from('events')
        .update({ is_published: !event.is_published })
        .eq('id', event.id)

      if (error) throw error
      fetchEvents()
    } catch (error) {
      console.error('Error updating event:', error)
    }
  }

  if (loading) {
    return (
      <div className="admin-loading-container">
        <div className="admin-loading-spinner"></div>
        <p>Loading events...</p>
      </div>
    )
  }

  return (
    <div className="admin-content-management">
      {/* Header */}
      <div className="admin-content-header">
        <div>
          <h1>Events Management</h1>
          <p>Manage church events, meetings, and special programs</p>
        </div>
        <button
          onClick={() => {
            setShowForm(true)
            setEditingEvent(null)
            setFormData({
              title: '',
              description: '',
              start_date: '',
              end_date: '',
              location: '',
              event_type: '',
              max_attendees: '',
              cost: '',
              requires_registration: false,
              is_published: false
            })
          }}
          className="admin-btn-primary"
        >
          <svg className="admin-btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Event
        </button>
      </div>

      {/* Event Form Modal */}
      {showForm && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2>{editingEvent ? 'Edit Event' : 'Add New Event'}</h2>
              <button
                onClick={() => {
                  setShowForm(false)
                  setEditingEvent(null)
                }}
                className="admin-modal-close"
              >
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="admin-modal-content">
              <form onSubmit={handleSubmit} className="admin-form">
                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      required
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Event Type</label>
                    <select
                      value={formData.event_type}
                      onChange={(e) => setFormData({...formData, event_type: e.target.value})}
                      className="admin-form-select"
                    >
                      <option value="">Select type</option>
                      <option value="worship_service">Worship Service</option>
                      <option value="prayer_meeting">Prayer Meeting</option>
                      <option value="bible_study">Bible Study</option>
                      <option value="youth_meeting">Youth Meeting</option>
                      <option value="fellowship">Fellowship</option>
                      <option value="outreach">Outreach</option>
                      <option value="conference">Conference</option>
                      <option value="special_event">Special Event</option>
                    </select>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={4}
                    className="admin-form-textarea"
                  />
                </div>

                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>Start Date & Time *</label>
                    <input
                      type="datetime-local"
                      value={formData.start_date}
                      onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                      required
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>End Date & Time</label>
                    <input
                      type="datetime-local"
                      value={formData.end_date}
                      onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                      className="admin-form-input"
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="e.g., Main Sanctuary, Fellowship Hall"
                    className="admin-form-input"
                  />
                </div>

                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>Max Attendees</label>
                    <input
                      type="number"
                      value={formData.max_attendees}
                      onChange={(e) => setFormData({...formData, max_attendees: e.target.value})}
                      min="1"
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Cost (KSH)</label>
                    <input
                      type="number"
                      value={formData.cost}
                      onChange={(e) => setFormData({...formData, cost: e.target.value})}
                      min="0"
                      step="0.01"
                      className="admin-form-input"
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.requires_registration}
                      onChange={(e) => setFormData({...formData, requires_registration: e.target.checked})}
                      className="admin-checkbox"
                    />
                    <span>Requires registration</span>
                  </label>
                </div>

                <div className="admin-form-group">
                  <label className="admin-checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.is_published}
                      onChange={(e) => setFormData({...formData, is_published: e.target.checked})}
                      className="admin-checkbox"
                    />
                    <span>Publish immediately</span>
                  </label>
                </div>

                <div className="admin-form-actions">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false)
                      setEditingEvent(null)
                    }}
                    className="admin-btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="admin-btn-primary">
                    {editingEvent ? 'Update Event' : 'Create Event'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Events List */}
      <div className="admin-content-list">
        {events.length === 0 ? (
          <div className="admin-empty-state">
            <svg className="admin-empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10m6-10v10m-6-4h6" />
            </svg>
            <h3>No events yet</h3>
            <p>Start by adding your first event</p>
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Date & Time</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id}>
                    <td>
                      <div className="admin-table-title">
                        {event.title}
                        {event.description && (
                          <span className="admin-table-subtitle">{event.description.substring(0, 60)}...</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="admin-table-date">
                        {new Date(event.start_date).toLocaleDateString()}
                        <span className="admin-table-time">
                          {new Date(event.start_date).toLocaleTimeString([], {
                            hour: '2-digit', 
                            minute:'2-digit',
                            timeZone: 'UTC'
                          })}
                        </span>
                      </div>
                    </td>
                    <td>{event.location || '-'}</td>
                    <td>
                      <span className="admin-type-badge">
                        {event.event_type?.replace('_', ' ') || 'General'}
                      </span>
                    </td>
                    <td>
                      <span className={`admin-status-badge ${event.is_published ? 'published' : 'draft'}`}>
                        {event.is_published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td>
                      <div className="admin-table-actions">
                        <button
                          onClick={() => togglePublish(event)}
                          className={`admin-btn-sm ${event.is_published ? 'admin-btn-warning' : 'admin-btn-success'}`}
                          title={event.is_published ? 'Unpublish' : 'Publish'}
                        >
                          {event.is_published ? 'Unpublish' : 'Publish'}
                        </button>
                        <button
                          onClick={() => handleEdit(event)}
                          className="admin-btn-sm admin-btn-secondary"
                          title="Edit"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="admin-btn-sm admin-btn-danger"
                          title="Delete"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default EventsManagement
