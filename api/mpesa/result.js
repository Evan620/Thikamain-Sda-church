import { createClient } from '@supabase/supabase-js'

/**
 * M-PESA Result Handler
 * Handles M-PESA transaction results and confirmations
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

    // Extract result data
    const resultData = req.body
    console.log('M-PESA Result received:', JSON.stringify(resultData, null, 2))

    const {
      Result: {
        ResultType,
        ResultCode,
        ResultDesc,
        OriginatorConversationID,
        ConversationID,
        TransactionID,
        ResultParameters
      } = {}
    } = resultData

    // Log the result
    try {
      await supabase
        .from('payment_logs')
        .insert({
          conversation_id: ConversationID,
          originator_conversation_id: OriginatorConversationID,
          transaction_id: TransactionID,
          result_type: ResultType,
          result_code: ResultCode,
          result_desc: ResultDesc,
          result_parameters: ResultParameters || [],
          status: ResultCode === 0 ? 'success' : 'failed',
          created_at: new Date().toISOString()
        })
    } catch (logError) {
      console.error('Failed to log result:', logError)
    }

    // Process successful results
    if (ResultCode === 0) {
      console.log('M-PESA transaction successful:', TransactionID)
      
      // Extract result parameters if available
      const parameters = {}
      if (ResultParameters?.ResultParameter) {
        ResultParameters.ResultParameter.forEach(param => {
          if (param.Key && param.Value !== undefined) {
            parameters[param.Key] = param.Value
          }
        })
      }

      // Additional processing can be added here
      // For example: updating transaction status, sending notifications, etc.

    } else {
      console.log(`M-PESA transaction failed: ${ResultDesc} (Code: ${ResultCode})`)
    }

    // Always acknowledge receipt
    return res.status(200).json({ 
      ResultCode: 0, 
      ResultDesc: 'Result processed successfully' 
    })

  } catch (error) {
    console.error('M-PESA result processing error:', error)
    
    // Always return success to M-PESA to avoid retries
    return res.status(200).json({ 
      ResultCode: 0, 
      ResultDesc: 'Result received' 
    })
  }
}
