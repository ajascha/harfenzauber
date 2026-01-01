"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function VeranstaltungenError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error("Veranstaltungen page error:", error);
    }
  }, [error]);

  return (
    <div className="container px-4 md:px-6 py-16 max-w-6xl">
      <Card className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">
          Veranstaltungen konnten nicht geladen werden
        </h1>
        <p className="text-muted-foreground mb-6">
          Es gab ein Problem beim Laden der Veranstaltungen. Bitte versuchen Sie es erneut.
        </p>
        <Button onClick={reset}>Erneut versuchen</Button>
      </Card>
    </div>
  );
}

