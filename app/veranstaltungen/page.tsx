import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { EventEditor } from "@/components/events/event-editor";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Veranstaltungen",
  description:
    "Aktuelle Veranstaltungen mit Harfenmusik im Oberbergischen Kreis",
};

export default async function VeranstaltungenPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const isAuthed = Boolean(data?.claims);

  const now = new Date();
  const events = await prisma.hfzEvent.findMany({
    where: {
      starts_at: {
        gte: now,
      },
    },
    orderBy: { starts_at: "asc" },
  });

  return (
    <div className="container px-4 md:px-6 py-16 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold tracking-tighter">
          Kommende Veranstaltungen
        </h1>
        {isAuthed && (
          <Button asChild>
            <Link href="/dashboard">Veranstaltungen verwalten</Link>
          </Button>
        )}
      </div>

      {events.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">
            Aktuell sind keine Veranstaltungen geplant. Schau bald wieder
            vorbei!
          </p>
        </Card>
      ) : (
        <div className="space-y-6">
          {events.map((event) => (
            <Card
              key={event.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
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
                      <h2 className="text-2xl font-semibold mb-1">
                        {event.title}
                      </h2>
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

                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Calendar className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                      <span>
                        {new Intl.DateTimeFormat("de-DE", {
                          dateStyle: "full",
                        }).format(event.starts_at)}
                        {event.time_text && ` • ${event.time_text}`}
                      </span>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                      <div>
                        {event.venue_name && (
                          <div className="font-medium">{event.venue_name}</div>
                        )}
                        <div>{event.address}</div>
                      </div>
                    </div>

                    {event.price_text && (
                      <div className="text-muted-foreground">
                        <span className="font-medium">Beitrag:</span>{" "}
                        {event.price_text}
                      </div>
                    )}

                    {!event.price_text && (
                      <div className="text-primary font-medium">
                        Kostenlose Veranstaltung
                      </div>
                    )}
                  </div>

                  {event.registration_url && (
                    <Button asChild variant="outline" size="sm">
                      <a
                        href={event.registration_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Anmeldung / Weitere Infos →
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
