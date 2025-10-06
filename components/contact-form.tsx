import {
  ContactFormClient,
  type FormState,
} from "@/components/contact-form-client";
import { cookies } from "next/headers";
import { renderContactEmailHtml, sendEmail } from "@/lib/email";

export async function ContactForm() {
  async function submitAction(
    _prev: FormState,
    formData: FormData
  ): Promise<FormState> {
    "use server";

    console.log("Contact form submitted", {
      name: formData.get("name"),
      email: formData.get("email"),
    });

    const cookiesApi = await cookies();

    const honeypotValue = String(formData.get("company") || "").trim();
    if (honeypotValue) {
      return { ok: true, message: "" };
    }

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const MIN_MESSAGE_LENGTH = 20;
    if (message.length < MIN_MESSAGE_LENGTH) {
      return {
        ok: false,
        message: "Bitte formuliere deine Nachricht etwas ausführlicher.",
        formData: {
          name,
          email,
          phone,
          message,
        },
      };
    }

    const toAddress = process.env.RESEND_CONTACT_TO_EMAIL;
    if (!toAddress) {
      return {
        ok: false,
        message: "Der E-Mail-Empfänger ist nicht konfiguriert.",
        formData: {
          name,
          email,
          phone,
          message,
        },
      };
    }

    const last = cookiesApi.get("cf_last")?.value;
    const now = Date.now();
    const windowMs = 60_000; // 60 seconds
    if (last && now - Number(last) < windowMs) {
      return {
        ok: false,
        message: "Bitte warte einen Moment, bevor du es erneut versuchst.",
        formData: {
          name,
          email,
          phone,
          message,
        },
      };
    }

    const html = renderContactEmailHtml({
      name,
      email,
      phone,
      message,
      submittedAtISO: new Date().toISOString(),
    });

    try {
      const fromAddress = process.env.RESEND_CONTACT_FROM_EMAIL;
      console.log(
        "Sending email to",
        toAddress,
        "from",
        fromAddress,
        "message",
        message
      );
      await sendEmail({
        to: toAddress,
        subject: `Neue Kontaktanfrage von ${name || "Unbekannt"}`,
        html,
        from: fromAddress,
        replyTo: email,
        bcc: "arne.wolfewicz+harfenzauber@gmail.com",
      });

      cookiesApi.set("cf_last", String(now), {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
      });

      return {
        ok: true,
        message: "Danke! Ich melde mich schnellstmöglichst bei dir.",
      };
    } catch (error) {
      console.error("Contact form submission failed", error);
      return {
        ok: false,
        message:
          "Es gab ein Problem beim Senden. Bitte versuche es später erneut.",
        formData: {
          name,
          email,
          phone,
          message,
        },
      };
    }
  }

  const initial: FormState = { ok: false, message: "" };
  return <ContactFormClient action={submitAction} initialState={initial} />;
}
