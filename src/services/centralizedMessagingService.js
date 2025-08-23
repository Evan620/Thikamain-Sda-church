import { supabase } from './supabaseClient'
import { uploadFiles } from './fileUploadService'
import leadersService from './leadersService'

// Gmail Email Configuration (No API keys needed)

// Fallback email mapping for when leaders are not found in database
const FALLBACK_EMAILS = {
  'Pastor': 'pastor@thikamainsdachurch.org',
  'Senior Pastor': 'pastor@thikamainsdachurch.org',
  'Church Secretary': 'secretary@thikamainsdachurch.org',
  'Administrative Coordinator': 'admin@thikamainsdachurch.org',
  'Pastoral Care Coordinator': 'pastoralcare@thikamainsdachurch.org',
  'Visitation Coordinator': 'visitation@thikamainsdachurch.org',
  'Events Committee': 'events@thikamainsdachurch.org',
  'Events Coordinator': 'events@thikamainsdachurch.org',
  'Facilities Team': 'facilities@thikamainsdachurch.org',
  'Maintenance Coordinator': 'maintenance@thikamainsdachurch.org',
  'default': 'thikamainsdachurchclerk@gmail.com'
}

/**
 * Get leader email dynamically from database
 * @param {string} recipientName - Name of the recipient
 * @returns {Promise<string>} Email address
 */
const getLeaderEmail = async (recipientName) => {
  try {
    // First try to get email from leaders database
    const leaderEmail = await leadersService.getLeaderEmail(recipientName)
    if (leaderEmail) {
      return leaderEmail
    }

    // If not found, try to find by position/role
    const leaders = await leadersService.getAllLeaders()
    const leader = leaders.find(l =>
      l.position.toLowerCase().includes(recipientName.toLowerCase()) ||
      recipientName.toLowerCase().includes(l.position.toLowerCase())
    )

    if (leader && leader.email) {
      return leader.email
    }

    // Fall back to hardcoded emails
    return FALLBACK_EMAILS[recipientName] || FALLBACK_EMAILS.default
  } catch (error) {
    console.error('Error getting leader email:', error)
    return FALLBACK_EMAILS[recipientName] || FALLBACK_EMAILS.default
  }
}

/**
 * Store message in database and trigger email forwarding
 * @param {Object} messageData - The message data from contact form
 * @returns {Promise<Object>} Result with success status and message ID
 */
