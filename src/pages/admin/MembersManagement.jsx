import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { supabase } from '../../services/supabaseClient'
import { useAuth } from '../../hooks/useAuth'
import '../../styles/enhanced-search.css'

const MembersManagement = () => {
  const { user } = useAuth()
  const [members, setMembers] = useState([])
  const [filteredMembers, setFilteredMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingMember, setEditingMember] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState(0)
  const [formData, setFormData] = useState({
    membership_number: '',
    first_name: '',
    last_name: '',
    date_of_birth: '',
    address: '',
    phone: '',
    email: '',
    marital_status: '',
    baptism_date: '',
    membership_date: '',
    emergency_contact: {
      name: '',
      phone: '',
      relationship: ''
    },
    is_active: true
  })

  // Fetch all members once
  const fetchMembers = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .order('last_name', { ascending: true })

      if (error) throw error
      setMembers(data || [])
      setFilteredMembers(data || [])
      setSearchResults(data?.length || 0)
    } catch (error) {
      console.error('Error fetching members:', error)
    } finally {
      setLoading(false)
    }
  }

  // Immediate search function for better UX
  const performSearch = useCallback((searchValue) => {
    if (!searchValue.trim()) {
      setFilteredMembers(members)
      setSearchResults(members.length)
      return
    }

    const searchLower = searchValue.toLowerCase().trim()
    const filtered = members.filter(member => {
      const fullName = `${member.first_name} ${member.last_name}`.toLowerCase()
      const membershipNumber = (member.membership_number || '').toLowerCase()
      const email = (member.email || '').toLowerCase()
      const phone = (member.phone || '').toLowerCase()
      
      return (
        fullName.includes(searchLower) ||
        member.first_name.toLowerCase().includes(searchLower) ||
        member.last_name.toLowerCase().includes(searchLower) ||
        membershipNumber.includes(searchLower) ||
        email.includes(searchLower) ||
        phone.includes(searchLower)
      )
    })

    setFilteredMembers(filtered)
    setSearchResults(filtered.length)
  }, [members])

  // Handle search input change (just update the input value)
  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    
    // If user clears the search, show all members immediately
    if (!value.trim()) {
      performSearch(value)
    }
  }

  // Handle Enter key press to trigger search
  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      performSearch(searchTerm)
    }
  }

  // Clear search
  const clearSearch = () => {
    setSearchTerm('')
    setFilteredMembers(members)
    setSearchResults(members.length)
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Clean up the data before sending to database
      const memberData = {
        ...formData,
        // Convert empty strings to null for date fields
        date_of_birth: formData.date_of_birth || null,
        baptism_date: formData.baptism_date || null,
        membership_date: formData.membership_date || null,
        // Convert empty strings to null for optional fields
        phone: formData.phone || null,
        email: formData.email || null,
        address: formData.address || null,
        marital_status: formData.marital_status || null,
        membership_number: formData.membership_number || null,
        // Handle emergency contact
        emergency_contact: formData.emergency_contact.name || formData.emergency_contact.phone || formData.emergency_contact.relationship 
          ? formData.emergency_contact 
          : null
      }

      if (editingMember) {
        // Update existing member
        const { error } = await supabase
          .from('members')
          .update(memberData)
          .eq('id', editingMember.id)

        if (error) throw error
      } else {
        // Create new member
        const { error } = await supabase
          .from('members')
          .insert([memberData])

        if (error) throw error
      }

      // Reset form and refresh data
      setFormData({
        membership_number: '',
        first_name: '',
        last_name: '',
        date_of_birth: '',
        address: '',
        phone: '',
        email: '',
        marital_status: '',
        baptism_date: '',
        membership_date: '',
        emergency_contact: {
          name: '',
          phone: '',
          relationship: ''
        },
        is_active: true
      })
      setShowForm(false)
      setEditingMember(null)
      fetchMembers()
    } catch (error) {
      console.error('Error saving member:', error)
      alert('Error saving member. Please try again.')
    }
  }

  // Handle edit
  const handleEdit = (member) => {
    setEditingMember(member)
    setFormData({
      membership_number: member.membership_number || '',
      first_name: member.first_name || '',
      last_name: member.last_name || '',
      date_of_birth: member.date_of_birth || '',
      address: member.address || '',
      phone: member.phone || '',
      email: member.email || '',
      marital_status: member.marital_status || '',
      baptism_date: member.baptism_date || '',
      membership_date: member.membership_date || '',
      emergency_contact: member.emergency_contact || {
        name: '',
        phone: '',
        relationship: ''
      },
      is_active: member.is_active !== false
    })
    setShowForm(true)
  }

  // Handle delete
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this member?')) return

    try {
      const { error } = await supabase
        .from('members')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchMembers()
    } catch (error) {
      console.error('Error deleting member:', error)
      alert('Error deleting member. Please try again.')
    }
  }

  // Toggle active status
  const toggleActive = async (member) => {
    try {
      const { error } = await supabase
        .from('members')
        .update({ is_active: !member.is_active })
        .eq('id', member.id)

      if (error) throw error
      fetchMembers()
    } catch (error) {
      console.error('Error updating member:', error)
    }
  }

  if (loading) {
    return (
      <div className="admin-loading-container">
        <div className="admin-loading-spinner"></div>
        <p>Loading members...</p>
      </div>
    )
  }

  return (
    <div className="admin-content-management">
      {/* Header */}
      <div className="admin-content-header">
        <div>
          <h1>Members Management</h1>
          <p>Manage church member directory and information</p>
        </div>
        <div className="admin-header-actions">
          {/* Enhanced Search Box */}
          <div className="enhanced-search-container">
            <div className="enhanced-search-box">
              <svg className="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search members by name, email, phone, or membership number..."
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyPress}
                className="enhanced-search-input"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="search-clear-btn"
                  title="Clear search"
                >
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <button
                onClick={() => performSearch(searchTerm)}
                className="search-submit-btn"
                title="Search"
              >
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            
            {/* Search Results Info */}
            <div className="search-results-info">
              {searchTerm ? (
                <span className="search-results-text">
                  {`${searchResults} result${searchResults !== 1 ? 's' : ''} found`}
                  {searchResults === 0 && (
                    <span className="no-results"> - Try different keywords</span>
                  )}
                </span>
              ) : (
                <span className="total-members-text">
                  Total: {members.length} member{members.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              setShowForm(true)
              setEditingMember(null)
              setFormData({
                membership_number: '',
                first_name: '',
                last_name: '',
                date_of_birth: '',
                address: '',
                phone: '',
                email: '',
                marital_status: '',
                baptism_date: '',
                membership_date: '',
                emergency_contact: {
                  name: '',
                  phone: '',
                  relationship: ''
                },
                is_active: true
              })
            }}
            className="admin-btn-primary"
          >
            <svg className="admin-btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Member
          </button>
        </div>
      </div>

      {/* Member Form Modal */}
      {showForm && (
        <div className="admin-modal-overlay">
          <div className="admin-modal admin-modal-large">
            <div className="admin-modal-header">
              <h2>{editingMember ? 'Edit Member' : 'Add New Member'}</h2>
              <button
                onClick={() => {
                  setShowForm(false)
                  setEditingMember(null)
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
              <div className="admin-form-section">
                <h3>Basic Information</h3>
                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>Membership Number</label>
                    <input
                      type="text"
                      value={formData.membership_number}
                      onChange={(e) => setFormData({...formData, membership_number: e.target.value})}
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>First Name *</label>
                    <input
                      type="text"
                      value={formData.first_name}
                      onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                      required
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Last Name *</label>
                    <input
                      type="text"
                      value={formData.last_name}
                      onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                      required
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      value={formData.date_of_birth}
                      onChange={(e) => setFormData({...formData, date_of_birth: e.target.value})}
                      className="admin-form-input"
                    />
                  </div>
                </div>
              </div>

              <div className="admin-form-section">
                <h3>Contact Information</h3>
                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Marital Status</label>
                    <select
                      value={formData.marital_status}
                      onChange={(e) => setFormData({...formData, marital_status: e.target.value})}
                      className="admin-form-select"
                    >
                      <option value="">Select status</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                    </select>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Address</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    rows={3}
                    className="admin-form-textarea"
                  />
                </div>
              </div>

              <div className="admin-form-section">
                <h3>Church Information</h3>
                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>Baptism Date</label>
                    <input
                      type="date"
                      value={formData.baptism_date}
                      onChange={(e) => setFormData({...formData, baptism_date: e.target.value})}
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Membership Date</label>
                    <input
                      type="date"
                      value={formData.membership_date}
                      onChange={(e) => setFormData({...formData, membership_date: e.target.value})}
                      className="admin-form-input"
                    />
                  </div>
                </div>
              </div>

              <div className="admin-form-section">
                <h3>Emergency Contact</h3>
                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>Contact Name</label>
                    <input
                      type="text"
                      value={formData.emergency_contact.name}
                      onChange={(e) => setFormData({
                        ...formData, 
                        emergency_contact: {
                          ...formData.emergency_contact,
                          name: e.target.value
                        }
                      })}
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Contact Phone</label>
                    <input
                      type="tel"
                      value={formData.emergency_contact.phone}
                      onChange={(e) => setFormData({
                        ...formData, 
                        emergency_contact: {
                          ...formData.emergency_contact,
                          phone: e.target.value
                        }
                      })}
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Relationship</label>
                    <input
                      type="text"
                      value={formData.emergency_contact.relationship}
                      onChange={(e) => setFormData({
                        ...formData, 
                        emergency_contact: {
                          ...formData.emergency_contact,
                          relationship: e.target.value
                        }
                      })}
                      placeholder="e.g., Spouse, Parent, Sibling"
                      className="admin-form-input"
                    />
                  </div>
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                    className="admin-checkbox"
                  />
                  <span>Active member</span>
                </label>
              </div>

              <div className="admin-form-actions">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setEditingMember(null)
                  }}
                  className="admin-btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn-primary">
                  {editingMember ? 'Update Member' : 'Create Member'}
                </button>
              </div>
            </form>
            </div>
          </div>
        </div>
      )}

      {/* Members List */}
      <div className="admin-content-list">
        {filteredMembers.length === 0 ? (
          <div className="admin-empty-state">
            <svg className="admin-empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3>No members found</h3>
            <p>{searchTerm ? 'Try adjusting your search terms or clear the search to see all members' : 'Start by adding your first member'}</p>
            {searchTerm && (
              <button onClick={clearSearch} className="admin-btn-secondary" style={{marginTop: '1rem'}}>
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Contact</th>
                  <th>Membership</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member.id}>
                    <td>
                      <div className="admin-member-info">
                        <div className="admin-member-name">
                          {member.first_name} {member.last_name}
                        </div>
                        {member.membership_number && (
                          <div className="admin-member-number">
                            #{member.membership_number}
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="admin-contact-info">
                        {member.phone && <div>{member.phone}</div>}
                        {member.email && <div className="admin-email">{member.email}</div>}
                      </div>
                    </td>
                    <td>
                      <div className="admin-membership-info">
                        {member.membership_date && (
                          <div>Joined: {new Date(member.membership_date).toLocaleDateString()}</div>
                        )}
                        {member.baptism_date && (
                          <div>Baptized: {new Date(member.baptism_date).toLocaleDateString()}</div>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className={`admin-status-badge ${member.is_active ? 'active' : 'inactive'}`}>
                        {member.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <div className="admin-table-actions">
                        <button
                          onClick={() => toggleActive(member)}
                          className={`admin-btn-sm ${member.is_active ? 'admin-btn-warning' : 'admin-btn-success'}`}
                          title={member.is_active ? 'Deactivate' : 'Activate'}
                        >
                          {member.is_active ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => handleEdit(member)}
                          className="admin-btn-sm admin-btn-secondary"
                          title="Edit"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(member.id)}
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

// Debounce utility function
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export default MembersManagement