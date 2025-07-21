import { useState, useCallback } from 'react'
import mpesaService from '../services/mpesaService'

/**
 * Custom React Hook for M-PESA STK Push Integration
 * Handles payment state, loading, and error management
 */
export const useMpesa = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [paymentStatus, setPaymentStatus] = useState(null)
  const [checkoutRequestID, setCheckoutRequestID] = useState(null)

  /**
   * Reset payment state
   */
  const resetPayment = useCallback(() => {
    setIsLoading(false)
    setError(null)
    setPaymentStatus(null)
    setCheckoutRequestID(null)
  }, [])

  /**
   * Initiate M-PESA STK Push payment
   */
  const initiatePayment = useCallback(async (phoneNumber, amount, givingType = 'offering') => {
    try {
      setIsLoading(true)
      setError(null)
      setPaymentStatus('initiating')

      // Validate inputs
      if (!phoneNumber || !amount) {
        throw new Error('Phone number and amount are required')
      }

      if (amount < 1) {
        throw new Error('Amount must be at least KES 1')
      }

      // Validate phone number format
      const phoneRegex = /^(\+254|254|0)?[17]\d{8}$/
      if (!phoneRegex.test(phoneNumber.replace(/[\s\-]/g, ''))) {
        throw new Error('Please enter a valid Kenyan phone number')
      }

      // Initiate STK Push
      const result = await mpesaService.initiateSTKPush(phoneNumber, amount, givingType)

      if (result.success) {
        setCheckoutRequestID(result.checkoutRequestID)
        setPaymentStatus('pending')
        
        // Start polling for payment status
        pollPaymentStatus(result.checkoutRequestID)
        
        return {
          success: true,
          message: 'Payment request sent to your phone. Please check your phone and enter your M-PESA PIN.',
          checkoutRequestID: result.checkoutRequestID
        }
      } else {
        throw new Error(result.message || 'Payment initiation failed')
      }

    } catch (err) {
      setError(err.message)
      setPaymentStatus('failed')
      return {
        success: false,
        message: err.message
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Poll payment status
   */
  const pollPaymentStatus = useCallback(async (requestID, maxAttempts = 30) => {
    let attempts = 0
    
    const poll = async () => {
      try {
        attempts++
        
        const status = await mpesaService.querySTKPushStatus(requestID)
        
        if (status.ResponseCode === '0') {
          // Payment successful
          setPaymentStatus('completed')
          return {
            success: true,
            message: 'Payment completed successfully!',
            status: status
          }
        } else if (status.ResponseCode === '1032') {
          // Payment cancelled by user
          setPaymentStatus('cancelled')
          setError('Payment was cancelled')
          return {
            success: false,
            message: 'Payment was cancelled'
          }
        } else if (status.ResponseCode === '1037') {
          // Timeout
          setPaymentStatus('timeout')
          setError('Payment request timed out')
          return {
            success: false,
            message: 'Payment request timed out. Please try again.'
          }
        } else if (attempts < maxAttempts) {
          // Continue polling
          setTimeout(poll, 2000) // Poll every 2 seconds
        } else {
          // Max attempts reached
          setPaymentStatus('timeout')
          setError('Payment verification timed out')
          return {
            success: false,
            message: 'Payment verification timed out. Please contact support if money was deducted.'
          }
        }
      } catch (err) {
        console.error('Payment status polling error:', err)
        if (attempts < maxAttempts) {
          setTimeout(poll, 2000)
        } else {
          setPaymentStatus('error')
          setError('Unable to verify payment status')
        }
      }
    }
    
    // Start polling after 3 seconds
    setTimeout(poll, 3000)
  }, [])

  /**
   * Check payment status manually
   */
  const checkPaymentStatus = useCallback(async (requestID) => {
    try {
      setIsLoading(true)
      const status = await mpesaService.querySTKPushStatus(requestID)
      
      if (status.ResponseCode === '0') {
        setPaymentStatus('completed')
      } else if (status.ResponseCode === '1032') {
        setPaymentStatus('cancelled')
        setError('Payment was cancelled')
      } else {
        setPaymentStatus('pending')
      }
      
      return status
    } catch (err) {
      setError('Failed to check payment status')
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Format phone number for display
   */
  const formatPhoneNumber = useCallback((phoneNumber) => {
    const cleaned = phoneNumber.replace(/\D/g, '')
    
    if (cleaned.startsWith('254')) {
      return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`
    } else if (cleaned.startsWith('0')) {
      return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`
    }
    
    return phoneNumber
  }, [])

  /**
   * Validate phone number
   */
  const validatePhoneNumber = useCallback((phoneNumber) => {
    const phoneRegex = /^(\+254|254|0)?[17]\d{8}$/
    return phoneRegex.test(phoneNumber.replace(/[\s\-]/g, ''))
  }, [])

  /**
   * Get payment status message
   */
  const getStatusMessage = useCallback(() => {
    switch (paymentStatus) {
      case 'initiating':
        return 'Initiating payment...'
      case 'pending':
        return 'Payment request sent to your phone. Please check your phone and enter your M-PESA PIN.'
      case 'completed':
        return 'Payment completed successfully! Thank you for your generous giving.'
      case 'cancelled':
        return 'Payment was cancelled. You can try again if needed.'
      case 'timeout':
        return 'Payment request timed out. Please try again.'
      case 'failed':
        return error || 'Payment failed. Please try again.'
      default:
        return ''
    }
  }, [paymentStatus, error])

  /**
   * Get payment status color
   */
  const getStatusColor = useCallback(() => {
    switch (paymentStatus) {
      case 'initiating':
      case 'pending':
        return '#f59e0b' // Orange
      case 'completed':
        return '#10b981' // Green
      case 'cancelled':
      case 'timeout':
      case 'failed':
        return '#ef4444' // Red
      default:
        return '#6b7280' // Gray
    }
  }, [paymentStatus])

  return {
    // State
    isLoading,
    error,
    paymentStatus,
    checkoutRequestID,
    
    // Actions
    initiatePayment,
    checkPaymentStatus,
    resetPayment,
    
    // Utilities
    formatPhoneNumber,
    validatePhoneNumber,
    getStatusMessage,
    getStatusColor
  }
}

export default useMpesa
