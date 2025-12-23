import { Metadata } from "next";
import Link from "next/link";
import { Music, GraduationCap, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Preise – Harfenmusik & Unterricht",
  description:
    "Preise für Harfenmusik bei Hochzeiten, Feiern und Veranstaltungen sowie Harfenunterricht im Oberbergischen Kreis.",
};

export default function PreisePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl md:text-4xl font-light text-neutral-800 mb-6 text-center">
        Preise
      </h1>

      <p className="text-lg text-neutral-600 mb-12 text-center max-w-2xl mx-auto">
        Die Kosten für Harfenmusik hängen von verschiedenen Faktoren ab. Hier
        findest du eine Orientierung.
      </p>

      {/* Live Music */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-8 mb-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
            <Music className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-neutral-800 mb-1">
              Harfenmusik für Veranstaltungen
            </h2>
            <p className="text-neutral-600">
              Hochzeiten, Trauerfeiern, Firmenfeiern, Taufen, Vernissagen
            </p>
          </div>
        </div>

        <div className="space-y-4 text-neutral-700 mb-6">
          <p>
            Der Preis für einen Auftritt hängt ab von:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Dauer des Auftritts (typisch: 30 Min. bis 2 Stunden)</li>
            <li>Anfahrtsweg ab Wiehl (Oberbergischer Kreis)</li>
            <li>Art der Veranstaltung</li>
            <li>Besondere Wünsche (z.B. spezielle Stücke einstudieren)</li>
          </ul>
        </div>

        <p className="text-neutral-600 mb-4">
          <strong>Richtwert:</strong> Ab ca. 250 € für einen kürzeren Auftritt
          im Nahbereich. Hochzeiten und längere Auftritte nach individueller
          Vereinbarung.
        </p>

        <p className="text-sm text-neutral-500">
          Gerne erstelle ich dir ein unverbindliches Angebot für deine
          Veranstaltung.
        </p>
      </div>

      {/* Lessons */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-8 mb-12">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-neutral-800 mb-1">
              Harfenunterricht
            </h2>
            <p className="text-neutral-600">
              Einzelunterricht für Anfänger und Fortgeschrittene
            </p>
          </div>
        </div>

        <div className="space-y-3 text-neutral-700 mb-6">
          <div className="flex justify-between items-center py-2 border-b border-neutral-100">
            <span>30 Minuten (für Kinder empfohlen)</span>
            <span className="font-medium">25 €</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-neutral-100">
            <span>45 Minuten</span>
            <span className="font-medium">35 €</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span>60 Minuten</span>
            <span className="font-medium">45 €</span>
          </div>
        </div>

        <p className="text-sm text-neutral-500">
          Der Unterricht findet in Wiehl statt. Eine Probestunde zum
          Kennenlernen ist möglich.
        </p>
      </div>

      {/* CTA */}
      <div className="text-center bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8">
        <MessageCircle className="w-10 h-10 text-amber-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-neutral-800 mb-3">
          Individuelle Anfrage
        </h2>
        <p className="text-neutral-600 mb-6">
          Erzähle mir von deiner Veranstaltung oder deinem Interesse am
          Harfenunterricht – ich melde mich mit einem persönlichen Angebot.
        </p>
        <Button asChild>
          <Link href="/kontakt">Anfrage senden</Link>
        </Button>
      </div>
    </main>
  );
}

