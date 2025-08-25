// Save Payment Record API
// This endpoint saves payment records to the existing database tables
// Updated to work with existing payment_logs and giving_records tables

import { supabase } from '../../src/services/supabaseClient.js'

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const {
      amount,
      phoneNumber,
      givingType,
      transactionId,
      checkoutRequestId,
      merchantRequestId,
      status = 'pending'
    } = req.body

    // Validate required fields
    if (!amount || !phoneNumber) {
      return res.status(400).json({ 
        error: 'Amount and phone number are required' 
      })
    }

    // Prepare payment record for existing payment_logs table
    const paymentLogRecord = {
      checkout_request_id: checkoutRequestId,
      merchant_request_id: merchantRequestId,
      transaction_id: transactionId,
      amount: parseFloat(amount),
      phone_number: phoneNumber,
      status: status,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    // Save to existing payment_logs table
    const { data, error } = await supabase
      .from('payment_logs')
      .insert([paymentLogRecord])
      .select()

    if (error) {
      console.error('Database error:', error)
      throw error
    }

    // If payment is completed, also save to giving_records
    if (status === 'success' && transactionId) {
      try {
        const givingRecord = {
          amount: parseFloat(amount),
          giving_type: givingType || 'offering',
          payment_method: 'mpesa',
          transaction_id: transactionId,
          giving_date: new Date().toISOString().split('T')[0],
          notes: `M-PESA payment from ${phoneNumber}`,
          is_verified: true
        }

        const { error: givingError } = await supabase
          .from('giving_records')
          .insert([givingRecord])

        if (givingError) {
          console.error('Error saving to giving_records:', givingError)
          // Don't fail the main request for this error
        } else {
          console.log('Giving record saved successfully')
        }
      } catch (givingError) {
        console.error('Error processing giving record:', givingError)
      }
    }

    res.status(200).json({
      success: true,
      message: 'Payment record saved successfully',
      data: data[0]
    })

  } catch (error) {
    console.error('Save payment error:', error)
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to save payment record'
    })
  }
}