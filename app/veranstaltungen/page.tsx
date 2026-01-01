import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { EventListItem } from "@/components/events/event-list-item";

export const revalidate = 300; // Revalidate every 5 minutes

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
            <EventListItem
              key={event.id}
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
              isAuthed={isAuthed}
            />
          ))}
        </div>
      )}
    </div>
  );
}
