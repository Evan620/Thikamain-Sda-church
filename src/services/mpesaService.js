// M-PESA STK Push Integration Service
// Thika Main SDA Church - Secure Payment Processing

/**
 * M-PESA STK Push Service
 * Handles secure M-PESA payments with STK Push functionality
 */

class MpesaService {
  constructor() {
    // M-PESA API Configuration
    this.config = {
      // Sandbox URLs (replace with production URLs when going live)
      baseURL: 'https://sandbox.safaricom.co.ke',

      // Your M-PESA credentials (these should be in environment variables)
      consumerKey: import.meta.env.VITE_MPESA_CONSUMER_KEY || 'your_consumer_key',
      consumerSecret: import.meta.env.VITE_MPESA_CONSUMER_SECRET || 'your_consumer_secret',

      // Business details
      businessShortCode: '247247', // Your church paybill
      passkey: import.meta.env.VITE_MPESA_PASSKEY || 'your_passkey',

      // Callback URLs (these should be your backend endpoints)
      callbackURL: import.meta.env.VITE_MPESA_CALLBACK_URL || `${window.location.origin}/api/mpesa/callback`,
      resultURL: import.meta.env.VITE_MPESA_RESULT_URL || `${window.location.origin}/api/mpesa/result`,

      // Account reference
      accountReference: '436520#' // Your church account
    }
  }

