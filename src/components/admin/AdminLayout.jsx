import React, { useState } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'
import { useAuth } from '../../hooks/useAuth'

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useAuth()

  const getUserInitials = (user) => {
    if (user?.full_name) {
      return user.full_name.split(' ').map(n => n[0]).join('').toUpperCase()
    }
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase()
    }
    return 'U'
  }

  const getRoleDisplayName = (role) => {
    const roleMap = {
      'SUPER_ADMIN': 'Super Admin',
      'FINANCE_ADMIN': 'Finance Admin',
      'CONTENT_ADMIN': 'Content Admin',
      'MEMBER_ADMIN': 'Member Admin',
      'MINISTRY_LEADER': 'Ministry Leader',
      'DEPARTMENT_HEAD': 'Department Head',
      'ELDER': 'Elder',
      'DEACON': 'Deacon'
    }
    return roleMap[role] || role
  }

  return (
    <div className="admin-layout">
      {/* Mobile Header */}
      <div className="mobile-admin-header">
        <div className="mobile-header-left">
          <button
            className="mobile-menu-button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <div>
            <h1 className="mobile-header-title">Church Admin</h1>
            <p className="mobile-header-subtitle">Thika Main SDA Church</p>
          </div>
        </div>
        <div className="mobile-header-right">
          <div className="mobile-user-avatar">
            {getUserInitials(user)}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content area */}
      <div className="admin-main-content">
        {/* Desktop Header */}
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

        {/* Main content */}
        <main className="admin-content-area">
          <div className="admin-content-container">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default AdminLayout
