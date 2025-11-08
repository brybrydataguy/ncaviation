import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  // Check for API key and contact email at runtime, not build time
  if (!process.env.RESEND_API_KEY) {
    return new NextResponse(JSON.stringify({
      message: 'Email service is not configured'
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  if (!process.env.CONTACT_FORM_EMAIL) {
    return new NextResponse(JSON.stringify({
      message: 'Contact email is not configured'
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const { name, email, message } = await req.json()

    const { data, error } = await resend.emails.send({
      from: 'Bryan Smith <me@brybrydataguy.com>', // Use Resend's default sender for now
      to: process.env.CONTACT_FORM_EMAIL,
      subject: 'New Contact Form Submission from NC Aviation',
      replyTo: email, // Set reply-to as the form submitter's email
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #333;">New Contact Form Submission</h2>
  <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
    <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
    <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
    <p style="margin: 10px 0;"><strong>Message:</strong></p>
    <p style="margin: 10px 0; padding: 10px; background-color: white; border-radius: 3px;">${message}</p>
  </div>
  <p style="color: #666; font-size: 12px; font-style: italic;">This email was sent automatically from the NC Aviation website contact form.</p>
</div>
      `.trim(),
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n\nThis email was sent automatically from the NC Aviation website contact form.`
    })

    if (error) {
      throw new Error(error.message)
    }

    return new NextResponse(JSON.stringify({
      success: true,
      message: 'Email sent successfully',
      messageId: data?.id
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })

  } catch (error) {
    // More detailed error logging
    console.error('Resend Error:', {
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
