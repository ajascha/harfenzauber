import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AuthButton } from "@/components/auth-button";
import { MobileMenu } from "@/components/mobile-menu";
import { NavigationDropdown } from "@/components/navigation-dropdown";

export function SiteHeader() {
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
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-sm font-medium">
          <NavigationDropdown />

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

          <AuthButton />

          <Button asChild variant="default" className="ml-4">
            <Link href="/kontakt">Kontakt</Link>
          </Button>
        </nav>

        {/* Mobile Menu */}
        <MobileMenu />
      </div>
    </header>
  );
}
