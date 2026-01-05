import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Über mich – Harfenzauber",
  description:
    "Über Lorena Wolfewicz: Professionelle Harfenistin und Harfenlehrerin im Oberbergischen Kreis",
};

export default function Page() {
  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center justify-center bg-gradient-to-b from-secondary/30 to-background pt-16 md:pt-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/images/lorena-hero.jpeg"
                alt="Lorena Wolfewicz"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Über mich
              </h1>
              <p className="max-w-[600px] text-muted-foreground text-lg">
                Seit über 20 Jahren bin ich als professionelle Musikerin und
                Harfenlehrerin tätig. Mit meiner Ausbildung als Klangtherapeutin
                und Leidenschaft für die Harfe bringe ich jeden Schüler dazu,
                das Beste aus sich herauszuholen.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <a href="#kontakt">Kontakt aufnehmen</a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/veranstaltungen">Veranstaltungen</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="prose prose-neutral max-w-none prose-a:text-primary hover:prose-a:opacity-80">
            <h2 className="text-2xl font-bold tracking-tighter mt-8 mb-4">
              Meine musikalische Reise
            </h2>
            <p className="text-muted-foreground mb-4">
              Die Harfe begleitet mich seit vielen Jahren auf meinem
              musikalischen Weg. Mit ihrem sanften Klang schaffe ich eine
              besondere Atmosphäre, die Menschen berührt und entspannt.
            </p>
            <p className="text-muted-foreground mb-4">
              Als Harfenlehrerin habe ich die Freude, Menschen jeden Alters
              dabei zu begleiten, dieses wundervolle Instrument zu entdecken.
              Besonders die Arbeit mit Kindern liegt mir am Herzen – ihre
              Begeisterung und ihre natürliche Neugier machen jede
              Unterrichtsstunde zu etwas Besonderem.
            </p>

            <h2 className="text-2xl font-bold tracking-tighter mt-8 mb-4">
              Harfenmusik für besondere Anlässe
            </h2>
            <p className="text-muted-foreground mb-4">
              Ob bei Hochzeiten, Geburtstagen, Trauerfeiern oder anderen
              festlichen Anlässen – meine Harfenmusik verleiht jedem Moment eine
              besondere Note. Ich gestalte die Musik passend zur Atmosphäre und
              den Wünschen meiner Auftraggeber.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="py-16 md:py-24 bg-secondary/20">
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

      {/* Cross-promotion callout */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 w-full max-w-2xl">
          <Card className="bg-secondary/10 border-secondary/30 p-6 md:p-8 text-center">
            <p className="text-sm text-muted-foreground/70 tracking-wide mb-2">
              Mehr von Lorena
            </p>
            <p className="text-base text-muted-foreground mb-4">
              Musik kann heilsam sein – doch manchmal braucht es Worte.
            </p>
            <Button asChild variant="outline" size="sm">
              <a
                href="https://lorena-wolfewicz.de?utm_source=harfenzauber&utm_medium=website&utm_campaign=cross-promo"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mehr über meine Therapeutische Arbeit entdecken
              </a>
            </Button>
          </Card>
        </div>
      </section>
    </main>
  );
}
