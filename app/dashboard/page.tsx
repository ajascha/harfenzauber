import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { EventCard } from "@/components/events/event-card";
import { NewEventButton } from "@/components/events/new-event-button";

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

  return (
    <div className="container px-4 md:px-6 py-16 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold tracking-tighter">Dashboard</h1>
        <NewEventButton />
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
