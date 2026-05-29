import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

export async function POST(request) {
  let email, name, size, role;
  try {
    ({ email, name, size, role } = await request.json());
  } catch {
    return Response.json({ error: 'Bad request' }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'Invalid email' }, { status: 400 });
  }
  if (!name?.trim()) {
    return Response.json({ error: 'Name required' }, { status: 400 });
  }
  if (!size?.trim()) {
    return Response.json({ error: 'Size required' }, { status: 400 });
  }

  const safeSize = escapeHtml(size.trim());
  const safeRole = role ? escapeHtml(role) : '';
  const firstName = name.trim().split(' ')[0];

  try {
    if (process.env.RESEND_AUDIENCE_ID) {
      await resend.contacts.create({
        email,
        firstName: name.trim(),
        unsubscribed: false,
        audienceId: process.env.RESEND_AUDIENCE_ID,
      }).catch(() => {});
    }

    await resend.emails.send({
      from: `Therapeuo <${process.env.RESEND_FROM}>`,
      to: email,
      replyTo: process.env.RESEND_REPLY_TO,
      subject: 'Your Therapeuo insole is reserved',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, sans-serif; max-width: 480px; margin: 0 auto; padding: 48px 24px; color: #111; line-height: 1.6;">
          <p style="font-size: 18px; margin: 0 0 24px; font-weight: 500;">Hey ${escapeHtml(firstName)},</p>

          <p style="font-size: 16px; margin: 0 0 16px;">
            Thank you for reserving your size ${safeSize} Therapeuo insole${safeRole ? ` as a ${safeRole}` : ''}.
          </p>

          <p style="font-size: 16px; margin: 0 0 16px;">
            We'll be in touch near the end of Summer 2026 with more information about your product.
          </p>

          <p style="font-size: 16px; margin: 0 0 40px;">
            If you have any questions, just reply to this email.
          </p>

          <p style="font-size: 14px; color: #888; margin: 0;">— The Therapeuo team</p>
        </div>
      `,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Resend error:', error);
    return Response.json({ error: 'Send failed' }, { status: 500 });
  }
}
