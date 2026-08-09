# SYNTRA OPTIMIZER — Web App

A premium landing page + client dashboard for **Syntra Optimizer**, a Windows PC optimization
utility. Built with **React**, **Tailwind CSS**, **React Router**, and **Supabase**.

## Stack

- **React 19** + **Vite 8**
- **Tailwind CSS v4** (`@tailwindcss/postcss` + `@config` for the JS theme file)
- **React Router v7** — public routes, auth routes, protected dashboard
- **Supabase** (`@supabase/supabase-js`) — email/password + OAuth auth, profiles,
  plan/purchase status, download tracking
- **Framer Motion** for scroll-reveal animations, **canvas-confetti** for download celebration

## Getting started

```bash
npm install
npm run dev      # start dev server (http://localhost:5173)
npm run build    # production build
npm run lint     # oxlint
```

## Supabase setup

Create an `.env` file in the project root (copy from `.env.example`):

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

> **Demo mode:** If Supabase is not configured, the app automatically falls back to a
> fully functional **localStorage mock database** so you can test auth, the dashboard,
> and downloads without a backend.

Enable **Email/Password** and (optionally) **Google** + **Discord** providers in
Supabase → Authentication → Providers.

### Required tables

Run this SQL in the Supabase **SQL Editor**:

```sql
-- User profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  avatar_url text,
  created_at timestamptz default now()
);

-- Plan / purchase status
create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  plan_id text,          -- 'self-service' | 'done-for-you'
  plan_name text,
  price numeric,
  status text default 'active',
  license_key text,
  purchased_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Download tracking
create table if not exists public.download_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  version text,
  file_name text,
  created_at timestamptz default now()
);
```

Every login/registration creates a matching `profiles` row, and signup seeds a default
`purchases` row so the dashboard works immediately.

## Routing

| Route          | Access      | Description                          |
| -------------- | ----------- | ------------------------------------ |
| `/`            | Public      | Landing page                         |
| `/login`       | Public      | Sign in (email/password + OAuth)     |
| `/register`    | Public      | Create account                       |
| `/dashboard`   | Protected   | Client portal: profile, plan, download |

The protected route redirects unauthenticated visitors to `/login` and presents a
license-verification loader while auth state loads.