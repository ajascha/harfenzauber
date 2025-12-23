import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Markdown content for static pages
const staticPages: Record<string, { title: string; content: string }> = {
  "": {
    title: "Harfenzauber - Lorena Wolfewicz",
    content: `# Harfenzauber - Lorena Wolfewicz

## Professionelle Harfenmusik für besondere Anlässe

Willkommen bei Harfenzauber! Ich bin Lorena Wolfewicz, professionelle Harfenistin im Oberbergischen Kreis. Mit meiner Harfenmusik verzaubere ich Ihre Veranstaltung und schaffe eine unvergessliche Atmosphäre.

## Angebote

### Harfenmusik für Anlässe

- **Hochzeit**: Romantische Harfenklänge für Trauung und Empfang
- **Trauerfeier**: Einfühlsame musikalische Begleitung
- **Geburtstag**: Festliche Musik für Ihre Feier
- **Firmenfeier**: Elegante Hintergrundmusik
- **Taufe**: Feierliche Klänge für den besonderen Moment
- **Vernissage**: Kulturelle Begleitung für Kunstevents

### Harfenunterricht

Ich biete Harfenunterricht für Anfänger und Fortgeschrittene an. Einzelunterricht mit individueller Betreuung.

## Repertoire

- Klassische Musik
- Keltische Melodien
- Moderne Kompositionen
- Wunschstücke nach Absprache

## Kontakt

- Telefon: 02262 - 6187
- Website: https://www.harfenzauber.de
- Standort: Oberbergischer Kreis, NRW, Deutschland
- Einsatzgebiet: Köln, Bonn, Bergisches Land und Umgebung
`,
  },
  harfenunterricht: {
    title: "Harfenunterricht - Harfenzauber",
    content: `# Harfenunterricht

## Harfe lernen im Oberbergischen Kreis

Ich biete individuellen Harfenunterricht für alle Altersgruppen und Kenntnisstufen.

## Für wen ist der Unterricht geeignet?

- Anfänger ohne Vorkenntnisse
- Fortgeschrittene
- Kinder und Erwachsene

## Unterrichtsinhalt

- Grundlagen der Harfentechnik
- Notenlesen und Musiktheorie
- Klassisches und modernes Repertoire
- Keltische Musik
- Individuelle Wunschstücke

## Kontakt

Für mehr Informationen und Terminvereinbarung:
Telefon: 02262 - 6187
`,
  },
};

// Service pages content
const servicePages: Record<string, { title: string; content: string }> = {
  harfenkonzert: {
    title: "Harfenkonzert - Harfenzauber",
    content: `# Harfenkonzert

Erleben Sie die zauberhafte Welt der Harfenmusik in einem stimmungsvollen Konzert. Mein Repertoire umfasst klassische Stücke, keltische Melodien und moderne Kompositionen.

Jedes Konzert wird individuell auf den Anlass und die Wünsche abgestimmt.

Kontakt: 02262 - 6187
`,
  },
  hochzeit: {
    title: "Harfenmusik zur Hochzeit - Harfenzauber",
    content: `# Harfenmusik zur Hochzeit

Romantische Harfenklänge für den schönsten Tag Ihres Lebens.

## Einsatzmöglichkeiten

- Trauungszeremonie
- Sektempfang
- Dinner-Begleitung
- Auszug des Brautpaares

## Repertoire

Ich spiele klassische Hochzeitsmusik und berücksichtige gerne Ihre persönlichen Wunschstücke.

Kontakt: 02262 - 6187
`,
  },
  trauerfeier: {
    title: "Harfenmusik zur Trauerfeier - Harfenzauber",
    content: `# Harfenmusik zur Trauerfeier

Einfühlsame musikalische Begleitung für den letzten Abschied.

Die sanften Klänge der Harfe spenden Trost und schaffen einen würdevollen Rahmen. Auch Bestattungen im Friedwald begleite ich gerne.

Kontakt: 02262 - 6187
`,
  },
  geburtstag: {
    title: "Harfenmusik zum Geburtstag - Harfenzauber",
    content: `# Harfenmusik zum Geburtstag

Feiern Sie Ihren besonderen Tag mit zauberhafter Harfenmusik.

Ob runder Geburtstag oder Gartenparty - die Harfe schafft eine festliche und zugleich entspannte Atmosphäre.

Kontakt: 02262 - 6187
`,
  },
  firmenfeier: {
    title: "Harfenmusik für Firmenfeiern - Harfenzauber",
    content: `# Harfenmusik für Firmenfeiern

Stilvolle musikalische Begleitung für geschäftliche Anlässe.

Ob Jubiläum, Produktpräsentation oder Weihnachtsfeier - mit eleganter Harfenmusik verleihe ich Ihrer Firmenveranstaltung eine besondere Note.

Kontakt: 02262 - 6187
`,
  },
  taufe: {
    title: "Harfenmusik zur Taufe - Harfenzauber",
    content: `# Harfenmusik zur Taufe

Festliche Harfenmusik für den Willkommensgruß Ihres Kindes.

Die Taufe ist ein bedeutungsvoller Moment. Mit feierlicher Harfenmusik begleite ich diesen besonderen Anlass.

Kontakt: 02262 - 6187
`,
  },
  vernissage: {
    title: "Harfenmusik für Vernissagen - Harfenzauber",
    content: `# Harfenmusik für Vernissagen

Kulturelle Begleitung für Kunstevents und Ausstellungseröffnungen.

Mit meiner Harfenmusik schaffe ich eine inspirierende Atmosphäre, die den Kunstgenuss bereichert.

Kontakt: 02262 - 6187
`,
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const pagePath = path?.join("/") || "";

  // Check static pages first
  if (staticPages[pagePath]) {
    const page = staticPages[pagePath];
    const markdown = `---
title: ${page.title}
url: https://www.harfenzauber.de/${pagePath}
lastModified: ${new Date().toISOString()}
---

${page.content}`;

    return new NextResponse(markdown, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    });
  }

  // Handle service/angebot pages
  if (pagePath.startsWith("angebot/")) {
    const slug = pagePath.replace("angebot/", "");
    if (servicePages[slug]) {
      const page = servicePages[slug];
      const markdown = `---
title: ${page.title}
url: https://www.harfenzauber.de/angebot/${slug}
lastModified: ${new Date().toISOString()}
---

${page.content}`;

      return new NextResponse(markdown, {
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "Cache-Control": "public, max-age=3600, s-maxage=86400",
        },
      });
    }
  }

  // Handle blog posts
  if (pagePath.startsWith("blog/")) {
    const slug = pagePath.replace("blog/", "");
    try {
      const post = await prisma.hfzPost.findUnique({ where: { slug } });
      if (post) {
        const markdown = `---
title: ${post.title}
url: https://www.harfenzauber.de/blog/${slug}
lastModified: ${post.created_at?.toISOString() || new Date().toISOString()}
---

# ${post.title}

${post.content || ""}
`;
        return new NextResponse(markdown, {
          headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=86400",
          },
        });
      }
    } catch {
      // Database error
    }
  }

  return new NextResponse("# Page not found", {
    status: 404,
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}

