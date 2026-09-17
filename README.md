# Issue Tracker

A full-stack issue tracker built with the Next.js App Router, featuring Google authentication, assignee management, and a dashboard.

## Tech Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript
- Prisma ORM + PostgreSQL(Supabase)
- Auth.js (NextAuth v5) — Google OAuth
- @tanstack/react-query — client-side data fetching (assignee select)
- Radix UI Themes — UI components
- Tailwind CSS
- React Hook Form + Zod — forms and validation
- Recharts — dashboard chart
- React Markdown / SimpleMDE — Markdown issue descriptions
- React Hot Toast — error notifications

## Features

- Full CRUD for issues (create, edit, delete)
- Statuses: OPEN, IN_PROGRESS, CLOSED
- Filter issue list by status
- Sortable table columns
- Pagination
- Google sign-in (Auth.js)
- Assign issues to a user (assignee), available only to signed-in users
- Dashboard: status summary, bar chart, latest issues
- Skeleton loading states for all pages

## Installation

```bash
npm install
```

> If you get an `ERESOLVE` conflict, the repo already includes an `.npmrc` with `legacy-peer-deps=true`, so installation should work without extra flags.

## Environment Variables

Create a `.env` file in the project root:

```dotenv
# PostgreSQL — main connection (e.g. via a pooler, port 6543)
DATABASE_URL="postgresql://user:password@host:6543/postgres?pgbouncer=true"

# PostgreSQL — direct connection for migrations (session mode, port 5432)
DIRECT_URL="postgresql://user:password@host:5432/postgres"

# Google OAuth credentials (console.cloud.google.com -> APIs & Services -> Credentials)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Auth.js secret, generate with: npx auth secret
AUTH_SECRET=""
```

### Setting up Google OAuth

1. Go to [Google Cloud Console -> Credentials](https://console.cloud.google.com/apis/credentials).
2. Configure the OAuth consent screen (type: External, fill in app name and your email).
3. Create Credentials -> OAuth client ID -> Application type: Web application.
4. Add this Authorized redirect URI: http://localhost:3000/api/auth/callback/google
5. Copy the generated Client ID and Client Secret into `.env`.

## Database Setup

```bash
npx prisma migrate dev
npx prisma generate
```

## Running the App

npm run dev

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

app/
api/
auth/[...nextauth]/ Auth.js route handler
issues/ Issue CRUD API (GET/PATCH/DELETE by id, POST for create)
users/ List of users (for assignee select)
auth/
provider.tsx SessionProvider wrapper
components/ Shared UI components (badge, spinner, skeleton, pagination, etc.)
issues/
[id]/ Issue detail page, edit/delete buttons, assignee select
_components/ Shared issue form, table, filters, actions
edit/[id]/ Edit issue page
new/ Create issue page
issueSummary.tsx Dashboard status cards
issueChart.tsx Dashboard bar chart
latestIssues.tsx Dashboard latest issues list
page.tsx Dashboard (home page)
lib/
auth.ts Auth.js configuration
prisma.ts Prisma client instance
prisma/
schema.prisma Database schema
migrations/ Migration history


