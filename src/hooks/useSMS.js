import { useState, useCallback } from 'react'
import smsService from '../services/smsService'

/**
 * Custom React Hook for SMS functionality
 * Provides SMS sending capabilities with state management
 */
export const useSMS = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastResult, setLastResult] = useState(null)

  /**
   * Reset SMS state
   */
  const resetSMS = useCallback(() => {
    setIsLoading(false)
    setError(null)
    setLastResult(null)
  }, [])

  /**
   * Send SMS to single or multiple recipients
   */
  const sendSMS = useCallback(async (phoneNumbers, message, options = {}) => {
    try {
      setIsLoading(true)
      setError(null)

      // Validate inputs
      if (!phoneNumbers || !message) {
        throw new Error('Phone numbers and message are required')
      }

      if (message.trim().length === 0) {
        throw new Error('Message cannot be empty')
      }

      // Send SMS using service
      const result = await smsService.sendSMS(phoneNumbers, message, options)
      
      setLastResult(result)
      
      if (!result.success) {
        throw new Error(result.error || 'SMS sending failed')
      }

      return {
        success: true,
        message: `SMS sent successfully to ${result.successful} recipient(s)`,
        data: result
      }

    } catch (err) {
      const errorMessage = err.message || 'Failed to send SMS'
      setError(errorMessage)
      return {
        success: false,
        message: errorMessage,
        error: err
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Send bulk SMS to multiple recipients
   */
  const sendBulkSMS = useCallback(async (recipients, message, options = {}) => {
    try {
      setIsLoading(true)
      setError(null)

      // Validate inputs
      if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
        throw new Error('Recipients array is required and cannot be empty')
      }

      if (!message || message.trim().length === 0) {
        throw new Error('Message cannot be empty')
      }

      // Send bulk SMS using service
      const result = await smsService.sendBulkSMS(recipients, message, options)
      
      setLastResult(result)
      
      if (!result.success) {
        throw new Error(result.error || 'Bulk SMS sending failed')
      }

      return {
        success: true,
        message: `Bulk SMS sent successfully to ${result.successful} out of ${result.totalSent} recipient(s)`,
        data: result
      }

    } catch (err) {
      const errorMessage = err.message || 'Failed to send bulk SMS'
      setError(errorMessage)
      return {
        success: false,
        message: errorMessage,
        error: err
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Send SMS to church members by group
   */
  const sendToGroup = useCallback(async (groupType, message, options = {}) => {
    try {
      setIsLoading(true)
      setError(null)

      // Mock member data - in real implementation, this would fetch from database
      const memberGroups = {
        all: [
          '+254712345678', '+254723456789', '+254734567890',
          '+254745678901', '+254756789012'
        ],
        youth: [
          '+254712345678', '+254723456789'
        ],
        elders: [
          '+254734567890', '+254745678901'
        ],
        deacons: [
          '+254756789012'
        ],
        choir: [
          '+254712345678', '+254734567890', '+254756789012'
        ]
      }

      const phoneNumbers = memberGroups[groupType]
      if (!phoneNumbers || phoneNumbers.length === 0) {
        throw new Error(`No members found in group: ${groupType}`)
      }

      // Send SMS to group
      const result = await smsService.sendSMS(phoneNumbers, message, options)
      
      setLastResult(result)
      
      if (!result.success) {
        throw new Error(result.error || 'Group SMS sending failed')
      }

      return {
        success: true,
        message: `SMS sent to ${groupType} group: ${result.successful} out of ${result.totalSent} recipient(s)`,
        data: result
      }

    } catch (err) {
      const errorMessage = err.message || 'Failed to send group SMS'
      setError(errorMessage)
      return {
        success: false,
        message: errorMessage,
        error: err
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Send automated SMS notifications
   */
  const sendNotification = useCallback(async (type, data) => {
    try {
      setIsLoading(true)
      setError(null)

      let message = ''
      let recipients = []

      switch (type) {
        case 'payment_confirmation':
          message = `Dear ${data.memberName}, thank you for your ${data.paymentType} of KES ${data.amount}. God bless you! - Thika Main SDA Church`
          recipients = [data.phoneNumber]
          break

        case 'event_reminder':
          message = `Reminder: ${data.eventName} is tomorrow at ${data.time}. Location: ${data.location}. See you there! - Thika Main SDA Church`
          recipients = data.attendees || []
          break

        case 'birthday_wishes':
          message = `Happy Birthday ${data.memberName}! 🎉 May God bless you abundantly on your special day. - Thika Main SDA Church`
          recipients = [data.phoneNumber]
          break

        case 'attendance_followup':
          message = `Dear ${data.memberName}, we missed you at church. We hope you're doing well. Please let us know if you need any support. - Thika Main SDA Church`
          recipients = [data.phoneNumber]
          break

        default:
          throw new Error(`Unknown notification type: ${type}`)
      }

      if (!message || recipients.length === 0) {
        throw new Error('Invalid notification data')
      }

      // Send notification SMS
      const result = await smsService.sendSMS(recipients, message, { allowLongMessages: true })
      
      setLastResult(result)
      
      if (!result.success) {
        throw new Error(result.error || 'Notification SMS sending failed')
      }

      return {
        success: true,
        message: `${type.replace('_', ' ')} notification sent successfully`,
        data: result
      }

    } catch (err) {
      const errorMessage = err.message || 'Failed to send notification'
      setError(errorMessage)
      return {
        success: false,
        message: errorMessage,
        error: err
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Test SMS service connection
   */
  const testConnection = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await smsService.testConnection()
      
      if (!result.success) {
        throw new Error(result.message)
      }

      return {
        success: true,
        message: result.message,
        data: result
      }

    } catch (err) {
      const errorMessage = err.message || 'Connection test failed'
      setError(errorMessage)
      return {
        success: false,
        message: errorMessage,
        error: err
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Get SMS service status
   */
  const getServiceStatus = useCallback(() => {
    return smsService.getServiceStatus()
  }, [])

  /**
   * Format phone number
   */
  const formatPhoneNumber = useCallback((phoneNumber) => {
    return smsService.formatPhoneNumber(phoneNumber)
  }, [])

  /**
   * Validate phone number
   */
  const validatePhoneNumber = useCallback((phoneNumber) => {
    return smsService.validatePhoneNumber(phoneNumber)
  }, [])

  /**
   * Get character count and SMS count for message
   */
  const getMessageInfo = useCallback((message) => {
    const charCount = message.length
    const smsCount = Math.ceil(charCount / 160)
    const remainingChars = charCount <= 160 ? 160 - charCount : 160 - (charCount % 160)
    
    return {
      characterCount: charCount,
      smsCount: smsCount,
      remainingCharacters: remainingChars,
      isLongMessage: charCount > 160
    }
  }, [])

  return {
    // State
    isLoading,
    error,
    lastResult,
    
    // Actions
    sendSMS,
    sendBulkSMS,
    sendToGroup,
    sendNotification,
    testConnection,
    resetSMS,
    
    // Utilities
    getServiceStatus,
    formatPhoneNumber,
    validatePhoneNumber,
    getMessageInfo
  }
}

export default useSMS
