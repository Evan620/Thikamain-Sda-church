import React, { useState, useEffect } from 'react'
import { supabase } from '../../services/supabaseClient'
import { useAuth } from '../../hooks/useAuth'

const SermonsManagement = () => {
  const { user } = useAuth()
  const [sermons, setSermons] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingSermon, setEditingSermon] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    speaker: '',
    sermon_date: '',
    audio_url: '',
    video_url: '',
    notes_url: '',
    series: '',
    tags: '',
    is_published: false
  })

  // Fetch sermons
  const fetchSermons = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('sermons')
        .select('*')
        .order('sermon_date', { ascending: false })

      if (error) throw error
      setSermons(data || [])
    } catch (error) {
      console.error('Error fetching sermons:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSermons()
  }, [])

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const sermonData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
        created_by: user.id
      }

      if (editingSermon) {
        // Update existing sermon
        const { error } = await supabase
          .from('sermons')
          .update(sermonData)
          .eq('id', editingSermon.id)

        if (error) throw error
      } else {
        // Create new sermon
        const { error } = await supabase
          .from('sermons')
          .insert([sermonData])

        if (error) throw error
      }

      // Reset form and refresh data
      setFormData({
        title: '',
        description: '',
        speaker: '',
        sermon_date: '',
        audio_url: '',
        video_url: '',
        notes_url: '',
        series: '',
        tags: '',
        is_published: false
      })
      setShowForm(false)
      setEditingSermon(null)
      fetchSermons()
    } catch (error) {
      console.error('Error saving sermon:', error)
      alert('Error saving sermon. Please try again.')
    }
  }

  // Handle edit
  const handleEdit = (sermon) => {
    setEditingSermon(sermon)
    setFormData({
      title: sermon.title || '',
      description: sermon.description || '',
      speaker: sermon.speaker || '',
      sermon_date: sermon.sermon_date || '',
      audio_url: sermon.audio_url || '',
      video_url: sermon.video_url || '',
      notes_url: sermon.notes_url || '',
      series: sermon.series || '',
      tags: sermon.tags ? sermon.tags.join(', ') : '',
      is_published: sermon.is_published || false
    })
    setShowForm(true)
  }

  // Handle delete
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this sermon?')) return

    try {
      const { error } = await supabase
        .from('sermons')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchSermons()
    } catch (error) {
      console.error('Error deleting sermon:', error)
      alert('Error deleting sermon. Please try again.')
    }
  }

  // Toggle publish status
  const togglePublish = async (sermon) => {
    try {
      const { error } = await supabase
        .from('sermons')
        .update({ is_published: !sermon.is_published })
        .eq('id', sermon.id)

      if (error) throw error
      fetchSermons()
    } catch (error) {
      console.error('Error updating sermon:', error)
    }
  }

  if (loading) {
    return (
      <div className="admin-loading-container">
        <div className="admin-loading-spinner"></div>
        <p>Loading sermons...</p>
      </div>
    )
  }

  return (
    <div className="admin-content-management">
      {/* Header */}
      <div className="admin-content-header">
        <div>
          <h1>Sermons Management</h1>
          <p>Manage church sermons, audio, and video content</p>
        </div>
        <button
          onClick={() => {
            setShowForm(true)
            setEditingSermon(null)
            setFormData({
              title: '',
              description: '',
              speaker: '',
              sermon_date: '',
              audio_url: '',
              video_url: '',
              notes_url: '',
              series: '',
              tags: '',
              is_published: false
            })
          }}
          className="admin-btn-primary"
        >
          <svg className="admin-btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Sermon
        </button>
      </div>

      {/* Sermon Form Modal */}
      {showForm && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2>{editingSermon ? 'Edit Sermon' : 'Add New Sermon'}</h2>
              <button
                onClick={() => {
                  setShowForm(false)
                  setEditingSermon(null)
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
                    <label>Speaker *</label>
                    <input
                      type="text"
                      value={formData.speaker}
                      onChange={(e) => setFormData({...formData, speaker: e.target.value})}
                      required
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Sermon Date *</label>
                    <input
                      type="date"
                      value={formData.sermon_date}
                      onChange={(e) => setFormData({...formData, sermon_date: e.target.value})}
                      required
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Series</label>
                    <input
                      type="text"
                      value={formData.series}
                      onChange={(e) => setFormData({...formData, series: e.target.value})}
                      className="admin-form-input"
                    />
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
                    <label>Audio URL</label>
                    <input
                      type="url"
                      value={formData.audio_url}
                      onChange={(e) => setFormData({...formData, audio_url: e.target.value})}
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Video URL</label>
                    <input
                      type="url"
                      value={formData.video_url}
                      onChange={(e) => setFormData({...formData, video_url: e.target.value})}
                      className="admin-form-input"
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Notes URL</label>
                  <input
                    type="url"
                    value={formData.notes_url}
                    onChange={(e) => setFormData({...formData, notes_url: e.target.value})}
                    className="admin-form-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    placeholder="e.g., faith, hope, love"
                    className="admin-form-input"
                  />
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
                      setEditingSermon(null)
                    }}
                    className="admin-btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="admin-btn-primary">
                    {editingSermon ? 'Update Sermon' : 'Create Sermon'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Sermons List */}
      <div className="admin-content-list">
        {sermons.length === 0 ? (
          <div className="admin-empty-state">
            <svg className="admin-empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <h3>No sermons yet</h3>
            <p>Start by adding your first sermon</p>
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Speaker</th>
                  <th>Date</th>
                  <th>Series</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sermons.map((sermon) => (
                  <tr key={sermon.id}>
                    <td>
                      <div className="admin-table-title">
                        {sermon.title}
                        {sermon.description && (
                          <span className="admin-table-subtitle">{sermon.description.substring(0, 60)}...</span>
                        )}
                      </div>
                    </td>
                    <td>{sermon.speaker}</td>
                    <td>{new Date(sermon.sermon_date).toLocaleDateString()}</td>
                    <td>{sermon.series || '-'}</td>
                    <td>
                      <span className={`admin-status-badge ${sermon.is_published ? 'published' : 'draft'}`}>
                        {sermon.is_published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td>
                      <div className="admin-table-actions">
                        <button
                          onClick={() => togglePublish(sermon)}
                          className={`admin-btn-sm ${sermon.is_published ? 'admin-btn-warning' : 'admin-btn-success'}`}
                          title={sermon.is_published ? 'Unpublish' : 'Publish'}
                        >
                          {sermon.is_published ? 'Unpublish' : 'Publish'}
                        </button>
                        <button
                          onClick={() => handleEdit(sermon)}
                          className="admin-btn-sm admin-btn-secondary"
                          title="Edit"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(sermon.id)}
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

export default SermonsManagement
