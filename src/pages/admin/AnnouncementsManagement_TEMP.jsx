import React, { useState, useEffect } from 'react'
import { supabase } from '../../services/supabaseClient'
import { useAuth } from '../../hooks/useAuth'

const AnnouncementsManagement = () => {
  const { user } = useAuth()
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingAnnouncement, setEditingAnnouncement] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'normal',
    start_date: '',
    end_date: '',
    target_audience: 'all',
    is_published: false
  })

  // Fetch announcements
  const fetchAnnouncements = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setAnnouncements(data || [])
    } catch (error) {
      console.error('Error fetching announcements:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const announcementData = {
        ...formData,
        created_by: user.id
      }

      if (editingAnnouncement) {
        // Update existing announcement
        const { error } = await supabase
          .from('announcements')
          .update(announcementData)
          .eq('id', editingAnnouncement.id)

        if (error) throw error
      } else {
        // Create new announcement
        const { error } = await supabase
          .from('announcements')
          .insert([announcementData])

        if (error) throw error
      }

      // Reset form and refresh data
      setFormData({
        title: '',
        content: '',
        priority: 'normal',
        start_date: '',
        end_date: '',
        target_audience: 'all',
        is_published: false
      })
      setShowForm(false)
      setEditingAnnouncement(null)
      fetchAnnouncements()
    } catch (error) {
      console.error('Error saving announcement:', error)
      alert('Error saving announcement. Please try again.')
    }
  }

  // Handle edit
  const handleEdit = (announcement) => {
    setEditingAnnouncement(announcement)
    setFormData({
      title: announcement.title || '',
      content: announcement.content || '',
      priority: announcement.priority || 'normal',
      start_date: announcement.start_date || '',
      end_date: announcement.end_date || '',
      target_audience: announcement.target_audience || 'all',
      is_published: announcement.is_published || false
    })
    setShowForm(true)
  }

  // Handle delete
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return

    try {
      const { error } = await supabase
        .from('announcements')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchAnnouncements()
    } catch (error) {
      console.error('Error deleting announcement:', error)
      alert('Error deleting announcement. Please try again.')
    }
  }

  // Toggle publish status
  const togglePublish = async (announcement) => {
    try {
      const { error } = await supabase
        .from('announcements')
        .update({ is_published: !announcement.is_published })
        .eq('id', announcement.id)

      if (error) throw error
      fetchAnnouncements()
    } catch (error) {
      console.error('Error updating announcement:', error)
    }
  }

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'red'
      case 'high': return 'orange'
      case 'normal': return 'blue'
      case 'low': return 'gray'
      default: return 'blue'
    }
  }

  if (loading) {
    return (
      <div className="admin-loading-container">
        <div className="admin-loading-spinner"></div>
        <p>Loading announcements...</p>
      </div>
    )
  }

  return (
    <div className="admin-content-management">
      {/* Header */}
      <div className="admin-content-header">
        <div>
          <h1>Announcements Management</h1>
          <p>Manage church announcements and notices</p>
        </div>
        <button
          onClick={() => {
            setShowForm(true)
            setEditingAnnouncement(null)
            setFormData({
              title: '',
              content: '',
              priority: 'normal',
              start_date: '',
              end_date: '',
              target_audience: 'all',
              is_published: false
            })
          }}
          className="admin-btn-primary"
        >
          <svg className="admin-btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Announcement
        </button>
      </div>

      {/* Announcement Form Modal */}
      {showForm && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2>{editingAnnouncement ? 'Edit Announcement' : 'Add New Announcement'}</h2>
              <button
                onClick={() => {
                  setShowForm(false)
                  setEditingAnnouncement(null)
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
                  <label>Content *</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    required
                    rows={6}
                    className="admin-form-textarea"
                  />
                </div>

                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>Priority</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({...formData, priority: e.target.value})}
                      className="admin-form-select"
                    >
                      <option value="low">Low</option>
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label>Target Audience</label>
                    <select
                      value={formData.target_audience}
                      onChange={(e) => setFormData({...formData, target_audience: e.target.value})}
                      className="admin-form-select"
                    >
                      <option value="all">All</option>
                      <option value="members">Members Only</option>
                      <option value="visitors">Visitors</option>
                      <option value="ministry_leaders">Ministry Leaders</option>
                      <option value="elders">Elders</option>
                    </select>
                  </div>
                </div>

                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>Start Date *</label>
                    <input
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                      required
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>End Date</label>
                    <input
                      type="date"
                      value={formData.end_date}
                      onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                      className="admin-form-input"
                    />
                  </div>
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
                      setEditingAnnouncement(null)
                    }}
                    className="admin-btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="admin-btn-primary">
                    {editingAnnouncement ? 'Update Announcement' : 'Create Announcement'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Announcements List */}
      <div className="admin-content-list">
        {announcements.length === 0 ? (
          <div className="admin-empty-state">
            <svg className="admin-empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
            <h3>No announcements yet</h3>
            <p>Start by adding your first announcement</p>
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Priority</th>
                  <th>Audience</th>
                  <th>Date Range</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {announcements.map((announcement) => (
                  <tr key={announcement.id}>
                    <td>
                      <div className="admin-table-title">
                        {announcement.title}
                        <span className="admin-table-subtitle">
                          {announcement.content.substring(0, 80)}...
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className={`admin-priority-badge ${getPriorityColor(announcement.priority)}`}>
                        {announcement.priority}
                      </span>
                    </td>
                    <td>
                      <span className="admin-audience-badge">
                        {announcement.target_audience.replace('_', ' ')}
                      </span>
                    </td>
                    <td>
                      <div className="admin-table-date">
                        {new Date(announcement.start_date).toLocaleDateString()}
                        {announcement.end_date && (
                          <span className="admin-table-time">
                            to {new Date(announcement.end_date).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className={`admin-status-badge ${announcement.is_published ? 'published' : 'draft'}`}>
                        {announcement.is_published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td>
                      <div className="admin-table-actions">
                        <button
                          onClick={() => togglePublish(announcement)}
                          className={`admin-btn-sm ${announcement.is_published ? 'admin-btn-warning' : 'admin-btn-success'}`}
                          title={announcement.is_published ? 'Unpublish' : 'Publish'}
                        >
                          {announcement.is_published ? 'Unpublish' : 'Publish'}
                        </button>
                        <button
                          onClick={() => handleEdit(announcement)}
                          className="admin-btn-sm admin-btn-secondary"
                          title="Edit"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(announcement.id)}
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

export default AnnouncementsManagement