import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EventEditor } from "@/components/events/event-editor";
import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (!data?.claims) {
    redirect("/login");
  }

  const now = new Date();
  const upcomingEvents = await prisma.hfzEvent.findMany({
    where: {
      starts_at: {
        gte: now,
      },
    },
    orderBy: { starts_at: "asc" },
  });

  const pastEvents = await prisma.hfzEvent.findMany({
    where: {
      starts_at: {
        lt: now,
      },
    },
    orderBy: { starts_at: "desc" },
  });

  type HfzEvent = (typeof upcomingEvents)[0] | (typeof pastEvents)[0];

  const EventCard = ({ event }: { event: HfzEvent }) => (
    <Card
      key={event.id}
      className="overflow-hidden hover:shadow-lg transition-shadow"
    >
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
              <p className="text-sm text-muted-foreground">
                {event.subtitle}
              </p>
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
              }).format(event.starts_at)}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {event.address}
            </div>
          </div>
        </div>

        <div className="flex md:flex-col gap-2">
          <EventEditor event={event}>
            <Button variant="outline" size="sm">
              Bearbeiten
            </Button>
          </EventEditor>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="container px-4 md:px-6 py-16 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold tracking-tighter">Dashboard</h1>
        <EventEditor event={null}>
          <Button>Neue Veranstaltung</Button>
        </EventEditor>
      </div>

      {upcomingEvents.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">
            Kommende Veranstaltungen
          </h2>
          <div className="space-y-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}

      {pastEvents.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            Vergangene Veranstaltungen
          </h2>
          <div className="space-y-6">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}

      {upcomingEvents.length === 0 && pastEvents.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">
            Noch keine Veranstaltungen erstellt.
          </p>
        </Card>
      )}
    </div>
  );
}
