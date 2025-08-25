import { createClient } from '@supabase/supabase-js'

/**
 * Save M-PESA Payment Record
 * Saves successful payment records to the database
 * Thika Main SDA Church - Payment Processing
 */
export default async function handler(req, res) {
  try {
    // Only accept POST requests
    if (req.method !== 'POST') {
      return res.status(405).json({ 
        success: false, 
        error: 'Method not allowed' 
      })
    }

    // Initialize Supabase client
    const SUPABASE_URL = process.env.SUPABASE_URL
    const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE || process.env.SUPABASE_SERVICE_ROLE_KEY
    
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
      console.error('Missing Supabase environment variables')
      return res.status(500).json({ 
        success: false, 
        error: 'Server configuration error' 
      })
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE)

    // Extract payment data
    const {
      amount,
      givingType,
      phoneNumber,
      transactionId,
      checkoutRequestId,
      memberEmail
    } = req.body

    // Validate required fields
    if (!amount || !givingType || !phoneNumber) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: amount, givingType, phoneNumber'
      })
    }

    // Validate amount
    if (isNaN(amount) || parseFloat(amount) < 1) {
      return res.status(400).json({
        success: false,
        error: 'Invalid amount'
      })
    }

    // Validate giving type
    const validGivingTypes = ['tithe', 'offering', 'special_project', 'building_fund', 'missions']
    if (!validGivingTypes.includes(givingType)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid giving type'
      })
    }

    try {
      // Check if member exists by email (optional)
      let memberId = null
      if (memberEmail) {
        const { data: member } = await supabase
          .from('members')
          .select('id')
          .eq('email', memberEmail)
          .single()
        
        if (member) {
          memberId = member.id
        }
      }

      // Check for duplicate transaction
      if (transactionId) {
        const { data: existingRecord } = await supabase
          .from('giving_records')
          .select('id')
          .eq('transaction_id', transactionId)
          .single()

        if (existingRecord) {
          return res.status(409).json({
            success: false,
            error: 'Transaction already recorded'
          })
        }
      }

      // Save payment record
      const { data: givingRecord, error: insertError } = await supabase
        .from('giving_records')
        .insert({
          member_id: memberId,
          amount: parseFloat(amount),
          giving_type: givingType,
          payment_method: 'mpesa',
          transaction_id: transactionId,
          giving_date: new Date().toISOString().split('T')[0],
          notes: `M-PESA payment from ${phoneNumber}${transactionId ? `. Receipt: ${transactionId}` : ''}${checkoutRequestId ? `. Checkout: ${checkoutRequestId}` : ''}`,
          is_verified: true,
          created_at: new Date().toISOString()
        })
        .select()
        .single()

      if (insertError) {
        console.error('Database insert error:', insertError)
        return res.status(500).json({
          success: false,
          error: 'Failed to save payment record'
        })
      }

      console.log('Payment record saved successfully:', givingRecord.id)

      // Return success response
      return res.status(200).json({
        success: true,
        message: 'Payment record saved successfully',
        recordId: givingRecord.id,
        data: {
          id: givingRecord.id,
          amount: givingRecord.amount,
          givingType: givingRecord.giving_type,
          transactionId: givingRecord.transaction_id,
          givingDate: givingRecord.giving_date
        }
      })

    } catch (dbError) {
      console.error('Database operation failed:', dbError)
      return res.status(500).json({
        success: false,
        error: 'Database operation failed'
      })
    }

  } catch (error) {
    console.error('Payment save error:', error)
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
}
