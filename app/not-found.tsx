import Link from "next/link";
import { Home, Music, Calendar, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center max-w-xl">
        {/* Decorative element */}
        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-secondary/30 flex items-center justify-center">
          <Music className="w-12 h-12 text-primary" />
        </div>

        <h1 className="text-3xl font-bold tracking-tighter text-foreground mb-4">
          Seite nicht gefunden
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Die angeforderte Seite existiert nicht oder wurde verschoben.
          Vielleicht findest du hier, was du suchst:
        </p>

        {/* Quick links */}
        <div className="grid gap-4 sm:grid-cols-2 max-w-md mx-auto mb-8">
          <Link
            href="/"
            className="flex items-center gap-3 p-4 bg-card rounded-xl border hover:border-primary/50 transition-colors text-left"
          >
            <Home className="w-5 h-5 text-primary" />
            <div>
              <div className="font-medium text-foreground">Startseite</div>
              <div className="text-sm text-muted-foreground">Zurück zum Anfang</div>
            </div>
          </Link>

          <Link
            href="/veranstaltungen"
            className="flex items-center gap-3 p-4 bg-card rounded-xl border hover:border-primary/50 transition-colors text-left"
          >
            <Calendar className="w-5 h-5 text-primary" />
            <div>
              <div className="font-medium text-foreground">Veranstaltungen</div>
              <div className="text-sm text-muted-foreground">Aktuelle Konzerte</div>
            </div>
          </Link>
        </div>

        <Button asChild>
          <Link href="/kontakt">
            <MessageCircle className="w-4 h-4 mr-2" />
            Kontakt aufnehmen
          </Link>
        </Button>
      </div>
    </main>
  );
}

