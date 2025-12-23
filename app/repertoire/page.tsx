import { Metadata } from "next";
import Link from "next/link";
import { Music2, Heart, Church, Sparkles, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Repertoire – Musikauswahl",
  description:
    "Das Repertoire von Harfenistin Lorena Wolfewicz: Klassik, keltische Musik, Filmmusik und mehr für Hochzeiten, Feiern und Veranstaltungen.",
};

const categories = [
  {
    icon: Church,
    title: "Klassik & Geistliche Musik",
    description:
      "Zeitlose Kompositionen für feierliche Anlässe wie Trauungen, Trauerfeiern und Gottesdienste.",
    examples: [
      "Ave Maria (Bach/Gounod, Schubert)",
      "Canon in D (Pachelbel)",
      "Air (Bach)",
      "Für Elise (Beethoven)",
      "Salut d'Amour (Elgar)",
      "Träumerei (Schumann)",
    ],
  },
  {
    icon: Sparkles,
    title: "Keltische & Irische Musik",
    description:
      "Traditionelle Melodien mit ihrem charakteristischen, verträumten Klang.",
    examples: [
      "Greensleeves",
      "Danny Boy",
      "The Last Rose of Summer",
      "Scarborough Fair",
      "Brian Boru's March",
      "She Moved Through the Fair",
    ],
  },
  {
    icon: Heart,
    title: "Filmmusik & Modernes",
    description:
      "Bekannte Melodien aus Film und Fernsehen, arrangiert für Harfe.",
    examples: [
      "River Flows in You (Yiruma)",
      "Comptine d'un autre été (Amélie)",
      "Forrest Gump Theme",
      "Moon River",
      "The Ludlows (Legends of the Fall)",
      "Gabriel's Oboe (The Mission)",
    ],
  },
  {
    icon: Music2,
    title: "Pop & Evergreens",
    description:
      "Moderne Klassiker und zeitlose Hits in sanften Harfenarrangements.",
    examples: [
      "A Thousand Years (Christina Perri)",
      "Hallelujah (Cohen)",
      "What a Wonderful World",
      "Yesterday (Beatles)",
      "Over the Rainbow",
      "Can't Help Falling in Love",
    ],
  },
];

export default function RepertoirePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-light text-neutral-800 mb-4">
          Repertoire
        </h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Von Klassik über keltische Musik bis zu modernen Filmmelodien – hier
          findest du einen Überblick über mein Repertoire.
        </p>
      </div>

      <div className="space-y-8 mb-12">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-neutral-200 p-8"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <category.icon className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-neutral-800 mb-2">
                  {category.title}
                </h2>
                <p className="text-neutral-600">{category.description}</p>
              </div>
            </div>

            <div className="ml-14">
              <h3 className="text-sm font-medium text-neutral-500 mb-3">
                Beispiele:
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {category.examples.map((example, i) => (
                  <li key={i} className="text-neutral-700">
                    • {example}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Note */}
      <div className="bg-neutral-50 rounded-xl p-6 mb-12">
        <h3 className="font-semibold text-neutral-800 mb-2">Wunschstücke</h3>
        <p className="text-neutral-600">
          Du hast ein bestimmtes Stück im Sinn, das nicht in der Liste steht?
          Sprich mich an – oft ist es möglich, Wunschstücke zu arrangieren oder
          zu erlernen. Bei ausreichend Vorlaufzeit studiere ich gerne neue
          Stücke für deine Veranstaltung ein.
        </p>
      </div>

      {/* CTA */}
      <div className="text-center bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8">
        <MessageCircle className="w-10 h-10 text-amber-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-neutral-800 mb-3">
          Musikauswahl besprechen
        </h2>
        <p className="text-neutral-600 mb-6">
          Erzähle mir von deiner Veranstaltung – ich helfe dir bei der
          Zusammenstellung des passenden Programms.
        </p>
        <Button asChild>
          <Link href="/kontakt">Kontakt aufnehmen</Link>
        </Button>
      </div>
    </main>
  );
}

