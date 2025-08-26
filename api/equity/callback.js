// Equity Bank STK Push Callback Handler
// This handles the callback from Equity Bank after payment processing
// Updated to work with existing database schema

import { supabase } from '../../src/services/supabaseClient.js'

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    console.log('Equity Bank Callback received:', JSON.stringify(req.body, null, 2))

    const callbackData = req.body

    // Equity Bank callback structure (adjust based on actual API documentation)
    const {
      transactionId,
      merchantCode,
      accountNumber, // This is our transaction reference
      amount,
      phoneNumber,
      status,
      timestamp,
      description,
      responseCode,
      responseMessage
    } = callbackData

    if (!transactionId || !merchantCode) {
      console.error('Invalid callback data - missing required fields')
      return res.status(400).json({ error: 'Invalid callback data' })
    }

    // Prepare payment record for existing payment_logs table
    const paymentLogRecord = {
      checkout_request_id: transactionId, // Using transactionId as checkout_request_id for compatibility
      merchant_request_id: accountNumber, // Using accountNumber (our reference) as merchant_request_id
      transaction_id: transactionId,
      amount: parseFloat(amount) || 0,
      phone_number: phoneNumber,
      status: status === 'SUCCESS' ? 'success' : 'failed',
      result_code: responseCode || (status === 'SUCCESS' ? '0' : '1'),
      result_desc: responseMessage || description || status,
      result_parameters: [callbackData], // Store full callback as array for compatibility
      payment_provider: 'equity_bank', // Distinguish from M-Pesa
      transaction_date: timestamp || new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    console.log('Prepared payment log record:', paymentLogRecord)

    // Save to existing payment_logs table
    const { data, error } = await supabase
      .from('payment_logs')
      .upsert(paymentLogRecord, { 
        onConflict: 'checkout_request_id',
        ignoreDuplicates: false 
      })

    if (error) {
      console.error('Database error saving payment log:', error)
      throw error
    }

    console.log('Equity Bank payment record saved to payment_logs:', data)

    // If payment was successful, also save to giving_records table
    if (status === 'SUCCESS' && amount) {
      try {
        // Extract giving type from account number if possible
        let givingType = 'offering' // Default
        if (accountNumber && typeof accountNumber === 'string') {
          if (accountNumber.includes('TIT')) givingType = 'tithe'
          else if (accountNumber.includes('OFF')) givingType = 'offering'
          else if (accountNumber.includes('SPE')) givingType = 'special_project'
          else if (accountNumber.includes('BUI')) givingType = 'building_fund'
          else if (accountNumber.includes('MIS')) givingType = 'missions'
        }

        const givingRecord = {
          amount: parseFloat(amount),
          giving_type: givingType,
          payment_method: 'equity_bank', // Changed from 'mpesa' to 'equity_bank'
          transaction_id: transactionId,
          giving_date: new Date().toISOString().split('T')[0],
          notes: `Equity Bank payment from ${phoneNumber} via 247247 paybill`,
          is_verified: true
        }

        const { data: givingData, error: givingError } = await supabase
          .from('giving_records')
          .insert([givingRecord])

        if (givingError) {
          console.error('Error saving to giving_records:', givingError)
          // Don't fail the callback for this error
        } else {
          console.log('Giving record saved successfully:', givingData)
        }
      } catch (givingError) {
        console.error('Error processing giving record:', givingError)
      }
    }

    // Send success notification if payment was successful
    if (status === 'SUCCESS' && phoneNumber && amount) {
      try {
        // TODO: Implement SMS notification service
        console.log('Payment successful - should send SMS notification to:', phoneNumber)
        
        // You can integrate with your SMS service here
        // await smsService.sendPaymentConfirmation({
        //   phoneNumber,
        //   amount,
        //   transactionId,
        //   givingType
        // })
      } catch (notificationError) {
        console.error('Error sending notification:', notificationError)
        // Don't fail the callback for notification errors
      }
    }

    // Respond to Equity Bank with success
    res.status(200).json({
      status: 'SUCCESS',
      message: 'Callback processed successfully',
      transactionId: transactionId
    })

  } catch (error) {
    console.error('Equity Bank callback processing error:', error)
    
    // Still respond with success to avoid retries from Equity Bank
    // (adjust based on Equity Bank's retry policy)
    res.status(200).json({
      status: 'SUCCESS',
      message: 'Callback received'
    })
  }
}