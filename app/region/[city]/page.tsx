import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MusicServiceSchema, BreadcrumbSchema, FAQSchema } from "@/components/structured-data";

// City data - all in one place
const cities: Record<
  string,
  {
    name: string;
    h1: string;
    description: string;
    metaDescription: string;
    intro: string;
  }
> = {
  koeln: {
    name: "Köln",
    h1: "Harfenmusik in Köln",
    description: "Harfenistin für Hochzeit, Trauerfeier und Firmenfeier in Köln",
    metaDescription:
      "Harfenistin für Köln: Romantische Harfenmusik für Hochzeit, Trauerfeier, Firmenfeier. Professionelle musikalische Begleitung. Buchung & Anfrage.",
    intro:
      "Sie suchen eine Harfenistin in Köln? Ich verzaubere Ihre Veranstaltung mit eleganten Harfenklängen – ob Hochzeit im Dom, Empfang am Rhein oder Firmenfeier in der Altstadt. Mit langjähriger Erfahrung gestalte ich den musikalischen Rahmen für Ihre besonderen Momente.",
  },
  bonn: {
    name: "Bonn",
    h1: "Harfenmusik in Bonn",
    description: "Harfenistin für Hochzeit, Trauerfeier und Firmenfeier in Bonn",
    metaDescription:
      "Harfenistin für Bonn: Einfühlsame Harfenmusik für Hochzeit, Trauerfeier und Festlichkeiten. Professionelle musikalische Begleitung. Anfrage.",
    intro:
      "Sie planen eine Veranstaltung in Bonn? Als Harfenistin begleite ich Ihre Hochzeit, Trauerfeier oder festliche Anlässe mit einfühlsamer Live-Musik. Mein vielseitiges Repertoire reicht von Klassik bis Modern und passt sich Ihren Wünschen an.",
  },
  gummersbach: {
    name: "Gummersbach",
    h1: "Harfenmusik in Gummersbach",
    description: "Harfenistin für Hochzeit und Veranstaltungen in Gummersbach",
    metaDescription:
      "Harfenistin für Gummersbach: Live-Harfenmusik für Hochzeit, Trauerfeier, Firmenfeier. Aus der Region, für die Region. Anfrage.",
    intro:
      "Als Harfenistin aus dem Oberbergischen Kreis bin ich Ihre lokale Partnerin für musikalische Begleitung in Gummersbach. Ob Hochzeit, festlicher Empfang oder feierlicher Anlass – ich gestalte den passenden musikalischen Rahmen für Ihre Veranstaltung.",
  },
  "bergisches-land": {
    name: "Bergisches Land",
    h1: "Harfenmusik im Bergischen Land",
    description: "Harfenistin für die gesamte Region Bergisches Land",
    metaDescription:
      "Harfenistin im Bergischen Land: Romantische Harfenmusik für Hochzeit, Trauerfeier, Events. Regional verankert, überregional gebucht. Anfrage.",
    intro:
      "Als Harfenistin im Bergischen Land bin ich in der gesamten Region für Sie da. Von Gummersbach über Wiehl bis Engelskirchen – ich begleite Ihre Veranstaltungen mit professioneller Live-Musik. Meine Harfe verleiht Hochzeiten, Trauerfeiern und festlichen Anlässen eine besondere Atmosphäre.",
  },
  "oberbergischer-kreis": {
    name: "Oberbergischer Kreis",
    h1: "Harfenmusik im Oberbergischen Kreis",
    description: "Harfenistin für den gesamten Oberbergischen Kreis",
    metaDescription:
      "Harfenistin im Oberbergischen Kreis: Live-Harfenmusik für Hochzeit, Trauerfeier, Firmenfeier. Wiehl, Gummersbach, Bergneustadt. Anfrage.",
    intro:
      "Als Harfenistin mit Sitz in Wiehl bin ich im gesamten Oberbergischen Kreis für Sie da. Ob Hochzeit, Trauerfeier oder festlicher Anlass – ich gestalte den musikalischen Rahmen für Ihre Veranstaltung. Mit regionalem Bezug und professioneller Erfahrung.",
  },
  olpe: {
    name: "Olpe",
    h1: "Harfenmusik in Olpe",
    description: "Harfenistin für Hochzeit und Veranstaltungen in Olpe",
    metaDescription:
      "Harfenistin für Olpe: Romantische Harfenmusik für Hochzeit, Trauerfeier, festliche Anlässe. Aus der Nachbarregion, gerne für Sie da. Anfrage.",
    intro:
      "Sie planen eine Veranstaltung in Olpe? Als Harfenistin aus dem benachbarten Oberbergischen Kreis begleite ich gerne auch Ihre Feierlichkeiten in Olpe. Hochzeit, Trauerfeier oder festliche Events – ich gestalte den passenden musikalischen Rahmen.",
  },
};

