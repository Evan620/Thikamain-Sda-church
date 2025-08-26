// Equity Bank STK Push Integration Service
// Thika Main SDA Church - Secure Payment Processing via Equity Bank 247247

/**
 * Equity Bank STK Push Service
 * Handles secure payments through Equity Bank's 247247 paybill system
 * Works with M-Pesa, Airtel Money, T-Kash, and other mobile money services
 */

class EquityBankService {
  constructor() {
    // Equity Bank API Configuration
    this.config = {
      // API URLs - sandbox vs production
      baseURL: import.meta.env.VITE_EQUITY_ENVIRONMENT === 'production' 
        ? 'https://api.equitybank.co.ke' 
        : 'https://sandbox.equitybank.co.ke',

      // Your Equity Bank credentials from Eazzy APIs Portal
      clientId: import.meta.env.VITE_EQUITY_CLIENT_ID,
      clientSecret: import.meta.env.VITE_EQUITY_CLIENT_SECRET,

      // Equity Bank merchant details
      merchantCode: import.meta.env.VITE_EQUITY_MERCHANT_CODE || '247247',
      accountNumber: import.meta.env.VITE_EQUITY_ACCOUNT_NUMBER,

      // Callback URLs (these should be your backend endpoints)
      callbackURL: import.meta.env.VITE_EQUITY_CALLBACK_URL,
      resultURL: import.meta.env.VITE_EQUITY_RESULT_URL,

      // Account reference prefix
      accountReference: import.meta.env.VITE_EQUITY_ACCOUNT_REFERENCE || 'THIKA_SDA',

      // Environment
      environment: import.meta.env.VITE_EQUITY_ENVIRONMENT || 'sandbox'
    }
  }