  /**
   * Generate OAuth token for M-PESA API
   */
  async generateToken() {
    try {
      const auth = btoa(`${this.config.consumerKey}:${this.config.consumerSecret}`)
      
      const response = await fetch(`${this.config.baseURL}/oauth/v1/generate?grant_type=client_credentials`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()
      return data.access_token
    } catch (error) {
      console.error('Error generating M-PESA token:', error)
      throw new Error('Failed to generate M-PESA token')
    }
  }

  /**
   * Generate password for STK Push
   */
  generatePassword() {
    const timestamp = this.getTimestamp()
    const password = btoa(`${this.config.businessShortCode}${this.config.passkey}${timestamp}`)
    return { password, timestamp }
  }

  /**
   * Get current timestamp in required format
   */
  getTimestamp() {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    
    return `${year}${month}${day}${hours}${minutes}${seconds}`
  }

  /**
   * Format phone number to required format
   */
  formatPhoneNumber(phoneNumber) {
    // Remove any spaces, dashes, or plus signs
    let formatted = phoneNumber.replace(/[\s\-\+]/g, '')
    
    // If starts with 0, replace with 254
    if (formatted.startsWith('0')) {
      formatted = '254' + formatted.substring(1)
    }
    
    // If doesn't start with 254, add it
    if (!formatted.startsWith('254')) {
      formatted = '254' + formatted
    }
    
    return formatted
  }

  /**
   * Initiate STK Push payment
   */
  async initiateSTKPush(phoneNumber, amount, givingType = 'offering') {
    try {
      // Validate inputs
      if (!phoneNumber || !amount) {
        throw new Error('Phone number and amount are required')
      }

      if (amount < 1) {
        throw new Error('Amount must be at least KES 1')
      }

      // Format phone number
      const formattedPhone = this.formatPhoneNumber(phoneNumber)

      // Check if we're in demo mode
      if (this.config.consumerKey === 'your_consumer_key' ||
          this.config.consumerSecret === 'your_consumer_secret' ||
          this.config.consumerKey === 'demo_consumer_key' ||
          this.config.consumerSecret === 'demo_consumer_secret') {

        // Demo mode - simulate STK Push for testing
        console.log('Demo Mode: Simulating STK Push...')
        console.log('Phone:', formattedPhone, 'Amount:', amount, 'Type:', givingType)

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 2000))

        // Generate a fake checkout request ID
        const checkoutRequestID = 'ws_CO_' + Date.now() + Math.random().toString(36).substring(2, 11)

        return {
          success: true,
          message: 'STK Push sent successfully (Demo Mode)',
          checkoutRequestID: checkoutRequestID,
          merchantRequestID: 'demo_' + Date.now(),
          responseCode: '0',
          responseDescription: 'Success. Request accepted for processing'
        }
      }

      // Real M-PESA integration (when credentials are configured)
      try {
        // Get access token
        const accessToken = await this.generateToken()

        // Generate password and timestamp
        const { password, timestamp } = this.generatePassword()

        // Prepare STK Push payload
        const stkPushPayload = {
          BusinessShortCode: this.config.businessShortCode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: 'CustomerPayBillOnline',
          Amount: parseInt(amount),
          PartyA: formattedPhone,
          PartyB: this.config.businessShortCode,
          PhoneNumber: formattedPhone,
          CallBackURL: this.config.callbackURL,
          AccountReference: this.config.accountReference,
          TransactionDesc: `Thika SDA Church ${givingType} - KES ${amount}`
        }

        // Make STK Push request
        const response = await fetch(`${this.config.baseURL}/mpesa/stkpush/v1/processrequest`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(stkPushPayload)
        })

        const result = await response.json()

        if (result.ResponseCode === '0') {
          return {
            success: true,
            message: 'STK Push sent successfully',
            checkoutRequestID: result.CheckoutRequestID,
            merchantRequestID: result.MerchantRequestID,
            responseCode: result.ResponseCode,
            responseDescription: result.ResponseDescription
          }
        } else {
          throw new Error(result.ResponseDescription || 'STK Push failed')
        }
      } catch (apiError) {
        console.error('M-PESA API Error:', apiError)
        throw new Error('M-PESA service temporarily unavailable. Please try again later.')
      }

    } catch (error) {
      console.error('STK Push Error:', error)
      return {
        success: false,
        message: error.message || 'Payment initiation failed',
        error: error
      }
    }
  }

  /**
   * Query STK Push status
   */
  async querySTKPushStatus(checkoutRequestID) {
    try {
      // Check if this is a demo checkout request ID
      if (checkoutRequestID.startsWith('ws_CO_') &&
          (this.config.consumerKey === 'your_consumer_key' ||
           this.config.consumerSecret === 'your_consumer_secret' ||
           this.config.consumerKey === 'demo_consumer_key' ||
           this.config.consumerSecret === 'demo_consumer_secret')) {

        // Demo mode - simulate payment completion after 10 seconds
        console.log('Demo Mode: Simulating payment status check...')

        // Extract timestamp from checkout request ID
        const timestamp = parseInt(checkoutRequestID.split('_')[2])
        const elapsed = Date.now() - timestamp

        if (elapsed > 10000) { // 10 seconds
          // Simulate successful payment
          return {
            ResponseCode: '0',
            ResponseDescription: 'The service request is processed successfully.',
            MerchantRequestID: 'demo_' + timestamp,
            CheckoutRequestID: checkoutRequestID,
            ResultCode: '0',
            ResultDesc: 'The service request is processed successfully.'
          }
        } else {
          // Still processing
          return {
            ResponseCode: '1037',
            ResponseDescription: 'STK Request in progress',
            MerchantRequestID: 'demo_' + timestamp,
            CheckoutRequestID: checkoutRequestID
          }
        }
      }

      // Real M-PESA query (when credentials are configured)
      const accessToken = await this.generateToken()
      const { password, timestamp } = this.generatePassword()

      const queryPayload = {
        BusinessShortCode: this.config.businessShortCode,
        Password: password,
        Timestamp: timestamp,
        CheckoutRequestID: checkoutRequestID
      }

      const response = await fetch(`${this.config.baseURL}/mpesa/stkpushquery/v1/query`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(queryPayload)
      })

      const result = await response.json()
      return result

    } catch (error) {
      console.error('STK Push Query Error:', error)
      throw error
    }
  }

  /**
   * Simulate payment for testing (sandbox only)
   */
  async simulatePayment(phoneNumber, amount) {
    try {
      const accessToken = await this.generateToken()
      const formattedPhone = this.formatPhoneNumber(phoneNumber)

      const simulatePayload = {
        ShortCode: '174379', // Test shortcode for simulation
        CommandID: 'CustomerPayBillOnline',
        Amount: parseInt(amount),
        Msisdn: formattedPhone,
        BillRefNumber: this.config.accountReference
      }

      const response = await fetch(`${this.config.baseURL}/mpesa/c2b/v1/simulate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(simulatePayload)
      })

      return await response.json()

    } catch (error) {
      console.error('Payment Simulation Error:', error)
      throw error
    }
  }

  /**
   * Save payment record to database
   */
  async savePaymentRecord(paymentData) {
    try {
      const response = await fetch('/api/mpesa/save-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save payment record')
      }

      return result
    } catch (error) {
      console.error('Save payment record error:', error)
      throw error
    }
  }
}

// Export singleton instance
export const mpesaService = new MpesaService()
export default mpesaService
