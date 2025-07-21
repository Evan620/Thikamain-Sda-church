import React, { useState, useEffect } from 'react'
import { useMpesa } from '../hooks/useMpesa'

/**
 * M-PESA Payment Modal Component
 * Beautiful, mobile-optimized modal for M-PESA STK Push payments
 */
const MpesaPaymentModal = ({ 
  isOpen, 
  onClose, 
  amount, 
  givingType = 'offering',
  onPaymentSuccess,
  onPaymentError 
}) => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  
  const {
    isLoading,
    error,
    paymentStatus,
    initiatePayment,
    resetPayment,
    formatPhoneNumber,
    validatePhoneNumber,
    getStatusMessage,
    getStatusColor
  } = useMpesa()

  // Check if we're on mobile
  const isMobile = window.innerWidth < 768

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      resetPayment()
      setPhoneNumber('')
      setIsProcessing(false)
    }
  }, [isOpen, resetPayment])

  // Handle payment completion
  useEffect(() => {
    if (paymentStatus === 'completed' && onPaymentSuccess) {
      onPaymentSuccess({
        amount,
        phoneNumber,
        givingType,
        status: 'completed'
      })
    } else if (paymentStatus === 'failed' && onPaymentError) {
      onPaymentError({
        amount,
        phoneNumber,
        givingType,
        error: error
      })
    }
  }, [paymentStatus, onPaymentSuccess, onPaymentError, amount, phoneNumber, givingType, error])

  const handlePayment = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      alert('Please enter a valid Kenyan phone number (e.g., 0712345678)')
      return
    }

    setIsProcessing(true)
    
    const result = await initiatePayment(phoneNumber, amount, givingType)
    
    if (!result.success) {
      setIsProcessing(false)
    }
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '') // Remove non-digits
    setPhoneNumber(value)
  }

  const handleClose = () => {
    if (!isLoading && !isProcessing) {
      resetPayment()
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: isMobile ? '1rem' : '2rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: isMobile ? '1.5rem' : '2rem',
        maxWidth: isMobile ? '100%' : '500px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        position: 'relative',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
      }}>
        {/* Close Button */}
        {!isLoading && !isProcessing && (
          <button
            onClick={handleClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#6b7280',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
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

        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem auto',
            fontSize: '2rem',
            boxShadow: '0 8px 25px rgba(22, 163, 74, 0.3)'
          }}>
            📱
          </div>
          <h2 style={{
            fontSize: isMobile ? '1.5rem' : '1.75rem',
            fontWeight: '700',
            color: '#2d5a27',
            margin: '0 0 0.5rem 0'
          }}>
            M-PESA Payment
          </h2>
          <p style={{
            color: '#6b7280',
            fontSize: '1rem',
            margin: 0
          }}>
            Secure payment via M-PESA STK Push
          </p>
        </div>

        {/* Demo Mode Notice */}
        <div style={{
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '1.5rem',
          border: '1px solid rgba(245, 158, 11, 0.2)',
          textAlign: 'center'
        }}>
          <p style={{
            color: '#f59e0b',
            fontWeight: '600',
            margin: 0,
            fontSize: '0.9rem'
          }}>
            🚀 Demo Mode: This is a demonstration of the M-PESA integration. No real payment will be processed.
          </p>
        </div>

        {/* Payment Details */}
        <div style={{
          backgroundColor: 'rgba(22, 163, 74, 0.05)',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '2rem',
          border: '1px solid rgba(22, 163, 74, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.75rem'
          }}>
            <span style={{ fontWeight: '600', color: '#374151' }}>Amount:</span>
            <span style={{ 
              fontWeight: '700', 
              fontSize: '1.25rem',
              color: '#16a34a'
            }}>
              KES {amount?.toLocaleString()}
            </span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.75rem'
          }}>
            <span style={{ fontWeight: '600', color: '#374151' }}>Type:</span>
            <span style={{ 
              fontWeight: '600',
              color: '#6b7280',
              textTransform: 'capitalize'
            }}>
              {givingType}
            </span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontWeight: '600', color: '#374151' }}>Paybill:</span>
            <span style={{ fontWeight: '600', color: '#6b7280' }}>247247</span>
          </div>
        </div>

        {/* Phone Number Input */}
        {!paymentStatus || paymentStatus === 'failed' ? (
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem',
              fontSize: '0.9rem'
            }}>
              M-PESA Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="0712345678"
              maxLength="10"
              style={{
                width: '100%',
                padding: isMobile ? '14px 16px' : '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '10px',
                fontSize: isMobile ? '16px' : '1rem',
                outline: 'none',
                transition: 'all 0.3s ease',
                minHeight: isMobile ? '48px' : 'auto',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#16a34a'
                e.target.style.boxShadow = '0 0 0 3px rgba(22, 163, 74, 0.1)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb'
                e.target.style.boxShadow = 'none'
              }}
              disabled={isLoading || isProcessing}
            />
            <p style={{
              fontSize: '0.8rem',
              color: '#6b7280',
              marginTop: '0.5rem',
              margin: '0.5rem 0 0 0'
            }}>
              Enter your M-PESA registered phone number
            </p>
          </div>
        ) : null}

        {/* Status Message */}
        {paymentStatus && (
          <div style={{
            padding: '1rem',
            borderRadius: '10px',
            backgroundColor: paymentStatus === 'completed' ? 'rgba(16, 185, 129, 0.1)' : 
                           paymentStatus === 'pending' ? 'rgba(245, 158, 11, 0.1)' : 
                           'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${getStatusColor()}20`,
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            {paymentStatus === 'pending' && (
              <div style={{
                width: '32px',
                height: '32px',
                border: '3px solid #f59e0b',
                borderTop: '3px solid transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 1rem auto'
              }}></div>
            )}
            <p style={{
              color: getStatusColor(),
              fontWeight: '600',
              margin: 0,
              fontSize: '0.95rem'
            }}>
              {getStatusMessage()}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          flexDirection: isMobile ? 'column' : 'row'
        }}>
          {!paymentStatus || paymentStatus === 'failed' ? (
            <>
              <button
                onClick={handleClose}
                disabled={isLoading || isProcessing}
                style={{
                  flex: 1,
                  padding: isMobile ? '14px 20px' : '12px 20px',
                  borderRadius: '10px',
                  border: '2px solid #e5e7eb',
                  backgroundColor: 'white',
                  color: '#6b7280',
                  fontWeight: '600',
                  cursor: isLoading || isProcessing ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  minHeight: isMobile ? '48px' : 'auto',
                  opacity: isLoading || isProcessing ? 0.5 : 1
                }}
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                disabled={isLoading || isProcessing || !phoneNumber || !validatePhoneNumber(phoneNumber)}
                style={{
                  flex: 1,
                  padding: isMobile ? '14px 20px' : '12px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: '#16a34a',
                  color: 'white',
                  fontWeight: '600',
                  cursor: (isLoading || isProcessing || !phoneNumber || !validatePhoneNumber(phoneNumber)) ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  minHeight: isMobile ? '48px' : 'auto',
                  opacity: (isLoading || isProcessing || !phoneNumber || !validatePhoneNumber(phoneNumber)) ? 0.5 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                {isLoading || isProcessing ? (
                  <>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid white',
                      borderTop: '2px solid transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                    Processing...
                  </>
                ) : (
                  <>
                    📱 Pay with M-PESA
                  </>
                )}
              </button>
            </>
          ) : paymentStatus === 'completed' ? (
            <button
              onClick={handleClose}
              style={{
                width: '100%',
                padding: isMobile ? '14px 20px' : '12px 20px',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: '#16a34a',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                minHeight: isMobile ? '48px' : 'auto'
              }}
            >
              Done
            </button>
          ) : (
            <button
              onClick={handleClose}
              style={{
                width: '100%',
                padding: isMobile ? '14px 20px' : '12px 20px',
                borderRadius: '10px',
                border: '2px solid #e5e7eb',
                backgroundColor: 'white',
                color: '#6b7280',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                minHeight: isMobile ? '48px' : 'auto'
              }}
            >
              Close
            </button>
          )}
        </div>

        {/* CSS Animation */}
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  )
}

export default MpesaPaymentModal
