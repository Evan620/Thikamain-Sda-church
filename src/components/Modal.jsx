import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'

// Add CSS animations
const modalStyles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: scale(0.9) translateY(-20px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`

// Inject styles if not already present
if (typeof document !== 'undefined' && !document.getElementById('modal-styles')) {
  const styleSheet = document.createElement('style')
  styleSheet.id = 'modal-styles'
  styleSheet.textContent = modalStyles
  document.head.appendChild(styleSheet)
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  showCloseButton = true
}) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const getSizeStyles = () => {
    const isMobile = window.innerWidth < 768
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024

    switch (size) {
      case 'small':
        return {
          maxWidth: isMobile ? '95vw' : '400px',
          width: isMobile ? '95%' : '90%',
          margin: isMobile ? '0.5rem' : '1rem'
        }
      case 'large':
        return {
          maxWidth: isMobile ? '95vw' : isTablet ? '700px' : '800px',
          width: '95%',
          margin: isMobile ? '0.5rem' : '1rem'
        }
      case 'full':
        return {
          maxWidth: '95vw',
          width: '95%',
          height: isMobile ? '95vh' : '90vh',
          margin: '0.5rem'
        }
      default:
        return {
          maxWidth: isMobile ? '95vw' : isTablet ? '550px' : '600px',
          width: isMobile ? '95%' : '90%',
          margin: isMobile ? '0.5rem' : '1rem'
        }
    }
  }

  // Create modal content
  const modalContent = (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '1rem',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        animation: isOpen ? 'fadeIn 0.3s ease-out' : 'fadeOut 0.3s ease-in',
        transition: 'all 0.3s ease'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3), 0 10px 20px rgba(0, 0, 0, 0.15)',
          position: 'relative',
          maxHeight: window.innerWidth < 768 ? '95vh' : '90vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(-20px)',
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          ...getSizeStyles()
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: window.innerWidth < 768 ? '1rem 1.5rem' : '1.5rem 2rem',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#f8fafc'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#2d5a27',
            margin: 0
          }}>
            {title}
          </h2>
          
          {showCloseButton && (
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#6b7280',
                padding: '0.5rem',
                borderRadius: '50%',
                width: '2.5rem',
                height: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f3f4f6'
                e.target.style.color = '#374151'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent'
                e.target.style.color = '#6b7280'
              }}
            >
              ×
            </button>
          )}
        </div>

        {/* Content */}
        <div style={{
          padding: window.innerWidth < 768 ? '1.5rem' : '2rem',
          overflowY: 'auto',
          flex: 1
        }}>
          {children}
        </div>
      </div>
    </div>
  )

  // Render modal using portal to ensure it appears above everything
  return createPortal(modalContent, document.body)
}

export default Modal
