import React, { useState, useEffect } from 'react'
import { submitMessage, isEmailConfigured } from '../services/centralizedMessagingService'

const ContactForm = ({ 
  recipientName, 
  recipientRole, 
  department = null,
  onSubmit,
  onClose 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [isEmailConfigured, setIsEmailConfigured] = useState(true)

  useEffect(() => {
    setIsEmailConfigured(isEmailConfigured())
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    console.log('Form submit triggered')
    e.preventDefault()
    e.stopPropagation()

    setIsSubmitting(true)
    setSubmitStatus(null)
    setErrorMessage('')

    try {
      console.log('Preparing contact data...')
      // Prepare contact data
      const contactData = {
        ...formData,
        recipientName,
        recipientRole,
        department,
        timestamp: new Date().toISOString()
      }

      console.log('Contact data prepared:', contactData)

      // Submit message through centralized system
      console.log('Submitting message through centralized system...')
      const result = await submitMessage(contactData)

      if (!result.success) {
        throw new Error(result.error || 'Failed to submit message')
      }

      console.log('Message submitted successfully:', result)

      // Call custom onSubmit handler if provided (for additional processing)
      if (onSubmit) {
        console.log('Calling custom onSubmit handler...')
        await onSubmit(contactData)
        console.log('onSubmit completed successfully')
      }

      console.log('Setting success status...')
      setSubmitStatus('success')
      setTimeout(() => {
        console.log('Closing modal...')
        onClose()
      }, 2500)
    } catch (error) {
      console.error('Error in form submission:', error)
      console.error('Error type:', typeof error)
      console.error('Error details:', error)

      let errorMessage = 'Failed to send message. Please try again.'

      if (error && error.message) {
        errorMessage = error.message
      } else if (typeof error === 'string') {
        errorMessage = error
      } else if (error && error.text) {
        errorMessage = error.text
      }

      setSubmitStatus('error')
      setErrorMessage(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
    backgroundColor: 'white',
    color: '#374151'
  }

  const focusStyle = {
    borderColor: '#2d5a27',
    outline: 'none',
    boxShadow: '0 0 0 3px rgba(45, 90, 39, 0.1)',
    backgroundColor: 'white',
    color: '#374151'
  }

  if (submitStatus === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{
          width: '4rem',
          height: '4rem',
          backgroundColor: '#10b981',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1rem',
          fontSize: '1.5rem'
        }}>
          ✓
        </div>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: '#2d5a27',
          marginBottom: '0.5rem'
        }}>
          Message Sent Successfully!
        </h3>
        <p style={{
          color: '#6b7280',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          Your message has been sent successfully to {recipientName}. They will get back to you soon via email.
        </p>
        <p style={{
          color: '#9ca3af',
          fontSize: '0.875rem',
          textAlign: 'center'
        }}>
          Please check your email for a confirmation copy.
        </p>
      </div>
    )
  }

  const isMobile = window.innerWidth < 768

  return (
    <form onSubmit={handleSubmit} style={{
      maxWidth: isMobile ? '100%' : '500px',
      width: '100%'
    }}>
      <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: '#2d5a27',
          marginBottom: '0.5rem'
        }}>
          Contact {recipientName}
        </h3>
        <p style={{
          color: '#6b7280',
          fontSize: '0.9rem'
        }}>
          {recipientRole}{department && ` - ${department}`}
        </p>
      </div>

      {!isEmailConfigured && (
        <div style={{
          marginBottom: '1.5rem',
          padding: '1rem',
          backgroundColor: '#fef3c7',
          border: '1px solid #f59e0b',
          borderRadius: '8px',
          fontSize: '0.875rem',
          textAlign: 'center'
        }}>
          <div style={{
            fontWeight: '600',
            color: '#92400e',
            marginBottom: '0.5rem'
          }}>
            ⚠️ Demo Mode
          </div>
          <div style={{ color: '#78350f' }}>
            Email functionality is not configured. Messages will be logged but not sent.
            <br />
            <span style={{ fontSize: '0.8rem' }}>
              Gmail integration is ready - no setup needed!
            </span>
          </div>
        </div>
      )}

      <div style={{
        display: 'grid',
        gap: isMobile ? '1.25rem' : '1rem',
        padding: isMobile ? '0' : '0 0.5rem'
      }}>
        <div>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.5rem'
          }}>
            Your Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb'
              e.target.style.boxShadow = 'none'
              e.target.style.backgroundColor = 'white'
              e.target.style.color = '#374151'
            }}
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.5rem'
          }}>
            Your Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb'
              e.target.style.boxShadow = 'none'
              e.target.style.backgroundColor = 'white'
              e.target.style.color = '#374151'
            }}
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.5rem'
          }}>
            Your Phone (Optional)
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb'
              e.target.style.boxShadow = 'none'
              e.target.style.backgroundColor = 'white'
              e.target.style.color = '#374151'
            }}
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.5rem'
          }}>
            Subject *
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb'
              e.target.style.boxShadow = 'none'
              e.target.style.backgroundColor = 'white'
              e.target.style.color = '#374151'
            }}
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.5rem'
          }}>
            Message *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            style={{
              ...inputStyle,
              resize: 'vertical',
              minHeight: '120px'
            }}
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb'
              e.target.style.boxShadow = 'none'
              e.target.style.backgroundColor = 'white'
              e.target.style.color = '#374151'
            }}
          />
        </div>
      </div>

      {submitStatus === 'error' && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          color: '#dc2626',
          fontSize: '0.875rem',
          textAlign: 'center'
        }}>
          <div style={{
            fontWeight: '600',
            marginBottom: '0.5rem'
          }}>
            ❌ Failed to Send Message
          </div>
          <div>
            {errorMessage}
          </div>
          <div style={{
            marginTop: '0.5rem',
            fontSize: '0.8rem',
            color: '#991b1b'
          }}>
            Please try again or contact the church directly if the problem persists.
          </div>
        </div>
      )}

      <div style={{
        display: 'flex',
        gap: '1rem',
        marginTop: '2rem',
        justifyContent: 'flex-end'
      }}>
        <button
          type="button"
          onClick={onClose}
          style={{
            padding: '0.75rem 1.5rem',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            backgroundColor: 'white',
            color: '#6b7280',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = '#d1d5db'
            e.target.style.color = '#374151'
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = '#e5e7eb'
            e.target.style.color = '#6b7280'
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: isSubmitting ? '#9ca3af' : '#2d5a27',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) {
              e.target.style.backgroundColor = '#1c3a1c'
            }
          }}
          onMouseLeave={(e) => {
            if (!isSubmitting) {
              e.target.style.backgroundColor = '#2d5a27'
            }
          }}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  )
}

export default ContactForm
