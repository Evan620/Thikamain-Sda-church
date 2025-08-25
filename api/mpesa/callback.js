// M-PESA STK Push Callback Handler
// This handles the callback from Safaricom after payment processing
// Updated to work with existing database schema

import { supabase } from '../../src/services/supabaseClient.js'

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    console.log('M-PESA Callback received:', JSON.stringify(req.body, null, 2))

    const { Body } = req.body

    if (!Body || !Body.stkCallback) {
      return res.status(400).json({ error: 'Invalid callback data' })
    }

    const { stkCallback } = Body
    const {
      MerchantRequestID,
      CheckoutRequestID,
      ResultCode,
      ResultDesc,
      CallbackMetadata
    } = stkCallback

    // Prepare payment record for existing payment_logs table
    const paymentLogRecord = {
      checkout_request_id: CheckoutRequestID,
      merchant_request_id: MerchantRequestID,
      result_code: ResultCode,
      result_desc: ResultDesc,
      status: ResultCode === 0 ? 'success' : 'failed',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    // If payment was successful, extract additional details
    if (ResultCode === 0 && CallbackMetadata && CallbackMetadata.Item) {
      CallbackMetadata.Item.forEach(item => {
        switch (item.Name) {
          case 'Amount':
            paymentLogRecord.amount = item.Value
            break
          case 'MpesaReceiptNumber':
            paymentLogRecord.transaction_id = item.Value
            break
          case 'TransactionDate':
            // Convert M-PESA timestamp to readable format
            paymentLogRecord.transaction_date = item.Value
            break
          case 'PhoneNumber':
            paymentLogRecord.phone_number = item.Value
            break
        }
      })

      // Store full callback metadata as JSONB
      paymentLogRecord.result_parameters = CallbackMetadata.Item
    }

    // Save to existing payment_logs table
    const { data, error } = await supabase
      .from('payment_logs')
      .upsert(paymentLogRecord, { 
        onConflict: 'checkout_request_id',
        ignoreDuplicates: false 
      })

    if (error) {
      console.error('Database error:', error)
      throw error
    }

    console.log('Payment record saved to payment_logs:', data)

    // If payment was successful, also save to giving_records table
    if (ResultCode === 0 && paymentLogRecord.amount) {
      try {
        const givingRecord = {
          amount: parseFloat(paymentLogRecord.amount),
          giving_type: 'offering', // Default, could be enhanced to track actual type
          payment_method: 'mpesa',
          transaction_id: paymentLogRecord.transaction_id,
          giving_date: new Date().toISOString().split('T')[0],
          notes: `M-PESA payment from ${paymentLogRecord.phone_number}`,
          is_verified: true
        }

        const { error: givingError } = await supabase
          .from('giving_records')
          .insert([givingRecord])

        if (givingError) {
          console.error('Error saving to giving_records:', givingError)
          // Don't fail the callback for this error
        } else {
          console.log('Giving record saved successfully')
        }
      } catch (givingError) {
        console.error('Error processing giving record:', givingError)
      }
    }

    // Respond to Safaricom
    res.status(200).json({
      ResultCode: 0,
      ResultDesc: 'Callback processed successfully'
    })

  } catch (error) {
    console.error('Callback processing error:', error)
    
    // Still respond with success to avoid retries from Safaricom
    res.status(200).json({
      ResultCode: 0,
      ResultDesc: 'Callback received'
    })
  }
}