import React, { useState } from 'react'
import Modal from './Modal'
import ContactForm from './ContactForm'
import { sendContactEmail, validateEmailConfig } from '../services/emailService'

const ContactButton = ({ 
  recipientName, 
  recipientRole, 
  department = null,
  buttonText = "Contact",
  buttonStyle = "primary",
  size = "medium",
  onSubmit
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = async (contactData) => {
    try {
      console.log('Contact form submitted:', contactData)

      // Check if EmailJS is configured
      if (!validateEmailConfig()) {
        console.warn('EmailJS not configured - email will not be sent')
        // Still show success for demo purposes
        return
      }

      // Send email using EmailJS
      await sendContactEmail(contactData)

      // Call custom onSubmit handler if provided
      if (onSubmit) {
        await onSubmit(contactData)
      }

      console.log('Email sent successfully!')

    } catch (error) {
      console.error('Failed to send email:', error)
      throw error // Re-throw to let ContactForm handle the error
    }
  }

  const getButtonStyles = () => {
    const baseStyles = {
      border: 'none',
      borderRadius: '8px',
      fontSize: '0.875rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      textDecoration: 'none'
    }

    const sizeStyles = {
      small: {
        padding: '0.5rem 1rem',
        fontSize: '0.8rem'
      },
      medium: {
        padding: '0.75rem 1.25rem',
        fontSize: '0.875rem'
      },
      large: {
        padding: '1rem 1.5rem',
        fontSize: '1rem'
      }
    }

    const styleVariants = {
      primary: {
        backgroundColor: '#2d5a27',
        color: 'white',
        hoverBackgroundColor: '#1c3a1c'
      },
      secondary: {
        backgroundColor: 'transparent',
        color: '#2d5a27',
        border: '2px solid #2d5a27',
        hoverBackgroundColor: '#2d5a27',
        hoverColor: 'white'
      },
      outline: {
        backgroundColor: 'transparent',
        color: '#6b7280',
        border: '1px solid #d1d5db',
        hoverBackgroundColor: '#f9fafb',
        hoverColor: '#374151'
      },
      minimal: {
        backgroundColor: 'transparent',
        color: '#2d5a27',
        padding: '0.5rem',
        hoverBackgroundColor: 'rgba(45, 90, 39, 0.1)'
      }
    }

    return {
      ...baseStyles,
      ...sizeStyles[size],
      ...styleVariants[buttonStyle]
    }
  }

  const buttonStyles = getButtonStyles()

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsModalOpen(true)
        }}
        style={{
          ...buttonStyles,
          position: 'relative',
          zIndex: 10
        }}
        onMouseEnter={(e) => {
          if (buttonStyles.hoverBackgroundColor) {
            e.target.style.backgroundColor = buttonStyles.hoverBackgroundColor
          }
          if (buttonStyles.hoverColor) {
            e.target.style.color = buttonStyles.hoverColor
          }
          e.target.style.transform = 'translateY(-1px)'
          e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)'
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = buttonStyles.backgroundColor
          e.target.style.color = buttonStyles.color
          e.target.style.transform = 'translateY(0)'
          e.target.style.boxShadow = 'none'
        }}
      >
        <svg 
          style={{ width: '1rem', height: '1rem' }} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
          />
        </svg>
        {buttonText}
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Send Message"
        size="medium"
      >
        <ContactForm
          recipientName={recipientName}
          recipientRole={recipientRole}
          department={department}
          onSubmit={handleSubmit}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  )
}

export default ContactButton
