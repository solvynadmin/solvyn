# Solvyn brand guide

Design context for building the Solvyn website. Use this alongside `solvyn-logo-package.zip` (logo files, favicon, color reference).

## Brand essence

Solvyn is an all-in-one technology and AI consulting/implementation firm for small and medium businesses. One firm scopes, builds, and supports, rather than handing clients off to a chain of vendors.

The core story: small business owners are often buried in day-to-day operations, disconnected from their own business, and frustrated by fragmented tools that each promise everything and deliver only part of the picture. After working with Solvyn, they have more time, a clearer understanding of how their business runs, and a sense of control and trust in what comes next.

The name comes from "solve." The brand is about solving honestly, end to end, from the first conversation.

This story should come through in how the site is structured (clarity, not overwhelm) and in the copy itself, not just in visual styling.

## Visual direction

- Modern, geometric, sharp-edged. Flat design throughout: no gradients, drop shadows, glassmorphism, glow, or neon effects.
- Dark mode is a first-class option, not an afterthought. The logo and palette were designed dark-first.
- Generous whitespace. Let sections breathe rather than filling every area with decoration or icons.
- Avoid generic "AI startup" visual clichés: no neural-network line art, no glowing circuit/brain imagery, no stock photos of robotic hands or holograms. If imagery is used, prefer real, grounded photography (people, workspaces, products) over abstract tech visuals.

## Logo

From `solvyn-logo-package.zip`:

- `wordmark/solvyn-wordmark-light-bg.svg` — primary logo for light backgrounds (white/zinc-50 header)
- `wordmark/solvyn-wordmark-dark-bg.svg` — primary logo for dark backgrounds
- `icon/solvyn-icon-*.svg` — standalone mark, transparent, two colorways
- `icon/solvyn-icon-small-*.svg` — heavier-stroke variant for anything rendered under ~48px
- `png/favicon.ico` — drop in site root, reference as `<link rel="icon" href="/favicon.ico">`
- `png/solvyn-icon-*.png` — square app-icon tiles (16–512px) for social/PWA use

Usage rules:

- Minimum clear space around the logo: roughly the height of the icon mark, on all sides.
- Never place the dark-bg variant on a light surface or the light-bg variant on a dark surface — use the matching colorway.
- Don't recolor the mark outside the two provided colorways, and don't stretch or skew it.
- Minimum display height for the wordmark: ~24px. Below that, use the icon alone.

## Color system

Maps directly to Tailwind's default `zinc` (neutrals) and `teal` (accent) scales — implement with standard Tailwind utility classes.

| Token | Tailwind class | Hex | Role |
|---|---|---|---|
| Ink | `zinc-900` | `#18181B` | Primary text on light, primary background on dark |
| Paper | `zinc-50` | `#FAFAFA` | Primary background on light, primary text on dark |
| Surface (light) | `zinc-100` | `#F4F4F5` | Section backgrounds, cards on light mode |
| Surface (dark) | `zinc-800` | `#27272A` | Section backgrounds, cards on dark mode |
| Border (light) | `zinc-200` | `#E4E4E7` | Dividers, card borders on light mode |
| Border (dark) | `zinc-700` | `#3F3F46` | Dividers, card borders on dark mode |
| Muted text (light) | `zinc-500` | `#71717A` | Secondary text on light backgrounds |
| Muted text (dark) | `zinc-400` | `#A1A1AA` | Secondary text on dark backgrounds |
| Accent (dark backgrounds) | `teal-400` | `#2DD4BF` | Links, highlights, primary CTA on dark sections |
| Accent (light backgrounds) | `teal-600` | `#0D9488` | Links, highlights, primary CTA on light sections |

Use the accent color sparingly: for links, primary buttons, and small highlight details (the diamond in the logo is the only place it should feel "decorative"). It should not become a dominant fill color across large areas.

## Typography

- **Display / headings / UI labels**: Space Grotesk (the wordmark typeface), weights 500 and 700. Available via Google Fonts.
- **Body copy**: Inter, weights 400 and 500. Available via Google Fonts. Chosen to pair with Space Grotesk's geometric character while staying highly readable at body sizes.

Suggested type scale:

| Element | Font | Size | Weight |
|---|---|---|---|
| H1 / hero | Space Grotesk | 48–64px | 700 |
| H2 | Space Grotesk | 32–40px | 500 |
| H3 | Space Grotesk | 22–26px | 500 |
| Body | Inter | 16–18px | 400 |
| Small / labels | Inter | 13–14px | 500 |

## Layout and spacing

- Base spacing unit: 4px, scaling in multiples of 4/8 (8, 16, 24, 32, 48, 64, 96).
- Border radius: 6–8px on buttons, cards, and inputs. This is intentionally tighter than the soft 12–16px radius common in SaaS templates, to keep the "sharp" feel. The larger radius used on the app-icon tile (20%) is specific to that icon format and shouldn't be used elsewhere on the site.
- Max content width: ~1200px, centered, with generous side margins on larger viewports.
- No drop shadows on cards or buttons. Separation comes from borders, background contrast, or whitespace, not elevation effects.

## Components

- **Primary button**: solid fill using the accent color (teal-600 on light sections, teal-400 on dark sections), 6–8px radius, no shadow, white or zinc-900 text depending on contrast.
- **Secondary button**: outline style, 1px border in the border token for that mode, transparent background.
- **Cards**: surface background token, 1px border in the border token, 8px radius, no shadow.
- **Links**: accent color, no underline by default, underline on hover.

## Voice and content guidelines

These apply to all copy generated for the site:

- No em dashes.
- Avoid "X, Y, and Z" rule-of-three listing patterns; write in natural prose instead.
- Avoid buzzwords and generic consulting language: "leverage," "synergy," "seamless," "unlock," "revolutionize," "game-changer," "cutting-edge."
- Write like an experienced consultant talking directly to a business owner. Direct, plain, confident, not salesy.
- Where possible, ground claims in the brand story: clarity over fragmentation, ownership over hand-offs, honest scoping over overpromising.

## Asset manifest (from solvyn-logo-package.zip)

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
