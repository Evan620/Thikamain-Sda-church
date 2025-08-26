import { useState, useCallback } from 'react'
import equityBankService from '../services/equityBankService'

/**
 * Custom React Hook for Equity Bank STK Push Integration
 * Handles payment state, loading, and error management
 * Compatible with existing M-Pesa hook interface
 */
export const useEquityBank = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [paymentStatus, setPaymentStatus] = useState(null)
  const [transactionId, setTransactionId] = useState(null)

  /**
   * Reset payment state
   */
  const resetPayment = useCallback(() => {
    setIsLoading(false)
    setError(null)
    setPaymentStatus(null)
    setTransactionId(null)
  }, [])

  /**
   * Validate phone number format
   */
  const validatePhoneNumber = useCallback((phoneNumber) => {
    const kenyanPhoneRegex = /^(?:\+254|254|0)?([17]\d{8})$/
    return kenyanPhoneRegex.test(phoneNumber.replace(/[\s\-]/g, ''))
  }, [])

  /**
   * Format phone number for display
   */
  const formatPhoneNumber = useCallback((phoneNumber) => {
    const cleaned = phoneNumber.replace(/[\s\-\+]/g, '')
    if (cleaned.startsWith('254')) {
      return '+254 ' + cleaned.substring(3, 6) + ' ' + cleaned.substring(6, 9) + ' ' + cleaned.substring(9)
    } else if (cleaned.startsWith('0')) {
      return cleaned.substring(0, 4) + ' ' + cleaned.substring(4, 7) + ' ' + cleaned.substring(7)
    }
    return phoneNumber
  }, [])

  /**
   * Initiate Equity Bank STK Push payment
   */
  const initiatePayment = useCallback(async (phoneNumber, amount, givingType = 'offering') => {
    try {
      setIsLoading(true)
      setError(null)
      setPaymentStatus('initiating')

      console.log('Initiating Equity Bank payment:', { phoneNumber, amount, givingType })

      const result = await equityBankService.initiateSTKPush(phoneNumber, amount, givingType)

      if (result.success) {
        setTransactionId(result.transactionId)
        setPaymentStatus('pending')

        // Start polling for payment status
        pollPaymentStatus(result.transactionId)

        return {
          success: true,
          message: 'Payment request sent to your phone. Please check your phone and complete the payment.',
          transactionId: result.transactionId
        }
      } else {
        throw new Error(result.message || 'Payment initiation failed')
      }

    } catch (err) {
      console.error('Payment initiation error:', err)
      setError(err.message)
      setPaymentStatus('failed')
      return {
        success: false,
        message: err.message,
        error: err
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Poll payment status from Equity Bank
   */
  const pollPaymentStatus = useCallback(async (txnId, maxAttempts = 30) => {
    let attempts = 0

    const poll = async () => {
      try {
        attempts++
        console.log(`Equity Bank payment status check (attempt ${attempts}):`)

        const status = await equityBankService.queryPaymentStatus(txnId)
        console.log(`Payment status response:`, status)

        if (status.status === 'SUCCESS' || status.responseCode === '0') {
          // Payment successful - only process once
          if (paymentStatus !== 'completed') {
            setPaymentStatus('completed')

            // Save payment record to database
            try {
              const paymentData = {
                transactionId: txnId,
                amount: status.amount || 0,
                phoneNumber: status.phoneNumber || '',
                status: 'success',
                responseCode: status.responseCode,
                responseDescription: status.responseDescription,
                givingType: 'offering' // This should come from the original request
              }

              await equityBankService.savePaymentRecord(paymentData)
              console.log('Equity Bank payment record saved successfully')
            } catch (saveError) {
              console.error('Failed to save payment record:', saveError)
              // Don't fail the payment flow for database save errors
            }

            return {
              success: true,
              message: 'Payment completed successfully via Equity Bank!',
              status: status
            }
          }
        } else if (status.status === 'FAILED' || status.responseCode === '1032') {
          // Payment cancelled or failed
          setPaymentStatus('cancelled')
          setError('Payment was cancelled or failed')
          return {
            success: false,
            message: 'Payment was cancelled or failed'
          }
        } else if (status.status === 'PENDING' || status.responseCode === '1037') {
          // Payment still pending
          if (attempts < maxAttempts) {
            // Continue polling
            setTimeout(poll, 3000) // Poll every 3 seconds
          } else {
            // Max attempts reached
            setPaymentStatus('timeout')
            setError('Payment request timed out')
            return {
              success: false,
              message: 'Payment request timed out. Please try again.'
            }
          }
        } else {
          // Unknown status, continue polling up to max attempts
          if (attempts < maxAttempts) {
            setTimeout(poll, 3000)
          } else {
            // Max attempts reached
            setPaymentStatus('timeout')
            setError('Payment verification timed out')
            return {
              success: false,
              message: 'Payment verification timed out. Please contact support if money was deducted.'
            }
          }
        }
      } catch (err) {
        console.error('Payment status polling error:', err)
        if (attempts < maxAttempts) {
          setTimeout(poll, 3000) // Retry after 3 seconds
        } else {
          setPaymentStatus('error')
          setError('Unable to verify payment status')
        }
      }
    }

    // Start polling
    setTimeout(poll, 3000) // Wait 3 seconds before first check
  }, [paymentStatus])

  /**
   * Check payment status manually
   */
  const checkPaymentStatus = useCallback(async (txnId) => {
    try {
      setIsLoading(true)
      const status = await equityBankService.queryPaymentStatus(txnId)

      if (status.status === 'SUCCESS' || status.responseCode === '0') {
        setPaymentStatus('completed')
      } else if (status.status === 'FAILED' || status.responseCode === '1032') {
        setPaymentStatus('cancelled')
        setError('Payment was cancelled or failed')
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
   * Get payment status message
   */
  const getStatusMessage = useCallback(() => {
    switch (paymentStatus) {
      case 'initiating':
        return 'Initiating payment via Equity Bank...'
      case 'pending':
        return 'Payment request sent to your phone. Please check your phone and complete the payment using any mobile money service.'
      case 'completed':
        return 'Payment completed successfully via Equity Bank! Thank you for your generous giving.'
      case 'cancelled':
        return 'Payment was cancelled. You can try again if needed.'
      case 'timeout':
        return 'Payment request timed out. Please try again.'
      case 'failed':
        return error || 'Payment failed. Please try again.'
      default:
        return 'Ready to process payment'
    }
  }, [paymentStatus, error])

  /**
   * Get payment status color for UI
   */
  const getStatusColor = useCallback(() => {
    switch (paymentStatus) {
      case 'initiating':
      case 'pending':
        return '#f59e0b' // Orange
      case 'completed':
        return '#10b981' // Green
      case 'cancelled':
      case 'failed':
      case 'timeout':
      case 'error':
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
    transactionId,
    
    // Actions
    initiatePayment,
    checkPaymentStatus,
    resetPayment,
    
    // Utilities
    validatePhoneNumber,
    formatPhoneNumber,
    getStatusMessage,
    getStatusColor
  }
}

export default useEquityBank