import { prisma } from "@/lib/db";
import { toSlug, formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Euro, Phone, Mail } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 300; // Revalidate every 5 minutes

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const events = await prisma.hfzEvent.findMany();
  const event = events.find((ev) => toSlug(ev.title) === slug);

  if (!event) {
    return { title: "Veranstaltung nicht gefunden" };
  }

  return {
    title: `${event.title} - Harfenzauber`,
    description: event.description,
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const events = await prisma.hfzEvent.findMany();
  const event = events.find((ev) => toSlug(ev.title) === slug);

  if (!event) {
    notFound();
  }

  const formattedPrice = formatPrice(event.price_text);

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href="/veranstaltungen" className="text-primary underline">
          Alle Veranstaltungen
        </Link>
      </div>
      <article className="bg-white rounded-xl border overflow-hidden">
        {event.image_url && (
          <div className="relative w-full h-64">
            <Image
              src={event.image_url}
              alt={event.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover object-top"
              quality={85}
            />
          </div>
        )}
        <div className="p-6">
          <h1 className="text-3xl font-light text-neutral-900">
            {event.title}
          </h1>
          {event.subtitle && (
            <div className="text-neutral-600 mt-1">{event.subtitle}</div>
          )}

          {/* Meta info - aligned with lorena-wolfewicz style */}
          <div className="mt-4 pt-4 border-t border-neutral-100 space-y-1.5 text-sm text-neutral-600">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-neutral-400" />
              <span>
                {new Intl.DateTimeFormat("de-DE", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }).format(event.starts_at)}
                {event.time_text && ` · ${event.time_text}`}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-neutral-400" />
              <span>
                {event.address}
                {event.venue_name && `, ${event.venue_name}`}
              </span>
            </div>
            {formattedPrice && (
              <div className="flex items-center gap-2">
                <Euro className="h-4 w-4 text-neutral-400" />
                <span>
                  {/^\d/.test(formattedPrice)
                    ? `${formattedPrice} Euro`
                    : formattedPrice}
                </span>
              </div>
            )}
          </div>

          <div className="mt-6 whitespace-pre-wrap text-neutral-800 leading-relaxed">
            {event.description}
          </div>

          {/* Registration section */}
          {event.registration_url ? (
            <div className="mt-6">
              <a
                href={event.registration_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                Anmeldung
              </a>
            </div>
          ) : event.show_contact_registration ? (
            <div className="mt-6 text-neutral-800">
              <p>
                Anmeldung und weitere Informationen: Ruf mich gerne an unter{" "}
                <a href="tel:02262-6187" className="text-primary underline">
                  02262-6187
                </a>{" "}
                oder sende mir eine E-Mail an{" "}
                <a
                  href="mailto:info@harfenzauber.de"
                  className="text-primary underline"
                >
                  info@harfenzauber.de
                </a>
              </p>
            </div>
          ) : null}
        </div>
      </article>
    </main>
  );
}
