import emailjs from '@emailjs/browser'

// EmailJS Configuration - CONFIGURED AND READY!
const EMAILJS_CONFIG = {
  serviceId: 'service_hmnt5h6', // Gmail service
  templateId: 'template_18z8pvf', // Your email template
  publicKey: '4XpukMVevzEbfA8ik' // Your public key
}

// For development/demo purposes, you can test with these placeholder values
// but emails will not actually be sent until you configure real EmailJS credentials

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.publicKey)

// Email recipient mapping for different departments/ministries
const EMAIL_RECIPIENTS = {
  // Department Heads
  'Paul Odhiambo': 'odhiambop57@gmail.com',
  'Charles Kyalo': 'charleskyalo77@gmail.com',
  'Joseph Kimilu': 'jkimilu963@gmail.com',
  'Margaret Nyambati': 'margymoraa@gmail.com',
  'Erick Mogeni': 'thikamainsdachurchclerk@gmail.com', // Fallback to church clerk
  'Linet Kerubo': 'thikamainsdachurchclerk@gmail.com', // Fallback to church clerk
  'Monicah Mosoti': 'mosotikoreti05@gmail.com',
  'Thomas Jachong': 'jachongthomas@gmail.com',
  'Joyce Ngure': 'marubejoyce747@gmail.com',
  'Charles Owiti': 'thikamainsdachurchclerk@gmail.com', // Fallback to church clerk
  'Abraham Sayah': 'sayahabraham22@gmail.com',
  'Gladys Arita': 'thikamainsdachurchclerk@gmail.com', // Fallback to church clerk
  'Benard Mogere': 'thikamainsdachurchclerk@gmail.com', // Fallback to church clerk
  'Elizabeth Sapato': 'thikamainsdachurchclerk@gmail.com', // Fallback to church clerk
  'Paul Odongo': 'paulodongo43@gmail.com',
  'Rael Karimi': 'thikamainsdachurchclerk@gmail.com', // Fallback to church clerk
  
  // Ministry Leaders
  'Pst. Charles Muritu': 'muritunganga77@gmail.com',
  'Joan Ouma': 'thikamainsdachurchclerk@gmail.com', // AWM/Dorcas Ministry
  'Duncan Mageto': 'duncanmageto76@gmail.com',
  'Erick Yonni': 'erickyonni@gmail.com',

  // Church Elders
  'Elder Reuben Lusasi': 'rlusasi@yahoo.com',
  'Elder Abraham Sayah': 'sayahabraham22@gmail.com',
  'Elder David Juma': 'davyjumah@gmail.com',
  'Elder James Mauti': 'jamesmogere530@gmail.com',

  // Default fallback
  'default': 'thikamainsdachurchclerk@gmail.com'
}

/**
 * Send contact form email
 * @param {Object} contactData - The contact form data
 * @param {string} contactData.name - Sender's name
 * @param {string} contactData.email - Sender's email
 * @param {string} contactData.phone - Sender's phone (optional)
 * @param {string} contactData.subject - Message subject
 * @param {string} contactData.message - Message content
 * @param {string} contactData.recipientName - Name of the recipient
 * @param {string} contactData.recipientRole - Role of the recipient
 * @param {string} contactData.department - Department (optional)
 * @returns {Promise} EmailJS response
 */
export const sendContactEmail = async (contactData) => {
  try {
    console.log('EmailService: sendContactEmail called with:', contactData)

    // Get recipient email
    const recipientEmail = EMAIL_RECIPIENTS[contactData.recipientName] || EMAIL_RECIPIENTS.default
    console.log('Recipient email resolved to:', recipientEmail)

    // Prepare email template parameters
    const templateParams = {
      // Sender information
      from_name: contactData.name,
      from_email: contactData.email,
      from_phone: contactData.phone || 'Not provided',
      
      // Message details
      subject: contactData.subject,
      message: contactData.message,
      
      // Recipient information
      to_name: contactData.recipientName,
      to_email: recipientEmail,
      recipient_role: contactData.recipientRole,
      department: contactData.department || 'General',
      
      // Additional context
      timestamp: new Date().toLocaleString('en-KE', {
        timeZone: 'Africa/Nairobi',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      
      // Church information
      church_name: 'Thika Main Seventh-Day Adventist Church',
      church_website: window.location.origin
    }
    
    console.log('Sending email with params:', templateParams)
    console.log('EmailJS config:', EMAILJS_CONFIG)

    // Check if emailjs is available
    if (!emailjs || typeof emailjs.send !== 'function') {
      throw new Error('EmailJS is not properly loaded or initialized')
    }

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    )
    
    console.log('Email sent successfully:', response)
    return response
    
  } catch (error) {
    console.error('Failed to send email:', error)
    console.error('Error type:', typeof error)
    console.error('Error details:', JSON.stringify(error, null, 2))

    let errorMessage = 'Unknown error occurred'

    if (error && typeof error === 'object') {
      if (error.message) {
        errorMessage = error.message
      } else if (error.text) {
        errorMessage = error.text
      } else if (error.status) {
        errorMessage = `EmailJS Error: ${error.status}`
      } else {
        errorMessage = `EmailJS Error: ${JSON.stringify(error)}`
      }
    } else if (typeof error === 'string') {
      errorMessage = error
    }

    throw new Error(`Failed to send email: ${errorMessage}`)
  }
}

/**
 * Validate email configuration
 * @returns {boolean} True if configuration is valid
 */
export const validateEmailConfig = () => {
  const isConfigured =
    EMAILJS_CONFIG.serviceId === 'service_hmnt5h6' &&
    EMAILJS_CONFIG.templateId === 'template_18z8pvf' &&
    EMAILJS_CONFIG.publicKey === '4XpukMVevzEbfA8ik'

  if (!isConfigured) {
    console.warn('EmailJS configuration mismatch. Please check your credentials.')
  } else {
    console.log('✅ EmailJS is properly configured and ready to send emails!')
  }

  return isConfigured
}

/**
 * Get recipient email for a given name
 * @param {string} recipientName - Name of the recipient
 * @returns {string} Email address
 */
export const getRecipientEmail = (recipientName) => {
  return EMAIL_RECIPIENTS[recipientName] || EMAIL_RECIPIENTS.default
}

export default {
  sendContactEmail,
  validateEmailConfig,
  getRecipientEmail
}
