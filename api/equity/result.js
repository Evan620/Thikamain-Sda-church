// Equity Bank Payment Result Handler
// This handles result notifications from Equity Bank
// Similar to M-Pesa result handler but for Equity Bank

import { supabase } from '../../src/services/supabaseClient.js'

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    console.log('Equity Bank Result received:', JSON.stringify(req.body, null, 2))

    const resultData = req.body

    // Extract result data (adjust structure based on Equity Bank documentation)
    const {
      transactionId,
      merchantCode,
      accountNumber,
      amount,
      phoneNumber,
      status,
      timestamp,
      resultCode,
      resultMessage,
      originalTransactionId
    } = resultData

    if (!transactionId) {
      console.error('Invalid result data - missing transaction ID')
      return res.status(400).json({ error: 'Invalid result data' })
    }

    // Update existing payment log record
    const updateData = {
      status: status === 'SUCCESS' ? 'success' : 'failed',
      result_code: resultCode || (status === 'SUCCESS' ? '0' : '1'),
      result_desc: resultMessage || status,
      result_parameters: [resultData],
      updated_at: new Date().toISOString()
    }

    // If we have additional transaction details, include them
    if (amount) updateData.amount = parseFloat(amount)
    if (phoneNumber) updateData.phone_number = phoneNumber
    if (timestamp) updateData.transaction_date = timestamp

    console.log('Updating payment log with result data:', updateData)

    // Update the payment log record
    const { data, error } = await supabase
      .from('payment_logs')
      .update(updateData)
      .eq('transaction_id', transactionId)
      .select()

    if (error) {
      console.error('Database error updating payment log:', error)
      throw error
    }

    console.log('Equity Bank payment log updated:', data)

    // If this is a successful payment result and we haven't created a giving record yet
    if (status === 'SUCCESS' && amount && data && data.length > 0) {
      try {
        // Check if giving record already exists
        const { data: existingGiving } = await supabase
          .from('giving_records')
          .select('id')
          .eq('transaction_id', transactionId)
          .single()

        if (!existingGiving) {
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
            payment_method: 'equity_bank',
            transaction_id: transactionId,
            giving_date: new Date().toISOString().split('T')[0],
            notes: `Equity Bank payment from ${phoneNumber || 'unknown'} via 247247 paybill`,
            is_verified: true
          }

          const { data: givingData, error: givingError } = await supabase
            .from('giving_records')
            .insert([givingRecord])

          if (givingError) {
            console.error('Error saving to giving_records:', givingError)
          } else {
            console.log('Giving record created from result:', givingData)
          }
        } else {
          console.log('Giving record already exists for transaction:', transactionId)
        }
      } catch (givingError) {
        console.error('Error processing giving record from result:', givingError)
      }
    }

    // Respond to Equity Bank
    res.status(200).json({
      status: 'SUCCESS',
      message: 'Result processed successfully',
      transactionId: transactionId
    })

  } catch (error) {
    console.error('Equity Bank result processing error:', error)
    
    // Still respond with success to avoid retries
    res.status(200).json({
      status: 'SUCCESS',
      message: 'Result received'
    })
  }
}