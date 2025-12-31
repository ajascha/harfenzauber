"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EventEditor } from "@/components/events/event-editor";
import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";

type HfzEventType = {
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

export function EventCard({ event }: { event: HfzEventType }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row gap-6 p-6">
        {event.image_url && (
          <div className="relative w-full md:w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden">
            <Image
              src={event.image_url}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex-1 space-y-2">
          <div>
            <h2 className="text-xl font-semibold">{event.title}</h2>
            {event.subtitle && (
              <p className="text-sm text-muted-foreground">{event.subtitle}</p>
            )}
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {event.description}
          </p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Intl.DateTimeFormat("de-DE", {
                dateStyle: "medium",
              }).format(new Date(event.starts_at))}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {event.address}
            </div>
          </div>
        </div>

        <div className="flex md:flex-col gap-2 flex-shrink-0">
          <EventEditor event={event}>
            <Button variant="outline" size="sm">
              Bearbeiten
            </Button>
          </EventEditor>
        </div>
      </div>
    </Card>
  );
}

