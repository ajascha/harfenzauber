import Link from "next/link";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BlogNotFound() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <FileText className="w-16 h-16 text-muted-foreground/30 mb-6" />
      <h1 className="text-2xl font-bold tracking-tighter text-foreground mb-3">
        Dieser Beitrag existiert nicht mehr
      </h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        Der Artikel wurde möglicherweise entfernt oder aktualisiert.
      </p>
      <Button asChild>
        <Link href="/blog">Alle Beiträge ansehen</Link>
      </Button>
    </main>
  );
}

