"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2 } from "lucide-react";

export type FormState = {
  ok: boolean;
  message: string;
  formData?: {
    name: string;
    email: string;
    phone: string;
    message: string;
  };
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? "Wird gesendet..." : "Nachricht senden"}
    </Button>
  );
}

export function ContactFormClient({
  action,
  initialState,
}: {
  action: (prev: FormState, formData: FormData) => Promise<FormState>;
  initialState: FormState;
}) {
  const [state, formAction] = useActionState(action, initialState);

  if (state.ok && !state.formData) {
    return (
      <div className="rounded-lg border bg-secondary/20 p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">
          Vielen Dank für deine Nachricht!
        </h3>
        <p className="text-muted-foreground mb-4">
          Ich melde mich zeitnah zurück.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          name="name"
          placeholder="Dein Name"
          required
          defaultValue={state.formData?.name || ""}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-Mail *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="deine@email.de"
          required
          defaultValue={state.formData?.email || ""}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Telefon (optional)</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="Deine Telefonnummer"
          defaultValue={state.formData?.phone || ""}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Nachricht *</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Deine Nachricht"
          rows={6}
          required
          defaultValue={state.formData?.message || ""}
        />
      </div>

      {/* Honeypot field - hidden from users */}
      <div className="hidden">
        <Label htmlFor="company">Firma</Label>
        <Input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      {state.message && !state.ok && (
        <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
          {state.message}
        </div>
      )}

      <SubmitButton />
    </form>
  );
}
