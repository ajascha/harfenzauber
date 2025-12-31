"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Euro } from "lucide-react";
import { EventEditor } from "@/components/events/event-editor";
import { toSlug, formatPrice } from "@/lib/utils";

type EventListItemProps = {
  event: {
    id: number;
    title: string;
    subtitle: string | null;
    description: string;
    image_url: string | null;
    starts_at: Date;
    address: string;
    venue_name: string | null;
    time_text: string | null;
    price_text: string | null;
    registration_url: string | null;
    created_at: Date | null;
    show_contact_registration: boolean;
  };
  isAuthed: boolean;
};

export function EventListItem({ event, isAuthed }: EventListItemProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row gap-6 p-6">
        {event.image_url && (
          <div className="relative w-full md:w-64 h-48 flex-shrink-0 rounded-lg overflow-hidden">
            <Image
              src={event.image_url}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h2 className="text-2xl font-semibold mb-1">{event.title}</h2>
              {event.subtitle && (
                <p className="text-muted-foreground">{event.subtitle}</p>
              )}
            </div>
            {isAuthed && (
              <EventEditor
                event={{
                  id: event.id,
                  title: event.title,
                  subtitle: event.subtitle,
                  description: event.description,
                  image_url: event.image_url,
                  starts_at: event.starts_at,
                  address: event.address,
                  venue_name: event.venue_name,
                  time_text: event.time_text,
                  price_text: event.price_text,
                  registration_url: event.registration_url,
                  created_at: event.created_at,
                  show_contact_registration: event.show_contact_registration,
                }}
              >
                <Button variant="outline" size="sm">
                  Bearbeiten
                </Button>
              </EventEditor>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {event.description}
          </p>

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
                }).format(new Date(event.starts_at))}
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

            {(() => {
              const price = formatPrice(event.price_text);
              if (!price) return null;
              const hasNumber = /^\d/.test(price);
              return (
                <div className="flex items-center gap-2">
                  <Euro className="h-4 w-4 text-neutral-400" />
                  <span>{hasNumber ? `${price} Euro` : price}</span>
                </div>
              );
            })()}
          </div>

          {/* CTA */}
          <div className="mt-4">
            <Button asChild variant="link" className="px-0 text-primary h-auto">
              <Link href={`/veranstaltungen/${toSlug(event.title)}`}>
                Details & Anmeldung →
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

