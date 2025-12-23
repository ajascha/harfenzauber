import Link from "next/link";
import { Music } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AngebotNotFound() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <Music className="w-16 h-16 text-muted-foreground/30 mb-6" />
      <h1 className="text-2xl font-bold tracking-tighter text-foreground mb-3">
        Dieses Angebot existiert nicht
      </h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        Die Seite wurde möglicherweise verschoben oder entfernt.
      </p>
      <Button asChild>
        <Link href="/#angebote">Alle Angebote ansehen</Link>
      </Button>
    </main>
  );
}

