import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Create email content
    const emailContent = `
      <h2>New Enquiry from Your Portfolio</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `

    // For now, we'll just return a success response
    // In production, integrate with SendGrid, Resend, or similar
    console.log('[v0] Email enquiry received:', { name, email, subject })

    return NextResponse.json(
      { 
        success: true,
        message: 'Your enquiry has been received. We will get back to you soon!'
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[v0] Email API error:', error)
    return NextResponse.json(
      { error: 'Failed to send enquiry' },
      { status: 500 }
    )
  }
}
