import React, { useState, useEffect, useRef } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.jsx'

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  
  const { user, signIn, loading } = useAuth()
  const location = useLocation()
  const emailInputRef = useRef(null)

  // Redirect if already logged in
  const from = location.state?.from || '/admin/dashboard'

  // Auto-focus email input on component mount
  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus()
    }
  }, [])
  
  // Show loading state
  if (loading) {
    return (
      <div className="admin-login">
        <div className="admin-login-container">
          <div className="admin-login-header">
            <div className="admin-login-icon">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3a2 2 0 002 2h4a2 2 0 002-2v-3m-6 0V9a2 2 0 012-2h2a2 2 0 012 2v5m-6 0h6m-9-3h2m8 0h2M5 12V7a2 2 0 012-2h8a2 2 0 012 2v5" />
              </svg>
            </div>
            <h1 className="admin-login-title">Admin Portal</h1>
            <p className="admin-login-subtitle">Thika Main SDA Church</p>
            <p className="admin-login-description">Management System</p>
          </div>
          <div className="admin-login-form">
            <div style={{textAlign: 'center', padding: '2rem'}}>
              <div className="admin-loading-spinner" style={{margin: '0 auto 1rem'}}></div>
              <p style={{color: '#6b7280', fontSize: '0.875rem'}}>Checking authentication...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (user && !loading) {
    return <Navigate to={from} replace />
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const { success, error: signInError } = await signIn(formData.email, formData.password)
      
      if (!success) {
        setError(signInError || 'Login failed. Please try again.')
      }
      // Navigation will be handled by the auth state change
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      console.error('Login error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="admin-login">
      <div className="admin-login-container">
        {/* Header */}
        <div className="admin-login-header">
          <div className="admin-login-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3a2 2 0 002 2h4a2 2 0 002-2v-3m-6 0V9a2 2 0 012-2h2a2 2 0 012 2v5m-6 0h6m-9-3h2m8 0h2M5 12V7a2 2 0 012-2h8a2 2 0 012 2v5" />
            </svg>
          </div>
          <h1 className="admin-login-title">
            Admin Portal
          </h1>
          <p className="admin-login-subtitle">
            Thika Main SDA Church
          </p>
          <p className="admin-login-description">
            Management System
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="admin-login-form">
            {/* Error Message */}
            {error && (
              <div className="admin-error-message">
                <div className="admin-error-content">
                  <div>
                    <svg className="admin-error-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="admin-error-text">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="admin-form-group">
              <label htmlFor="email" className="admin-form-label">
                Email Address
              </label>
              <div className="admin-input-wrapper">
                <div className="admin-input-icon">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  ref={emailInputRef}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="admin-input"
                  placeholder="Enter your email address"
                  disabled={isSubmitting}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      document.getElementById('password').focus();
                    }
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="admin-form-group">
              <label htmlFor="password" className="admin-form-label">
                Password
              </label>
              <div className="admin-input-wrapper">
                <div className="admin-input-icon">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="admin-input"
                  placeholder="Enter your password"
                  disabled={isSubmitting}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !isSubmitting) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div style={{paddingTop: '0.5rem'}}>
              <button
                type="submit"
                disabled={isSubmitting}
                className="admin-btn-primary"
              >
                {isSubmitting ? (
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <div className="admin-loading-spinner"></div>
                    Signing in...
                  </div>
                ) : (
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <span>Sign In to Admin Portal</span>
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* System Info */}
        <div className="admin-info-box">
          <div className="admin-info-content">
            <div>
              <div className="admin-info-icon-wrapper">
                <svg className="admin-info-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="admin-info-text">
              <h3 className="admin-info-title">
                Church Management System
              </h3>
              <p className="admin-info-description">
                Secure admin portal for church operations, member management, and ministry coordination. Contact your system administrator for access credentials.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="admin-footer">
          <p className="admin-footer-text">
            © 2025 Thika Main SDA Church. All rights reserved.
          </p>
          <p className="admin-footer-subtext">
            Powered by Thika Main SDA Church
          </p>
          <p className="admin-developer-credit">
            Developed by L.Magwaro
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
