import { createClient } from '@supabase/supabase-js'

/**
 * M-PESA Timeout Handler
 * Handles M-PESA transaction timeouts
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

    // Extract timeout data
    const timeoutData = req.body
    console.log('M-PESA Timeout received:', JSON.stringify(timeoutData, null, 2))

    const {
      CheckoutRequestID,
      MerchantRequestID,
      ResultCode,
      ResultDesc
    } = timeoutData

    // Log the timeout
    try {
      await supabase
        .from('payment_logs')
        .insert({
          checkout_request_id: CheckoutRequestID,
          merchant_request_id: MerchantRequestID,
          result_code: ResultCode,
          result_desc: ResultDesc || 'Transaction timeout',
          status: 'timeout',
          created_at: new Date().toISOString()
        })
      
      console.log('Timeout logged successfully')
    } catch (logError) {
      console.error('Failed to log timeout:', logError)
    }

    // Always acknowledge receipt
    return res.status(200).json({ 
      ResultCode: 0, 
      ResultDesc: 'Timeout processed successfully' 
    })

  } catch (error) {
    console.error('M-PESA timeout processing error:', error)
    
    // Always return success to M-PESA to avoid retries
    return res.status(200).json({ 
      ResultCode: 0, 
      ResultDesc: 'Timeout received' 
    })
  }
}
