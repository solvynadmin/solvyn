# Revisions to the Solvyn Landing Page Plan

This is a set of corrections and additions to the plan Claude Code produced, based on decisions already made in earlier Solvyn sessions that Claude Code wasn't working from. Hand this alongside the original plan and ask Claude Code to revise before any code gets written.

---

## 1. The brand guide is binding, not a style reference

A full brand guide already exists: `solvyn-brand-guide.md`, built specifically to be handed to a coding agent as the design system for this project. It was generated alongside a logo package (`solvyn-logo-package.zip` or whatever the current version is named).

The plan's stack table independently arrived at zinc/teal Tailwind tokens and a flat, no-shadow aesthetic, which happens to match the brand guide, so the broad direction is right. But the plan should explicitly say: build against `solvyn-brand-guide.md` as the constraint set, not as inspiration. Specifically pull from it:

- Color tokens: `#18181B` (zinc-900), `#FAFAFA` (zinc-50), `#2DD4BF` (teal-400), `#0D9488` (teal-600), for both light and dark mode
- Border radius: 6–8px on buttons, cards, and inputs (intentionally tighter than the 12–16px default common in SaaS templates)
- No drop shadows anywhere; separation comes from borders, background contrast, or whitespace
- Max content width ~1200px, centered, generous side margins
- Component specs for primary/secondary buttons, cards, and links as defined in the guide

The plan already gets some of this right (8px radius, no shadow, zinc/teal), so this is mostly about making the dependency explicit so Claude Code doesn't drift from it once it starts generating copy and components on its own.

## 2. Verify the asset package before Claude Code copies anything

The plan points at `/Users/cameroncons/Local/Solvyn/Logo v2/solvyn-logo-package-v2/` and lists only two wordmark files plus a favicon from an `app-icons/` folder.

The asset manifest from the brand guide session has a different structure:

```
icon/solvyn-icon-dark-bg.svg
icon/solvyn-icon-light-bg.svg
icon/solvyn-icon-small-dark-bg.svg
icon/solvyn-icon-small-light-bg.svg
wordmark/solvyn-wordmark-dark-bg.svg
wordmark/solvyn-wordmark-light-bg.svg
png/favicon.ico
png/solvyn-icon-16.png ... solvyn-icon-512.png
png/solvyn-icon-dark-bg-512.png
png/solvyn-icon-light-bg-512.png
png/solvyn-wordmark-dark-bg@2x.png
png/solvyn-wordmark-light-bg@2x.png
source-files/solvyn-icon-tile.svg
```

If "Logo v2" is a regenerated package with a different folder layout, that's fine, but Claude Code shouldn't guess at paths. Before it copies anything, it should list the actual contents of the logo package directory and confirm the favicon and any icon-only marks (separate from the wordmark) actually exist where expected. The icon-only files matter because the site needs a favicon and an Open Graph/social preview image, neither of which should be built from the full wordmark.

## 3. Copy and voice rules need to be explicit, not assumed

These rules exist in both the project instructions and the brand guide's "voice and content guidelines," but a coding agent writing placeholder copy will default to standard SaaS landing page patterns unless told otherwise. Add this as an explicit instruction block:

- No em dashes
- No "X, Y, and Z" rule-of-three constructions
- No buzzwords: leverage, synergy, seamless, unlock, revolutionize, game-changer, cutting-edge, empower
- Write like an experienced consultant talking to a business owner, direct and plain, not salesy
- Ground claims in the brand story specifically: clarity over fragmentation, ownership over hand-offs, honest scoping over overpromising

This applies to every section's copy, including the hero subhead, service card descriptions, and the "Why Solvyn" section, all of which are currently placeholder text Claude Code will need to write for real.

## 4. No social proof, testimonials, or case study section

Solvyn is a brand-new entity (formed today) with no completed client work yet. The brother's contract platform project is the first engagement and hasn't shipped. A coding agent building a "complete" landing page will often add a logos strip, testimonials section, or "trusted by" line by default.

Explicitly exclude this. The page should be honest about being a new firm without implying an existing track record it doesn't have. If Claude Code proposes a social proof section, that's a signal it's filling in a template rather than building from the actual situation.

## 5. Keep services copy industry-agnostic

Solvyn is intentionally industry-agnostic for now. A niche (likely something adjacent to fintech, insurance, or real estate, given Cameron's compliance background) may get chosen later, but hasn't been yet. The services section and "Why Solvyn" copy should describe what Solvyn does and how it works without anchoring to a specific industry or regulatory framing. If Claude Code's draft copy starts leaning into compliance-heavy or fintech-specific language, that's premature and should be flagged before it ships.

## 6. Add basic metadata and an Open Graph image

The current plan has no `metadata` export in `app/layout.tsx` and no Open Graph/social preview setup. For a real public page this matters even at launch. Add:

- `title` and `description` in `app/layout.tsx`'s metadata export, using the brand story language (not generic "AI consulting" boilerplate)
- An Open Graph image, generated from the icon tile or wordmark in the logo package once asset paths are confirmed (see item 2)
- `favicon.ico` wired up properly from the confirmed asset location

## 7. Footer contact email is a placeholder that needs a real answer

The plan's footer spec just says "email address" without specifying one. Before this ships, confirm what address goes there. If `solvyn.co` (or whichever domain gets secured) isn't live yet with email configured, either use a placeholder that's clearly marked for Cameron to fill in, or hold off on the footer email until the domain and email setup are confirmed, rather than letting Claude Code invent something like `hello@solvyn.co` and have it silently ship as dead.

## 8. Confirm which Supabase/Vercel project this points at

Cameron may also be setting up infrastructure for the brother's project (a separate entity, separate Supabase project, separate hosting) around the same time. Before Claude Code runs `apply_migration` or anything else against Supabase via MCP, it should confirm it's pointed at a Solvyn-owned project, not whatever project happens to be most recently active in the connected account. Same goes for the Vercel deployment target. This is a five-second check that prevents a messy cross-project mistake later.

---

## Prompt to give Claude Code

Paste this along with the original plan and `solvyn-brand-guide.md`:

> Before building anything, revise the landing page plan based on the attached notes (`solvyn-landing-page-plan-revisions.md`). Specifically: treat `solvyn-brand-guide.md` as the binding design system for colors, spacing, radius, and components, not just a reference. Before copying any logo assets, list the actual contents of the logo package directory and confirm the favicon and icon-only marks exist where the plan expects them, don't assume the path. Apply the voice and copy rules (no em dashes, no rule-of-three, no buzzwords, ground copy in the brand story) to every section's written content. Do not include any testimonials, client logos, or social proof section. Keep services and "why Solvyn" copy industry-agnostic, no fintech or compliance-specific framing. Add a metadata export with title, description, and an Open Graph image once the correct icon asset is confirmed. Flag the footer email as needing my confirmation rather than inventing one. Before running any Supabase or Vercel commands, confirm the target project belongs to Solvyn and not another project in the connected account. Show me the revised plan before writing any code.
