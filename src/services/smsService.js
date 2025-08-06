// SMS Service Integration
// Thika Main SDA Church - SMS Communication Service
// Supports Africa's Talking and Twilio

/**
 * SMS Service Class
 * Handles SMS sending with multiple provider support
 */
class SMSService {
  constructor() {
    // SMS Configuration from environment variables
    this.config = {
      // Provider selection
      provider: import.meta.env.VITE_SMS_PROVIDER || 'africas_talking',
      
      // Africa's Talking Configuration
      africasTalking: {
        apiKey: import.meta.env.VITE_AFRICAS_TALKING_API_KEY || 'demo_api_key',
        username: import.meta.env.VITE_AFRICAS_TALKING_USERNAME || 'sandbox',
        senderId: import.meta.env.VITE_SMS_SENDER_ID || 'THIKA_SDA',
        baseURL: 'https://api.africastalking.com/version1'
      },
      
      // Twilio Configuration
      twilio: {
        accountSid: import.meta.env.VITE_TWILIO_ACCOUNT_SID || 'demo_account_sid',
        authToken: import.meta.env.VITE_TWILIO_AUTH_TOKEN || 'demo_auth_token',
        fromNumber: import.meta.env.VITE_TWILIO_FROM_NUMBER || '+1234567890'
      },
      
      // General settings
      enabled: import.meta.env.VITE_SMS_ENABLED !== 'false',
      demoMode: import.meta.env.VITE_SMS_DEMO_MODE === 'true'
    }
  }

  /**
   * Check if SMS service is properly configured
   */
  isConfigured() {
    if (!this.config.enabled) return false
    
    if (this.config.provider === 'africas_talking') {
      return this.config.africasTalking.apiKey !== 'demo_api_key' && 
             this.config.africasTalking.username !== 'sandbox'
    } else if (this.config.provider === 'twilio') {
      return this.config.twilio.accountSid !== 'demo_account_sid' && 
             this.config.twilio.authToken !== 'demo_auth_token'
    }
    
    return false
  }

  /**
   * Format phone number to international format
   */
  formatPhoneNumber(phoneNumber) {
    // Remove any spaces, dashes, or plus signs
    let formatted = phoneNumber.replace(/[\s\-\+]/g, '')
    
    // If starts with 0, replace with 254 (Kenya country code)
    if (formatted.startsWith('0')) {
      formatted = '254' + formatted.substring(1)
    }
    
    // If doesn't start with 254, add it
    if (!formatted.startsWith('254')) {
      formatted = '254' + formatted
    }
    
    // Add + prefix for international format
    return '+' + formatted
  }

  /**
   * Validate phone number format
   */
  validatePhoneNumber(phoneNumber) {
    const formatted = this.formatPhoneNumber(phoneNumber)
    // Kenyan phone numbers: +254 followed by 9 digits
    const phoneRegex = /^\+254[17]\d{8}$/
    return phoneRegex.test(formatted)
  }

  /**
   * Send SMS using Africa's Talking
   */
  async sendSMSAfricasTalking(phoneNumbers, message) {
    try {
      const recipients = Array.isArray(phoneNumbers) ? phoneNumbers.join(',') : phoneNumbers
      
      const payload = {
        username: this.config.africasTalking.username,
        to: recipients,
        message: message,
        from: this.config.africasTalking.senderId
      }

      const response = await fetch(`${this.config.africasTalking.baseURL}/messaging`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'apiKey': this.config.africasTalking.apiKey
        },
        body: new URLSearchParams(payload)
      })

      const result = await response.json()
      
