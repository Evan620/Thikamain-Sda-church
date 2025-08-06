import React, { useState, useEffect, createContext, useContext } from 'react'
import { auth, db } from '../services/supabaseClient'

// Create Auth Context
const AuthContext = createContext()

// Role hierarchy for permission checking
const ROLE_HIERARCHY = {
  'SUPER_ADMIN': 6,
  'ADMIN': 5,
  'FINANCE_ADMIN': 4,
  'CONTENT_ADMIN': 4,
  'MEMBER_ADMIN': 4,
  'MINISTRY_LEADER': 3,
  'DEPARTMENT_HEAD': 3,
  'ELDER': 2,
  'MEMBER': 1,
  'VISITOR': 0
}

// Permission mappings
const PERMISSIONS = {
  'SUPER_ADMIN': ['*'],
  'ADMIN': [
    'read:*', 'write:members', 'write:content', 'write:events', 
    'write:announcements', 'read:giving', 'write:reports'
  ],
  'MINISTRY_LEADER': [
    'read:members:ministry', 'write:members:ministry', 'write:events:ministry',
    'read:content', 'write:content:ministry'
  ],
  'DEPARTMENT_HEAD': [
    'read:members:department', 'write:members:department', 'write:budget:department',
    'read:content', 'write:reports:department'
  ],
  'ELDER': [
    'read:members', 'read:prayer_requests', 'write:prayer_requests',
    'read:pastoral_care', 'write:pastoral_care'
  ],
  'MEMBER': [
    'read:own', 'write:own', 'read:public', 'write:prayer_requests:own'
  ],
  'VISITOR': [
    'read:public'
  ]
}

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Initialize auth state
  useEffect(() => {
    let mounted = true
    let timeoutId

    // Get initial session
    const initializeAuth = async () => {
      try {
        console.log('Initializing auth...')

        // Set a timeout to prevent infinite loading
        timeoutId = setTimeout(() => {
          if (mounted) {
            console.log('Auth initialization timeout, setting loading to false')
            setLoading(false)
          }
        }, 3000) // 3 second timeout

        const { data: { session }, error } = await auth.getSession()

        if (error) {
          console.error('Auth initialization error:', error)
          setError(error.message)
        }

        if (mounted) {
          if (session?.user) {
            console.log('Found existing session for user:', session.user.email)
            setUser(session.user)
            // Load user profile in background, don't block the UI
            loadUserProfile(session.user.id).catch(err => {
              console.log('User profile loading failed, continuing without profile:', err)
            })
          } else {
            console.log('No existing session found')
          }
          setLoading(false)
          clearTimeout(timeoutId)
        }
      } catch (err) {
        console.error('Auth initialization failed:', err)
        if (mounted) {
          setError(err.message)
          setLoading(false)
          clearTimeout(timeoutId)
        }
      }
    }

    initializeAuth()

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email)

        if (mounted) {
          if (session?.user) {
            console.log('User signed in:', session.user.email)
            setUser(session.user)
            // Load user profile in background, don't block the UI
            loadUserProfile(session.user.id).catch(err => {
              console.log('User profile loading failed, continuing without profile:', err)
            })
          } else {
            console.log('User signed out')
            setUser(null)
            setUserProfile(null)
          }
          setLoading(false)
          setError(null)
        }
      }
    )

    return () => {
      mounted = false
      subscription?.unsubscribe()
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [])

  // Load user profile from database
  const loadUserProfile = async (userId) => {
    try {
      const { data, error } = await db.getUserById(userId)

      if (error) {
        console.error('Error loading user profile:', error)
        // If user profile doesn't exist, create a basic one
        if (error.code === 'PGRST116' || error.message.includes('No rows returned')) {
          console.log('User profile not found, user needs to be added to users table')
          setUserProfile(null)
        }
        return
      }

      if (data) {
        setUserProfile(data)
      } else {
        console.log('No user profile found for user:', userId)
        setUserProfile(null)
      }
    } catch (err) {
      console.error('Failed to load user profile:', err)
      setUserProfile(null)
    }
  }

  // Sign in function
  const signIn = async (email, password) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await auth.signIn(email, password)

      if (error) {
        setError(error.message)
        return { success: false, error: error.message }
      }

      return { success: true, data }
    } catch (err) {
      const errorMessage = err.message || 'Sign in failed'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Sign out function
  const signOut = async () => {
    try {
      setLoading(true)
      const { error } = await auth.signOut()

      if (error) {
        setError(error.message)
        return { success: false, error: error.message }
      }

      setUser(null)
      setUserProfile(null)
      return { success: true }
    } catch (err) {
      const errorMessage = err.message || 'Sign out failed'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Check if user has specific role
  const hasRole = (requiredRole) => {
    // If user is authenticated and only MEMBER access is required, allow it
    if (requiredRole === 'MEMBER' && user) {
      return true
    }

    // For higher roles, we need the user profile
    if (!userProfile?.role) return false

    const userRoleLevel = ROLE_HIERARCHY[userProfile.role] || 0
    const requiredRoleLevel = ROLE_HIERARCHY[requiredRole] || 0

    return userRoleLevel >= requiredRoleLevel
  }

  // Check if user has specific permission
  const hasPermission = (permission) => {
    if (!userProfile?.role) return false

    // Super admin has all permissions
    if (userProfile.role === 'SUPER_ADMIN') return true

    // Check user's custom permissions first (from admin_users_management)
    if (userProfile.permissions && Array.isArray(userProfile.permissions)) {
      if (userProfile.permissions.includes(permission)) return true
    }

    // Fallback to role-based permissions
    const userPermissions = PERMISSIONS[userProfile.role] || []

    // Check exact permission match
    if (userPermissions.includes(permission)) return true

    // Check wildcard permissions
    const [action, resource] = permission.split(':')
    if (userPermissions.includes(`${action}:*`)) return true
    if (userPermissions.includes(`*:${resource}`)) return true

    return false
  }

  // Check multiple permissions (user must have ALL)
  const hasAllPermissions = (permissions) => {
    if (!userProfile) return false
    if (userProfile.role === 'SUPER_ADMIN') return true

    return permissions.every(permission => hasPermission(permission))
  }

  // Check multiple permissions (user must have ANY)
  const hasAnyPermission = (permissions) => {
    if (!userProfile) return false
    if (userProfile.role === 'SUPER_ADMIN') return true

    return permissions.some(permission => hasPermission(permission))
  }

  // Get user's permissions
  const getUserPermissions = () => {
    if (!userProfile) return []
    if (userProfile.role === 'SUPER_ADMIN') {
      // Return all possible permissions for Super Admin
      return [
        'manage_users', 'manage_admins', 'view_audit_logs', 'system_settings',
        'manage_content', 'manage_sermons', 'manage_events', 'manage_announcements',
        'manage_members', 'view_member_details', 'manage_attendance',
        'manage_finances', 'view_financial_reports', 'manage_donations', 'manage_budget',
        'manage_prayer_requests', 'send_communications'
      ]
    }
    return userProfile.permissions || []
  }

  // Check if user can access a specific route
  const canAccessRoute = (route) => {
    const routePermissions = {
      '/admin/dashboard': [], // Everyone can access dashboard
      '/admin/sermons': ['manage_sermons'],
      '/admin/events': ['manage_events'],
      '/admin/announcements': ['manage_announcements'],
      '/admin/members': ['manage_members'],
      '/admin/financial': ['view_financial_reports'],
      '/admin/donations': ['manage_donations'],
      '/admin/budget': ['manage_budget'],
      '/admin/prayer-requests': ['manage_prayer_requests'],
      '/admin/admin-users': ['manage_admins'],
      '/admin/activity-logs': ['view_audit_logs'],
      '/admin/settings': ['system_settings']
    }

    const requiredPermissions = routePermissions[route]
    if (!requiredPermissions || requiredPermissions.length === 0) return true

    return hasAnyPermission(requiredPermissions)
  }

  // Check if user is admin (ADMIN or SUPER_ADMIN)
  const isAdmin = () => {
    return hasRole('ADMIN')
  }

  // Check if user is super admin
  const isSuperAdmin = () => {
    return userProfile?.role === 'SUPER_ADMIN'
  }

  // Get user display name
  const getDisplayName = () => {
    if (userProfile?.full_name) return userProfile.full_name
    if (user?.email) return user.email.split('@')[0]
    return 'User'
  }

  // Get user role display
  const getRoleDisplay = () => {
    if (!userProfile?.role) return 'Member'
    
    return userProfile.role
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }

  // Context value
  const value = {
    // State
    user,
    userProfile,
    loading,
    error,
    
    // Actions
    signIn,
    signOut,
    
    // Permissions
    hasRole,
    hasPermission,
    hasAllPermissions,
    hasAnyPermission,
    getUserPermissions,
    canAccessRoute,
    isAdmin,
    isSuperAdmin,
    
    // Utilities
    getDisplayName,
    getRoleDisplay,
    
    // Refresh user profile
    refreshProfile: () => user?.id && loadUserProfile(user.id)
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  
  return context
}

// Higher-order component for route protection
export const withAuth = (Component, requiredRole = 'MEMBER') => {
  return function AuthenticatedComponent(props) {
    const { user, loading, hasRole } = useAuth()
    
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
        </div>
      )
    }
    
    if (!user) {
      return <div>Please log in to access this page.</div>
    }
    
    if (!hasRole(requiredRole)) {
      return <div>You don't have permission to access this page.</div>
    }
    
    return <Component {...props} />
  }
}

export default useAuth
