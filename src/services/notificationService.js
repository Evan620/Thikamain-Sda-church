// Notification Service
// Thika Main SDA Church - Automated Notification System

import smsService from './smsService'
import { submitMessage } from './centralizedMessagingService'

/**
 * Notification Service Class
 * Handles automated notifications via SMS and Email
 */
class NotificationService {
  constructor() {
    this.config = {
      enabled: import.meta.env.VITE_NOTIFICATIONS_ENABLED !== 'false',
      demoMode: import.meta.env.VITE_NOTIFICATIONS_DEMO_MODE === 'true'
    }
  }

  /**
   * Send payment confirmation notification
   */
  async sendPaymentConfirmation(paymentData) {
    try {
      const { memberName, phoneNumber, amount, paymentType, transactionId } = paymentData
      
      if (!memberName || !phoneNumber || !amount || !paymentType) {
        throw new Error('Missing required payment data')
      }

      // Format amount
      const formattedAmount = new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES',
        minimumFractionDigits: 0
      }).format(amount)

      // Create SMS message
      const smsMessage = `Dear ${memberName}, thank you for your ${paymentType} of ${formattedAmount}. ${transactionId ? `Ref: ${transactionId}. ` : ''}God bless you! - Thika Main SDA Church`

      // Send SMS notification
      const smsResult = await smsService.sendSMS(phoneNumber, smsMessage)
      
      // Log notification
      console.log('Payment confirmation sent:', {
        member: memberName,
        phone: phoneNumber,
        amount: formattedAmount,
        type: paymentType,
        success: smsResult.success
      })

