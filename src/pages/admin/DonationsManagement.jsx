import React, { useState, useEffect } from 'react'
import { supabase } from '../../services/supabaseClient'
import { useAuth } from '../../hooks/useAuth'

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
    <div className="admin-content-management">
      {/* Header */}
      <div className="admin-content-header">
        <div>
          <h1>Donations Management</h1>
          <p>Track and manage church donations, tithes, and offerings</p>
        </div>
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
          className="admin-btn-primary"
        >
          <svg className="admin-btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Record Donation
        </button>
      </div>

      {/* Financial Summary Cards */}
      <div className="financial-summary-cards">
        <div className="financial-card total">
          <div className="financial-card-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="financial-card-content">
            <h3>Total Donations</h3>
            <p className="financial-amount">{formatCurrency(totals.total)}</p>
            <span className="financial-period">Current Period</span>
          </div>
        </div>

        <div className="financial-card tithe">
          <div className="financial-card-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <div className="financial-card-content">
            <h3>Tithes</h3>
            <p className="financial-amount">{formatCurrency(totals.tithe || 0)}</p>
            <span className="financial-period">Current Period</span>
          </div>
        </div>

        <div className="financial-card offering">
          <div className="financial-card-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <div className="financial-card-content">
            <h3>Offerings</h3>
            <p className="financial-amount">{formatCurrency(totals.offering || 0)}</p>
            <span className="financial-period">Current Period</span>
          </div>
        </div>

        <div className="financial-card special">
          <div className="financial-card-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <div className="financial-card-content">
            <h3>Special Projects</h3>
            <p className="financial-amount">{formatCurrency(totals.special_project || 0)}</p>
            <span className="financial-period">Current Period</span>
          </div>
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
      <div className="admin-content-list">
        {donations.length === 0 ? (
          <div className="admin-empty-state">
            <svg className="admin-empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3>No donations recorded</h3>
            <p>Start by recording your first donation</p>
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
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
                      <span className="admin-type-badge">
                        {donation.giving_type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="financial-amount-cell">
                      {formatCurrency(donation.amount)}
                    </td>
                    <td>
                      <span className="admin-payment-badge">
                        {donation.payment_method}
                      </span>
                    </td>
                    <td>
                      <span className={`admin-status-badge ${donation.is_verified ? 'verified' : 'pending'}`}>
                        {donation.is_verified ? 'Verified' : 'Pending'}
                      </span>
                    </td>
                    <td>
                      <div className="admin-table-actions">
                        <button
                          onClick={() => toggleVerification(donation)}
                          className={`admin-btn-sm ${donation.is_verified ? 'admin-btn-warning' : 'admin-btn-success'}`}
                          title={donation.is_verified ? 'Mark as Pending' : 'Verify'}
                        >
                          {donation.is_verified ? 'Unverify' : 'Verify'}
                        </button>
                        <button
                          onClick={() => handleEdit(donation)}
                          className="admin-btn-sm admin-btn-secondary"
                          title="Edit"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(donation.id)}
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

export default DonationsManagement
