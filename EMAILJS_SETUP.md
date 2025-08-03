# EmailJS Setup Instructions

To enable email functionality for the contact forms, you need to set up EmailJS. Follow these steps:

## 1. Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Create Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID** (e.g., `service_abc123`)

## 3. Create Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template content:

### Template Subject:
```
New Contact Form Message - {{subject}}
```

### Template Body:
```
Hello {{to_name}},

You have received a new message through the {{church_name}} website contact form.

---
FROM: {{from_name}}
EMAIL: {{from_email}}
PHONE: {{from_phone}}
ROLE: {{recipient_role}}
DEPARTMENT: {{department}}
DATE: {{timestamp}}
---

SUBJECT: {{subject}}

MESSAGE:
{{message}}

---
This message was sent through the secure contact form on {{church_website}}.

Please respond directly to {{from_email}} if you need to reply to this message.

Best regards,
{{church_name}} Website System
```

4. Save the template and note down your **Template ID** (e.g., `template_xyz789`)

## 4. Get Public Key

1. Go to **Account** > **General**
2. Find your **Public Key** (e.g., `user_abc123xyz`)

## 5. Update Configuration

Edit `src/services/emailService.js` and replace these values:

```javascript
const EMAILJS_CONFIG = {
  serviceId: 'your_service_id_here',     // Replace with your Service ID
  templateId: 'your_template_id_here',   // Replace with your Template ID
  publicKey: 'your_public_key_here'      // Replace with your Public Key
}
```

## 6. Test Email Functionality

1. Start your development server: `npm run dev`
2. Navigate to the Ministries or Departments page
3. Click a "Contact" button
4. Fill out and submit the form
5. Check that the email is received by the intended recipient

## 7. Email Recipients

The system is configured to send emails to the following recipients:

- **Department Heads**: Emails go to their personal addresses
- **Ministry Leaders**: Emails go to their personal addresses
- **Fallback**: If no specific email is found, emails go to `thikamainsdachurchclerk@gmail.com`

You can update the recipient mapping in `src/services/emailService.js` in the `EMAIL_RECIPIENTS` object.

## 8. Security Notes

- EmailJS public key is safe to use in frontend code
- The actual email addresses are hidden from users
- All emails are sent through EmailJS servers
- Rate limiting is handled by EmailJS

## 9. Troubleshooting

### Common Issues:

1. **"EmailJS not configured" warning**
   - Make sure you've updated all three config values
   - Check that the values don't contain the default placeholder text

2. **Emails not being sent**
   - Verify your EmailJS service is active
   - Check the browser console for error messages
   - Ensure your email template variables match the ones being sent

3. **Emails going to spam**
   - Ask recipients to check their spam folders
   - Consider using a custom domain for your EmailJS service

### Testing:

- Use the browser's developer console to see detailed logs
- EmailJS provides a test feature in their dashboard
- Start with a simple test email to yourself

## 10. Production Deployment

When deploying to production:

1. Ensure all EmailJS configuration is correct
2. Test the contact forms on the live site
3. Monitor the EmailJS dashboard for usage statistics
4. Consider upgrading to a paid plan if you exceed the free tier limits

---

For more detailed information, visit the [EmailJS Documentation](https://www.emailjs.com/docs/).