      return {
        success: smsResult.success,
        message: smsResult.success 
          ? 'Payment confirmation sent successfully'
          : 'Failed to send payment confirmation',
        data: smsResult
      }

    } catch (error) {
      console.error('Payment confirmation error:', error)
      return {
        success: false,
        message: error.message,
        error: error
      }
    }
  }

  /**
   * Send event reminder notifications
   */
  async sendEventReminder(eventData) {
    try {
      const { eventName, eventDate, eventTime, location, attendees } = eventData
      
      if (!eventName || !eventDate || !attendees || attendees.length === 0) {
        throw new Error('Missing required event data')
      }

      // Format date
      const formattedDate = new Date(eventDate).toLocaleDateString('en-KE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })

      // Create SMS message
      const smsMessage = `Reminder: ${eventName} is tomorrow (${formattedDate}) at ${eventTime || 'TBA'}. ${location ? `Location: ${location}. ` : ''}See you there! - Thika Main SDA Church`

      // Extract phone numbers from attendees
      const phoneNumbers = attendees.map(attendee => {
        return typeof attendee === 'string' ? attendee : attendee.phone
      }).filter(phone => phone)

      if (phoneNumbers.length === 0) {
        throw new Error('No valid phone numbers found in attendees')
      }

      // Send bulk SMS
      const smsResult = await smsService.sendSMS(phoneNumbers, smsMessage, { allowLongMessages: true })
      
      // Log notification
      console.log('Event reminder sent:', {
        event: eventName,
        date: formattedDate,
        recipients: phoneNumbers.length,
        success: smsResult.success
      })

      return {
        success: smsResult.success,
        message: smsResult.success 
          ? `Event reminder sent to ${smsResult.successful} attendees`
          : 'Failed to send event reminder',
        data: smsResult
      }

    } catch (error) {
      console.error('Event reminder error:', error)
      return {
        success: false,
        message: error.message,
        error: error
      }
    }
  }

  /**
   * Send birthday wishes
   */
  async sendBirthdayWishes(memberData) {
    try {
      const { memberName, phoneNumber, age } = memberData
      
      if (!memberName || !phoneNumber) {
        throw new Error('Missing required member data')
      }

      // Create SMS message
      const smsMessage = `Happy Birthday ${memberName}! 🎉 ${age ? `Wishing you a blessed ${age}th birthday. ` : ''}May God bless you abundantly on your special day and always. - Thika Main SDA Church`

      // Send SMS notification
      const smsResult = await smsService.sendSMS(phoneNumber, smsMessage, { allowLongMessages: true })
      
      // Log notification
      console.log('Birthday wishes sent:', {
        member: memberName,
        phone: phoneNumber,
        success: smsResult.success
      })

      return {
        success: smsResult.success,
        message: smsResult.success 
          ? 'Birthday wishes sent successfully'
          : 'Failed to send birthday wishes',
        data: smsResult
      }

    } catch (error) {
      console.error('Birthday wishes error:', error)
      return {
        success: false,
        message: error.message,
        error: error
      }
    }
  }

  /**
   * Send attendance follow-up
   */
  async sendAttendanceFollowUp(memberData) {
    try {
      const { memberName, phoneNumber, missedServices } = memberData
      
      if (!memberName || !phoneNumber) {
        throw new Error('Missing required member data')
      }

      // Create SMS message
      const smsMessage = `Dear ${memberName}, we missed you at church${missedServices ? ` for the past ${missedServices} service(s)` : ''}. We hope you're doing well and would love to see you soon. Please let us know if you need any support. - Thika Main SDA Church`

      // Send SMS notification
      const smsResult = await smsService.sendSMS(phoneNumber, smsMessage, { allowLongMessages: true })
      
      // Log notification
      console.log('Attendance follow-up sent:', {
        member: memberName,
        phone: phoneNumber,
        missedServices: missedServices,
        success: smsResult.success
      })

      return {
        success: smsResult.success,
        message: smsResult.success 
          ? 'Attendance follow-up sent successfully'
          : 'Failed to send attendance follow-up',
        data: smsResult
      }

    } catch (error) {
      console.error('Attendance follow-up error:', error)
      return {
        success: false,
        message: error.message,
        error: error
      }
    }
  }

  /**
   * Send general announcement
   */
  async sendAnnouncement(announcementData) {
    try {
      const { title, message, recipients, urgency } = announcementData
      
      if (!title || !message || !recipients || recipients.length === 0) {
        throw new Error('Missing required announcement data')
      }

      // Create SMS message with urgency indicator
      const urgencyPrefix = urgency === 'urgent' ? '🚨 URGENT: ' : urgency === 'high' ? '⚠️ IMPORTANT: ' : ''
      const smsMessage = `${urgencyPrefix}${title}\n\n${message}\n\n- Thika Main SDA Church`

      // Extract phone numbers
      const phoneNumbers = recipients.map(recipient => {
        return typeof recipient === 'string' ? recipient : recipient.phone
      }).filter(phone => phone)

      if (phoneNumbers.length === 0) {
        throw new Error('No valid phone numbers found in recipients')
      }

      // Send bulk SMS
      const smsResult = await smsService.sendSMS(phoneNumbers, smsMessage, { allowLongMessages: true })
      
      // Log notification
      console.log('Announcement sent:', {
        title: title,
        urgency: urgency,
        recipients: phoneNumbers.length,
        success: smsResult.success
      })

      return {
        success: smsResult.success,
        message: smsResult.success 
          ? `Announcement sent to ${smsResult.successful} recipients`
          : 'Failed to send announcement',
        data: smsResult
      }

    } catch (error) {
      console.error('Announcement error:', error)
      return {
        success: false,
        message: error.message,
        error: error
      }
    }
  }

  /**
   * Send service reminder
   */
  async sendServiceReminder(serviceData) {
    try {
      const { serviceName, serviceDate, serviceTime, recipients } = serviceData
      
      if (!serviceName || !serviceDate || !recipients || recipients.length === 0) {
        throw new Error('Missing required service data')
      }

      // Format date
      const formattedDate = new Date(serviceDate).toLocaleDateString('en-KE', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      })

      // Create SMS message
      const smsMessage = `Reminder: ${serviceName} is tomorrow (${formattedDate}) at ${serviceTime || '9:00 AM'}. We look forward to worshipping with you! - Thika Main SDA Church`

      // Extract phone numbers
      const phoneNumbers = recipients.map(recipient => {
        return typeof recipient === 'string' ? recipient : recipient.phone
      }).filter(phone => phone)

      if (phoneNumbers.length === 0) {
        throw new Error('No valid phone numbers found in recipients')
      }

      // Send bulk SMS
      const smsResult = await smsService.sendSMS(phoneNumbers, smsMessage)
      
      // Log notification
      console.log('Service reminder sent:', {
        service: serviceName,
        date: formattedDate,
        recipients: phoneNumbers.length,
        success: smsResult.success
      })

      return {
        success: smsResult.success,
        message: smsResult.success 
          ? `Service reminder sent to ${smsResult.successful} members`
          : 'Failed to send service reminder',
        data: smsResult
      }

    } catch (error) {
      console.error('Service reminder error:', error)
      return {
        success: false,
        message: error.message,
        error: error
      }
    }
  }

  /**
   * Get notification service status
   */
  getServiceStatus() {
    return {
      enabled: this.config.enabled,
      demoMode: this.config.demoMode,
      smsStatus: smsService.getServiceStatus()
    }
  }
}

// Create and export singleton instance
const notificationService = new NotificationService()
export default notificationService

// Named exports for specific functions
export const {
  sendPaymentConfirmation,
  sendEventReminder,
  sendBirthdayWishes,
  sendAttendanceFollowUp,
  sendAnnouncement,
  sendServiceReminder,
  getServiceStatus
} = notificationService
