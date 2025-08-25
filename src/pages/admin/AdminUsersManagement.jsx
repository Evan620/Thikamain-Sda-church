import React, { useState, useEffect } from 'react'
import { supabase } from '../../services/supabaseClient'
import { useAuth } from '../../hooks/useAuth'

const AdminUsersManagement = () => {
  const { user, hasRole } = useAuth()
  const [adminUsers, setAdminUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingAdmin, setEditingAdmin] = useState(null)
  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    role: 'ADMIN',
    permissions: [],
    is_active: true,
    password: '',
    confirmPassword: ''
  })

  // Available roles and their descriptions
  const adminRoles = [
    {
      value: 'SUPER_ADMIN',
      label: 'Super Admin',
      description: 'Full system access, can manage all admins and settings',
      color: 'purple'
    },
    {
      value: 'ADMIN',
      label: 'General Admin',
      description: 'Full access to content, members, and basic financial features',
      color: 'blue'
    },
    {
      value: 'FINANCE_ADMIN',
      label: 'Finance Admin',
      description: 'Specialized access to financial management and reporting',
      color: 'green'
    },
    {
      value: 'CONTENT_ADMIN',
      label: 'Content Admin',
      description: 'Manages sermons, events, announcements, and website content',
      color: 'orange'
    },
    {
      value: 'MEMBER_ADMIN',
      label: 'Member Admin',
      description: 'Manages member directory, attendance, and communication',
      color: 'teal'
    }
  ]

  // Available permissions
  const availablePermissions = [
    { id: 'manage_users', label: 'Manage Users', category: 'System' },
    { id: 'manage_admins', label: 'Manage Admins', category: 'System' },
    { id: 'view_audit_logs', label: 'View Audit Logs', category: 'System' },
    { id: 'system_settings', label: 'System Settings', category: 'System' },
    { id: 'manage_content', label: 'Manage Content', category: 'Content' },
    { id: 'manage_sermons', label: 'Manage Sermons', category: 'Content' },
    { id: 'manage_events', label: 'Manage Events', category: 'Content' },
    { id: 'manage_announcements', label: 'Manage Announcements', category: 'Content' },
    { id: 'manage_members', label: 'Manage Members', category: 'Members' },
    { id: 'view_member_details', label: 'View Member Details', category: 'Members' },
    { id: 'manage_attendance', label: 'Manage Attendance', category: 'Members' },
    { id: 'manage_finances', label: 'Manage Finances', category: 'Financial' },
    { id: 'view_financial_reports', label: 'View Financial Reports', category: 'Financial' },
    { id: 'manage_donations', label: 'Manage Donations', category: 'Financial' },
    { id: 'manage_budget', label: 'Manage Budget', category: 'Financial' },
    { id: 'manage_prayer_requests', label: 'Manage Prayer Requests', category: 'Ministry' },
    { id: 'send_communications', label: 'Send Communications', category: 'Communication' }
  ]

  // Fetch admin users
  const fetchAdminUsers = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .in('role', ['SUPER_ADMIN', 'ADMIN', 'FINANCE_ADMIN', 'CONTENT_ADMIN', 'MEMBER_ADMIN'])
        .order('created_at', { ascending: false })

      if (error) throw error

      // Ensure permissions field exists for each user (fallback for missing column)
      const usersWithPermissions = (data || []).map(user => ({
        ...user,
        permissions: user.permissions || []
      }))

      setAdminUsers(usersWithPermissions)
    } catch (error) {
      console.error('Error fetching admin users:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAdminUsers()
  }, [])

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    try {
      if (editingAdmin) {
        // Update existing admin
        const updateData = {
          full_name: formData.full_name,
          role: formData.role,
          permissions: formData.permissions,
          is_active: formData.is_active
        }

        const { error } = await supabase
          .from('users')
          .update(updateData)
          .eq('id', editingAdmin.id)

        if (error) throw error

        // Log the activity
        await logActivity('admin_updated', {
          admin_id: editingAdmin.id,
          admin_email: editingAdmin.email,
          changes: updateData
        })
      } else {
        // Create new admin user
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.full_name,
              role: formData.role,
              permissions: formData.permissions,
              is_active: formData.is_active
            }
          }
        })

        if (authError) throw authError

        // Create user record in our users table
        if (authData.user) {
          // First try with permissions column
          let { error: userError } = await supabase
            .from('users')
            .upsert([{
              id: authData.user.id,
              email: formData.email,
              full_name: formData.full_name,
              role: formData.role,
              permissions: formData.permissions,
              is_active: formData.is_active,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }], { onConflict: 'id' })

          // If permissions column doesn't exist, try without it
          if (userError && userError.message.includes('permissions')) {
            console.log('Permissions column not found, creating user without permissions...')
            const { error: fallbackError } = await supabase
              .from('users')
              .upsert([{
                id: authData.user.id,
                email: formData.email,
                full_name: formData.full_name,
                role: formData.role,
                is_active: formData.is_active,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              }], { onConflict: 'id' })

            userError = fallbackError
          }

          if (userError) {
            console.error('Error creating user record:', userError)
            throw new Error('Failed to create user profile: ' + userError.message)
          }
        }

        // Log the activity
        await logActivity('admin_created', {
          admin_email: formData.email,
          admin_role: formData.role,
          admin_id: authData.user?.id
        })
      }

      // Reset form and refresh data
      setFormData({
        email: '',
        full_name: '',
        role: 'ADMIN',
        permissions: [],
        is_active: true,
        password: '',
        confirmPassword: ''
      })
      setShowForm(false)
      setEditingAdmin(null)
      fetchAdminUsers()

      // Show success message
      alert(editingAdmin ? 'Admin user updated successfully!' : 'Admin user created successfully!')
    } catch (error) {
      console.error('Error saving admin user:', error)

      // Provide more specific error messages
      let errorMessage = 'Error saving admin user. Please try again.'

      if (error.message.includes('Email address') && error.message.includes('invalid')) {
        errorMessage = 'Please use a valid email address (e.g., finance@gmail.com, content@example.com)'
      } else if (error.message.includes('already registered')) {
        errorMessage = 'This email address is already registered. Please use a different email.'
      } else if (error.message.includes('Password')) {
        errorMessage = 'Password must be at least 6 characters long.'
      } else if (error.message) {
        errorMessage = error.message
      }

      alert(errorMessage)
    }
  }

  // Log activity
  const logActivity = async (action, details) => {
    try {
      await supabase
        .from('admin_activity_logs')
        .insert([{
          admin_id: user.id,
          action,
          details,
          ip_address: 'Unknown', // You can get this from a service
          user_agent: navigator.userAgent
        }])
    } catch (error) {
      console.error('Error logging activity:', error)
    }
  }

  // Handle edit
  const handleEdit = (admin) => {
    setEditingAdmin(admin)
    setFormData({
      email: admin.email,
      full_name: admin.full_name || '',
      role: admin.role,
      permissions: admin.permissions || [],
      is_active: admin.is_active !== false,
      password: '',
      confirmPassword: ''
    })
    setShowForm(true)
  }

  // Handle delete/deactivate
  const handleDeactivate = async (adminId, currentStatus) => {
    const action = currentStatus ? 'deactivate' : 'activate'
    if (!confirm(`Are you sure you want to ${action} this admin user?`)) return

    try {
      const { error } = await supabase
        .from('users')
        .update({ is_active: !currentStatus })
        .eq('id', adminId)

      if (error) throw error

      await logActivity(`admin_${action}d`, { admin_id: adminId })
      fetchAdminUsers()
    } catch (error) {
      console.error(`Error ${action}ing admin:`, error)
      alert(`Error ${action}ing admin. Please try again.`)
    }
  }

  // Get role info
  const getRoleInfo = (roleValue) => {
    return adminRoles.find(role => role.value === roleValue) || adminRoles[1]
  }

  // Get default permissions for role
  const getDefaultPermissions = (role) => {
    const permissionSets = {
      SUPER_ADMIN: availablePermissions.map(p => p.id),
      ADMIN: availablePermissions.filter(p => !['manage_admins', 'system_settings'].includes(p.id)).map(p => p.id),
      FINANCE_ADMIN: availablePermissions.filter(p => p.category === 'Financial' || p.id === 'view_member_details').map(p => p.id),
      CONTENT_ADMIN: availablePermissions.filter(p => p.category === 'Content' || p.id === 'view_member_details').map(p => p.id),
      MEMBER_ADMIN: availablePermissions.filter(p => p.category === 'Members' || p.category === 'Communication').map(p => p.id)
    }
    return permissionSets[role] || []
  }

  // Check if current user can manage this admin
  const canManageAdmin = (targetAdmin) => {
    if (!hasRole('SUPER_ADMIN')) return false
    if (targetAdmin.id === user.id) return false // Can't manage yourself
    return true
  }

  if (loading) {
    return (
      <div className="admin-loading-container">
        <div className="admin-loading-spinner"></div>
        <p>Loading admin users...</p>
      </div>
    )
  }

  // Only Super Admins can access this page
  if (!hasRole('SUPER_ADMIN')) {
    return (
      <div className="admin-access-denied">
        <div className="admin-access-denied-content">
          <svg className="admin-access-denied-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h2>Access Denied</h2>
          <p>You need Super Admin privileges to access this page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-content-management">
      {/* Header */}
      <div className="admin-content-header">
        <div>
          <h1>Admin Users Management</h1>
          <p>Manage admin users, roles, and permissions</p>
        </div>
        <button
          onClick={() => {
            setShowForm(true)
            setEditingAdmin(null)
            setFormData({
              email: '',
              full_name: '',
              role: 'ADMIN',
              permissions: getDefaultPermissions('ADMIN'),
              is_active: true,
              password: '',
              confirmPassword: ''
            })
          }}
          className="admin-btn-primary"
        >
          <svg className="admin-btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Admin User
        </button>
      </div>

      {/* Role Overview Cards */}
      <div className="admin-roles-overview">
        {adminRoles.map((role) => {
          const count = adminUsers.filter(admin => admin.role === role.value && admin.is_active).length
          return (
            <div key={role.value} className={`admin-role-card ${role.color}`}>
              <div className="admin-role-card-header">
                <h3>{role.label}</h3>
                <span className="admin-role-count">{count}</span>
              </div>
              <p className="admin-role-description">{role.description}</p>
            </div>
          )
        })}
      </div>

      {/* Admin Form Modal */}
      {showForm && (
        <div className="admin-modal-overlay">
          <div className="admin-modal admin-modal-large">
            <div className="admin-modal-header">
              <h2>{editingAdmin ? 'Edit Admin User' : 'Add New Admin User'}</h2>
              <button
                onClick={() => {
                  setShowForm(false)
                  setEditingAdmin(null)
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
                      <label>Email Address *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                        disabled={editingAdmin} // Can't change email for existing users
                        className="admin-form-input"
                        placeholder="e.g., finance@gmail.com or admin@example.com"
                      />
                    </div>

                    <div className="admin-form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        value={formData.full_name}
                        onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                        required
                        className="admin-form-input"
                      />
                    </div>
                  </div>
                </div>

                <div className="admin-form-section">
                  <h3>Role & Permissions</h3>
                  <div className="admin-form-group">
                    <label>Admin Role *</label>
                    <select
                      value={formData.role}
                      onChange={(e) => {
                        const newRole = e.target.value
                        setFormData({
                          ...formData, 
                          role: newRole,
                          permissions: getDefaultPermissions(newRole)
                        })
                      }}
                      required
                      className="admin-form-select"
                    >
                      {adminRoles.map((role) => (
                        <option key={role.value} value={role.value}>
                          {role.label} - {role.description}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label>Permissions</label>
                    <div className="admin-permissions-grid">
                      {Object.entries(
                        availablePermissions.reduce((acc, permission) => {
                          if (!acc[permission.category]) acc[permission.category] = []
                          acc[permission.category].push(permission)
                          return acc
                        }, {})
                      ).map(([category, permissions]) => (
                        <div key={category} className="admin-permission-category">
                          <h4>{category}</h4>
                          {permissions.map((permission) => (
                            <label key={permission.id} className="admin-checkbox-label">
                              <input
                                type="checkbox"
                                checked={formData.permissions.includes(permission.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setFormData({
                                      ...formData,
                                      permissions: [...formData.permissions, permission.id]
                                    })
                                  } else {
                                    setFormData({
                                      ...formData,
                                      permissions: formData.permissions.filter(p => p !== permission.id)
                                    })
                                  }
                                }}
                                className="admin-checkbox"
                              />
                              <span>{permission.label}</span>
                            </label>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {!editingAdmin && (
                  <div className="admin-form-section">
                    <h3>Security</h3>
                    <div className="admin-form-grid">
                      <div className="admin-form-group">
                        <label>Password *</label>
                        <input
                          type="password"
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                          required={!editingAdmin}
                          minLength="6"
                          className="admin-form-input"
                        />
                      </div>

                      <div className="admin-form-group">
                        <label>Confirm Password *</label>
                        <input
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                          required={!editingAdmin}
                          minLength="6"
                          className="admin-form-input"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="admin-form-group">
                  <label className="admin-checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                      className="admin-checkbox"
                    />
                    <span>Active user</span>
                  </label>
                </div>

                <div className="admin-form-actions">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false)
                      setEditingAdmin(null)
                    }}
                    className="admin-btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="admin-btn-primary">
                    {editingAdmin ? 'Update Admin User' : 'Create Admin User'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Admin Users List */}
      <div className="admin-content-list">
        {adminUsers.length === 0 ? (
          <div className="admin-empty-state">
            <svg className="admin-empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <h3>No admin users found</h3>
            <p>Start by adding your first admin user</p>
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Admin User</th>
                  <th>Role</th>
                  <th>Permissions</th>
                  <th>Status</th>
                  <th>Last Active</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {adminUsers.map((admin) => {
                  const roleInfo = getRoleInfo(admin.role)
                  return (
                    <tr key={admin.id}>
                      <td>
                        <div className="admin-user-info">
                          <div className="admin-user-avatar">
                            {admin.full_name?.charAt(0)?.toUpperCase() || admin.email.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="admin-user-name">{admin.full_name || 'No name'}</div>
                            <div className="admin-user-email">{admin.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`admin-role-badge ${roleInfo.color}`}>
                          {roleInfo.label}
                        </span>
                      </td>
                      <td>
                        <span className="admin-permissions-count">
                          {admin.permissions?.length || 0} permissions
                        </span>
                      </td>
                      <td>
                        <span className={`admin-status-badge ${admin.is_active ? 'active' : 'inactive'}`}>
                          {admin.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <span className="admin-last-active">
                          {admin.last_sign_in_at ? 
                            new Date(admin.last_sign_in_at).toLocaleDateString() : 
                            'Never'
                          }
                        </span>
                      </td>
                      <td>
                        <div className="admin-table-actions">
                          {canManageAdmin(admin) && (
                            <>
                              <button
                                onClick={() => handleEdit(admin)}
                                className="admin-btn-sm admin-btn-secondary"
                                title="Edit"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeactivate(admin.id, admin.is_active)}
                                className={`admin-btn-sm ${admin.is_active ? 'admin-btn-warning' : 'admin-btn-success'}`}
                                title={admin.is_active ? 'Deactivate' : 'Activate'}
                              >
                                {admin.is_active ? 'Deactivate' : 'Activate'}
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminUsersManagement
