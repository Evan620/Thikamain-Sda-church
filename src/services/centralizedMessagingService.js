import { supabase } from './supabaseClient'

// Gmail Email Configuration (No API keys needed)

// Leader email mapping - centralized configuration
const LEADER_EMAILS = {
  // Department Heads & Leaders (Update these with real email addresses)
  'Paul Odhiambo': 'paul.odhiambo@thikamainsdachurch.org', // Strategic Planning Department
  'Pastor John Mwangi': 'pastor@thikamainsdachurch.org',
  'Elder Mary Wanjiku': 'elder.mary@thikamainsdachurch.org',
  'Deacon Peter Kamau': 'deacon.peter@thikamainsdachurch.org',

  // Ministry Leaders
  'Youth Leader Sarah': 'youth@thikamainsdachurch.org',
  'Sabbath School Director': 'sabbathschool@thikamainsdachurch.org',
  'Music Director': 'music@thikamainsdachurch.org',
  'Women\'s Ministry Leader': 'womens@thikamainsdachurch.org',
  'Men\'s Ministry Leader': 'mens@thikamainsdachurch.org',
  'Children\'s Ministry Leader': 'childrens@thikamainsdachurch.org',

  // Add more leaders as needed
  'Church Clerk': 'clerk@thikamainsdachurch.org',
  'Treasurer': 'treasurer@thikamainsdachurch.org',
  'Head Elder': 'headelder@thikamainsdachurch.org',

  // Default fallback
  'default': 'thikamainsdachurchclerk@gmail.com'
}

/**
 * Store message in database and trigger email forwarding
 * @param {Object} messageData - The message data from contact form
 * @returns {Promise<Object>} Result with success status and message ID
 */
export const submitMessage = async (messageData) => {
  try {
    console.log('CentralizedMessaging: Submitting message:', messageData)

    // Get recipient email
    const recipientEmail = LEADER_EMAILS[messageData.recipientName] || LEADER_EMAILS.default

    // Prepare message data for database
    const dbMessage = {
      sender_name: messageData.name,
      sender_email: messageData.email,
      sender_phone: messageData.phone || null,
      subject: messageData.subject,
      message: messageData.message,
      recipient_name: messageData.recipientName,
      recipient_role: messageData.recipientRole,
      recipient_email: recipientEmail,
      department: messageData.department || null,
      status: 'pending',
      source: 'website',
      priority: 'normal'
    }

    // Insert message into database
    const { data: insertedMessage, error: insertError } = await supabase
      .from('messages')
      .insert([dbMessage])
      .select()
      .single()

    if (insertError) {
      console.error('Database insert error:', insertError)
      throw new Error(`Failed to store message: ${insertError.message}`)
    }

    console.log('Message stored in database:', insertedMessage)

    // Messages are stored and ready for admin to send manually
    console.log('Message stored successfully. Admin can send email from Communication Hub.')

    return {
      success: true,
      messageId: insertedMessage.id,
      message: 'Message submitted successfully'
    }

  } catch (error) {
    console.error('CentralizedMessaging error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Generate email content for Gmail pre-fill
 * @param {Object} messageData - Message data from database
 * @returns {Object} Email details for Gmail
 */
const generateGmailEmail = (messageData) => {
  const timestamp = new Date(messageData.created_at).toLocaleString('en-KE', {
    timeZone: 'Africa/Nairobi',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  const subject = `New Contact Form Message - ${messageData.subject}`

  const emailBody = `Hello ${messageData.recipient_name},

You have received a new message through the church website contact form.

📧 MESSAGE DETAILS:
Subject: ${messageData.subject}
Date: ${timestamp}
Department: ${messageData.department || 'General'}

👤 SENDER INFORMATION:
Name: ${messageData.sender_name}
Email: ${messageData.sender_email}
Phone: ${messageData.sender_phone || 'Not provided'}

💬 MESSAGE:
${messageData.message}

📝 HOW TO REPLY:
Please respond directly to ${messageData.sender_email} to reply to this message.

---
This message was sent through the secure contact form on the church website.
Thika Main Seventh-Day Adventist Church - Spreading Hope and Love in Thika and Beyond`

  return {
    to: messageData.recipient_email,
    subject,
    body: emailBody
  }
}

/**
 * Open Gmail with pre-filled email
 * @param {Object} messageData - Message data from database
 */
const sendEmailViaGmail = (messageData) => {
  const emailDetails = generateGmailEmail(messageData)

  // Create Gmail compose URL
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailDetails.to)}&su=${encodeURIComponent(emailDetails.subject)}&body=${encodeURIComponent(emailDetails.body)}`

  // Open Gmail in new tab
  window.open(gmailUrl, '_blank')

  console.log('Gmail opened with pre-filled email to:', emailDetails.to)
  return emailDetails
}

/**
 * Generate HTML email template
 * @param {Object} messageData - Message data
 * @returns {string} HTML email content
 */
const generateEmailHTML = (messageData) => {
  const timestamp = new Date(messageData.created_at).toLocaleString('en-KE', {
    timeZone: 'Africa/Nairobi',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Message</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2d5a27 0%, #4a7c59 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .info-section { background: white; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #2d5a27; }
            .label { font-weight: bold; color: #2d5a27; }
            .value { color: #333; }
            .message-content { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; border: 1px solid #e0e0e0; }
            .footer { background: #2d5a27; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 0.9em; }
            .reply-section { background: #e0f2fe; padding: 15px; border-radius: 8px; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class="header">
            <h2>🏛️ New Contact Form Message</h2>
            <p>Thika Main Seventh-Day Adventist Church</p>
        </div>
        
        <div class="content">
            <p>Hello <strong>${messageData.recipient_name}</strong>,</p>
            
            <p>You have received a new message through the church website contact form.</p>
            
            <div class="info-section">
                <h3>📧 Message Details</h3>
                <p><span class="label">Subject:</span> <span class="value">${messageData.subject}</span></p>
                <p><span class="label">Date:</span> <span class="value">${timestamp}</span></p>
                <p><span class="label">Department:</span> <span class="value">${messageData.department || 'General'}</span></p>
            </div>
            
            <div class="info-section">
                <h3>👤 Sender Information</h3>
                <p><span class="label">Name:</span> <span class="value">${messageData.sender_name}</span></p>
                <p><span class="label">Email:</span> <span class="value">${messageData.sender_email}</span></p>
                <p><span class="label">Phone:</span> <span class="value">${messageData.sender_phone || 'Not provided'}</span></p>
            </div>
            
            <div class="message-content">
                <h3>💬 Message</h3>
                <p>${messageData.message.replace(/\n/g, '<br>')}</p>
            </div>
            
            <div class="reply-section">
                <p style="margin: 0; font-size: 0.9em; color: #0277bd;">
                    <strong>📝 How to Reply:</strong> Please respond directly to 
                    <a href="mailto:${messageData.sender_email}" style="color: #2d5a27;">${messageData.sender_email}</a> 
                    to reply to this message.
                </p>
            </div>
        </div>
        
        <div class="footer">
            <p>This message was sent through the secure contact form on the church website</p>
            <p>Thika Main Seventh-Day Adventist Church - Spreading Hope and Love in Thika and Beyond</p>
        </div>
    </body>
    </html>
  `
}

/**
 * Get all messages for admin panel
 * @param {Object} filters - Optional filters
 * @returns {Promise<Array>} Array of messages
 */
export const getMessages = async (filters = {}) => {
  try {
    let query = supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })

    // Apply filters
    if (filters.status) {
      query = query.eq('status', filters.status)
    }
    if (filters.department) {
      query = query.eq('department', filters.department)
    }
    if (filters.recipient) {
      query = query.eq('recipient_name', filters.recipient)
    }
    if (filters.limit) {
      query = query.limit(filters.limit)
    }

    const { data, error } = await query

    if (error) {
      throw new Error(`Failed to fetch messages: ${error.message}`)
    }

    return data || []
  } catch (error) {
    console.error('Error fetching messages:', error)
    throw error
  }
}

/**
 * Get message statistics
 * @returns {Promise<Object>} Message statistics
 */
export const getMessageStats = async () => {
  try {
    const { data, error } = await supabase
      .from('message_stats')
      .select('*')
      .single()

    if (error) {
      throw new Error(`Failed to fetch message stats: ${error.message}`)
    }

    return data || {
      total_messages: 0,
      pending_messages: 0,
      sent_messages: 0,
      failed_messages: 0,
      messages_this_month: 0,
      messages_this_week: 0,
      messages_today: 0,
      avg_response_time_minutes: 0
    }
  } catch (error) {
    console.error('Error fetching message stats:', error)
    return {
      total_messages: 0,
      pending_messages: 0,
      sent_messages: 0,
      failed_messages: 0,
      messages_this_month: 0,
      messages_this_week: 0,
      messages_today: 0,
      avg_response_time_minutes: 0
    }
  }
}

/**
 * Mark message as read
 * @param {string} messageId - Message ID
 * @returns {Promise<boolean>} Success status
 */
export const markMessageAsRead = async (messageId) => {
  try {
    const { error } = await supabase
      .from('messages')
      .update({ 
        status: 'read', 
        read_at: new Date().toISOString() 
      })
      .eq('id', messageId)

    if (error) {
      throw new Error(`Failed to mark message as read: ${error.message}`)
    }

    return true
  } catch (error) {
    console.error('Error marking message as read:', error)
    return false
  }
}

/**
 * Open Gmail to send message to leader
 * @param {string} messageId - Message ID to send
 * @returns {Promise<Object>} Result with success status
 */
export const sendMessageToLeader = async (messageId) => {
  try {
    console.log('Opening Gmail for message:', messageId)

    // Get message from database
    const { data: message, error: fetchError } = await supabase
      .from('messages')
      .select('*')
      .eq('id', messageId)
      .single()

    if (fetchError) {
      throw new Error(`Failed to fetch message: ${fetchError.message}`)
    }

    if (!message) {
      throw new Error('Message not found')
    }

    // Open Gmail with pre-filled email
    const emailDetails = sendEmailViaGmail(message)

    // Update message status to 'sent' (admin will send manually)
    const { error: updateError } = await supabase
      .from('messages')
      .update({
        status: 'sent',
        email_sent_at: new Date().toISOString(),
        email_error: null
      })
      .eq('id', messageId)

    if (updateError) {
      console.error('Failed to update message status:', updateError)
    }

    console.log('Gmail opened successfully for manual sending')
    return {
      success: true,
      message: 'Gmail opened with pre-filled email. Please send manually.',
      emailDetails
    }

  } catch (error) {
    console.error('Error opening Gmail:', error)

    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Copy email content to clipboard
 * @param {Object} messageData - Message data from database
 * @returns {Promise<Object>} Result with success status
 */
export const copyEmailToClipboard = async (messageData) => {
  try {
    const emailDetails = generateGmailEmail(messageData)

    const fullEmailText = `To: ${emailDetails.to}
Subject: ${emailDetails.subject}

${emailDetails.body}`

    await navigator.clipboard.writeText(fullEmailText)

    console.log('Email content copied to clipboard')
    return {
      success: true,
      message: 'Email content copied to clipboard!'
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error)
    return {
      success: false,
      error: 'Failed to copy to clipboard'
    }
  }
}

/**
 * Check if email system is ready (always true for Gmail)
 * @returns {boolean} True - Gmail is always available
 */
export const isEmailConfigured = () => {
  return true // Gmail is always available
}

export default {
  submitMessage,
  getMessages,
  getMessageStats,
  markMessageAsRead,
  sendMessageToLeader,
  copyEmailToClipboard,
  isEmailConfigured
}
