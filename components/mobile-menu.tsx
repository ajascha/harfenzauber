"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const serviceLinks = [
  { href: "/angebot/harfenkonzert", label: "Harfenkonzert" },
  { href: "/angebot/hochzeit", label: "Hochzeit" },
  { href: "/angebot/geburtstag", label: "Geburtstag" },
  { href: "/angebot/firmenfeier", label: "Firmenfeier" },
  { href: "/angebot/trauerfeier", label: "Trauerfeier" },
  { href: "/angebot/taufe", label: "Taufe" },
  { href: "/angebot/vernissage", label: "Vernissage" },
];

export function MobileMenu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    setMounted(true);
    const checkAuth = async () => {
      const { data } = await supabase.auth.getClaims();
      setIsAuthed(Boolean(data?.claims));
    };
    void checkAuth();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    setMobileMenuOpen(false);
  };

  return (
    <>
      <button
        className="lg:hidden"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-background">
          <nav className="container mx-auto flex flex-col space-y-4 px-4 py-6 w-full max-w-7xl">
            <div className="flex flex-col space-y-2">
              <span className="text-sm font-medium text-muted-foreground">
                Harfenmusik für Feste & Feiern
              </span>
              {serviceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="pl-4 text-sm transition-colors hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <Link
              href="/harfenunterricht"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Harfenunterricht
            </Link>

            <Link
              href="/veranstaltungen"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Veranstaltungen
            </Link>

            {mounted && isAuthed && (
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="w-full justify-start"
              >
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </Button>
            )}

            <Button asChild variant="default" className="w-full">
              <Link href="/kontakt" onClick={() => setMobileMenuOpen(false)}>
                Kontakt
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </>
  );
}