  /**
   * Generate OAuth token for Equity Bank API
   */
  async generateToken() {
    try {
      const credentials = btoa(`${this.config.clientId}:${this.config.clientSecret}`)
      
      const response = await fetch(`${this.config.baseURL}/v1/token`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error_description || 'Failed to generate token')
      }

      return data.access_token
    } catch (error) {
      console.error('Error generating Equity Bank token:', error)
      throw new Error('Failed to generate Equity Bank token')
    }
  }

  /**
   * Format phone number to required format (254XXXXXXXXX)
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
   * Generate unique transaction reference
   */
  generateTransactionReference(givingType = 'offering') {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 8).toUpperCase()
    const typePrefix = givingType.substring(0, 3).toUpperCase()
    return `${this.config.accountReference}_${typePrefix}_${timestamp}_${random}`
  }

  /**
   * Initiate STK Push payment via Equity Bank 247247
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
      
      // Generate unique transaction reference
      const transactionRef = this.generateTransactionReference(givingType)

      // Check if we're in demo mode (for development/testing)
      if ((this.config.clientId === 'your_client_id' ||
           this.config.clientSecret === 'your_client_secret' ||
           this.config.clientId === 'demo_client_id' ||
           this.config.clientSecret === 'demo_client_secret') ||
          (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {

        // Demo mode - simulate Equity Bank STK Push for testing
        console.log('Demo Mode: Simulating Equity Bank STK Push...')
        console.log('Phone:', formattedPhone, 'Amount:', amount, 'Type:', givingType, 'Ref:', transactionRef)

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 2000))

        // Generate a fake transaction ID
        const transactionId = 'EQ_' + Date.now() + Math.random().toString(36).substring(2, 11)

        return {
          success: true,
          message: 'STK Push sent successfully (Demo Mode - Equity Bank)',
          transactionId: transactionId,
          transactionRef: transactionRef,
          responseCode: '0',
          responseDescription: 'Success. Request accepted for processing via Equity Bank 247247'
        }
      }

      // Real Equity Bank integration (when credentials are configured)
      try {
        // Get access token
        const accessToken = await this.generateToken()

        // Prepare STK Push payload for Equity Bank
        const stkPushPayload = {
          merchantCode: this.config.merchantCode, // 247247
          accountNumber: transactionRef, // Unique reference for this transaction
          amount: parseInt(amount),
          phoneNumber: formattedPhone,
          description: `Thika SDA Church ${givingType} - KES ${amount}`,
          callbackUrl: this.config.callbackURL,
          currency: 'KES'
        }

        console.log('Equity Bank STK Push payload:', stkPushPayload)

        // Make STK Push request to Equity Bank
        const response = await fetch(`${this.config.baseURL}/v1/payments/stk-push`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(stkPushPayload)
        })

        const result = await response.json()
        console.log('Equity Bank STK Push response:', result)

        if (response.ok && (result.status === 'SUCCESS' || result.responseCode === '0')) {
          return {
            success: true,
            message: 'STK Push sent successfully via Equity Bank',
            transactionId: result.transactionId || result.referenceNumber,
            transactionRef: transactionRef,
            responseCode: result.responseCode || '0',
            responseDescription: result.message || result.responseDescription || 'Success'
          }
        } else {
          throw new Error(result.message || result.error || 'STK Push failed')
        }
      } catch (apiError) {
        console.error('Equity Bank API Error:', apiError)
        throw new Error('Equity Bank service temporarily unavailable. Please try again later.')
      }

    } catch (error) {
      console.error('Equity Bank STK Push Error:', error)
      return {
        success: false,
        message: error.message || 'Payment initiation failed',
        error: error
      }
    }
  }

  /**
   * Query payment status from Equity Bank
   */
  async queryPaymentStatus(transactionId) {
    try {
      // Check if this is a demo transaction ID OR localhost
      if (transactionId.startsWith('EQ_') &&
          (this.config.clientId === 'your_client_id' ||
           this.config.clientSecret === 'your_client_secret' ||
           this.config.clientId === 'demo_client_id' ||
           this.config.clientSecret === 'demo_client_secret' ||
           window.location.hostname === 'localhost' ||
           window.location.hostname === '127.0.0.1')) {

        // Demo mode - simulate payment completion after 15 seconds
        console.log('Demo Mode: Simulating Equity Bank payment status check...')

        // Extract timestamp from transaction ID
        const timestampPart = transactionId.split('_')[1] // Gets timestamp part
        const timestamp = parseInt(timestampPart)
        const elapsed = Date.now() - timestamp

        console.log('Demo timing check:', { timestamp, elapsed, shouldComplete: elapsed > 15000 })

        if (elapsed > 15000) { // 15 seconds to be safe
          // Simulate successful payment
          return {
            status: 'SUCCESS',
            responseCode: '0',
            responseDescription: 'Payment completed successfully via Equity Bank',
            transactionId: transactionId,
            amount: 1000, // This would come from the original request
            phoneNumber: '254712345678', // This would come from the original request
            timestamp: new Date().toISOString()
          }
        } else {
          // Still processing
          return {
            status: 'PENDING',
            responseCode: '1037',
            responseDescription: 'Payment request in progress',
            transactionId: transactionId
          }
        }
      }

      // Real Equity Bank query (when credentials are configured)
      const accessToken = await this.generateToken()

      const response = await fetch(`${this.config.baseURL}/v1/payments/status/${transactionId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })

      const result = await response.json()
      console.log('Equity Bank status query result:', result)

      return result

    } catch (error) {
      console.error('Equity Bank Payment Status Query Error:', error)
      throw error
    }
  }

  /**
   * Save payment record to database using existing tables
   * (Same structure as M-Pesa service for compatibility)
   */
  async savePaymentRecord(paymentData) {
    try {
      // Import supabase client
      const { supabase } = await import('./supabaseClient')
      
      // Prepare payment log record for existing payment_logs table
      const paymentLogData = {
        checkout_request_id: paymentData.transactionId, // Using transactionId as checkout_request_id
        merchant_request_id: paymentData.transactionRef, // Using transactionRef as merchant_request_id
        transaction_id: paymentData.transactionId,
        amount: parseFloat(paymentData.amount),
        phone_number: paymentData.phoneNumber,
        status: paymentData.status || 'pending',
        result_code: paymentData.responseCode,
        result_desc: paymentData.responseDescription,
        result_parameters: paymentData.resultParameters || [],
        payment_provider: 'equity_bank', // New field to distinguish from M-Pesa
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      // Save to payment_logs table
      const { data: paymentLog, error: paymentError } = await supabase
        .from('payment_logs')
        .insert([paymentLogData])
        .select()

      if (paymentError) {
        console.error('Payment log error:', paymentError)
        throw paymentError
      }

      console.log('Equity Bank payment log saved:', paymentLog)

      // If payment is successful, also save to giving_records table
      if (paymentData.status === 'success' && paymentData.transactionId) {
        try {
          const givingRecord = {
            amount: parseFloat(paymentData.amount),
            giving_type: paymentData.givingType || 'offering',
            payment_method: 'equity_bank', // Changed from 'mpesa' to 'equity_bank'
            transaction_id: paymentData.transactionId,
            giving_date: new Date().toISOString().split('T')[0],
            notes: `Equity Bank payment from ${paymentData.phoneNumber} via 247247`,
            is_verified: true
          }

          const { data: givingData, error: givingError } = await supabase
            .from('giving_records')
            .insert([givingRecord])
            .select()

          if (givingError) {
            console.error('Error saving to giving_records:', givingError)
            // Don't fail the main request for this error
          } else {
            console.log('Giving record saved successfully:', givingData)
          }
        } catch (givingError) {
          console.error('Error processing giving record:', givingError)
        }
      }

      return {
        success: true,
        message: 'Payment record saved successfully',
        data: paymentLog[0]
      }

    } catch (error) {
      console.error('Save payment record error:', error)
      throw error
    }
  }

  /**
   * Validate Equity Bank webhook/callback signature (if provided)
   */
  validateCallback(payload, signature) {
    // Implementation depends on Equity Bank's signature method
    // This is a placeholder for when you get the documentation
    try {
      // TODO: Implement signature validation based on Equity Bank docs
      console.log('Validating Equity Bank callback signature...')
      return true // For now, return true
    } catch (error) {
      console.error('Callback validation error:', error)
      return false
    }
  }
}

// Export singleton instance
export const equityBankService = new EquityBankService()
export default equityBankService