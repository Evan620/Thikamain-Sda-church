import React, { useState, useEffect } from 'react'
import { supabase } from '../../services/supabaseClient'
import { useAuth } from '../../hooks/useAuth'
import '../../styles/admin-layout.css'
import '../../styles/admin-donations.css'

const DonationsManagement = () => {
  const { user } = useAuth()
  const [donations, setDonations] = useState([])
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingDonation, setEditingDonation] = useState(null)
  const [filter, setFilter] = useState('all')
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  })
  const [formData, setFormData] = useState({
    member_id: '',
    amount: '',
    giving_type: 'tithe',
    payment_method: 'mpesa',
    transaction_id: '',
    giving_date: new Date().toISOString().split('T')[0],
    notes: '',
    is_verified: false
  })

  // Fetch donations and members
  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Fetch donations with member info
      let donationsQuery = supabase
        .from('giving_records')
        .select(`
          *,
          member:members(first_name, last_name, membership_number)
        `)
        .order('giving_date', { ascending: false })

      if (filter !== 'all') {
        donationsQuery = donationsQuery.eq('giving_type', filter)
      }

      if (dateRange.start) {
        donationsQuery = donationsQuery.gte('giving_date', dateRange.start)
      }
      if (dateRange.end) {
        donationsQuery = donationsQuery.lte('giving_date', dateRange.end)
      }

      const { data: donationsData, error: donationsError } = await donationsQuery

      if (donationsError) throw donationsError

      // Fetch members for dropdown
      const { data: membersData, error: membersError } = await supabase
        .from('members')
        .select('id, first_name, last_name, membership_number')
        .eq('is_active', true)
        .order('last_name')

      if (membersError) throw membersError

      setDonations(donationsData || [])
      setMembers(membersData || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [filter, dateRange])

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const donationData = {
        ...formData,
        amount: parseFloat(formData.amount),
        member_id: formData.member_id || null
      }

      if (editingDonation) {
        // Update existing donation
        const { error } = await supabase
          .from('giving_records')
          .update(donationData)
          .eq('id', editingDonation.id)

        if (error) throw error
      } else {
        // Create new donation
        const { error } = await supabase
          .from('giving_records')
          .insert([donationData])

        if (error) throw error
      }

      // Reset form and refresh data
      setFormData({
        member_id: '',
        amount: '',
        giving_type: 'tithe',
        payment_method: 'mpesa',
        transaction_id: '',
        giving_date: new Date().toISOString().split('T')[0],
        notes: '',
        is_verified: false
      })
      setShowForm(false)
      setEditingDonation(null)
      fetchData()
    } catch (error) {
      console.error('Error saving donation:', error)
      alert('Error saving donation. Please try again.')
    }
  }

  // Handle edit
  const handleEdit = (donation) => {
    setEditingDonation(donation)
    setFormData({
      member_id: donation.member_id || '',
      amount: donation.amount.toString(),
      giving_type: donation.giving_type,
      payment_method: donation.payment_method,
      transaction_id: donation.transaction_id || '',
      giving_date: donation.giving_date,
      notes: donation.notes || '',
      is_verified: donation.is_verified
    })
    setShowForm(true)
  }

  // Handle delete
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this donation record?')) return

    try {
      const { error } = await supabase
        .from('giving_records')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchData()
    } catch (error) {
      console.error('Error deleting donation:', error)
      alert('Error deleting donation. Please try again.')
    }
  }

  // Toggle verification status
  const toggleVerification = async (donation) => {
    try {
      const { error } = await supabase
        .from('giving_records')
        .update({ is_verified: !donation.is_verified })
        .eq('id', donation.id)

      if (error) throw error
      fetchData()
    } catch (error) {
      console.error('Error updating verification:', error)
    }
  }

  // Calculate totals
  const totals = donations.reduce((acc, donation) => {
    acc.total += donation.amount
    acc[donation.giving_type] = (acc[donation.giving_type] || 0) + donation.amount
    return acc
  }, { total: 0 })

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES'
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="admin-loading-container">
        <div className="admin-loading-spinner"></div>
        <p>Loading donations...</p>
      </div>
    )
  }

  return (
    <div className="clean-admin-container">
      {/* Header */}
      <div className="clean-donations-header">
        <div>
          <h1 className="clean-donations-title">Donations Management</h1>
          <p className="clean-donations-subtitle">Track and manage church donations, tithes, and offerings</p>
        </div>
        <div className="clean-donations-actions">
          <button
            onClick={() => {
              setShowForm(true)
              setEditingDonation(null)
              setFormData({
                member_id: '',
                amount: '',
                giving_type: 'tithe',
                payment_method: 'mpesa',
                transaction_id: '',
                giving_date: new Date().toISOString().split('T')[0],
                notes: '',
                is_verified: false
              })
            }}
            className="clean-record-donation-btn"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Record Donation
          </button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="clean-donations-stats">
        <div className="clean-stat-card">
          <div className="clean-stat-header">
            <h3 className="clean-stat-title">Total Donations</h3>
            <div className="clean-stat-icon">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="clean-stat-amount">{formatCurrency(totals.total)}</p>
          <p className="clean-stat-label">Current Period</p>
        </div>

        <div className="clean-stat-card tithes">
          <div className="clean-stat-header">
            <h3 className="clean-stat-title">Tithes</h3>
            <div className="clean-stat-icon">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
          </div>
          <p className="clean-stat-amount">{formatCurrency(totals.tithe || 0)}</p>
          <p className="clean-stat-label">Current Period</p>
        </div>

        <div className="clean-stat-card offerings">
          <div className="clean-stat-header">
            <h3 className="clean-stat-title">Offerings</h3>
            <div className="clean-stat-icon">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
          <p className="clean-stat-amount">{formatCurrency(totals.offering || 0)}</p>
          <p className="clean-stat-label">Current Period</p>
        </div>
      </div>

      {/* Filters */}
      <div className="financial-filters">
        <div className="admin-filter-controls">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="admin-form-select"
          >
            <option value="all">All Types</option>
            <option value="tithe">Tithes</option>
            <option value="offering">Offerings</option>
            <option value="special_project">Special Projects</option>
            <option value="building_fund">Building Fund</option>
            <option value="missions">Missions</option>
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

      {/* Donation Form Modal */}
      {showForm && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2>{editingDonation ? 'Edit Donation' : 'Record New Donation'}</h2>
              <button
                onClick={() => {
                  setShowForm(false)
                  setEditingDonation(null)
                }}
                className="admin-modal-close"
              >
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="admin-form">
              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label>Member (Optional)</label>
                  <select
                    value={formData.member_id}
                    onChange={(e) => setFormData({...formData, member_id: e.target.value})}
                    className="admin-form-select"
                  >
                    <option value="">Anonymous Donation</option>
                    {members.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.first_name} {member.last_name} 
                        {member.membership_number && ` (#${member.membership_number})`}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="admin-form-group">
                  <label>Amount (KES) *</label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    required
                    min="0"
                    step="0.01"
                    className="admin-form-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Donation Type *</label>
                  <select
                    value={formData.giving_type}
                    onChange={(e) => setFormData({...formData, giving_type: e.target.value})}
                    required
                    className="admin-form-select"
                  >
                    <option value="tithe">Tithe</option>
                    <option value="offering">Offering</option>
                    <option value="special_project">Special Project</option>
                    <option value="building_fund">Building Fund</option>
                    <option value="missions">Missions</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <label>Payment Method *</label>
                  <select
                    value={formData.payment_method}
                    onChange={(e) => setFormData({...formData, payment_method: e.target.value})}
                    required
                    className="admin-form-select"
                  >
                    <option value="mpesa">M-Pesa</option>
                    <option value="cash">Cash</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="check">Check</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <label>Transaction ID</label>
                  <input
                    type="text"
                    value={formData.transaction_id}
                    onChange={(e) => setFormData({...formData, transaction_id: e.target.value})}
                    placeholder="M-Pesa code, check number, etc."
                    className="admin-form-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Date *</label>
                  <input
                    type="date"
                    value={formData.giving_date}
                    onChange={(e) => setFormData({...formData, giving_date: e.target.value})}
                    required
                    className="admin-form-input"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows={3}
                  className="admin-form-textarea"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.is_verified}
                    onChange={(e) => setFormData({...formData, is_verified: e.target.checked})}
                    className="admin-checkbox"
                  />
                  <span>Mark as verified</span>
                </label>
              </div>

              <div className="admin-form-actions">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setEditingDonation(null)
                  }}
                  className="admin-btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn-primary">
                  {editingDonation ? 'Update Donation' : 'Record Donation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Donations List */}
      <div className="clean-donations-table-container">
        <div className="clean-donations-table-header">
          <h2 className="clean-donations-table-title">Recent Donations</h2>
        </div>
        {donations.length === 0 ? (
          <div className="clean-donations-empty">
            <svg className="clean-donations-empty-icon" width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="clean-donations-empty-title">No donations recorded</h3>
            <p className="clean-donations-empty-text">Start by recording your first donation</p>
          </div>
        ) : (
          <table className="clean-donations-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Member</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
              <tbody>
                {donations.map((donation) => (
                  <tr key={donation.id}>
                    <td>{new Date(donation.giving_date).toLocaleDateString()}</td>
                    <td>
                      {donation.member ? 
                        `${donation.member.first_name} ${donation.member.last_name}` : 
                        'Anonymous'
                      }
                    </td>
                    <td>
                      <span className={`clean-donation-type-badge ${donation.giving_type}`}>
                        {donation.giving_type.replace('_', ' ')}
                      </span>
                    </td>
                    <td style={{fontWeight: '600'}}>
                      {formatCurrency(donation.amount)}
                    </td>
                    <td>
                      {donation.payment_method.toUpperCase()}
                    </td>
                    <td>
                      <button
                        onClick={() => toggleVerification(donation)}
                        className="clean-btn"
                        style={{
                          padding: '0.25rem 0.75rem',
                          fontSize: '0.75rem',
                          background: donation.is_verified ? 'var(--admin-primary-green)' : '#6b7280',
                          color: 'white'
                        }}
                      >
                        {donation.is_verified ? 'Verified' : 'Pending'}
                      </button>
                    </td>
                    <td>
                      <div style={{display: 'flex', gap: '0.5rem'}}>
                        <button
                          onClick={() => handleEdit(donation)}
                          className="clean-btn"
                          style={{
                            padding: '0.5rem',
                            background: '#3b82f6',
                            color: 'white'
                          }}
                          title="Edit"
                        >
                          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(donation.id)}
                          className="clean-btn"
                          style={{
                            padding: '0.5rem',
                            background: '#ef4444',
                            color: 'white'
                          }}
                          title="Delete"
                        >
                          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        )}
      </div>
    </div>
  )
}

export default DonationsManagement
