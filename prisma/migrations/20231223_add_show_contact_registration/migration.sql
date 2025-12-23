-- Add show_contact_registration boolean to hfz_events
ALTER TABLE "hfz_events" ADD COLUMN "show_contact_registration" BOOLEAN NOT NULL DEFAULT false;

