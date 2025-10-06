import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { notFound } from "next/navigation";

type ServiceContent = {
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  image: string;
  testimonials?: Array<{
    quote: string;
    author: string;
  }>;
};

const serviceContent: Record<string, ServiceContent> = {
  harfenkonzert: {
    title: "Harfenkonzert",
    subtitle: "Himmlische Harfenklänge für besondere Momente",
    description:
      "Mit himmlischen Harfenklängen wird jedem Konzert eine einzigartige und bezaubernde Note verliehen.",
    longDescription:
      "Erlebe die zauberhafte Welt der Harfenmusik in einem stimmungsvollen Konzert. Mein Repertoire umfasst klassische Stücke, keltische Melodien und moderne Kompositionen. Jedes Konzert wird individuell auf den Anlass und die Wünsche abgestimmt.",
    image: "/images/soloauftritt.jpeg",
  },
  hochzeit: {
    title: "Hochzeit",
    subtitle: "Romantische Harfenklänge für den schönsten Tag",
    description:
      "Romantische Harfenmusik fügt der Hochzeitszeremonie und dem Empfang eine persönliche und emotionale Tiefe hinzu.",
    longDescription:
      "Deine Hochzeit ist ein unvergesslicher Tag, den ich mit meiner Harfenmusik noch besonderer mache. Ob bei der Trauung, dem Sektempfang oder während des Dinners – die sanften Klänge der Harfe schaffen eine romantische und feierliche Atmosphäre. Ich spiele gerne auch persönliche Lieblingsstücke nach Wunsch.",
    image: "/images/lorena-hero.jpeg",
    testimonials: [
      {
        quote:
          "Liebe Lorena, unsere Hochzeit war durch deine Musik ein wahr gewordener Traum. Jeder Ton auf deiner Harfe schien unsere Liebe zu einander widerzuspiegeln und hat unseren besonderen Tag noch unvergesslicher gemacht.",
        author: "Hanna & Sebastian aus G.",
      },
    ],
  },
  geburtstag: {
    title: "Geburtstag",
    subtitle: "Fröhliche Harfenklänge für deine Feier",
    description:
      "Mit fröhlicher und einladender Harfenmusik kann jede Geburtstagsfeier zu etwas ganz Besonderem gemacht werden.",
    longDescription:
      "Feiere deinen besonderen Tag mit zauberhafter Harfenmusik. Ob runder Geburtstag oder Gartenparty – die Harfe schafft eine festliche und zugleich entspannte Atmosphäre, die deine Gäste begeistern wird.",
    image: "/images/kirche.jpeg",
    testimonials: [
      {
        quote:
          "Liebe Lorena, herzlichen Dank Dir für die schöne Zeit mit Deinen Harfenklängen zu meiner Geburtstagsfeier. Viele haben mir die Rückmeldung gegeben, es sei so schön gewesen im Garten die Wolken zu beobachten, den Wind zu spüren, die Vögel zu hören und Deine Harfenklänge zu hören.",
        author: "Ilona A.",
      },
    ],
  },
  firmenfeier: {
    title: "Firmenfeier",
    subtitle: "Stilvolle Harfenmusik für geschäftliche Anlässe",
    description:
      "Professionelle Harfenmusik schafft bei Firmenfeiern eine stilvolle und elegante Atmosphäre, die sicherlich Eindruck hinterlässt.",
    longDescription:
      "Ob Jubiläum, Produktpräsentation oder Weihnachtsfeier – mit eleganter Harfenmusik verleihe ich Ihrer Firmenveranstaltung eine besondere Note. Die dezente und zugleich beeindruckende Musik sorgt für eine angenehme Atmosphäre und bleibt Ihren Gästen in Erinnerung.",
    image: "/images/soloauftritt.jpeg",
    testimonials: [
      {
        quote:
          "Wir waren wirklich überwältigt von Ihrem Talent während unserer Firmenfeier. Als Ihre Harfenklänge durch den Raum schwebten, war es, als hätte die Zeit für einen Moment stillgestanden. Es war eine Atmosphäre von Harmonie und Inspiration, die unsere Feier zu etwas wirklich Besonderem gemacht hat.",
        author: "B. Hahn, Personalleiter",
      },
    ],
  },
  trauerfeier: {
    title: "Trauerfeier",
    subtitle: "Trostspendende Harfenklänge zum Abschied",
    description:
      "Die sanften Klänge der Harfe haben eine beruhigende Wirkung und können den Trauergästen Trost spenden.",
    longDescription:
      "In schweren Stunden des Abschieds begleite ich Trauerfeiern mit einfühlsamer Harfenmusik. Auch bei Bestattungen im Friedwald spiele ich gerne. Die sanften Klänge helfen dabei, Emotionen Raum zu geben und schaffen einen würdevollen Rahmen für den letzten Abschied.",
    image: "/images/lorena-hero.jpeg",
  },
  taufe: {
    title: "Taufe",
    subtitle: "Festliche Harfenmusik für den Willkommensgruß",
    description:
      "Sanfte Harfenmusik passt perfekt zu Taufen und schafft eine feierliche und besinnliche Atmosphäre für diesen besonderen Anlass.",
    longDescription:
      "Die Taufe ist ein bedeutungsvoller Moment im Leben eines Kindes. Mit feierlicher Harfenmusik begleite ich diesen besonderen Anlass und schaffe eine festliche Atmosphäre, die die Freude über den neuen Erdenbürger zum Ausdruck bringt.",
    image: "/images/6593e9eaa4c010961a8ed0c5_IMG_3876.JPG.jpeg",
  },
  vernissage: {
    title: "Vernissage",
    subtitle: "Kulturvolle Harfenklänge für Kunstevents",
    description:
      "Eine Vernissage erhält mit inspirierender Harfenmusik eine kulturell anspruchsvolle Note.",
    longDescription:
      "Kunst und Musik vereinen sich wunderbar bei Vernissagen und Ausstellungseröffnungen. Mit meiner Harfenmusik schaffe ich eine inspirierende Atmosphäre, die den Kunstgenuss bereichert und zum Verweilen einlädt.",
    image: "/images/soloauftritt.jpeg",
  },
};

export function generateStaticParams() {
  return Object.keys(serviceContent).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceContent[slug];

  if (!service) {
    return {
      title: "Seite nicht gefunden",
    };
  }

  return {
    title: service.title,
    description: service.description,
  };
}

export default async function AngebotPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = serviceContent[slug];

  if (!service) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center justify-center bg-gradient-to-b from-secondary/30 to-background pt-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                {service.title}
              </h1>
              <p className="max-w-[600px] text-muted-foreground text-lg">
                {service.subtitle}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/kontakt">Kontakt aufnehmen</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#details">Mehr erfahren</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section id="details" className="py-16 md:py-24">
        <div className="container px-4 md:px-6 max-w-4xl">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter">
              {service.description}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {service.longDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {service.testimonials && service.testimonials.length > 0 && (
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
              Das sagen meine Kunden
            </h2>
            <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              {service.testimonials.map((testimonial, idx) => (
                <Card key={idx} className="p-6 space-y-4">
                  <p className="italic text-muted-foreground">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="font-semibold">{testimonial.author}</div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Künstlerisches Programm Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6 max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter mb-6">
            Künstlerisches Programm nach deinen Wünschen
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Neben einer Reihe von Soloprogrammen biete ich geschmackvolle
            Unterhaltung mit hochkarätigen Künstlern im Duo oder Trio.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter mb-6">
            Interesse geweckt?
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
