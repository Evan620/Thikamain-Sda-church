import { createClient } from '@supabase/supabase-js'

/**
 * M-PESA STK Push Callback Handler
 * Receives payment confirmations from Safaricom
 * Thika Main SDA Church - Payment Processing
 */
export default async function handler(req, res) {
  try {
    // Only accept POST requests
    if (req.method !== 'POST') {
      return res.status(405).json({ 
        ResultCode: 1, 
        ResultDesc: 'Method not allowed' 
      })
    }

    // Initialize Supabase client
    const SUPABASE_URL = process.env.SUPABASE_URL
    const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE || process.env.SUPABASE_SERVICE_ROLE_KEY
    
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
      console.error('Missing Supabase environment variables')
      return res.status(500).json({ 
        ResultCode: 1, 
        ResultDesc: 'Server configuration error' 
      })
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE)

    // Extract callback data
    const callbackData = req.body
    console.log('M-PESA Callback received:', JSON.stringify(callbackData, null, 2))

    // Extract STK Push callback data
    const stkCallback = callbackData?.Body?.stkCallback
    if (!stkCallback) {
      console.error('Invalid callback format - missing stkCallback')
      return res.status(400).json({ 
        ResultCode: 1, 
        ResultDesc: 'Invalid callback format' 
      })
    }

    const {
      MerchantRequestID,
      CheckoutRequestID,
      ResultCode,
      ResultDesc
    } = stkCallback

    // Check if payment was successful
    if (ResultCode === 0) {
      // Payment successful - extract transaction details
      const callbackMetadata = stkCallback.CallbackMetadata?.Item || []
      
      // Parse metadata items
      const metadata = {}
      callbackMetadata.forEach(item => {
        if (item.Name && item.Value !== undefined) {
          metadata[item.Name] = item.Value
        }
      })

      const {
        Amount,
        MpesaReceiptNumber,
        TransactionDate,
        PhoneNumber
      } = metadata

      // Parse transaction date (format: 20231215143045)
      let transactionDate = new Date()
      if (TransactionDate) {
        const year = TransactionDate.toString().substring(0, 4)
        const month = TransactionDate.toString().substring(4, 6)
        const day = TransactionDate.toString().substring(6, 8)
        const hour = TransactionDate.toString().substring(8, 10)
        const minute = TransactionDate.toString().substring(10, 12)
        const second = TransactionDate.toString().substring(12, 14)
        
        transactionDate = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`)
      }

      // Extract giving type from transaction description (if available)
      let givingType = 'offering' // default
      const transactionDesc = metadata.TransactionDesc || ''
      if (transactionDesc.toLowerCase().includes('tithe')) {
        givingType = 'tithe'
      } else if (transactionDesc.toLowerCase().includes('building')) {
        givingType = 'building_fund'
      } else if (transactionDesc.toLowerCase().includes('mission')) {
        givingType = 'missions'
      } else if (transactionDesc.toLowerCase().includes('special')) {
        givingType = 'special_project'
      }

      try {
        // Save payment record to database
        const { data: givingRecord, error: insertError } = await supabase
          .from('giving_records')
          .insert({
            amount: parseFloat(Amount),
            giving_type: givingType,
            payment_method: 'mpesa',
            transaction_id: MpesaReceiptNumber,
            giving_date: transactionDate.toISOString().split('T')[0],
            notes: `M-PESA payment from ${PhoneNumber}. Receipt: ${MpesaReceiptNumber}`,
            is_verified: true,
            created_at: new Date().toISOString()
          })
          .select()
          .single()

        if (insertError) {
          console.error('Database insert error:', insertError)
          // Still return success to M-PESA to avoid duplicate callbacks
          return res.status(200).json({ 
            ResultCode: 0, 
            ResultDesc: 'Payment processed but database error occurred' 
          })
        }

        console.log('Payment record saved successfully:', givingRecord)

        // TODO: Send SMS confirmation to donor (optional)
        // TODO: Send email notification to church treasurer (optional)

        return res.status(200).json({ 
          ResultCode: 0, 
          ResultDesc: 'Payment processed successfully' 
        })

      } catch (dbError) {
        console.error('Database operation failed:', dbError)
        return res.status(200).json({ 
          ResultCode: 0, 
          ResultDesc: 'Payment received but processing incomplete' 
        })
      }

    } else {
      // Payment failed or cancelled
      console.log(`Payment failed: ${ResultDesc} (Code: ${ResultCode})`)
      
      // Log failed payment attempt (optional)
      try {
        await supabase
          .from('payment_logs')
          .insert({
            checkout_request_id: CheckoutRequestID,
            merchant_request_id: MerchantRequestID,
            result_code: ResultCode,
            result_desc: ResultDesc,
            status: 'failed',
            created_at: new Date().toISOString()
          })
      } catch (logError) {
        console.error('Failed to log payment attempt:', logError)
      }

      return res.status(200).json({ 
        ResultCode: 0, 
        ResultDesc: 'Callback processed' 
      })
    }

  } catch (error) {
    console.error('M-PESA callback processing error:', error)
    
    // Always return success to M-PESA to avoid retries
    return res.status(200).json({ 
      ResultCode: 0, 
      ResultDesc: 'Callback received' 
    })
  }
}
