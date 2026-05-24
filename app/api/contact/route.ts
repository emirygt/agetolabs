import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

const CONTACT_TO = process.env.CONTACT_TO_EMAIL ?? 'info@agetolabs.com';
const CONTACT_FROM =
  process.env.CONTACT_FROM ?? 'agetolabs <noreply@send.agetolabs.com>';

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: 'Email service is not configured.' },
      { status: 503 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid request body.' },
      { status: 400 }
    );
  }

  const name = String(body.name ?? '').trim().slice(0, 120);
  const email = String(body.email ?? '').trim().slice(0, 200);
  const company = String(body.company ?? '').trim().slice(0, 160);
  const solution = String(body.solution ?? '').trim().slice(0, 80);
  const message = String(body.message ?? '').trim().slice(0, 4000);

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: 'Name, email and message are required.' },
      { status: 400 }
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: 'Invalid email.' },
      { status: 400 }
    );
  }

  const resend = new Resend(apiKey);

  const subject = `[agetolabs] New lead · ${name}${company ? ' · ' + company : ''}`;
  const html = `
    <div style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace;background:#0B0C10;color:#fff;padding:32px;border-radius:16px;max-width:640px;margin:0 auto">
      <div style="font-size:12px;letter-spacing:.3em;text-transform:uppercase;color:#8EF0B5;margin-bottom:24px">agetolabs · new lead</div>
      <table style="width:100%;border-collapse:collapse;font-family:Inter,sans-serif">
        <tr><td style="padding:8px 0;color:#9ca3af;width:120px">Name</td><td style="padding:8px 0;color:#fff;font-weight:600">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:8px 0;color:#9ca3af">Email</td><td style="padding:8px 0;color:#8EF0B5"><a href="mailto:${escapeHtml(email)}" style="color:#8EF0B5;text-decoration:none">${escapeHtml(email)}</a></td></tr>
        ${company ? `<tr><td style="padding:8px 0;color:#9ca3af">Company</td><td style="padding:8px 0;color:#fff">${escapeHtml(company)}</td></tr>` : ''}
        ${solution ? `<tr><td style="padding:8px 0;color:#9ca3af">Interested in</td><td style="padding:8px 0;color:#fff">${escapeHtml(solution)}</td></tr>` : ''}
      </table>
      <div style="margin-top:24px;padding:20px;background:#13151A;border:1px solid rgba(255,255,255,0.08);border-radius:12px;font-family:Inter,sans-serif;color:#e5e7eb;white-space:pre-wrap;line-height:1.6">${escapeHtml(message)}</div>
      <div style="margin-top:24px;font-size:11px;color:#6b7280;font-family:ui-monospace,monospace">Captured · ${new Date().toISOString()}</div>
    </div>
  `;

  const text = [
    `New lead · agetolabs`,
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : '',
    solution ? `Interested in: ${solution}` : '',
    '',
    message,
  ]
    .filter(Boolean)
    .join('\n');

  try {
    const { error } = await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: email,
      subject,
      html,
      text,
    });
    if (error) {
      console.error('[contact] resend error', error);
      return NextResponse.json(
        { ok: false, error: 'Failed to send email.' },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] resend exception', err);
    return NextResponse.json(
      { ok: false, error: 'Unexpected error.' },
      { status: 500 }
    );
  }
}
