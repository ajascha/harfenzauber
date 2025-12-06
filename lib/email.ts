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
  phone: string;
  message: string;
  submittedAtISO: string;
}) {
  const submittedAt = new Date(submittedAtISO).toLocaleString("de-DE", {
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
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 8px 8px 0 0;
            text-align: center;
          }
          .content {
            background: #f8f9fa;
            padding: 30px;
            border-radius: 0 0 8px 8px;
            border: 1px solid #e9ecef;
          }
          .field {
            margin-bottom: 20px;
            padding: 15px;
            background: white;
            border-radius: 6px;
            border-left: 4px solid #667eea;
          }
          .field-label {
            font-weight: 600;
            color: #495057;
            margin-bottom: 5px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .field-value {
            color: #212529;
            font-size: 16px;
          }
          .message-field {
            background: white;
            padding: 20px;
            border-radius: 6px;
            border-left: 4px solid #28a745;
            white-space: pre-wrap;
            font-size: 16px;
            line-height: 1.6;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding: 20px;
            color: #6c757d;
            font-size: 14px;
            border-top: 1px solid #e9ecef;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 style="margin: 0; font-size: 24px;">Neue Kontaktanfrage</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Eingegangen am ${escapeHtml(submittedAt)}</p>
        </div>
        
        <div class="content">
          <div class="field">
            <div class="field-label">Name</div>
            <div class="field-value">${escapeHtml(name)}</div>
          </div>
          
          <div class="field">
            <div class="field-label">E-Mail</div>
            <div class="field-value">
              <a href="mailto:${escapeHtml(email)}" style="color: #667eea; text-decoration: none;">${escapeHtml(email)}</a>
            </div>
          </div>
          
          ${
            phone
              ? `
          <div class="field">
            <div class="field-label">Telefon</div>
            <div class="field-value">
              <a href="tel:${escapeHtml(phone)}" style="color: #667eea; text-decoration: none;">${escapeHtml(phone)}</a>
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