      if (result.SMSMessageData && result.SMSMessageData.Recipients) {
        const recipients = result.SMSMessageData.Recipients
        const successful = recipients.filter(r => r.status === 'Success').length
        const failed = recipients.filter(r => r.status !== 'Success').length
        
        return {
          success: true,
          provider: 'africas_talking',
          totalSent: recipients.length,
          successful: successful,
          failed: failed,
          cost: result.SMSMessageData.Message,
          recipients: recipients,
          messageId: result.SMSMessageData.Message
        }
      } else {
        throw new Error(result.errorMessage || 'Failed to send SMS')
      }
    } catch (error) {
      console.error('Africa\'s Talking SMS Error:', error)
      throw new Error(`SMS sending failed: ${error.message}`)
    }
  }

  /**
   * Send SMS using Twilio
   */
  async sendSMSTwilio(phoneNumbers, message) {
    try {
      const numbers = Array.isArray(phoneNumbers) ? phoneNumbers : [phoneNumbers]
      const results = []
      
      for (const phoneNumber of numbers) {
        const payload = {
          From: this.config.twilio.fromNumber,
          To: phoneNumber,
          Body: message
        }

        const auth = btoa(`${this.config.twilio.accountSid}:${this.config.twilio.authToken}`)
        
        const response = await fetch(
          `https://api.twilio.com/2010-04-01/Accounts/${this.config.twilio.accountSid}/Messages.json`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Basic ${auth}`,
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(payload)
          }
        )

        const result = await response.json()
        
        if (response.ok) {
          results.push({
            phoneNumber: phoneNumber,
            status: 'Success',
            messageId: result.sid,
            cost: result.price
          })
        } else {
          results.push({
            phoneNumber: phoneNumber,
            status: 'Failed',
            error: result.message
          })
        }
      }
      
      const successful = results.filter(r => r.status === 'Success').length
      const failed = results.filter(r => r.status === 'Failed').length
      
      return {
        success: successful > 0,
        provider: 'twilio',
        totalSent: results.length,
        successful: successful,
        failed: failed,
        recipients: results
      }
    } catch (error) {
      console.error('Twilio SMS Error:', error)
      throw new Error(`SMS sending failed: ${error.message}`)
    }
  }

  /**
   * Send SMS (main method)
   */
  async sendSMS(phoneNumbers, message, options = {}) {
    try {
      // Validate inputs
      if (!phoneNumbers || !message) {
        throw new Error('Phone numbers and message are required')
      }

      if (message.length > 160 && !options.allowLongMessages) {
        throw new Error('Message exceeds 160 characters. Use allowLongMessages option for longer messages.')
      }

      // Format phone numbers
      const numbers = Array.isArray(phoneNumbers) ? phoneNumbers : [phoneNumbers]
      const formattedNumbers = numbers.map(num => this.formatPhoneNumber(num))
      
      // Validate phone numbers
      const invalidNumbers = formattedNumbers.filter(num => !this.validatePhoneNumber(num))
      if (invalidNumbers.length > 0) {
        throw new Error(`Invalid phone numbers: ${invalidNumbers.join(', ')}`)
      }

      // Check if service is enabled
      if (!this.config.enabled) {
        throw new Error('SMS service is disabled')
      }

      // Demo mode - simulate sending
      if (this.config.demoMode || !this.isConfigured()) {
        console.log('SMS Demo Mode: Simulating SMS send...')
        console.log('Recipients:', formattedNumbers)
        console.log('Message:', message)
        
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        return {
          success: true,
          provider: 'demo',
          totalSent: formattedNumbers.length,
          successful: formattedNumbers.length,
          failed: 0,
          cost: 'Demo - No cost',
          messageId: 'demo_' + Date.now(),
          recipients: formattedNumbers.map(num => ({
            phoneNumber: num,
            status: 'Success',
            messageId: 'demo_' + Date.now() + '_' + Math.random().toString(36).substring(7)
          }))
        }
      }

      // Send using configured provider
      if (this.config.provider === 'africas_talking') {
        return await this.sendSMSAfricasTalking(formattedNumbers, message)
      } else if (this.config.provider === 'twilio') {
        return await this.sendSMSTwilio(formattedNumbers, message)
      } else {
        throw new Error(`Unsupported SMS provider: ${this.config.provider}`)
      }

    } catch (error) {
      console.error('SMS Service Error:', error)
      return {
        success: false,
        error: error.message,
        provider: this.config.provider
      }
    }
  }

  /**
   * Send bulk SMS to multiple recipients
   */
  async sendBulkSMS(recipients, message, options = {}) {
    try {
      // Recipients can be array of phone numbers or array of objects with phone and name
      const phoneNumbers = recipients.map(recipient => {
        if (typeof recipient === 'string') {
          return recipient
        } else if (recipient.phone) {
          return recipient.phone
        } else {
          throw new Error('Invalid recipient format')
        }
      })

      return await this.sendSMS(phoneNumbers, message, options)
    } catch (error) {
      console.error('Bulk SMS Error:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  /**
   * Get SMS service status and configuration
   */
  getServiceStatus() {
    return {
      enabled: this.config.enabled,
      configured: this.isConfigured(),
      provider: this.config.provider,
      demoMode: this.config.demoMode,
      senderId: this.config.provider === 'africas_talking' 
        ? this.config.africasTalking.senderId 
        : this.config.twilio.fromNumber
    }
  }

  /**
   * Test SMS service connection
   */
  async testConnection() {
    try {
      if (!this.config.enabled) {
        return {
          success: false,
          message: 'SMS service is disabled'
        }
      }

      if (this.config.demoMode || !this.isConfigured()) {
        return {
          success: true,
          message: 'Demo mode - SMS service is working (simulated)',
          provider: 'demo'
        }
      }

      // For real providers, we could implement a test endpoint call
      // For now, just check configuration
      return {
        success: this.isConfigured(),
        message: this.isConfigured() 
          ? `${this.config.provider} SMS service is configured and ready`
          : `${this.config.provider} SMS service is not properly configured`,
        provider: this.config.provider
      }
    } catch (error) {
      return {
        success: false,
        message: `Connection test failed: ${error.message}`,
        provider: this.config.provider
      }
    }
  }
}

// Create and export singleton instance
const smsService = new SMSService()
export default smsService

// Named exports for specific functions
export const {
  sendSMS,
  sendBulkSMS,
  formatPhoneNumber,
  validatePhoneNumber,
  getServiceStatus,
  testConnection
} = smsService
