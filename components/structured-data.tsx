// JSON-LD Structured Data components for LLM optimization
// These help AI systems understand and ground content accurately

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.harfenzauber.de/#organization",
    name: "Harfenzauber - Lorena Wolfewicz",
    alternateName: "Harfenzauber",
    description:
      "Professionelle Harfenmusik für besondere Anlässe im Köln-Bonner Raum. Harfenistin Lorena Wolfewicz verzaubert Hochzeiten, Feiern und Veranstaltungen.",
    url: "https://www.harfenzauber.de",
    telephone: "+49-2262-6187",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Oberbergischer Kreis",
      addressRegion: "Nordrhein-Westfalen",
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "51.0",
      longitude: "7.5",
    },
    areaServed: [
      // Primary: Oberbergischer Kreis
      { "@type": "City", name: "Bergneustadt" },
      { "@type": "City", name: "Gummersbach" },
      { "@type": "City", name: "Wiehl" },
      { "@type": "City", name: "Nümbrecht" },
      { "@type": "City", name: "Waldbröl" },
      { "@type": "City", name: "Engelskirchen" },
      { "@type": "AdministrativeArea", name: "Oberbergischer Kreis" },
      // Secondary
      { "@type": "City", name: "Köln" },
      { "@type": "City", name: "Kerpen" },
      { "@type": "City", name: "Olpe" },
      { "@type": "AdministrativeArea", name: "Bergisches Land" },
      { "@type": "AdministrativeArea", name: "Nordrhein-Westfalen" },
    ],
    founder: {
      "@type": "Person",
      "@id": "https://www.harfenzauber.de/#person",
      name: "Lorena Wolfewicz",
      jobTitle: "Harfenistin",
    },
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function MusicianSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://www.harfenzauber.de/#person",
    name: "Lorena Wolfewicz",
    jobTitle: "Harfenistin",
    description:
      "Lorena Wolfewicz ist eine professionelle Harfenistin im Oberbergischen Kreis. Sie spielt auf Hochzeiten, Trauerfeiern, Firmenfeiern und privaten Veranstaltungen und gibt Harfenunterricht.",
    url: "https://www.harfenzauber.de/ueber-mich",
    telephone: "+49-2262-6187",
    worksFor: {
      "@id": "https://www.harfenzauber.de/#organization",
    },
    knowsAbout: [
      "Harfenmusik",
      "Klassische Musik",
      "Keltische Musik",
      "Hochzeitsmusik",
      "Harfenunterricht",
      "Live-Musik",
    ],
    hasOccupation: [
      {
        "@type": "Occupation",
        name: "Harfenistin",
        occupationLocation: {
          "@type": "AdministrativeArea",
          name: "Nordrhein-Westfalen, Deutschland",
        },
      },
      {
        "@type": "Occupation",
        name: "Musiklehrerin",
        occupationLocation: {
          "@type": "AdministrativeArea",
          name: "Oberbergischer Kreis, Deutschland",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.harfenzauber.de/#website",
    name: "Harfenzauber - Lorena Wolfewicz",
    url: "https://www.harfenzauber.de",
    description:
      "Professionelle Harfenmusik für besondere Anlässe. Harfenistin Lorena Wolfewicz aus dem Oberbergischen Kreis verzaubert Ihre Veranstaltung.",
    publisher: {
      "@id": "https://www.harfenzauber.de/#organization",
    },
    inLanguage: "de-DE",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function MusicServiceSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@id": "https://www.harfenzauber.de/#organization",
    },
    areaServed: [
      // Primary: Oberbergischer Kreis
      { "@type": "City", name: "Bergneustadt" },
      { "@type": "City", name: "Gummersbach" },
      { "@type": "City", name: "Wiehl" },
      { "@type": "City", name: "Nümbrecht" },
      { "@type": "City", name: "Waldbröl" },
      { "@type": "City", name: "Engelskirchen" },
      { "@type": "AdministrativeArea", name: "Oberbergischer Kreis" },
      // Secondary
      { "@type": "City", name: "Köln" },
      { "@type": "City", name: "Kerpen" },
      { "@type": "City", name: "Olpe" },
      { "@type": "AdministrativeArea", name: "Bergisches Land" },
    ],
    serviceType: "Live-Musik",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function MusicEventSchema({
  name,
  description,
  startDate,
  endDate,
  location,
  address,
  url,
}: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  address?: string;
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name,
    description,
    startDate,
    endDate: endDate || startDate,
    location: {
      "@type": "Place",
      name: location,
      address: {
        "@type": "PostalAddress",
        streetAddress: address,
        addressCountry: "DE",
      },
    },
    url,
    organizer: {
      "@id": "https://www.harfenzauber.de/#organization",
    },
    performer: {
      "@id": "https://www.harfenzauber.de/#person",
    },
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function EducationalServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Harfenunterricht bei Lorena Wolfewicz",
    description:
      "Harfenunterricht für Anfänger und Fortgeschrittene im Oberbergischen Kreis. Einzelunterricht mit individueller Betreuung.",
    url: "https://www.harfenzauber.de/harfenunterricht",
    provider: {
      "@id": "https://www.harfenzauber.de/#person",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Oberbergischer Kreis",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({
  questions,
}: {
  questions: Array<{ question: string; answer: string }>;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleSchema({
  title,
  description,
  url,
  imageUrl,
  publishedAt,
  modifiedAt,
  authorName = "Lorena Wolfewicz",
}: {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  publishedAt: string; // ISO 8601: "2025-12-23T10:00:00+01:00"
  modifiedAt?: string;
  authorName?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    inLanguage: "de-DE",
    url,
    image: imageUrl,
    datePublished: publishedAt,
    dateModified: modifiedAt || publishedAt,
    author: {
      "@type": "Person",
      name: authorName,
      url: "https://www.harfenzauber.de/ueber-mich",
    },
    publisher: {
      "@id": "https://www.harfenzauber.de/#organization",
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

