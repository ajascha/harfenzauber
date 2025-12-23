import Link from "next/link";

export default function NotFound() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-semibold text-neutral-800 mb-4">
        Veranstaltung nicht gefunden
      </h1>
      <p className="text-neutral-600 mb-6">
        Die angeforderte Veranstaltung existiert nicht oder wurde entfernt.
      </p>
      <Link href="/veranstaltungen" className="text-primary underline">
        Zur Übersicht der Veranstaltungen
      </Link>
    </main>
  );
}
