# Harfenzauber mit Lorena Wolfewicz

Website für Harfenmusik und Harfenunterricht im Oberbergischen Kreis.

## Features

- 🎵 Harfenunterricht für Kinder & Erwachsene
- 🎭 Harfenmusik für Feste & Feiern (Hochzeit, Geburtstag, etc.)
- 📅 Veranstaltungskalender mit Admin-Bereich
- 📝 Blog-System
- 📧 Kontaktformular mit Email-Integration
- 🔐 Admin-Dashboard für Event-Management

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS + shadcn/ui
- **Email**: Resend
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- Supabase account
- Resend account

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Copy `.env.example` to `.env.local` and fill in your credentials

4. Set up the database:

   ```bash
   pnpm db:push
   ```

5. Seed the database (optional):

   ```bash
   pnpm seed:posts
   pnpm seed:events
   ```

6. Run the development server:
   ```bash
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Database Schema

### Tables

- `hfz_posts`: Blog posts
- `hfz_events`: Events/Veranstaltungen

## Admin Access

Visit `/auth/login` to access the admin dashboard for managing events.

## Deployment

The site is designed to be deployed on Vercel:

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel project settings
3. Deploy!

## Fonts

- **Headings**: Marcellus
- **Body**: Nunito

## Color Scheme

- **Primary**: #98da7e (Green)
- **Secondary**: #e5f6df (Light Green)
- **Background**: #f6f6f6 (White Smoke)
- **Text**: #333

## License

© 2025 Lorena Wolfewicz
