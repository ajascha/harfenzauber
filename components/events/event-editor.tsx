"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import {
  createEvent,
  updateEvent,
  deleteEvent,
} from "@/app/veranstaltungen/actions";
import { ImageGallery } from "@/components/image-gallery";
import { toast } from "sonner";

type EventLike = {
  id: number;
  title: string;
  subtitle: string | null;
  description: string;
  image_url: string | null;
  starts_at: Date;
  address: string;
  venue_name: string | null;
  time_text: string | null;
  price_text: string | null;
  registration_url: string | null;
  created_at: Date | null;
  show_contact_registration: boolean;
};

type EventEditorProps = {
  event?: EventLike | null;
  children: React.ReactNode;
};

export function EventEditor({ event, children }: EventEditorProps) {
  const [open, setOpen] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const action = event ? updateEvent : createEvent;
  const [imageUrl, setImageUrl] = React.useState<string | null>(
    event?.image_url ?? null
  );
  const [showContactRegistration, setShowContactRegistration] = React.useState(
    event?.show_contact_registration ?? false
  );
  const [registrationUrl, setRegistrationUrl] = React.useState<string>(
    event?.registration_url ?? ""
  );

  async function onSubmit(formData: FormData) {
    try {
      setPending(true);
      if (event) formData.set("id", String(event.id));
      await action(formData);
      setOpen(false);
      toast.success(
        event ? "Veranstaltung aktualisiert" : "Veranstaltung erstellt"
      );
    } catch (e) {
      const error = e as Error;
      if (process.env.NODE_ENV === "development") {
        console.error("Event save error:", error);
      }
      toast.error(
        error.message || "Fehler beim Speichern. Bitte versuchen Sie es erneut."
      );
    } finally {
      setPending(false);
    }
  }

  async function onDelete() {
    if (!event) return;
    const confirm = window.confirm("Veranstaltung wirklich löschen?");
    if (!confirm) return;
    try {
      setPending(true);
      await deleteEvent(event.id);
      setOpen(false);
      toast.success("Veranstaltung gelöscht");
    } catch (e) {
      const error = e as Error;
      if (process.env.NODE_ENV === "development") {
        console.error("Event delete error:", error);
      }
      toast.error(
        error.message || "Fehler beim Löschen. Bitte versuchen Sie es erneut."
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {event
              ? "Veranstaltung bearbeiten"
              : "Neue Veranstaltung erstellen"}
          </DialogTitle>
        </DialogHeader>
        <form action={onSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Titel *</Label>
            <Input
              id="title"
              name="title"
              defaultValue={event?.title}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="subtitle">Untertitel</Label>
            <Input
              id="subtitle"
              name="subtitle"
              defaultValue={event?.subtitle ?? ""}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Kurzbeschreibung *</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={event?.description}
              rows={3}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="longDescription">Lange Beschreibung</Label>
            <Textarea
              id="longDescription"
              name="longDescription"
              defaultValue={event?.description ?? ""}
              rows={5}
            />
          </div>

          <div className="grid gap-2">
            <Label>Bild</Label>
            {imageUrl && (
              <div className="relative w-full h-40 rounded-md overflow-hidden border mb-3">
                <Image
                  src={imageUrl}
                  alt="Event Bild"
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <ImageGallery
              currentImageUrl={imageUrl}
              onSelectImage={setImageUrl}
              onUploadComplete={setImageUrl}
            />
            <input type="hidden" name="imageUrl" value={imageUrl ?? ""} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="startsAt">Datum *</Label>
            <Input
              id="startsAt"
              name="startsAt"
              type="datetime-local"
              defaultValue={
                event
                  ? new Date(event.starts_at).toISOString().slice(0, 16)
                  : ""
              }
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="timeText">Uhrzeit Freitext (z. B. 14–18 Uhr)</Label>
            <Input
              id="timeText"
              name="timeText"
              defaultValue={event?.time_text ?? ""}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="venueName">Veranstaltungsort</Label>
            <Input
              id="venueName"
              name="venueName"
              defaultValue={event?.venue_name ?? ""}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="address">Adresse *</Label>
            <Input
              id="address"
              name="address"
              defaultValue={event?.address}
              required
            />
          </div>

          {/* Prices are intentionally not managed on harfenzauber (handled on the other project). */}

          <div className="space-y-4 border-t pt-4">
            <div>
              <Label className="text-base font-semibold mb-2 block">
                Anmeldung
              </Label>
              <p className="text-sm text-muted-foreground mb-4">
                Wähle eine der drei Optionen für die Anmeldung.
              </p>
            </div>

            <div className="space-y-3 pl-4 border-l-2 border-muted">
              <div className="grid gap-2">
                <Label htmlFor="registrationUrl" className="font-normal">
                  Option 1: Externer Anmeldelink
                </Label>
                <Input
                  id="registrationUrl"
                  name="registrationUrl"
                  type="url"
                  value={registrationUrl}
                  onChange={(e) => {
                    setRegistrationUrl(e.target.value);
                    if (e.target.value.trim()) {
                      setShowContactRegistration(false);
                    }
                  }}
                  placeholder="https://..."
                />
                <p className="text-xs text-muted-foreground">
                  Falls vorhanden, wird dieser Link auf der Veranstaltungsseite
                  angezeigt.
                </p>
              </div>

              <div className="pt-2">
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="showContactRegistration"
                    checked={showContactRegistration && !registrationUrl.trim()}
                    onCheckedChange={(checked) =>
                      setShowContactRegistration(checked === true)
                    }
                    disabled={!!registrationUrl.trim()}
                  />
                  <div className="space-y-1 flex-1">
                    <Label
                      htmlFor="showContactRegistration"
                      className="text-sm font-normal cursor-pointer"
                    >
                      Option 2: Kontaktdaten anzeigen
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {registrationUrl.trim()
                        ? "Deaktiviert, da ein Anmeldelink angegeben ist."
                        : "Zeigt Telefonnummer und E-Mail für die Anmeldung an."}
                    </p>
                  </div>
                </div>
                <input
                  type="hidden"
                  name="showContactRegistration"
                  value={
                    showContactRegistration && !registrationUrl.trim()
                      ? "true"
                      : "false"
                  }
                />
              </div>

              <div className="pt-2">
                <div className="flex items-start gap-2">
                  <div className="space-y-1 flex-1">
                    <Label className="text-sm font-normal">
                      Option 3: Keine Anmeldung anzeigen
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {registrationUrl.trim() || showContactRegistration
                        ? "Deaktiviert, da eine andere Option gewählt wurde."
                        : "Es wird keine Anmeldeinformationen auf der Veranstaltungsseite angezeigt."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex items-center justify-between gap-2">
            {event && (
              <Button
                type="button"
                variant="destructive"
                onClick={onDelete}
                disabled={pending}
              >
                {pending ? "Lösche…" : "Löschen"}
              </Button>
            )}
            <Button type="submit" disabled={pending}>
              {pending ? "Speichern…" : "Speichern"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
