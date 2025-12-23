import { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FAQSchema } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "Häufige Fragen (FAQ)",
  description:
    "Antworten auf häufig gestellte Fragen zu Harfenmusik für Veranstaltungen und Harfenunterricht bei Lorena Wolfewicz.",
};

const faqs = [
  {
    question: "Was kostet Harfenmusik für eine Hochzeit?",
    answer:
      "Der Preis hängt von Dauer, Anfahrt und besonderen Wünschen ab. Für eine Trauung mit ca. 30-45 Minuten Musik kannst du mit etwa 300-400 € rechnen. Bei längeren Auftritten (Empfang, Feier) erstelle ich dir gerne ein individuelles Angebot.",
  },
  {
    question: "Wie lange spielt eine Harfenistin bei einer Veranstaltung?",
    answer:
      "Das ist ganz flexibel: Von 30 Minuten für eine Trauzeremonie bis zu 2-3 Stunden für einen Empfang ist alles möglich. Typisch sind 45-60 Minuten für kirchliche Trauungen und 1-2 Stunden für Empfänge.",
  },
  {
    question: "Welches Repertoire bieten Sie an?",
    answer:
      "Mein Repertoire umfasst Klassik, keltische und irische Musik, Filmmusik und Evergreens. Von Bach über 'River Flows in You' bis 'A Thousand Years' – ich spiele, was zu eurem Anlass passt. Details findest du auf meiner Repertoire-Seite.",
  },
  {
    question: "Kann ich Wunschstücke anfragen?",
    answer:
      "Ja! Wenn du bestimmte Stücke im Sinn hast, sag mir Bescheid. Vieles habe ich bereits im Repertoire, anderes kann ich bei ausreichend Vorlaufzeit (ca. 4-6 Wochen) einstudieren.",
  },
  {
    question: "Wie weit reisen Sie für Auftritte?",
    answer:
      "Ich komme aus dem Oberbergischen Kreis (Wiehl) und spiele regelmäßig in Köln, Bonn, Gummersbach, Olpe und Umgebung. Auch weitere Anfahrten sind möglich – die Fahrkosten werden dann entsprechend berechnet.",
  },
  {
    question: "Braucht eine Harfenistin Strom oder Verstärker?",
    answer:
      "Nein, eine akustische Harfe braucht weder Strom noch Verstärker. Der Klang trägt in Kirchen und mittelgroßen Räumen wunderbar von selbst. Nur bei sehr großen Veranstaltungen oder lauter Umgebung kann Verstärkung sinnvoll sein.",
  },
  {
    question: "Wie viel Platz braucht eine Harfe?",
    answer:
      "Für die Harfe und einen Hocker brauche ich etwa 1,5 x 1,5 Meter. Wichtig ist ein ebener, stabiler Untergrund. Auf Kies oder weichem Rasen ist ein Spielen leider nicht möglich.",
  },
  {
    question: "Können Sie auch singen?",
    answer:
      "Mein Fokus liegt auf der instrumentalen Harfenmusik. Wenn du Gesang zur Harfe wünschst, kann ich gerne Kontakte zu Sängerinnen vermitteln, mit denen ich zusammenarbeite.",
  },
  {
    question: "Wie läuft die Buchung ab?",
    answer:
      "Schreib mir eine Anfrage mit Datum, Uhrzeit, Ort und Art der Veranstaltung. Ich prüfe meine Verfügbarkeit und schicke dir ein unverbindliches Angebot. Nach deiner Zusage reserviere ich den Termin verbindlich.",
  },
  {
    question: "Was kostet Harfenunterricht?",
    answer:
      "Der Einzelunterricht kostet je nach Dauer 25 € (30 Min.), 35 € (45 Min.) oder 45 € (60 Min.). Der Unterricht findet in Wiehl statt. Eine Probestunde zum Kennenlernen ist möglich.",
  },
  {
    question: "Ab welchem Alter kann man Harfe lernen?",
    answer:
      "Kinder können ab etwa 6-7 Jahren mit dem Harfenspiel beginnen, je nach Körpergröße und Konzentrationsfähigkeit. Für den Einstieg gibt es kleinere Harfen (Hakenharfen). Erwachsene können in jedem Alter anfangen!",
  },
  {
    question: "Brauche ich eine eigene Harfe für den Unterricht?",
    answer:
      "Für regelmäßiges Üben zu Hause ist ein eigenes Instrument wichtig. Für die ersten Stunden kannst du bei mir ausprobieren. Ich berate dich gerne beim Kauf oder Leihen einer Anfängerharfe.",
  },
];

export default function FAQPage() {
  return (
    <>
      <FAQSchema questions={faqs} />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <HelpCircle className="w-12 h-12 text-amber-600 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-light text-neutral-800 mb-4">
            Häufige Fragen
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Hier findest du Antworten auf die häufigsten Fragen zu Harfenmusik
            für Veranstaltungen und Harfenunterricht.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-neutral-200 p-6"
            >
              <h2 className="text-lg font-semibold text-neutral-800 mb-3">
                {faq.question}
              </h2>
              <p className="text-neutral-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8">
          <MessageCircle className="w-10 h-10 text-amber-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-neutral-800 mb-3">
            Noch Fragen?
          </h2>
          <p className="text-neutral-600 mb-6">
            Schreib mir – ich freue mich auf deine Nachricht.
          </p>
          <Button asChild>
            <Link href="/kontakt">Kontakt aufnehmen</Link>
          </Button>
        </div>
      </main>
    </>
  );
}