export async function generateStaticParams() {
  return Object.keys(cities).map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const data = cities[city];
  if (!data) return { title: "Nicht gefunden" };

  return {
    title: data.h1,
    description: data.metaDescription,
    alternates: {
      canonical: `https://www.harfenzauber.de/region/${city}`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const data = cities[city];

  if (!data) notFound();

  const faqQuestions = [
    {
      question: "Was kostet Harfenmusik für eine Hochzeit?",
      answer:
        "Der Preis hängt von Dauer, Anfahrt und besonderen Wünschen ab. Für eine Trauung mit ca. 30-45 Minuten Musik können Sie mit etwa 300-400 € rechnen. Bei längeren Auftritten (Empfang, Feier) erstelle ich Ihnen gerne ein individuelles Angebot.",
    },
    {
      question: "Wie lange spielt eine Harfenistin bei einer Veranstaltung?",
      answer:
        "Das ist ganz flexibel: Von 30 Minuten für eine Trauzeremonie bis zu 2-3 Stunden für einen Empfang ist alles möglich. Typisch sind 45-60 Minuten für kirchliche Trauungen und 1-2 Stunden für Empfänge.",
    },
    {
      question: "Welches Repertoire bieten Sie an?",
      answer:
        "Mein Repertoire umfasst Klassik, keltische und irische Musik, Filmmusik und Evergreens. Von Bach über 'River Flows in You' bis 'A Thousand Years' – ich spiele, was zu Ihrem Anlass passt. Details finden Sie auf meiner Repertoire-Seite.",
    },
    {
      question: "Wie weit reisen Sie für Auftritte?",
      answer:
        "Ich komme aus dem Oberbergischen Kreis (Wiehl) und spiele regelmäßig in Köln, Bonn, Gummersbach, Olpe und Umgebung. Auch weitere Anfahrten sind möglich – die Fahrkosten werden dann entsprechend berechnet.",
    },
  ];

  return (
    <>
      <MusicServiceSchema
        name={`Harfenmusik in ${data.name}`}
        description={data.metaDescription}
        url={`https://www.harfenzauber.de/region/${city}`}
      />
      <FAQSchema questions={faqQuestions} />
      <BreadcrumbSchema
        items={[
          { name: "Start", url: "https://www.harfenzauber.de" },
          {
            name: data.h1,
            url: `https://www.harfenzauber.de/region/${city}`,
          },
        ]}
      />
      <main className="container mx-auto px-4 md:px-6 max-w-4xl py-16">
        {/* Hero */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-primary mb-4">
            <MapPin className="w-5 h-5" />
            <span className="text-sm font-medium">{data.name}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {data.h1}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {data.intro}
          </p>
        </div>

        {/* Services Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Meine Angebote
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: "Hochzeit",
                href: "/angebot/hochzeit",
                desc: "Romantische Musik für Ihre Trauung",
              },
              {
                title: "Trauerfeier",
                href: "/angebot/trauerfeier",
                desc: "Einfühlsame musikalische Begleitung",
              },
              {
                title: "Firmenfeier",
                href: "/angebot/firmenfeier",
                desc: "Elegante Hintergrundmusik",
              },
              {
                title: "Harfenunterricht",
                href: "/harfenunterricht",
                desc: "Lernen Sie Harfe spielen",
              },
            ].map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="block p-4 rounded-lg border border-border hover:border-primary hover:bg-secondary/50 transition-colors"
              >
                <div className="font-semibold text-foreground">
                  {service.title}
                </div>
                <div className="text-sm text-muted-foreground">
                  {service.desc}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mb-12 bg-muted/30 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            So läuft die Buchung ab
          </h2>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                1
              </span>
              <div>
                <div className="font-semibold text-foreground">
                  Anfrage senden
                </div>
                <div className="text-muted-foreground text-sm">
                  Kontaktieren Sie mich mit Datum, Ort und Art Ihrer
                  Veranstaltung.
                </div>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                2
              </span>
              <div>
                <div className="font-semibold text-foreground">
                  Persönliche Beratung
                </div>
                <div className="text-muted-foreground text-sm">
                  Wir besprechen Ihre Wünsche, das Repertoire und alle Details.
                </div>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                3
              </span>
              <div>
                <div className="font-semibold text-foreground">
                  Musikalische Begleitung
                </div>
                <div className="text-muted-foreground text-sm">
                  Ich gestalte den musikalischen Rahmen für Ihren besonderen
                  Tag.
                </div>
              </div>
            </li>
          </ol>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Häufige Fragen
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="preis">
              <AccordionTrigger>Was kostet Harfenmusik für eine Hochzeit?</AccordionTrigger>
              <AccordionContent>
                Der Preis hängt von Dauer, Anfahrt und besonderen Wünschen ab. Für eine Trauung mit ca. 30-45 Minuten Musik können Sie mit etwa 300-400 € rechnen. Bei längeren Auftritten (Empfang, Feier) erstelle ich Ihnen gerne ein individuelles Angebot.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="dauer">
              <AccordionTrigger>Wie lange spielt eine Harfenistin bei einer Veranstaltung?</AccordionTrigger>
              <AccordionContent>
                Das ist ganz flexibel: Von 30 Minuten für eine Trauzeremonie bis zu 2-3 Stunden für einen Empfang ist alles möglich. Typisch sind 45-60 Minuten für kirchliche Trauungen und 1-2 Stunden für Empfänge.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="repertoire">
              <AccordionTrigger>Welches Repertoire bieten Sie an?</AccordionTrigger>
              <AccordionContent>
                Mein Repertoire umfasst Klassik, keltische und irische Musik, Filmmusik und Evergreens. Von Bach über 'River Flows in You' bis 'A Thousand Years' – ich spiele, was zu Ihrem Anlass passt. Details finden Sie auf meiner{" "}
                <Link href="/repertoire" className="text-primary hover:underline">
                  Repertoire-Seite
                </Link>
                .
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="anfahrt">
              <AccordionTrigger>Wie weit reisen Sie für Auftritte?</AccordionTrigger>
              <AccordionContent>
                Ich komme aus dem Oberbergischen Kreis (Wiehl) und spiele regelmäßig in Köln, Bonn, Gummersbach, Olpe und Umgebung. Auch weitere Anfahrten sind möglich – die Fahrkosten werden dann entsprechend berechnet.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* CTA */}
        <section className="mt-12 bg-gradient-to-br from-secondary/30 to-muted/50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Anfrage für Ihre Veranstaltung
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Gerne berate ich Sie persönlich und erstelle Ihnen ein
            unverbindliches Angebot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/kontakt">
                Jetzt anfragen
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/repertoire">Repertoire ansehen</Link>
            </Button>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center text-sm text-muted-foreground">
            <a
              href="tel:+4922626187"
              className="flex items-center justify-center gap-2 hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" /> 02262 - 6187
            </a>
            <a
              href="mailto:info@harfenzauber.de"
              className="flex items-center justify-center gap-2 hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" /> info@harfenzauber.de
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
