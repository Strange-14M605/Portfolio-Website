import nodemailer from 'nodemailer';

export async function POST(req) {
  console.log('/api/contact POST received');
  try {
    const { content } = await req.json();
    if (!content || !content.trim()) {
      return new Response(JSON.stringify({ error: 'No content provided' }), { status: 400 });
    }

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_PASS;
    if (!user || !pass) {
      return new Response(JSON.stringify({ error: 'Missing SMTP credentials' }), { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass }
    });

    // verify connection configuration early to give clearer errors
    try {
      await transporter.verify();
    } catch (verifyErr) {
      console.error('SMTP verify failed:', verifyErr);
      return new Response(JSON.stringify({ error: 'SMTP connection failed', details: verifyErr.message }), { status: 500 });
    }

    let info;
    try {
      info = await transporter.sendMail({
        from: user,
        to: 'jova16.2004@gmail.com',
        subject: 'New message from portfolio site',
        text: content
      });
    } catch (sendErr) {
      console.error('sendMail failed:', sendErr);
      return new Response(JSON.stringify({ error: 'Failed to send email', details: sendErr.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ ok: true, info }), { status: 200 });
  } catch (err) {
    console.error('Mail error', err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
}
