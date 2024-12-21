import nodemailer from 'nodemailer'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json()

    // Create reusable transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    })

    // Send mail with defined transport object
    await transporter.sendMail({
      from: '"NC Aviation Website" <noreply@ncaviation.com>',
      to: 'bryantravissmith@gmail.com',
      subject: 'New Contact Form Submission',
      text: `
New contact form submission received:

Name: ${name}
Email: ${email}
Message: ${message}

This email was sent automatically from the NC Aviation website contact form.
      `.trim(),
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong> ${message}</p>
<br>
<p><em>This email was sent automatically from the NC Aviation website contact form.</em></p>
      `.trim()
    })

    return NextResponse.json({ 
      success: true,
      message: 'Email sent successfully'
    })

  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ 
      success: false,
      message: 'Failed to send email'
    }, { 
      status: 500 
    })
  }
}
