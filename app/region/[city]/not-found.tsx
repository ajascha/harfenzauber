import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="container mx-auto px-4 md:px-6 max-w-4xl py-16 text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
        Region nicht gefunden
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        Diese Regionsseite existiert nicht.
      </p>
      <Button asChild>
        <Link href="/">
          <Home className="mr-2 w-4 h-4" />
          Zur Startseite
        </Link>
      </Button>
    </main>
  );
}
