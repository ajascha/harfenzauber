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
  price_cents: number | null;
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
  const [uploading, setUploading] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState<string | null>(
    event?.image_url ?? null
  );

  async function handleFile(file: File) {
    try {
      setUploading(true);
      const body = new FormData();
      body.set("file", file);
      const res = await fetch("/api/upload", { method: "POST", body });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Upload failed");
      setImageUrl(json.publicUrl as string);
    } catch (e) {
      console.error(e);
      alert("Upload fehlgeschlagen");
    } finally {
      setUploading(false);
    }
  }

  async function onSubmit(formData: FormData) {
    try {
      setPending(true);
      if (event) formData.set("id", String(event.id));
      await action(formData);
      setOpen(false);
    } catch (e) {
      console.error(e);
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
      console.error(e);
      alert((e as Error).message || "Fehler beim Löschen");
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
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
              <div className="relative w-full h-40 rounded-md overflow-hidden border">
                <Image
                  src={imageUrl}
                  alt="Event Bild"
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex items-center gap-3">
              <Input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) void handleFile(file);
                }}
              />
              {uploading && (
                <span className="text-sm text-muted-foreground">
                  Lade hoch…
                </span>
              )}
            </div>
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
            <Label htmlFor="priceText">Preis (Freitext)</Label>
            <Input
              id="priceText"
              name="priceText"
              placeholder="z.B. 25 EUR, Spende erbeten, etc."
              defaultValue=""
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="isFree" name="isFree" defaultChecked={false} />
            <Label htmlFor="isFree" className="cursor-pointer">
              Kostenlose Veranstaltung
            </Label>
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
