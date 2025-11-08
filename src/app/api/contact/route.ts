import sgMail from '@sendgrid/mail'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  // Check for API key at runtime, not build time
  if (!process.env.SENDGRID_API_KEY) {
    return new NextResponse(JSON.stringify({
      message: 'Email service is not configured'
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  try {
    const { name, email, message } = await req.json()
    
    const [response] = await sgMail.send({
      to: 'bob@ncaviation.com',
      from: 'me@brybrydataguy.com',
      subject: 'New Contact Form Submission from NC Aviation',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong> ${message}</p>
<br>
<p><em>This email was sent automatically from the NC Aviation website contact form.</em></p>
      `.trim()
    })

    // Check if SendGrid accepted the email (202 status)
    if (response.statusCode === 202) {
      return new NextResponse(JSON.stringify({ 
        success: true,
        message: 'Email accepted for delivery',
        messageId: response.headers['x-message-id']
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } else {
      throw new Error(`Unexpected SendGrid status: ${response.statusCode}`)
    }

  } catch (error) {
    // More detailed error logging
    console.error('SendGrid Error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error instanceof Error ? error.stack : undefined
    })

    return new NextResponse(JSON.stringify({ 
      success: false,
      message: 'Failed to send email. Please try again later.'
    }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
