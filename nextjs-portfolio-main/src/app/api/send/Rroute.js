// this is src/app/api/send/route.js

import { NextResponse } from "next/server";
import { Resend } from "resend";

// ✅ Optional but useful: check for required env vars
if (!process.env.RESEND_API_KEY || !process.env.FROM_EMAIL) {
  throw new Error("Missing RESEND_API_KEY or FROM_EMAIL in environment variables");
}
const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;
export const dynamic = 'force-dynamic'; // 👈 Required for using req.json()


export async function POST(req, res) {
   try {
    const { email, subject, message } = await req.json();
    console.log(email, subject, message);

    const data = await resend.emails.send({
      from: fromEmail,
      to: [fromEmail, email],
      subject: subject,
      react: (
        <div>
          <h1>{subject}</h1>
          <p>Thank you for contacting us!</p>
          <p>New message submitted:</p>
          <p>{message}</p>
        </div>
      ),
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Email send failed:", error);
    return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 });
  }
}

