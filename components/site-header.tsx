"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, ChevronDown, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getClaims();
      setIsAuthed(Boolean(data?.claims));
    };
    void checkAuth();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const serviceLinks = [
    { href: "/angebot/harfenkonzert", label: "Harfenkonzert" },
    { href: "/angebot/hochzeit", label: "Hochzeit" },
    { href: "/angebot/geburtstag", label: "Geburtstag" },
    { href: "/angebot/firmenfeier", label: "Firmenfeier" },
    { href: "/angebot/trauerfeier", label: "Trauerfeier" },
    { href: "/angebot/taufe", label: "Taufe" },
    { href: "/angebot/vernissage", label: "Vernissage" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6 w-full max-w-7xl">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logos/harfenzauber-logo.svg"
            alt="Harfenzauber Logo"
            width={180}
            height={60}
            className="h-12 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-sm font-medium">
          {mounted ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 transition-colors hover:text-primary whitespace-nowrap">
                Harfenmusik für Feste & Feiern
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {serviceLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href} className="cursor-pointer">
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-1 transition-colors hover:text-primary">
              Harfenmusik für Feste & Feiern
              <ChevronDown className="h-4 w-4" />
            </div>
          )}

          <Link
            href="/harfenunterricht"
            className="transition-colors hover:text-primary"
          >
            Harfenunterricht
          </Link>

          <Link
            href="/veranstaltungen"
            className="transition-colors hover:text-primary"
          >
            Veranstaltungen
          </Link>

          {/* <Link href="/blog" className="transition-colors hover:text-primary">
            Blog
          </Link> */}

          {isAuthed && (
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="ml-4"
            >
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          )}

          <Button asChild variant="default" className="ml-4">
            <Link href="/kontakt">Kontakt</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Navigation */}
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

            {/* <Link
              href="/blog"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link> */}

            {isAuthed && (
              <Button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
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
    </header>
  );
}
