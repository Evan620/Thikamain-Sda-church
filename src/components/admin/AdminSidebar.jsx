import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.jsx'

const AdminSidebar = ({ isOpen, onClose }) => {
  const location = useLocation()
  const { hasRole, hasPermission, hasAnyPermission } = useAuth()
  const [expandedDropdowns, setExpandedDropdowns] = useState(new Set())

  // Navigation items with permission-based visibility
  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7zm0 0V5a2 2 0 012-2h6l2 2h6a2 2 0 012 2v2M7 13h10M7 17h4" />
        </svg>
      ),
      requiredRole: 'MEMBER', // Everyone can access dashboard
      permissions: [] // No specific permissions required
    },
    {
      name: 'Members',
      href: '/admin/members',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      requiredRole: 'ADMIN',
      permissions: ['manage_members', 'view_member_details']
    },
    {
      name: 'Content',
      href: '/admin/content',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
        </svg>
      ),
      requiredRole: 'ADMIN',
      permissions: ['manage_sermons', 'manage_events', 'manage_announcements'],
      subItems: [
        { name: 'Sermons', href: '/admin/sermons', permissions: ['manage_sermons'] },
        { name: 'Events', href: '/admin/events', permissions: ['manage_events'] },
        { name: 'Announcements', href: '/admin/announcements', permissions: ['manage_announcements'] },
        { name: 'Leaders', href: '/admin/leaders', permissions: ['manage_content'] }
      ]
    },
    {
      name: 'Prayer Requests',
      href: '/admin/prayer-requests',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      requiredRole: 'ELDER',
      permissions: ['manage_prayer_requests']
    },
    {
      name: 'Financial',
      href: '/admin/financial',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      requiredRole: 'ADMIN',
      permissions: ['manage_finances', 'view_financial_reports', 'manage_donations', 'manage_budget'],
      subItems: [
        { name: 'Dashboard', href: '/admin/financial', permissions: ['view_financial_reports'] },
        { name: 'Donations', href: '/admin/donations', permissions: ['manage_donations'] },
        { name: 'Budget', href: '/admin/budget', permissions: ['manage_budget'] }
      ]
    },
    {
      name: 'Communication',
      href: '/admin/communication',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      requiredRole: 'ELDER',
      permissions: ['manage_communications', 'send_sms', 'send_emails']
    },
    {
      name: 'Reports',
      href: '/admin/reports',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      requiredRole: 'ADMIN',
      permissions: ['view_reports', 'view_financial_reports', 'view_member_reports']
    },
    {
      name: 'System',
      href: '/admin/system',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      requiredRole: 'SUPER_ADMIN',
      permissions: ['manage_admins', 'view_audit_logs', 'system_settings'],
      subItems: [
        { name: 'Admin Users', href: '/admin/admin-users', permissions: ['manage_admins'] },
        { name: 'Activity Logs', href: '/admin/activity-logs', permissions: ['view_audit_logs'] },
        { name: 'Settings', href: '/admin/settings', permissions: ['system_settings'] }
      ]
    }
  ]

  // Filter navigation items based on user role and permissions
  const visibleItems = navigationItems.filter(item => {
    // Check role requirement
    if (!hasRole(item.requiredRole)) return false

    // If no specific permissions required, show the item
    if (!item.permissions || item.permissions.length === 0) return true

    // Check if user has any of the required permissions
    return hasAnyPermission(item.permissions)
  })

  // Filter sub-items based on permissions
  const getVisibleSubItems = (subItems) => {
    if (!subItems) return []

    return subItems.filter(subItem => {
      // If no specific permissions required, show the sub-item
      if (!subItem.permissions || subItem.permissions.length === 0) return true

      // Check if user has any of the required permissions
      return hasAnyPermission(subItem.permissions)
    })
  }

  const isActive = (href) => {
    return location.pathname === href || location.pathname.startsWith(href + '/')
  }

  const toggleDropdown = (itemName) => {
    const newExpanded = new Set(expandedDropdowns)
    if (newExpanded.has(itemName)) {
      newExpanded.delete(itemName)
    } else {
      newExpanded.add(itemName)
    }
    setExpandedDropdowns(newExpanded)
  }

  const isDropdownExpanded = (itemName) => {
    if (itemName === 'Content') {
      return expandedDropdowns.has(itemName) || isActive('/admin/sermons') || isActive('/admin/events') || isActive('/admin/announcements') || isActive('/admin/leaders')
    }
    if (itemName === 'Financial') {
      return expandedDropdowns.has(itemName) || isActive('/admin/financial') || isActive('/admin/donations') || isActive('/admin/budget')
    }
    if (itemName === 'System') {
      return expandedDropdowns.has(itemName) || isActive('/admin/admin-users') || isActive('/admin/activity-logs') || isActive('/admin/settings')
    }
    return expandedDropdowns.has(itemName)
  }

  return (
    <>
      {/* Sidebar */}
      <div className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Sidebar header */}
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-logo">
            <div className="admin-logo-icon">
              <img
                src="/assets/seventhdayadventistchurch.png"
                alt="Seventh-day Adventist Church Logo"
                className="admin-logo-image"
              />
            </div>
            <div>
              <h2 className="admin-logo-text">Admin Panel</h2>
              <p className="admin-logo-subtitle">Church Management</p>
            </div>
          </div>
          
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="admin-sidebar-close lg:hidden"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="admin-sidebar-nav">
          <div className="admin-nav-items">
            {visibleItems.map((item) => (
              <div key={item.name}>
                {item.subItems ? (
                  // Dropdown item
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className={`admin-nav-item admin-nav-dropdown ${isDropdownExpanded(item.name) ? 'expanded' : ''}`}
                    >
                      <span className="admin-nav-icon">
                        {item.icon}
                      </span>
                      <span className="admin-nav-text">{item.name}</span>
                      <svg
                        className={`admin-nav-arrow ${isDropdownExpanded(item.name) ? 'rotated' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Sub-items */}
                    <div className={`admin-nav-subitems ${isDropdownExpanded(item.name) ? 'expanded' : ''}`}>
                      {getVisibleSubItems(item.subItems).map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          onClick={onClose}
                          className={`admin-nav-subitem ${isActive(subItem.href) ? 'active' : ''}`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Regular item
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className={`admin-nav-item ${isActive(item.href) ? 'active' : ''}`}
                  >
                    <span className="admin-nav-icon">
                      {item.icon}
                    </span>
                    <span className="admin-nav-text">{item.name}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Quick actions */}
        <div className="admin-sidebar-footer">
          <Link
            to="/"
            className="admin-view-website-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="admin-website-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span>View Website</span>
          </Link>
        </div>
      </div>
    </>
  )
}

export default AdminSidebar
