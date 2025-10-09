import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit } from "@/lib/rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY);

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";

    // Apply rate limiting: 3 emails per hour per IP
    const rateLimitResult = rateLimit(ip, {
      maxRequests: 3,
      windowMs: 60 * 60 * 1000, // 1 hour
    });

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: rateLimitResult.message || "Too many requests",
          resetTime: rateLimitResult.resetTime,
        },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Validate field lengths
    if (name.length > 100 || subject.length > 200 || message.length > 2000) {
      return NextResponse.json({ error: "Field length exceeded" }, { status: 400 });
    }

    // Sanitize inputs (basic XSS prevention)
    const sanitizedName = name.trim().replace(/[<>]/g, "");
    const sanitizedSubject = subject.trim().replace(/[<>]/g, "");
    const sanitizedMessage = message.trim().replace(/[<>]/g, "");

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json({ error: "Email service is not configured" }, { status: 500 });
    }

    // Your email address to receive contact form submissions
    const recipientEmail = process.env.CONTACT_EMAIL || "dangnguyen28.work@gmail.com";

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: `Portfolio Contact <${process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"}>`,
      to: recipientEmail,
      replyTo: email,
      subject: `Portfolio Contact: ${sanitizedSubject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #667eea; margin-bottom: 5px; }
              .value { background: white; padding: 10px; border-radius: 5px; border-left: 3px solid #667eea; }
              .message-box { white-space: pre-wrap; }
              .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">New Contact Form Submission</h1>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">From:</div>
                  <div class="value">${sanitizedName}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                <div class="field">
                  <div class="label">Subject:</div>
                  <div class="value">${sanitizedSubject}</div>
                </div>
                <div class="field">
                  <div class="label">Message:</div>
                  <div class="value message-box">${sanitizedMessage}</div>
                </div>
                <div class="footer">
                  <p>This email was sent from your portfolio contact form.</p>
                  <p>IP Address: ${ip}</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Error sending email:", error);
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Email sent successfully",
        remaining: rateLimitResult.remaining,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
