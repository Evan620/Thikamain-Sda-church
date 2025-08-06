import React, { useState, useEffect, useRef } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'
import { useAuth } from '../../hooks/useAuth'

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false)
  const { user, signOut } = useAuth()
  const mobileDropdownRef = useRef(null)

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

  const handleMobileSignOut = async () => {
    await signOut()
    setMobileDropdownOpen(false)
  }

  // Close mobile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)) {
        setMobileDropdownOpen(false)
      }
    }

    if (mobileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [mobileDropdownOpen])

  return (
    <div className="clean-admin-layout">
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
          <div className="mobile-user-dropdown" ref={mobileDropdownRef}>
            <button
              className="mobile-user-avatar"
              onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
              aria-label="User menu"
            >
              {getUserInitials(user)}
            </button>

            {/* Mobile Dropdown Menu */}
            {mobileDropdownOpen && (
              <div className="mobile-user-menu">
                <div className="mobile-user-menu-header">
                  <p className="mobile-user-menu-name">
                    {user?.full_name || user?.email?.split('@')[0] || 'User'}
                  </p>
                  <p className="mobile-user-menu-email">
                    {user?.email}
                  </p>
                  <p className="mobile-user-menu-role">
                    {getRoleDisplayName(user?.role)}
                  </p>
                </div>

                <div className="mobile-user-menu-divider"></div>

                <button
                  onClick={handleMobileSignOut}
                  className="mobile-user-menu-item logout"
                >
                  <svg className="mobile-menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content area */}
      <div className="clean-admin-main">
        {/* Desktop Header */}
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

        {/* Main content */}
        <main className="clean-admin-content">
          <div className="clean-admin-container">
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

      {/* Mobile dropdown overlay */}
      {mobileDropdownOpen && (
        <div
          className="mobile-dropdown-overlay"
          onClick={() => setMobileDropdownOpen(false)}
        />
      )}
    </div>
  )
}

export default AdminLayout
