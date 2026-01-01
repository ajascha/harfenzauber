import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { Calendar, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export const revalidate = 300; // Revalidate every 5 minutes

export default async function HomePage() {
  const now = new Date();

  let upcomingEvents: Awaited<ReturnType<typeof prisma.hfzEvent.findMany>> = [];
  let eventsError: Error | null = null;

  try {
    upcomingEvents = await prisma.hfzEvent.findMany({
      where: {
        starts_at: {
          gt: now,
        },
      },
      orderBy: { starts_at: "asc" },
      take: 6,
    });
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    if (process.env.NODE_ENV === "development") {
      console.error("Failed to fetch events on home page:", err);
    }
    eventsError = err;
    // Continue rendering with empty events array - graceful fallback
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-b from-secondary/30 to-background pt-12">
        <div className="container mx-auto px-4 md:px-6 w-full max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Eine musikalische Reise durch Welten und Zeiten
              </h1>
              <p className="max-w-[600px] text-muted-foreground text-lg">
                Mein Harfenklang und Gesang erfüllt den Raum mit einer
                besonderen Atmosphäre
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <a href="#kontakt">Kontakt aufnehmen</a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#angebote">Mehr erfahren</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/images/lorena-hero.jpeg"
                alt="Lorena Wolfewicz mit Harfe"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
                quality={85}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="angebote" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 w-full max-w-7xl">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
            Mein Angebot
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Harfenunterricht */}
            <Card className="overflow-hidden group hover:shadow-lg transition-shadow flex flex-col h-full">
              <div className="relative h-48 flex-shrink-0">
                <Image
                  src="/images/harfenunterricht.jpeg"
                  alt="Harfenunterricht"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  quality={80}
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2">
                  Harfenunterricht für Kinder & Erwachsene
                </h3>
                <p className="text-muted-foreground mb-4 flex-grow">
                  Lerne innerhalb kurzer Zeit einfache und schöne Melodien auf
                  der Harfe zu spielen
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/harfenunterricht">Mehr erfahren</Link>
                </Button>
              </div>
            </Card>

            {/* Veranstaltungen */}
            <Card className="overflow-hidden group hover:shadow-lg transition-shadow flex flex-col h-full">
              <div className="relative h-48 flex-shrink-0">
                <Image
                  src="/images/soloauftritt.jpeg"
                  alt="Öffentliche Veranstaltungen"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  quality={80}
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2">
                  Öffentliche Veranstaltungen
                </h3>
                <p className="text-muted-foreground mb-4 flex-grow">
                  Erlebe Harfenmusik bei meinen regelmäßigen Konzerten und
                  Workshops
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/veranstaltungen">Mehr erfahren</Link>
                </Button>
              </div>
            </Card>

            {/* Feste & Feiern */}
            <Card className="overflow-hidden group hover:shadow-lg transition-shadow flex flex-col h-full">
              <div className="relative h-48 flex-shrink-0">
                <Image
                  src="/images/kirche.jpeg"
                  alt="Harfenmusik für Feste & Feiern"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  quality={80}
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2">
                  Harfenmusik für deine Feste & Feiern
                </h3>
                <p className="text-muted-foreground mb-4 flex-grow">
                  Untermale die schönsten Momente mit einem kunstvollen Programm
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/angebot/harfenkonzert">Mehr erfahren</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Cross-promotion callout */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 w-full max-w-2xl">
          <Card className="bg-secondary/10 border-secondary/30 p-6 md:p-8 text-center">
            <p className="text-sm text-muted-foreground/70 uppercase tracking-wide mb-2">
              Mehr von Lorena
            </p>
            <p className="text-base text-muted-foreground mb-4">
              Musik kann heilsam sein – manchmal braucht es auch Worte.
            </p>
            <Button asChild variant="outline" size="sm">
              <a
                href="https://lorena-wolfewicz.de?utm_source=harfenzauber&utm_medium=website&utm_campaign=cross-promo"
                target="_blank"
                rel="noopener noreferrer"
              >
                Therapeutische Arbeit entdecken
              </a>
            </Button>
          </Card>
        </div>
      </section>

      {/* Upcoming Events */}
      {eventsError ? (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 w-full max-w-7xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tighter mb-4">
                Kommende Veranstaltungen
              </h2>
              <p className="text-lg text-muted-foreground">
                Veranstaltungen konnten nicht geladen werden. Bitte versuchen
                Sie es später erneut.
              </p>
            </div>
          </div>
        </section>
      ) : upcomingEvents.length > 0 ? (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 w-full max-w-7xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold tracking-tighter">
                Kommende Veranstaltungen
              </h2>
              <Button asChild variant="ghost">
                <Link href="/veranstaltungen">Alle anzeigen →</Link>
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.slice(0, 3).map((event) => (
                <Card
                  key={event.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {event.image_url && (
                    <div className="relative h-40">
                      <Image
                        src={event.image_url}
                        alt={event.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                        quality={80}
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                      {event.title}
                    </h3>
                    {event.subtitle && (
                      <p className="text-sm text-muted-foreground mb-2">
                        {event.subtitle}
                      </p>
                    )}
                    <div className="flex items-start gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>
                        {new Intl.DateTimeFormat("de-DE", {
                          dateStyle: "long",
                        }).format(event.starts_at)}
                        {event.time_text && ` • ${event.time_text}`}
                      </span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-1">{event.address}</span>
                    </div>
                    <Button asChild variant="outline" className="w-full">
                      {event.registration_url ? (
                        <a
                          href={event.registration_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Anmeldung & Weitere Infos
                        </a>
                      ) : (
                        <Link href="/veranstaltungen">
                          Anmeldung & Weitere Infos
                        </Link>
                      )}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* CD Section */}
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container mx-auto px-4 md:px-6 w-full max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div className="relative w-full max-w-[330px] h-[330px] sm:max-w-[400px] sm:h-[400px] md:max-w-[500px] md:h-[500px] mx-auto rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/cd-cover.jpeg"
                alt="Harfenzauber CD"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
                quality={85}
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter">
                Harfenmusik für zuhause
              </h2>
              <p className="text-lg text-muted-foreground">
                Eine musikalische Reise durch verschiedene Länder und Epochen
              </p>
              <Button asChild size="lg" className="md:w-auto w-full">
                <Link href="/kontakt">CD bestellen</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">
              Kontakt
            </h2>
            <p className="text-lg text-muted-foreground">
              Ruf mich gerne unter{" "}
              <a
                href="tel:+4922626187"
                className="text-primary hover:underline"
              >
                02262 - 6187
              </a>{" "}
              an oder schreib mir eine Nachricht.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
