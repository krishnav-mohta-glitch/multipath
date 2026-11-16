# Vercel Environment Configuration Specification

**Directive**: `GOAL-MULTIPATH-EXISTING-SUPABASE-VERCEL-CONNECTION-V1`  
**Target Project**: `multipath-one` / `multipath`  
**Production URL**: `https://multipath-one.vercel.app/`  
**GitHub Repository**: `krishnav-mohta-glitch/multipath` (`main`)  
**Authorized Base Commit**: `50080073616960d7c4f51409f95d4eb68bd00e62`  
**Date**: 2026-11-16  

---

## 1. Context & Architectural Root Cause

Client-side Single Page Applications (SPAs) compiled by Vite do not evaluate environment variables dynamically at browser runtime. Instead, Vite performs static compilation replacement (`import.meta.env.VITE_*` -> literal value).

When `multipath-one.vercel.app` was previously deployed, Vercel's build environment lacked the `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` variables. Consequently, Vite inlined `void 0` into the production bundle `assets/index-CzGOgYq3.js`:
```js
nt=void 0,rt=void 0;
```
This caused `isConfigured` to evaluate to `false`, displaying the warning *"Supabase credentials not configured in this environment"* and disabling user authentication.

---

## 2. Mandatory Production Environment Variables

The following exact environment variables must be configured in the Vercel Project Settings for **`multipath-one`**:

| Variable Name | Required Scope | Configured Value (Sanitized) | Purpose |
|---|---|---|---|
| `VITE_SUPABASE_URL` | Production | `https://oestvwgkpllikmufvjls.supabase.co` | API gateway endpoint for Supabase project `oestvwgkpllikmufvjls` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Production | `sb_publishable_ZxcO...J3M` | Public browser API key for client-side authentication and RLS |

> [!IMPORTANT]
> **Credential Safeguards**:
> - Only the `publishable` client API key is configured.
> - The Supabase `service_role` secret key is **NEVER** exposed to Vercel frontend variables or client bundles.
> - Row Level Security (RLS) is active on 100% of public database tables (64 topics, 256 learning paths, 128 mappings, 54 subjects).

---

## 3. Configuration & Production Redeployment Steps

To apply these variables to the live deployment:

1. **Navigate to Project Settings**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard) -> Select Project `multipath-one`.
   - Go to **Settings** -> **Environment Variables**.
2. **Add / Verify Variables**:
   - Add `VITE_SUPABASE_URL` with value `https://oestvwgkpllikmufvjls.supabase.co` (Environment: **Production**).
   - Add `VITE_SUPABASE_PUBLISHABLE_KEY` with the active default publishable key (Environment: **Production**).
3. **Trigger Production Redeployment**:
   - Under **Deployments**, locate the deployment for commit `50080073616960d7c4f51409f95d4eb68bd00e62` or redeploy from `main`.
   - Click **Redeploy** (with or without build cache).
   - Ensure the new production build completes and serves `https://multipath-one.vercel.app/`.
