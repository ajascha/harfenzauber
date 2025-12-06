import { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktiere mich für Anfragen zu Harfenunterricht oder musikalischer Begleitung",
};

export default function KontaktPage() {
  return (
    <div className="container px-4 md:px-6 py-16 max-w-2xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter mb-4">Kontakt</h1>
        <p className="text-lg text-muted-foreground">
          Ruf mich gerne unter{" "}
          <a href="tel:+4922626187" className="text-primary hover:underline">
            02262 - 6187
          </a>{" "}
          an oder schreib mir eine Nachricht.
        </p>
      </div>
      <ContactForm />
    </div>
  );
}
