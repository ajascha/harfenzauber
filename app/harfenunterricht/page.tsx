import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Harfenunterricht",
  description:
    "Harfenunterricht für Kinder und Erwachsene im schönen Oberbergischen Land. Informationen zum Unterricht bei der erfahrenen Musikpädagogin Lorena Wolfewicz.",
};

export default function HarfenunterrichtPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center justify-center bg-gradient-to-b from-secondary/30 to-background pt-16 md:pt-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Harfenunterricht in Oberberg
              </h1>
              <p className="max-w-[600px] text-muted-foreground text-lg">
                Lerne innerhalb kurzer Zeit einfache und schöne Melodien auf der
                Harfe zu spielen
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/kontakt">Kontakt aufnehmen</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#angebot">Mehr erfahren</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/images/harfenunterricht.jpeg"
                alt="Harfenunterricht in Oberberg mit Lorena Wolfewicz"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Erwecke deine Musikalität */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter">
              Erwecke deine Musikalität
            </h2>
            <p className="text-lg text-muted-foreground">
              Entdecke die faszinierende Welt der Harfe. In meinen Kursen wirst
              du die einzigartige Schönheit dieses Instruments entdecken und
              lernen, wie man melodische und harmonische Musik darauf spielt.
            </p>
          </div>
        </div>
      </section>

      {/* Angebot Section */}
      <section id="angebot" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
            Angebot
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Für Kinder */}
            <Card className="p-6 space-y-4">
              <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                <Image
                  src="/images/IMG_6445.JPG"
                  alt="Harfenunterricht für Kinder"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Für Kinder</h3>
              <Separator />
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Kinder werden einmal in der Woche für 30 Minuten unterrichtet
                  und erlernen so spielerisch die Freude am Instrument.
                </p>
                <p>
                  Der Unterricht findet wahlweise in meinen Unterrichtsräumen in
                  Wiehl-Gassenhagen oder in der Freien Waldorfschule in
                  Gummersbach-Vollmerhausen statt.
                </p>
                <p>
                  Zur Vereinbarung einer Schnupperstunde melde Dich gerne
                  telefonisch oder über das Kontaktformular an.
                </p>
              </div>
            </Card>

            {/* Für Erwachsene */}
            <Card className="p-6 space-y-4">
              <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                <Image
                  src="/images/IMG_6346.JPG"
                  alt="Harfenunterricht für Erwachsene"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Für Erwachsene</h3>
              <Separator />
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Erwachsene unterrichte ich flexibel nach Absprache für 45 oder
                  60 Minuten.
                </p>
                <p>
                  Der Unterricht findet wahlweise in meinen Unterrichtsräumen in
                  Wiehl-Gassenhagen oder in der Freien Waldorfschule in
                  Gummersbach-Vollmerhausen statt.
                </p>
                <p>
                  Zur Vereinbarung einer Schnupperstunde melde Dich gerne
                  telefonisch oder über das Kontaktformular an.
                </p>
              </div>
            </Card>

            {/* Online Harfenunterricht */}
            <Card className="p-6 space-y-4">
              <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                <Image
                  src="/images/6593e9eaa4c010961a8ed0c5_IMG_3876.JPG.jpeg"
                  alt="Online Harfenunterricht"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Online Harfenunterricht</h3>
              <Separator />
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Ergänzend zum Präsenzunterricht, biete ich auch
                  Online-Unterricht an.
                </p>
                <p>
                  Ideal für dich, wenn du dich dem Harfenspiel widmen möchtest,
                  aber der Unterrichtsort in Wiehl und Gummersbach für Dich zu
                  weit entfernt ist.
                </p>
              </div>
            </Card>
          </div>

          {/* Leihharfen - Feature badge spanning full width */}
          <div className="mt-8">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-100 via-amber-50 to-orange-50 dark:from-amber-950/40 dark:via-amber-900/20 dark:to-orange-950/30 p-8 md:p-10">
              <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-amber-200/60 dark:bg-amber-800/40 text-amber-800 dark:text-amber-200 mb-2">
                    Kein eigenes Instrument?
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight">
                    Leihharfen verfügbar
                  </h3>
                  <p className="text-muted-foreground max-w-md">
                    Verschiedene Harfenmodelle habe ich immer vorrätig. Gerne
                    stelle ich Dir eine Leihharfe zur Verfügung, damit du sofort
                    loslegen kannst.
                  </p>
                </div>
                <Button
                  asChild
                  size="lg"
                  className="shrink-0 bg-amber-600 hover:bg-amber-700 text-white"
                >
                  <Link href="/kontakt">Leihharfe anfragen</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
            Stimmen von Schülerinnen und Schülern
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="p-6 space-y-4">
              <p className="italic text-muted-foreground">
                "Durch den Unterricht mache ich schnelle Fortschritte auf der
                Harfe. Lorena macht komplizierte Konzepte einfach und
                verständlich. Ich freue mich auf jede Stunde!"
              </p>
              <div className="font-semibold">Monika (42), Anfängerin</div>
            </Card>

            <Card className="p-6 space-y-4">
              <p className="italic text-muted-foreground">
                "Lorena hat meine Harfenfähigkeiten auf ein neues Level gehoben.
                Ihr tiefer Musikverstand und ihre Leidenschaft haben mich
                inspiriert, mich weiter zu verbessern."
              </p>
              <div className="font-semibold">Jonas (12), Fortgeschrittener</div>
            </Card>

            <Card className="p-6 space-y-4">
              <p className="italic text-muted-foreground">
                "Der Online-Unterricht ist hervorragend. Lorena versteht es, auf
                eine Weise zu unterrichten, die sogar aus der Ferne die
                Feinheiten des Instruments klar macht."
              </p>
              <div className="font-semibold">Lena (22), Online-Schülerin</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Über Lorena */}
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/lorena-hero.jpeg"
                alt="Lorena Wolfewicz"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter">
                Über Lorena
              </h2>
              <p className="text-lg text-muted-foreground">
                Seit über 20 Jahren bin ich als professionelle Musikerin und
                Harfenlehrerin tätig.
              </p>
              <p className="text-lg text-muted-foreground">
                Mit meiner Ausbildung als Klangtherapeutin und Leidenschaft für
                die Harfe bringe ich jeden Schüler dazu, das Beste aus sich
                herauszuholen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter mb-6">
            Bereit, Harfe zu lernen?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Ruf mich gerne unter{" "}
            <a href="tel:+4922626187" className="text-primary hover:underline">
              02262 - 6187
            </a>{" "}
            an oder schreib mir eine Nachricht.
          </p>
          <Button asChild size="lg">
            <Link href="/kontakt">Kontakt aufnehmen</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
