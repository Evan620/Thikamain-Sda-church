import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.jsx'

const AuthGuard = ({ children, requiredRole = 'MEMBER', requiredPermission = null }) => {
  const { user, userProfile, loading, hasRole, hasPermission } = useAuth()
  const location = useLocation()

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="admin-loading-container">
        <div style={{textAlign: 'center'}}>
          <div className="admin-loading-spinner-large" style={{margin: '0 auto 1rem'}}></div>
          <p style={{color: '#6b7280', fontSize: '1.125rem'}}>Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <Navigate
        to="/admin/login"
        state={{ from: location.pathname }}
        replace
      />
    )
  }

  // If user is authenticated but profile is still loading for higher roles, show loading state
  if (user && userProfile === null && requiredRole && requiredRole !== 'MEMBER') {
    return (
      <div className="admin-loading-container">
        <div style={{textAlign: 'center'}}>
          <div className="admin-loading-spinner-large" style={{margin: '0 auto 1rem'}}></div>
          <p style={{color: '#6b7280', fontSize: '1.125rem'}}>Loading user profile...</p>
        </div>
      </div>
    )
  }

  // Check role-based access
  if (requiredRole && !hasRole(requiredRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto text-center bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
              <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-4">
              You don't have permission to access this page.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-700">
                <strong>Your Role:</strong> {userProfile?.role || 'Unknown'}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Required Role:</strong> {requiredRole}
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => window.history.back()}
              className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Go Back
            </button>
            <Navigate to="/admin/dashboard" replace />
          </div>
        </div>
      </div>
    )
  }

  // Check permission-based access
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto text-center bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-4">
              <svg className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Insufficient Permissions</h2>
            <p className="text-gray-600 mb-4">
              You don't have the required permissions to access this feature.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-700">
                <strong>Required Permission:</strong> {requiredPermission}
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => window.history.back()}
              className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  // User is authenticated and authorized
  return children
}

// Specialized guards for common use cases
export const AdminGuard = ({ children }) => (
  <AuthGuard requiredRole="ADMIN">
    {children}
  </AuthGuard>
)

export const SuperAdminGuard = ({ children }) => (
  <AuthGuard requiredRole="SUPER_ADMIN">
    {children}
  </AuthGuard>
)

export const MinistryLeaderGuard = ({ children }) => (
  <AuthGuard requiredRole="MINISTRY_LEADER">
    {children}
  </AuthGuard>
)

export const ElderGuard = ({ children }) => (
  <AuthGuard requiredRole="ELDER">
    {children}
  </AuthGuard>
)

// Permission-based guards
export const PermissionGuard = ({ children, permission }) => (
  <AuthGuard requiredPermission={permission}>
    {children}
  </AuthGuard>
)

export default AuthGuard
