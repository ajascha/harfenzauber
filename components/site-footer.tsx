import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook } from "lucide-react";

export function SiteFooter() {
  const serviceLinks = [
    { href: "/angebot/harfenkonzert", label: "Harfenkonzert" },
    { href: "/angebot/hochzeit", label: "Hochzeit" },
    { href: "/angebot/geburtstag", label: "Geburtstag" },
    { href: "/angebot/firmenfeier", label: "Firmenfeier" },
    { href: "/angebot/taufe", label: "Taufe" },
    { href: "/angebot/trauerfeier", label: "Trauerfeier" },
    { href: "/angebot/vernissage", label: "Vernissage" },
  ];

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logos/harfenzauber-logo.svg"
                alt="Harfenzauber Logo"
                width={160}
                height={53}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              Harfenmusik für Feste & Feiern. Harfenunterricht für Kinder und
              Erwachsene im schönen Oberbergischen Land.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">
              Harfenmusik für Feste & Feiern
            </h3>
            <ul className="space-y-2 text-sm">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/harfenunterricht"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Harfenunterricht
                </Link>
              </li>
              <li>
                <Link
                  href="/veranstaltungen"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Veranstaltungen
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/kontakt"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Kontakt</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="tel:+4922626187"
                  className="transition-colors hover:text-primary"
                >
                  02262 - 6187
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@harfenzauber.de"
                  className="transition-colors hover:text-primary"
                >
                  info@harfenzauber.de
                </a>
              </li>
              <li className="flex gap-4 pt-2">
                <a
                  href="https://www.instagram.com/harfenzauber/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61554146841210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Lorena Wolfewicz</p>
          <div className="flex gap-4">
            <Link
              href="/rechtliches/datenschutz"
              className="transition-colors hover:text-primary"
            >
              Datenschutzerklärung
            </Link>
            <Link
              href="/rechtliches/impressum"
              className="transition-colors hover:text-primary"
            >
              Impressum
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

