import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, company, note } = await req.json();

  if (!name || !email || !note) {
    return NextResponse.json({ error: 'Hiányzó mezők.' }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: 'GASPAR Design <onboarding@resend.dev>',
    to: 'hello@gasparstudio.com',
    replyTo: email,
    subject: `Új árajánlat kérés — ${name}${company ? ` (${company})` : ''}`,
    text: `Feladó: ${name} <${email}>${company ? `\nCég: ${company}` : ''}\n\n${note}`,
  });

  if (error) {
    console.error('Resend error:', JSON.stringify(error));
    return NextResponse.json({ error: 'Email küldés sikertelen.', detail: error }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
