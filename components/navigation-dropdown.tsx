"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

const serviceLinks = [
  { href: "/angebot/harfenkonzert", label: "Harfenkonzert" },
  { href: "/angebot/hochzeit", label: "Hochzeit" },
  { href: "/angebot/geburtstag", label: "Geburtstag" },
  { href: "/angebot/firmenfeier", label: "Firmenfeier" },
  { href: "/angebot/trauerfeier", label: "Trauerfeier" },
  { href: "/angebot/taufe", label: "Taufe" },
  { href: "/angebot/vernissage", label: "Vernissage" },
];

export function NavigationDropdown() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-1 transition-colors hover:text-primary">
        Harfenmusik für Feste & Feiern
        <ChevronDown className="h-4 w-4" />
      </div>
    );
  }

  return (
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
  );
}

