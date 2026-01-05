import { Resend } from "resend";

type SendEmailParams = {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string | string[];
  bcc?: string | string[];
};

let cachedResend: Resend | null = null;

function getResendClient(): Resend {
  if (cachedResend) return cachedResend;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }
  cachedResend = new Resend(apiKey);
  return cachedResend;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function renderContactEmailHtml({
  name,
  email,
  phone,
  message,
  submittedAtISO,
}: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  submittedAtISO?: string;
}) {
  const submittedAt = submittedAtISO
    ? new Date(submittedAtISO).toLocaleString("de-DE", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : new Date().toLocaleString("de-DE", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Neue Kontaktanfrage</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9fafb;
          }
          .header {
            background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
            color: white;
            padding: 32px 30px;
            border-radius: 8px 8px 0 0;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
            letter-spacing: -0.5px;
          }
          .header p {
            margin: 8px 0 0 0;
            opacity: 0.95;
            font-size: 14px;
          }
          .content {
            background: white;
            padding: 30px;
            border-radius: 0 0 8px 8px;
            border: 1px solid #e5e7eb;
          }
          .field {
            margin-bottom: 16px;
            padding: 12px 0;
            border-bottom: 1px solid #f3f4f6;
          }
          .field:last-of-type {
            border-bottom: none;
          }
          .field-label {
            font-weight: 600;
            color: #6b7280;
            margin-bottom: 4px;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .field-value {
            color: #111827;
            font-size: 15px;
          }
          .field-value a {
            color: #10b981;
            text-decoration: none;
          }
          .message-field {
            background: #f9fafb;
            padding: 16px;
            border-radius: 6px;
            border-left: 3px solid #10b981;
            white-space: pre-wrap;
            font-size: 15px;
            line-height: 1.6;
            color: #111827;
            margin-top: 8px;
          }
          .footer {
            text-align: center;
            margin-top: 24px;
            padding-top: 20px;
            color: #6b7280;
            font-size: 13px;
            border-top: 1px solid #e5e7eb;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Harfenzauber</h1>
          <p>Neue Kontaktanfrage • ${escapeHtml(submittedAt)}</p>
        </div>
        
        <div class="content">
          <div class="field">
            <div class="field-label">Name</div>
            <div class="field-value">${escapeHtml(name)}</div>
          </div>
          
          <div class="field">
            <div class="field-label">E-Mail</div>
            <div class="field-value">
              <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>
            </div>
          </div>
          
          ${
            phone
              ? `
          <div class="field">
            <div class="field-label">Telefon</div>
            <div class="field-value">
              <a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a>
            </div>
          </div>
          `
              : ""
          }
          
          <div class="field">
            <div class="field-label">Nachricht</div>
            <div class="message-field">${escapeHtml(message).replace(/\n/g, "<br/>")}</div>
          </div>
        </div>
        
        <div class="footer">
          <p>Diese Nachricht wurde über das Kontaktformular auf harfenzauber.de gesendet.</p>
        </div>
      </body>
    </html>
  `;
}

export async function sendEmail(params: SendEmailParams) {
  const resend = getResendClient();
  const fromAddress = params.from || process.env.RESEND_CONTACT_FROM_EMAIL;
  if (!fromAddress) {
    throw new Error(
      "No 'from' address was provided and RESEND_CONTACT_FROM_EMAIL is not set."
    );
  }

  try {
    const response = await resend.emails.send({
      from: fromAddress,
      to: params.to,
      subject: params.subject,
      html: params.html,
      replyTo: params.replyTo,
      bcc: params.bcc,
    });
    if (process.env.NODE_ENV === "development") {
      console.log("Resend response:", JSON.stringify(response, null, 2));
    }
    return response;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error sending email via Resend:", error);
    }
    throw error;
  }
}
