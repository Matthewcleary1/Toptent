# Tenttop

Standalone Tenttop rooftop-tent application built with Next.js, TypeScript, Supabase and Vercel. The production runtime has no dependency on the previous website platform.

## First deployment bootstrap

The full application source is currently stored in the four-part `.bootstrap/` bundle because the connected GitHub API cannot upload the complete source tree as one repository operation. `bootstrap.sh` reconstructs that source at Vercel build time before `next build` runs.

The temporary root `package.json` contains the same runtime/build dependencies as the application so Vercel can install dependencies before source extraction. After the first successful deployment, the repository can be normalized to the expanded source tree.

## Backend

The live Tenttop Supabase project already contains the standalone catalogue, CRM/reservations/installations schema, Storage buckets, RLS policies and the `public-site` Edge Function. Supabase's security advisor currently reports no security findings.

Exact stock counts remain unset until verified quantities are entered, and product media is intentionally not served from the previous site's CDN.
