import React, { useState, useEffect } from 'react'
import useEquityBank from '../hooks/useEquityBank'

/**
 * Payment Modal Component - Equity Bank STK Push Integration
 * Beautiful, mobile-optimized modal for Equity Bank 247247 payments
 * Works with M-Pesa, Airtel Money, T-Kash, and other mobile money services
 */
const PaymentModal = ({
  isOpen,
  onClose,
  givingType = 'offering',
  onPaymentSuccess,
  onPaymentError
}) => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [amount, setAmount] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const {
    isLoading,
    error,
    paymentStatus,
    transactionId,
    initiatePayment,
    resetPayment,
    validatePhoneNumber,
    formatPhoneNumber,
    getStatusMessage,
    getStatusColor
  } = useEquityBank()

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      resetPayment()
      setPhoneNumber('')
      setAmount('')
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
        transactionId,
        paymentMethod: 'equity_bank'
      })
    } else if (paymentStatus === 'failed' && onPaymentError) {
      onPaymentError({
        amount,
        phoneNumber,
        givingType,
        error: error || 'Payment failed'
      })
    }
  }, [paymentStatus, onPaymentSuccess, onPaymentError, amount, phoneNumber, givingType, transactionId, error])

  const handlePayment = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      alert('Please enter a valid Kenyan phone number (e.g., 0712345678)')
      return
    }

    if (!amount || parseFloat(amount) < 1) {
      alert('Please enter a valid amount (minimum KES 1)')
      return
    }

    setIsProcessing(true)
    const result = await initiatePayment(phoneNumber, amount, givingType)
    
    if (!result.success) {
      setIsProcessing(false)
    }
  }

  const handleClose = () => {
    // Always allow closing the modal
    resetPayment()
    setIsProcessing(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '400px',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #2d5a27 0%, #1c3a1c 100%)',
          color: 'white',
          padding: '2rem 1.5rem 1.5rem',
          borderRadius: '20px 20px 0 0',
          position: 'relative'
        }}>
          <button
            onClick={handleClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              color: 'white',
              fontSize: '1.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
          >
            ×
          </button>
          
          <h2 style={{
            margin: '0 0 0.5rem 0',
            fontSize: '1.5rem',
            fontWeight: '700'
          }}>
            🏦 Equity Bank Payment
          </h2>
          <p style={{
            margin: '0',
            opacity: '0.9',
            fontSize: '0.9rem'
          }}>
            Secure payment via Equity Bank 247247 paybill
          </p>
          <p style={{
            margin: '0.5rem 0 0 0',
            opacity: '0.8',
            fontSize: '0.8rem',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '0.5rem',
            borderRadius: '8px'
          }}>
            💡 Works with M-Pesa, Airtel Money, T-Kash & other mobile money services
          </p>
        </div>

        {/* Demo Mode Notice */}
        {(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && (
          <div style={{
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            borderRadius: '10px',
            padding: '1rem',
            margin: '1.5rem',
            fontSize: '0.875rem',
            color: '#1e40af'
          }}>
            🚀 Demo Mode: This is a demonstration of the Equity Bank integration. No real payment will be processed.
          </div>
        )}

        {/* Payment Details */}
        <div style={{
          padding: '0 1.5rem',
          marginBottom: '1rem'
        }}>
          <div style={{
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Payment Type:</span>
              <span style={{ fontWeight: '600', textTransform: 'capitalize' }}>{givingType}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Payment Method:</span>
              <span style={{ fontWeight: '600' }}>Equity Bank 247247</span>
            </div>
          </div>
        </div>

        {/* Phone Number Input */}
        {!paymentStatus || paymentStatus === 'failed' ? (
          <div style={{ marginBottom: '2rem', padding: '0 1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: '#374151'
            }}>
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="0712345678"
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '1rem',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#2d5a27'
                e.target.style.boxShadow = '0 0 0 3px rgba(45, 90, 39, 0.1)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb'
                e.target.style.boxShadow = 'none'
              }}
            />
            <p style={{
              fontSize: '0.75rem',
              color: '#6b7280',
              margin: '0.5rem 0 0 0'
            }}>
              Enter your phone number (any mobile money service)
            </p>
          </div>
        ) : null}

        {/* Amount Input */}
        {!paymentStatus || paymentStatus === 'failed' ? (
          <div style={{ marginBottom: '2rem', padding: '0 1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: '#374151'
            }}>
              Amount (KES)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="1000"
              min="1"
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '1rem',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#2d5a27'
                e.target.style.boxShadow = '0 0 0 3px rgba(45, 90, 39, 0.1)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb'
                e.target.style.boxShadow = 'none'
              }}
            />
            
            {/* Quick Amount Buttons */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.5rem',
              marginTop: '1rem'
            }}>
              {[500, 1000, 2000, 5000, 10000, 20000].map(quickAmount => (
                <button
                  key={quickAmount}
                  onClick={() => setAmount(quickAmount.toString())}
                  style={{
                    padding: '0.5rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    backgroundColor: amount === quickAmount.toString() ? '#2d5a27' : 'white',
                    color: amount === quickAmount.toString() ? 'white' : '#374151',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {quickAmount.toLocaleString()}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {/* Status Message */}
        {paymentStatus && (
          <div style={{
            margin: '0 1.5rem 1.5rem',
            padding: '1rem',
            borderRadius: '10px',
            backgroundColor: paymentStatus === 'completed' ? 'rgba(16, 185, 129, 0.1)' :
                           paymentStatus === 'pending' ? 'rgba(245, 158, 11, 0.1)' :
                           'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${getStatusColor()}20`,
            color: getStatusColor()
          }}>
            {paymentStatus === 'pending' && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: `2px solid ${getStatusColor()}`,
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginRight: '0.5rem'
                }} />
                <span style={{ fontWeight: '600' }}>Processing...</span>
              </div>
            )}
            <p style={{ margin: '0', fontSize: '0.875rem', lineHeight: '1.4' }}>
              {getStatusMessage()}
            </p>
            {paymentStatus === 'pending' && transactionId && (
              <p style={{ 
                margin: '0.5rem 0 0 0', 
                fontSize: '0.75rem', 
                opacity: '0.8',
                fontFamily: 'monospace'
              }}>
                Transaction ID: {transactionId}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div style={{
          padding: '0 1.5rem 1.5rem',
          display: 'flex',
          gap: '1rem'
        }}>
          {!paymentStatus || paymentStatus === 'failed' ? (
            <>
              <button
                onClick={handlePayment}
                disabled={isLoading || isProcessing || !phoneNumber || !validatePhoneNumber(phoneNumber) || !amount}
                style={{
                  flex: 1,
                  padding: '1rem',
                  backgroundColor: '#2d5a27',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: isLoading || isProcessing ? 'not-allowed' : 'pointer',
                  opacity: isLoading || isProcessing || !phoneNumber || !amount ? 0.6 : 1,
                  transition: 'all 0.2s ease',
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
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                    Processing...
                  </>
                ) : (
                  <>
                    🏦 Pay via Equity Bank
                  </>
                )}
              </button>
              <button
                onClick={handleClose}
                style={{
                  padding: '1rem 1.5rem',
                  backgroundColor: 'transparent',
                  color: '#6b7280',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Cancel
              </button>
            </>
          ) : paymentStatus === 'completed' ? (
            <button
              onClick={handleClose}
              style={{
                flex: 1,
                padding: '1rem',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              ✅ Payment Complete
            </button>
          ) : (
            <button
              onClick={handleClose}
              style={{
                flex: 1,
                padding: '1rem',
                backgroundColor: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          )}
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default PaymentModal