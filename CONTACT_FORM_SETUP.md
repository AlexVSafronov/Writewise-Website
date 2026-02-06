# Contact Form Setup Guide

This guide explains how to configure the Contact form with Mailjet email integration.

## Overview

The Contact page allows users to send messages through a form. When submitted, the form sends an email to your support email address using Mailjet's email service.

## Features

- ✅ Form validation with Zod schema
- ✅ Three subject categories: General Inquiry, Technical Support, Feedback & Suggestions
- ✅ Email sent to support address via Mailjet
- ✅ Reply-to set to user's email for easy responses
- ✅ Success confirmation with auto-reset
- ✅ Error handling with user-friendly messages

## Files Created/Modified

### Website (Frontend)
- **Created:** `/website/src/pages/Contact.tsx` - Contact form page component
- **Modified:** `/website/src/App.tsx` - Added `/contact` route
- **Modified:** `/website/src/components/layout/Footer.tsx` - Updated Contact link to `/contact`

### CMS (Backend)
- **Created:** `/cms/src/api/contact/routes/contact.ts` - API route definition
- **Created:** `/cms/src/api/contact/controllers/contact.ts` - Request handler
- **Created:** `/cms/src/api/contact/services/contact.ts` - Mailjet integration service
- **Modified:** `/cms/.env.example` - Added Mailjet configuration template
- **Installed:** `node-mailjet` package

## Configuration Steps

### 1. Get Mailjet API Credentials

1. Go to [Mailjet](https://www.mailjet.com/) and create an account (or log in)
2. Navigate to **Account Settings** → **REST API** → **API Key Management**
3. Copy your **API Key** and **Secret Key**

### 2. Configure Environment Variables

Add the following variables to your `/cms/.env` file:

```bash
# Mailjet Configuration
MAILJET_API_KEY=your_actual_api_key_here
MAILJET_SECRET_KEY=your_actual_secret_key_here
SUPPORT_EMAIL=support@write-wise.com
```

**Important:**
- Replace `your_actual_api_key_here` and `your_actual_secret_key_here` with your real Mailjet credentials
- Change `support@write-wise.com` to your actual support email address
- The `SUPPORT_EMAIL` will be both the sender and recipient of contact form messages

### 3. Verify Sender Email in Mailjet

Before emails can be sent, you must verify your sender email address in Mailjet:

1. Log in to [Mailjet Dashboard](https://app.mailjet.com/)
2. Go to **Account Settings** → **Sender Addresses & Domains**
3. Add your `SUPPORT_EMAIL` address (e.g., `support@write-wise.com`)
4. Click the verification link sent to that email address
5. Wait for verification to complete (usually a few minutes)

**Note:** Mailjet won't send emails from unverified addresses. This is a security measure.

### 4. Restart Strapi

After adding environment variables, restart your Strapi server:

```bash
cd cms
npm run develop
```

### 5. Test the Contact Form

1. Navigate to `http://localhost:8081/contact` (or your website URL)
2. Fill out the form:
   - Your Name: Test User
   - Email: test@example.com
   - Subject: Select any option
   - Message: This is a test message
3. Click "Send Message"
4. Check your support email inbox for the message

## Email Template

When a user submits the contact form, you'll receive an email with:

**Subject:** `[Subject Category] Contact Form Submission from [User Name]`

**Body includes:**
- User's name
- User's email address
- Selected subject category
- Message content
- Reply-to header set to user's email (you can click "Reply" in your email client)

## How It Works

1. **User submits form** on `/contact` page
2. **Frontend validates** the form data using Zod schema
3. **Frontend sends POST request** to `/api/contact` on Strapi CMS
4. **Strapi controller** receives and validates the request
5. **Strapi service** formats and sends email via Mailjet API
6. **Success response** triggers confirmation message to user
7. **Form auto-resets** after 3 seconds

## API Endpoint

**Endpoint:** `POST /api/contact`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "general|support|feedback",
  "message": "Your message here..."
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

**Error Responses:**
- `400 Bad Request` - Missing required fields
- `500 Internal Server Error` - Mailjet API error or configuration issue

## Troubleshooting

### "Email service not configured" error
- Check that `MAILJET_API_KEY` and `MAILJET_SECRET_KEY` are set in `/cms/.env`
- Restart Strapi after adding environment variables

### "Failed to send message" error
- Verify your Mailjet API credentials are correct
- Check that sender email is verified in Mailjet dashboard
- Check Strapi console logs for detailed error messages
- Ensure Mailjet account is active and not suspended

### Email not received
- Check your spam/junk folder
- Verify the `SUPPORT_EMAIL` environment variable is correct
- Check Mailjet dashboard → Statistics to see if email was sent
- Verify sender email address is confirmed in Mailjet

### Form validation errors
- Name: 1-100 characters required
- Email: Must be valid email format, max 255 characters
- Subject: Must select one option
- Message: 10-1000 characters required

## Mailjet Account Limits

**Free Tier:**
- 200 emails per day
- 6,000 emails per month
- Email support

If you need more, consider upgrading to a paid plan.

## Security Notes

- Form data is validated on both frontend (Zod) and backend (Strapi)
- Mailjet credentials are stored in environment variables (never in code)
- No email addresses are stored in the database
- Reply-to header allows direct responses without exposing support email
- Strapi API is configured without authentication for this public endpoint

## Future Enhancements

Consider adding:
- Rate limiting to prevent spam
- CAPTCHA or reCAPTCHA integration
- Auto-reply confirmation email to user
- Store messages in Strapi database for records
- Admin panel to view submitted messages
- Email templates with branding

## Support

For issues with:
- **Mailjet:** Contact [Mailjet Support](https://www.mailjet.com/support/)
- **Contact Form:** Check browser console and Strapi logs for errors
