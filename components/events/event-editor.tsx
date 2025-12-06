"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
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

  async function onSubmit(formData: FormData) {
    try {
      setPending(true);
      if (event) formData.set("id", String(event.id));
      await action(formData);
      setOpen(false);
    } catch (e) {
      if (process.env.NODE_ENV === "development") {
        console.error(e);
      }
      alert((e as Error).message || "Fehler beim Speichern");
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
    } catch (e) {
      if (process.env.NODE_ENV === "development") {
        console.error(e);
      }
      alert((e as Error).message || "Fehler beim Löschen");
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
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

          <div className="grid gap-2">
            <Label htmlFor="priceText">
              Preis (optional, z. B. &quot;50.00 EUR&quot; oder &quot;Auf
              Spendenbasis&quot;)
            </Label>
            <Input
              id="priceText"
              name="priceText"
              type="text"
              defaultValue={event?.price_text ?? ""}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="registrationUrl">Anmeldelink</Label>
            <Input
              id="registrationUrl"
              name="registrationUrl"
              type="url"
              defaultValue={event?.registration_url ?? ""}
            />
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
