import { Resend } from 'resend';

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

export async function POST(request) {
  if (!process.env.RESEND_API_KEY) {
    return Response.json({ error: 'Server configuration error' }, { status: 500 });
  }
  const resend = new Resend(process.env.RESEND_API_KEY);

  // Where reservation notifications are sent. Defaults to contact@therapeuo.xyz.
  const notifyTo = process.env.RESEND_NOTIFY_TO || 'contact@therapeuo.xyz';
  // Verified sender (must be on a domain verified in Resend).
  const from = process.env.RESEND_FROM
    ? `Therapeuo <${process.env.RESEND_FROM}>`
    : 'Therapeuo <reservations@therapeuo.xyz>';

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

  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanSize = size.trim();
  const cleanRole = (role || '').trim();

  const safeName = escapeHtml(cleanName);
  const safeEmail = escapeHtml(cleanEmail);
  const safeSize = escapeHtml(cleanSize);
  const safeRole = cleanRole ? escapeHtml(cleanRole) : '—';
  const firstName = cleanName.split(' ')[0];
  const submittedAt = new Date().toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  // 1) Internal notification to the Therapeuo team. This is the critical path:
  //    if it fails, the whole request fails so the lead is never silently lost.
  try {
    await resend.emails.send({
      from,
      to: notifyTo,
      replyTo: cleanEmail, // replying goes straight to the customer
      subject: `New insole reservation: ${cleanName}`,
      text:
        `New reservation submitted via therapeuo.xyz\n\n` +
        `Name:       ${cleanName}\n` +
        `Email:      ${cleanEmail}\n` +
        `I am a:     ${cleanRole || '(not specified)'}\n` +
        `Shoe size:  ${cleanSize}\n` +
        `Submitted:  ${submittedAt} (PT)\n`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 24px; color: #111; line-height: 1.6;">
          <p style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; color: #888; margin: 0 0 8px;">New reservation</p>
          <h1 style="font-size: 22px; margin: 0 0 24px; font-weight: 600;">${safeName}</h1>
          <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
            <tr><td style="padding: 8px 0; color: #888; width: 120px;">Name</td><td style="padding: 8px 0;">${safeName}</td></tr>
            <tr><td style="padding: 8px 0; color: #888;">Email</td><td style="padding: 8px 0;"><a href="mailto:${safeEmail}" style="color:#111;">${safeEmail}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #888;">I am a</td><td style="padding: 8px 0;">${safeRole}</td></tr>
            <tr><td style="padding: 8px 0; color: #888;">Shoe size</td><td style="padding: 8px 0;">${safeSize}</td></tr>
            <tr><td style="padding: 8px 0; color: #888;">Submitted</td><td style="padding: 8px 0;">${escapeHtml(submittedAt)} PT</td></tr>
          </table>
          <p style="font-size: 13px; color: #aaa; margin: 24px 0 0;">Reply to this email to respond directly to ${safeName}.</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Resend notification error:', error);
    return Response.json({ error: 'Send failed' }, { status: 500 });
  }

  // 2) Optional: add to a Resend audience for later marketing.
  if (process.env.RESEND_AUDIENCE_ID) {
    await resend.contacts.create({
      email: cleanEmail,
      firstName: cleanName,
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID,
    }).catch(() => {});
  }

  // 3) Confirmation email to the customer. Best-effort: a failure here should
  //    not fail the request, since the team has already been notified above.
  try {
    await resend.emails.send({
      from,
      to: cleanEmail,
      replyTo: process.env.RESEND_REPLY_TO || notifyTo,
      subject: 'Your Therapeuo insole is reserved',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, sans-serif; max-width: 480px; margin: 0 auto; padding: 48px 24px; color: #111; line-height: 1.6;">
          <p style="font-size: 18px; margin: 0 0 24px; font-weight: 500;">Hey ${escapeHtml(firstName)},</p>
          <p style="font-size: 16px; margin: 0 0 16px;">
            Thank you for reserving your size ${safeSize} Therapeuo insole${cleanRole ? ` as a ${escapeHtml(cleanRole)}` : ''}.
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
  } catch (error) {
    console.error('Resend confirmation error (non-fatal):', error);
  }

  return Response.json({ ok: true });
}
