import React, { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import leadersService from '../../services/leadersService'

const LeadersManagement = () => {
  const { user } = useAuth()
  const [leaders, setLeaders] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingLeader, setEditingLeader] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    category: 'ministry',
    email: '',
    phone: '',
    bio: '',
    years_of_service: '',
    specialties: '',
    display_order: 0
  })

  const categories = [
    { value: 'pastoral', label: 'Pastoral Team' },
    { value: 'elder', label: 'Church Elders' },
    { value: 'officer', label: 'Church Officers' },
    { value: 'ministry', label: 'Ministry Leaders' },
    { value: 'department', label: 'Department Heads' }
  ]

  // Fetch leaders
  const fetchLeaders = async () => {
    try {
      setLoading(true)
      const data = selectedCategory === 'all' 
        ? await leadersService.getAllLeaders()
        : await leadersService.getLeadersByCategory(selectedCategory)
      
      // Filter by search term if provided
      const filteredData = searchTerm 
        ? data.filter(leader => 
            leader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            leader.position.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : data

      setLeaders(filteredData)
    } catch (error) {
      console.error('Error fetching leaders:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeaders()
  }, [selectedCategory, searchTerm])

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const leaderData = {
        ...formData,
        specialties: formData.specialties.split(',').map(s => s.trim()).filter(s => s),
        years_of_service: formData.years_of_service ? parseInt(formData.years_of_service) : null
      }

      let result
      if (editingLeader) {
        result = await leadersService.updateLeader(editingLeader.id, leaderData)
      } else {
        result = await leadersService.createLeader(leaderData)
      }

      if (result.success) {
        setShowForm(false)
        setEditingLeader(null)
        setFormData({
          name: '',
          position: '',
          category: 'ministry',
          email: '',
          phone: '',
          bio: '',
          years_of_service: '',
          specialties: '',
          display_order: 0
        })
        fetchLeaders()
      } else {
        alert('Error saving leader: ' + result.error)
      }
    } catch (error) {
      console.error('Error saving leader:', error)
      alert('Error saving leader')
    } finally {
      setLoading(false)
    }
  }

  // Handle edit
  const handleEdit = (leader) => {
    setEditingLeader(leader)
    setFormData({
      name: leader.name,
      position: leader.position,
      category: leader.category,
      email: leader.email || '',
      phone: leader.phone || '',
      bio: leader.bio || '',
      years_of_service: leader.years_of_service || '',
      specialties: leader.specialties ? leader.specialties.join(', ') : '',
      display_order: leader.display_order || 0
    })
    setShowForm(true)
  }

  // Handle delete
  const handleDelete = async (leader) => {
    if (window.confirm(`Are you sure you want to remove ${leader.name} from the leaders list?`)) {
      const result = await leadersService.deleteLeader(leader.id)
      if (result.success) {
        fetchLeaders()
      } else {
        alert('Error deleting leader: ' + result.error)
      }
    }
  }

  return (
    <div className="admin-content-management">
      {/* Header */}
      <div className="admin-content-header">
        <div>
          <h1>Church Leaders Management</h1>
          <p>Manage church leadership information displayed throughout the website</p>
        </div>
        <div className="admin-header-actions">
          <div className="admin-search-box">
            <svg className="admin-search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search leaders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="admin-form-select"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
          <button
            onClick={() => {
              setShowForm(true)
              setEditingLeader(null)
              setFormData({
                name: '',
                position: '',
                category: 'ministry',
                email: '',
                phone: '',
                bio: '',
                years_of_service: '',
                specialties: '',
                display_order: leaders.length + 1
              })
            }}
            className="admin-btn-primary"
          >
            Add New Leader
          </button>
        </div>
      </div>

      {/* Leaders List */}
      <div className="admin-content-body">
        {loading ? (
          <div className="admin-loading-state">
            <div className="admin-loading-spinner"></div>
            <p>Loading leaders...</p>
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Category</th>
                  <th>Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaders.map((leader) => (
                  <tr key={leader.id}>
                    <td>{leader.display_order}</td>
                    <td>
                      <div className="admin-table-cell-main">
                        <strong>{leader.name}</strong>
                        {leader.bio && (
                          <div className="admin-table-cell-sub">
                            {leader.bio.substring(0, 100)}...
                          </div>
                        )}
                      </div>
                    </td>
                    <td>{leader.position}</td>
                    <td>
                      <span className={`admin-badge admin-badge-${leader.category}`}>
                        {categories.find(c => c.value === leader.category)?.label || leader.category}
                      </span>
                    </td>
                    <td>
                      <div className="admin-contact-info">
                        {leader.email && (
                          <div className="admin-contact-item">
                            📧 {leader.email}
                          </div>
                        )}
                        {leader.phone && (
                          <div className="admin-contact-item">
                            📱 {leader.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="admin-table-actions">
                        <button
                          onClick={() => handleEdit(leader)}
                          className="admin-btn-sm admin-btn-secondary"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(leader)}
                          className="admin-btn-sm admin-btn-danger"
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {leaders.length === 0 && (
              <div className="admin-empty-state">
                <svg className="admin-empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3>No leaders found</h3>
                <p>
                  {searchTerm || selectedCategory !== 'all' 
                    ? 'No leaders match your current filters'
                    : 'Start by adding your first church leader'
                  }
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2>{editingLeader ? 'Edit Leader' : 'Add New Leader'}</h2>
              <button
                onClick={() => setShowForm(false)}
                className="admin-modal-close"
              >
                ×
              </button>
            </div>

            <div className="admin-modal-content">
              <form onSubmit={handleSubmit} className="admin-form">
                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      className="admin-form-input"
                      placeholder="e.g., Pst. Charles Muritu"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Position/Title *</label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) => setFormData({...formData, position: e.target.value})}
                      required
                      className="admin-form-input"
                      placeholder="e.g., Senior Pastor"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      required
                      className="admin-form-select"
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label>Display Order</label>
                    <input
                      type="number"
                      value={formData.display_order}
                      onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value)})}
                      className="admin-form-input"
                      min="0"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="admin-form-input"
                      placeholder="leader@thikamainsdachurch.org"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="admin-form-input"
                      placeholder="+254 XXX XXX XXX"
                    />
                  </div>

                  <div className="admin-form-group admin-form-group-full">
                    <label>Biography</label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      className="admin-form-textarea"
                      rows="3"
                      placeholder="Brief description of the leader's role and background..."
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Years of Service</label>
                    <input
                      type="number"
                      value={formData.years_of_service}
                      onChange={(e) => setFormData({...formData, years_of_service: e.target.value})}
                      className="admin-form-input"
                      min="0"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Specialties</label>
                    <input
                      type="text"
                      value={formData.specialties}
                      onChange={(e) => setFormData({...formData, specialties: e.target.value})}
                      className="admin-form-input"
                      placeholder="Pastoral Care, Leadership, Teaching (comma-separated)"
                    />
                  </div>
                </div>

                <div className="admin-form-actions">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="admin-btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="admin-btn-primary"
                  >
                    {loading ? 'Saving...' : editingLeader ? 'Update Leader' : 'Add Leader'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LeadersManagement