export const submitMessage = async (messageData) => {
  try {
    console.log('CentralizedMessaging: Submitting message:', messageData)

    // Handle file uploads first
    let attachments = []

    // Check for report files
    if (messageData.reportFiles && messageData.reportFiles.length > 0) {
      console.log('Uploading report files:', messageData.reportFiles.length)
      const uploadResult = await uploadFiles(messageData.reportFiles, 'reports')
      if (!uploadResult.success) {
        throw new Error(`File upload failed: ${uploadResult.error}`)
      }
      attachments = [...attachments, ...uploadResult.files]
    }

    // Check for maintenance images
    if (messageData.maintenanceImages && messageData.maintenanceImages.length > 0) {
      console.log('Uploading maintenance images:', messageData.maintenanceImages.length)
      const uploadResult = await uploadFiles(messageData.maintenanceImages, 'maintenance')
      if (!uploadResult.success) {
        throw new Error(`Image upload failed: ${uploadResult.error}`)
      }
      attachments = [...attachments, ...uploadResult.files]
    }

    console.log('Files uploaded successfully:', attachments.length)

    // Get recipient email dynamically
    const recipientEmail = await getLeaderEmail(messageData.recipientName)

    // Prepare enhanced message content with submission details
    let enhancedMessage = messageData.message

    // Add counseling-specific details to message
    if (messageData.counselingType || messageData.counselingUrgency || messageData.preferredCounselor) {
      enhancedMessage += '\n\n--- COUNSELING DETAILS ---'
      if (messageData.counselingType) enhancedMessage += `\nType: ${messageData.counselingType}`
      if (messageData.counselingUrgency) enhancedMessage += `\nUrgency: ${messageData.counselingUrgency}`
      if (messageData.preferredCounselor) enhancedMessage += `\nPreferred Counselor: ${messageData.preferredCounselor}`
    }

    // Add visitation-specific details to message
    if (messageData.visitationType || messageData.visitationAddress || messageData.visitationDate) {
      enhancedMessage += '\n\n--- VISITATION DETAILS ---'
      if (messageData.visitationType) enhancedMessage += `\nType: ${messageData.visitationType}`
      if (messageData.visitationAddress) enhancedMessage += `\nAddress: ${messageData.visitationAddress}`
      if (messageData.visitationDate) enhancedMessage += `\nPreferred Date: ${messageData.visitationDate}`
      if (messageData.visitationTime) enhancedMessage += `\nPreferred Time: ${messageData.visitationTime}`
    }

    // Add report-specific details to message
    if (messageData.reportType || messageData.reportPeriod) {
      enhancedMessage += '\n\n--- REPORT DETAILS ---'
      if (messageData.reportType) enhancedMessage += `\nReport Type: ${messageData.reportType}`
      if (messageData.reportPeriod) enhancedMessage += `\nPeriod: ${messageData.reportPeriod}`
    }

    // Add event-specific details to message
    if (messageData.eventTitle || messageData.eventDate || messageData.eventLocation) {
      enhancedMessage += '\n\n--- EVENT DETAILS ---'
      if (messageData.eventTitle) enhancedMessage += `\nEvent Title: ${messageData.eventTitle}`
      if (messageData.eventDate) enhancedMessage += `\nProposed Date: ${messageData.eventDate}`
      if (messageData.eventTime) enhancedMessage += `\nProposed Time: ${messageData.eventTime}`
      if (messageData.eventLocation) enhancedMessage += `\nLocation: ${messageData.eventLocation}`
      if (messageData.eventAttendees) enhancedMessage += `\nExpected Attendees: ${messageData.eventAttendees}`
      if (messageData.eventBudget) enhancedMessage += `\nEstimated Budget: KES ${messageData.eventBudget}`
    }

    // Add maintenance-specific details to message
    if (messageData.maintenanceLocation || messageData.maintenancePriority) {
      enhancedMessage += '\n\n--- MAINTENANCE DETAILS ---'
      if (messageData.maintenanceLocation) enhancedMessage += `\nLocation: ${messageData.maintenanceLocation}`
      if (messageData.maintenancePriority) enhancedMessage += `\nPriority: ${messageData.maintenancePriority}`
    }

    // Prepare message data for database
    const dbMessage = {
      sender_name: messageData.name,
      sender_email: messageData.email,
      sender_phone: messageData.phone || null,
      subject: messageData.subject,
      message: enhancedMessage,
      recipient_name: messageData.recipientName,
      recipient_role: messageData.recipientRole,
      recipient_email: recipientEmail,
      department: messageData.department || null,
      submission_type: messageData.submissionType || null,
      attachments: attachments,
      status: 'pending',
      source: 'website',
      priority: messageData.counselingUrgency === 'emergency' || messageData.maintenancePriority === 'urgent' ? 'urgent' :
                messageData.maintenancePriority === 'high' ? 'high' : 'normal'
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

    // Trigger Vercel function to send email via Gmail SMTP (non-blocking)
    try {
      fetch('/api/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageId: insertedMessage.id })
      }).catch(() => {})
    } catch (_) {}

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
      // Trigger server-side email sending (non-blocking)
      try {
        fetch('/api/send-message', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messageId: insertedMessage.id })
        }).catch(() => {})
      } catch (_) {}

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

${messageData.attachments && messageData.attachments.length > 0 ?
`📎 ATTACHMENTS (${messageData.attachments.length}):
${messageData.attachments.map(file => `• ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB) - ${file.url}`).join('\n')}

` : ''}📝 HOW TO REPLY:
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
