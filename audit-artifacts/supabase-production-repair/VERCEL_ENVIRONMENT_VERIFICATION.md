# Vercel Environment Configuration & Redeployment Verification
**Directive**: `GOAL-MULTIPATH-PRODUCTION-SUPABASE-CONFIG-V1`  
**Project Ref**: `multipath-one` / `multipath`  
**Deployment Target**: `https://multipath-one.vercel.app/`  
**Git Remote**: `https://github.com/krishnav-mohta-glitch/multipath.git` (`main`)  
**Date**: 2026-11-16  

---

## 1. Environment Variable Architecture & Security Review

Client-side single page applications built with Vite do not read server-side environment variables at runtime. Instead, Vite statically embeds all variables prefixed with `VITE_` (and now `SUPABASE_`) into the compiled JavaScript chunks at build time.

### Security Invariants:
1. **Public Keys Only**: Only the public publishable key (`sb_publishable_...`) or client anon key is configured.
2. **Zero Secret Exposure**: The Supabase `service_role` secret key is **NEVER** exposed to client-side bundles or frontend environment variables.
3. **Multi-Tenant Protection**: Row Level Security (RLS) policies on the Supabase PostgreSQL database guard all student data; possession of the public key grants access only to public curriculum tables and the authenticated student's own records.

---

## 2. Required Production Environment Variables

Configure the following variables in the **Vercel Project Settings**:

| Variable Name | Environment Scopes | Expected Format / Value | Description |
|---|---|---|---|
| `VITE_SUPABASE_URL` | Production, Preview, Development | `https://oestvwgkpllikmufvjls.supabase.co` | Supabase project API gateway endpoint |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Production, Preview, Development | `sb_publishable_ZxcO_ZdsXI11fehS2xajPA_uT2gRJ3M` | Modern Supabase client publishable key |
| `VITE_SUPABASE_ANON_KEY` *(Optional)* | Production, Preview, Development | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Legacy JWT anon key for backward compatibility |

---

## 3. Redeployment Procedure

Because Vite inlines variables at build time, updating environment variables in Vercel requires a new build to take effect:

### Option A: Via Vercel Dashboard
1. Go to `https://vercel.com/dashboard`.
2. Select project **multipath-one**.
3. Under **Deployments**, locate the latest deployment or click **Redeploy**.
4. Check **"Use existing Build Cache"** (or uncheck to ensure clean build).
5. Click **Redeploy**.

### Option B: Via Git Push
1. After ChatGPT Engineering Director review and approval, push the configuration repair commit to `main`.
2. Vercel automatically detects the push and runs `npm run build` with the newly configured environment variables.
