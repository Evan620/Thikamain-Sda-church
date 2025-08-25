# M-PESA Integration Setup Guide
## Thika Main SDA Church - Payment System

This guide will help you set up the M-PESA STK Push integration for the church management system.

## 🚀 Quick Start

The M-PESA integration is **already implemented** and includes:
- ✅ Frontend payment modal with beautiful UI
- ✅ STK Push integration
- ✅ Payment status polling
- ✅ Database integration
- ✅ Callback handlers
- ✅ Demo mode for testing

## 📋 Prerequisites

1. **Safaricom Developer Account**
   - Register at [developer.safaricom.co.ke](https://developer.safaricom.co.ke/)
   - Create an M-PESA app to get credentials

2. **Church Paybill Number**
   - Apply for a Paybill number from Safaricom
   - This will be your business short code

3. **HTTPS Domain**
   - M-PESA requires HTTPS for callbacks
   - Use ngrok for local testing
   - Use your actual domain for production

## 🔧 Configuration Steps

### 1. Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# M-PESA Credentials (from Safaricom Developer Portal)
VITE_MPESA_CONSUMER_KEY=your_consumer_key_here
VITE_MPESA_CONSUMER_SECRET=your_consumer_secret_here
VITE_MPESA_PASSKEY=your_passkey_here

# Callback URLs (must be HTTPS)
VITE_MPESA_CALLBACK_URL=https://your-domain.com/api/mpesa/callback
VITE_MPESA_RESULT_URL=https://your-domain.com/api/mpesa/result

# Environment (sandbox for testing, production for live)
VITE_MPESA_ENVIRONMENT=sandbox
```

### 2. Database Setup

Run the database migration to create required tables:

```sql
-- Run this in your Supabase SQL editor
-- The payment_logs table is already included in database_schema.sql
```

### 3. Safaricom Developer Portal Setup

1. **Create App:**
   - Go to [developer.safaricom.co.ke](https://developer.safaricom.co.ke/)
   - Create a new app
   - Select "Lipa Na M-PESA Online" product

2. **Get Credentials:**
   - Consumer Key
   - Consumer Secret
   - Passkey (for STK Push)

3. **Configure Callback URLs:**
   - Callback URL: `https://your-domain.com/api/mpesa/callback`
   - Result URL: `https://your-domain.com/api/mpesa/result`
   - Timeout URL: `https://your-domain.com/api/mpesa/timeout`

### 4. Testing Setup (Local Development)

For local testing, use ngrok to expose your local server:

```bash
# Install ngrok
npm install -g ngrok

# Expose your local server (assuming port 3000)
ngrok http 3000

# Use the HTTPS URL for callback URLs
# Example: https://abc123.ngrok.io/api/mpesa/callback
```

## 🎯 How It Works

### Payment Flow

1. **User initiates payment** on the Giving page
2. **Frontend validates** amount and phone number
3. **STK Push sent** to user's phone via M-PESA API
4. **User enters PIN** on their phone
5. **Payment processed** by Safaricom
6. **Callback received** by our backend
7. **Payment saved** to database
8. **User notified** of success/failure

### Backend Endpoints

- `POST /api/mpesa/callback` - Receives payment confirmations
- `POST /api/mpesa/result` - Handles transaction results
- `POST /api/mpesa/timeout` - Handles timeouts
- `POST /api/mpesa/save-payment` - Saves payment records

## 🧪 Testing

### Demo Mode
The system includes demo mode for testing without real M-PESA credentials:
- Uses mock responses
- Simulates payment flow
- Safe for development

### Sandbox Testing
1. Use sandbox credentials from Safaricom
2. Use test phone numbers: `254708374149`, `254711XXXXXX`
3. Test amounts: Any amount between 1-70000

## 🔒 Security Features

- ✅ Input validation
- ✅ Duplicate payment prevention
- ✅ Secure credential handling
- ✅ Error logging
- ✅ Transaction verification

## 📊 Database Tables

### giving_records
Stores all giving/donation records:
- `amount` - Payment amount
- `giving_type` - tithe, offering, special_project, etc.
- `payment_method` - mpesa, cash, bank_transfer, check
- `transaction_id` - M-PESA receipt number
- `is_verified` - Payment verification status

### payment_logs
Logs all M-PESA transactions:
- `checkout_request_id` - STK Push request ID
- `result_code` - M-PESA response code
- `status` - pending, success, failed, timeout
- `amount` - Transaction amount

## 🚨 Troubleshooting

### Common Issues

1. **"Invalid Credentials"**
   - Check consumer key/secret
   - Verify environment (sandbox vs production)

2. **"Callback not received"**
   - Ensure HTTPS URLs
   - Check firewall settings
   - Verify ngrok tunnel (for local testing)

3. **"Payment not saved"**
   - Check database connection
   - Verify Supabase credentials
   - Check server logs

### Debug Mode
Enable debug logging by checking browser console and server logs.

## 📞 Support

For M-PESA integration support:
1. Check Safaricom Developer documentation
2. Review server logs for errors
3. Test with sandbox credentials first
4. Contact Safaricom support for API issues

## 🎉 Go Live Checklist

- [ ] Production M-PESA credentials configured
- [ ] HTTPS domain configured
- [ ] Callback URLs updated in Safaricom portal
- [ ] Database tables created
- [ ] Payment flow tested end-to-end
- [ ] Error handling verified
- [ ] Backup procedures in place

---

**Note:** This integration is production-ready but requires proper M-PESA credentials and HTTPS setup for live use.
