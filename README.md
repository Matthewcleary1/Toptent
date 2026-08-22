# Tenttop

Production-oriented standalone Next.js build for Tenttop, backed by Supabase and designed for Vercel deployment.

## Stack

- Next.js 16 App Router + React 19 + TypeScript
- Tailwind CSS 4
- Supabase PostgreSQL, Auth, Storage and Edge Functions
- Vercel Web Analytics
- Vercel hosting
- GitHub source control
- Stripe Checkout architecture reserved for a later phase

## Local setup

1. Copy `.env.example` to `.env.local`.
2. Add the Supabase URL and publishable key when overriding the checked-in public production defaults for another environment.
3. Apply the version-controlled migrations in `supabase/migrations` in order.
4. Deploy the `public-site` Supabase Edge Function. `supabase/config.toml` records that this intentionally public, validated and rate-limited endpoint uses `verify_jwt = false`.
5. Run `npm install`.
6. Run `npm run dev`.

## Security model

- Public browsing never requires login.
- Admin authentication uses Supabase Auth.
- Admin authorization uses `app_metadata.role = admin`, never editable `user_metadata`.
- RLS is enabled on every public table.
- Anonymous visitors can read only public catalogue/settings/FAQ content; customer records are not publicly readable.
- Public enquiries, compatibility checks, installation requests, reservations and private vehicle-upload tokens are validated and rate-limited in the Supabase `public-site` Edge Function. Its privileged database credential stays inside Supabase and is not duplicated into Vercel.
- Admin mutations use the authenticated admin's Supabase session and RLS policies rather than a Vercel-side service key.
- Reservation inventory is validated and changed in PostgreSQL under a row lock so two customers cannot reserve the final unit simultaneously.
- Customer vehicle uploads use a private Storage bucket. Vehicle photos and admin product photos upload directly with short-lived signed upload tokens, avoiding Vercel request-body limits.

## Inventory semantics

The four catalogue products are initially marked `IN_STOCK`, while exact unit counts remain `NULL` until Tenttop enters verified quantities. Urgency labels such as “Only 1 available” are shown only when the Supabase transactional inventory contains that real numeric availability.

## Legacy migration

The production app has no runtime dependency on the previous website platform. Product data is stored natively in Supabase; product media is managed through Tenttop’s own Supabase Storage buckets and admin.

## Admin bootstrap

Temporarily set `ADMIN_BOOTSTRAP_ENABLED=true` only while creating the first Supabase Auth user, then switch it back to `false`. Promote only the intended owner using `scripts-promote-admin.sql`, which writes server-controlled `app_metadata.role = admin`. The Next.js Proxy, server actions and RLS policies enforce that role.

## Deployment

The target workflow is GitHub → Vercel Git integration. Public Supabase project identifiers can be overridden through `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`; no Supabase service-role/secret key is required by the Vercel application. Vercel's system production URL is used automatically when `NEXT_PUBLIC_SITE_URL` is not set.

## Verification commands

- `npm run typecheck`
- `npm run build`

The live Supabase project is migration-backed and has been checked with Supabase's security advisor. See `docs/QA_STATUS.md` for the current production-signoff checklist.
