"use client";

import { Button } from "@/components/ui/button";
import { EventEditor } from "@/components/events/event-editor";

export function NewEventButton() {
  return (
    <EventEditor event={null}>
      <Button>Neue Veranstaltung</Button>
    </EventEditor>
  );
}

