import 'server-only';
import { Resend } from 'resend';

const FROM_ADDRESS = 'agetolabs <noreply@send.agetolabs.com>';

type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
};

type SendEmailResult = {
  id: string;
};

let cachedClient: Resend | null = null;

function getClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not set');
  }
  if (!cachedClient) {
    cachedClient = new Resend(apiKey);
  }
  return cachedClient;
}

export async function sendEmail({
  to,
  subject,
  html,
  text,
  replyTo,
}: SendEmailInput): Promise<SendEmailResult> {
  const client = getClient();

  const { data, error } = await client.emails.send({
    from: FROM_ADDRESS,
    to,
    subject,
    html,
    text,
    replyTo,
  });

  if (error) {
    console.error('[email] resend error', error);
    throw new Error(error.message ?? 'Failed to send email');
  }
  if (!data?.id) {
    throw new Error('Resend returned no message id');
  }
  return { id: data.id };
}
