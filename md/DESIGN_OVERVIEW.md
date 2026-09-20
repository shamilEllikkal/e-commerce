# KiddyWeb — Full Design & Architecture Overview
> **Purpose:** This document is the single source of truth for the KiddyWeb project. Any AI reading this file should be able to fully reconstruct the site in Next.js — matching every colour, spacing, interaction, component structure, and design decision — without seeing the original code.

---

## Table of Contents
1. [Project Identity](#1-project-identity)
2. [Tech Stack & Config](#2-tech-stack--config)
3. [Design System — Colour Tokens](#3-design-system--colour-tokens)
4. [Design System — Typography](#4-design-system--typography)
5. [Design System — Spacing & Layout](#5-design-system--spacing--layout)
6. [Design System — Shared CSS Patterns](#6-design-system--shared-css-patterns)
7. [Interaction & Hover System](#7-interaction--hover-system)
8. [Global CSS (`globals.css`)](#8-global-css-globalscss)
9. [Project File Structure](#9-project-file-structure)
10. [Page Structure (Home)](#10-page-structure-home)
11. [Layout Components](#11-layout-components)
12. [Home Section Components](#12-home-section-components)
13. [Product Components](#13-product-components)
14. [UI Primitive Components](#14-ui-primitive-components)
15. [Data Layer](#15-data-layer)
16. [TypeScript Types](#16-typescript-types)
17. [Utility Functions](#17-utility-functions)
18. [Assets & Images](#18-assets--images)
19. [Responsive Breakpoints](#19-responsive-breakpoints)
20. [Component Interaction Map](#20-component-interaction-map)
21. [AI Reconstruction Guide](#21-ai-reconstruction-guide)

---

## 1. Project Identity

| Property | Value |
|---|---|
| **Brand name** | Kiddy |
| **Tagline** | "Where Every Little One Finds Style" |
| **Niche** | Kids fashion & toy e-commerce |
| **Page title** | `Kiddy - Kids Fashion Store` |
| **Meta description** | `Shop playful kids fashion, toys, shoes, hats, and seasonal essentials from Kiddy.` |
| **Logo file** | `/public/logo.svg` (87 × 32px rendered) |
| **Favicon** | `/app/favicon.ico` |

---

## 2. Tech Stack & Config

### Core Dependencies
```json
{
  "next": "16.3.5",
  "react": "19.2.8",
  "react-dom": "19.2.8",
  "lucide-react": "^1.46.0"
}
```

### Dev Dependencies
```json
{
  "tailwindcss": "^4",
  "@tailwindcss/postcss": "^4",
  "typescript": "^5",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "eslint": "^9",
  "eslint-config-next": "16.3.5"
}
```

### Key Configuration Points
- **Next.js version:** 16.3.5 (App Router, not Pages Router)
- **CSS framework:** Tailwind CSS v4 (`@import "tailwindcss"`)
- **Path alias:** `@/*` maps to project root (`./`)
- **TypeScript strict mode:** ON
- **CSS variables are defined in `:root` and then bridged to Tailwind v4 via `@theme inline {}`**
- **Font loading:** `next/font/google` with `display: "swap"`, applied as CSS variables on `<html>`
- **`postcss.config.mjs`:** Uses `@tailwindcss/postcss`

### `tsconfig.json` paths
```json
"paths": { "@/*": ["./*"] }
```
This means imports like `@/components/ui/Brand` resolve from the project root.

---

## 3. Design System — Colour Tokens

All colours are defined as CSS custom properties in `:root` of `app/globals.css` and re-exported into Tailwind v4's `@theme inline` block so Tailwind utility classes like `bg-soft`, `text-body`, etc. work automatically.

### Primary Palette

| Token | CSS Variable | Hex Value | Usage |
|---|---|---|---|
| `primary` | `--primary-color` | `#212529` | Default text, brand mark border |
| `ink` | `--ink` | `#212529` | Same as primary — dark ink for headings, buttons, borders |
| `heading-color` | `--heading-color` | `#212529` | `<h1>`, `<h2>`, `<h3>` text |
| `secondary` | `--secondary-color` | `#576471` | Navigation links (default state), subtext |
| `body` | `--body` | `#4d6680` | Body paragraphs, footer text |
| `muted` | `--muted` | `#8d99a6` | Placeholder hints, disabled |
| `line` | `--line` | `#e7eaed` | Horizontal rules, card borders, dividers |
| `soft` | `--soft` | `#f7f8f9` | Light backgrounds (search bar, mobile menu search) |
| `accent` | `--accent` | `#c78d20` | Text selection highlight background |
| `white` | `--white` | `#ffffff` | — |

### Pastel Accent Swatches (used as card/section backgrounds)

| Token | CSS Variable | Hex Value | Used On |
|---|---|---|---|
| `lavender` | `--lavender` | `#f0eafd` | Hero right card, PromoCard (shoes) |
| `cream` | `--cream` | `#fff0c9` | — |
| `yellow` | `--yellow` | `#ffecbc` | Hero left card, PromoCard (hats), VoucherSection |
| `pink` | `--pink` | `#fcedf1` | — |
| `green` | `--green` | `#eaf8ef` | — |
| `cyan` | `--cyan` | `#e8f7f8` | — |
| `purple` | `--purple` | `#f0ebff` | — |

### Category Tone Map (TrustedCustomers section)

| Tone name | Exact hex | Category |
|---|---|---|
| `cream` | `#fff7e8` | Hats & Scarfs |
| `pink` | `#fff0f4` | Toys & Games |
| `green` | `#ecfaef` | Dresses & Suits |
| `blue` | `#eaf8f9` | Blouses & T-Shirts |
| `purple` | `#f1edff` | Shoes & Socks |

> **Note:** These tones are slightly different from the `:root` tokens above. They are hardcoded inline Tailwind classes (`bg-[#fff7e8]`) in the component.

### Accent / Interactive Colour
- **Default hover accent across the site:** `yellow-500` (Tailwind built-in, approximately `#EAB308`)
- Used consistently on: nav links, product names, category text, "Add to cart" links, subscribe button

### Product Badge Colour
- `#ffb935` — amber/orange background with white text, pill-shaped, shown as "Sale" badge on ProductCard

---

## 4. Design System — Typography

### Font Families

| Variable | Font | Loaded via | Usage |
|---|---|---|---|
| `--font-alexandria` | **Alexandria** (Google Fonts) | `next/font/google` | Primary font for all body text, headings, buttons, labels |
| `--font-manrope` | **Manrope** (Google Fonts) | `next/font/google` | Loaded as variable but the `@theme` uses Alexandria everywhere |

Both fonts are loaded with `subsets: ["latin"]` and `display: "swap"` and injected as CSS custom properties on the `<html>` element via `className`.

### Tailwind Theme Mapping
```css
@theme inline {
  --font-sans: var(--font-alexandria);
  --font-heading: var(--font-alexandria);
}
```

### Base Body Typography
```css
body {
  font-size: 16px;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
  color: var(--primary-color);  /* #212529 */
  font-family: var(--font-alexandria), sans-serif;
}
```

### Heading Sizes & Styles

| Element | Font size | Weight | Tracking | Line-height | Notes |
|---|---|---|---|---|---|
| `<h1>` (Hero) | `20px` mobile → `76px` md → `90px` lg | `800` (font-bold in context) | `-3px` mob, `-5px` lg | `1.06` | Multiline, stacked word layout |
| `<h2>` (Featured Products) | `42px` → `clamp(42px,4vw,62px)` lg | `700` (font-bold) | `-2.5px` | `1.1` | — |
| `<h2>` (Trusted Customers) | `34px` → `42px` md | `600` (font-semibold) | `-2.5px` | `1.1` | Centered |
| `<h2>` (VoucherSection) | `35px` → `40px` lg | `600` | `-2.5px` | `1.1` | — |
| `<h3>` (Benefits) | `17px` | `600` | — | — | On dark background |
| `<h3>` (ProductCard name) | `18px` | `600` | — | — | Centered |
| `<h4>` (Footer group titles) | `18px` | `600` | — | — | — |

### Navigation & Button Text

| Context | Size | Weight | Case |
|---|---|---|---|
| Main nav links | `12px` | `500` (medium) | UPPERCASE |
| Utility nav links (Login, Compare, etc.) | `12px` | `500` | UPPERCASE |
| Mobile nav links | `13px` | `700` (bold) | UPPERCASE |
| ButtonLink | `14px` | `800` (extrabold) | Mixed case |
| Product badge | `13px` | `800` | UPPERCASE |
| Logo text (if shown) | `21px` | `800`, tracking `-0.5px` | Mixed |

---

## 5. Design System — Spacing & Layout

### Container System
```css
:root {
  --container: 1660px;        /* Max content width */
  --page-gutter: 115.4px;     /* Horizontal padding on large screens */
}

.container {
  width: min(calc(100% - (var(--page-gutter) * 2)), var(--container));
  margin-inline: auto;
}

/* Tablet (≤1200px) */
@media (max-width: 1200px) {
  .container { width: min(calc(100% - 40px), var(--container)); }
}

/* Mobile (≤760px) */
@media (max-width: 760px) {
  .container { width: min(calc(100% - 28px), var(--container)); }
}
```

### Section Vertical Spacing

| Section | Bottom margin |
|---|---|
| PromoGrid | `mb-[100px]` |
| LogoStrip | `mb-[90px]` |
| FeaturedProducts | `mb-[120px]` |
| TrustedCustomers | `mb-[110px]` |
| VoucherSection | `mb-[90px]` |
| Benefits | `mb-[85px]` |
| Footer | `pb-[35px]` |

### Border Radius System

| Use | Radius |
|---|---|
| Section cards (PromoGrid, LogoStrip, VoucherSection, Benefits) | `rounded-[25px]` |
| ProductCard | `rounded-2xl` (16px) |
| ProductCard name badge | `rounded` (4px) |
| ButtonLink | `rounded-[10px]` |
| Search bar (desktop) | `rounded-[11px]` |
| SubscribeForm | `rounded-[14px]` |
| Mobile menu container | `rounded-2xl` |
| Mobile menu search | `rounded-[10px]` |
| Mobile menu nav links | `rounded-xl` |
| PhonePill | `rounded-full` |
| Product action buttons | `rounded-full` |
| Category pills (TrustedCustomers) | `rounded-full` |

---

## 6. Design System — Shared CSS Patterns

### Selection Highlight
```css
::selection {
  background: var(--accent);   /* #c78d20 */
  color: #ffffff;
}
```

### Link Reset
```css
a { color: inherit; text-decoration: none; }
```

### Global Box Sizing
```css
* { box-sizing: border-box; }
```

### Smooth Scroll
```css
html { scroll-behavior: smooth; }
```

### Image Block Display
```css
img { display: block; max-width: 100%; }
```

### Brand Mark (circular badge with emoji)
```css
.brand-mark {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border: 3px solid var(--ink);
  border-radius: 50%;
  font-size: 22px;
  line-height: 1;
}
```

---

## 7. Interaction & Hover System

This section documents every hover/interactive state in the site. Reproducing these exactly is critical.

### Navigation Links
| Element | Default state | Hover / Active state |
|---|---|---|
| Main nav link | `text-secondary` (`#576471`), no underline bar | `text-ink`, bottom 1px `bg-ink` bar appears (via `::after` pseudo-element, `opacity-100`) |
| Active nav link | `text-ink`, bottom bar `opacity-100` | Same (already active) |
| Utility nav link (Login, Wishlist, etc.) | `text-secondary`, `12px uppercase` | `text-yellow-500!` (Tailwind important modifier) |
| Shop dropdown item | `text-secondary`, `bg-white` | `hover:bg-gray-50 hover:text-yellow-500!` |
| Footer link | `text-[#263b50]` | Inherits (no specific hover defined) |

### Navigation Active Underline — Implementation Detail
The active bottom border is done via Tailwind's `after:` prefix, **not** a separate element:
```
after:absolute after:bottom-0 after:left-0 after:right-0
after:h-px after:bg-ink
after:transition-opacity after:duration-200
active → after:opacity-100
inactive → after:opacity-0 hover:after:opacity-100
```

### Shop Dropdown Menu
- Triggered by CSS `group`/`group-hover` — **no JavaScript**
- Default: `invisible opacity-0 translate-y-2`
- On `group-hover`: `visible opacity-100 translate-y-0`
- Transition: `duration-200` on all: visibility, opacity, translate
- Dropdown width: `w-48` (192px)
- Positioned: `absolute left-0 top-full z-50`
- Background: `bg-white`, `rounded-lg`, `shadow-lg`, `py-2`

### ButtonLink Hover
All ButtonLinks share: `hover:-translate-y-0.5 hover:shadow-sm` (subtle lift on hover)
Context-specific overrides:
| Button | Extra hover |
|---|---|
| Hero "Explore Collection" (dark variant) | `hover:bg-yellow-500 hover:border-0 hover:text-primary!` |
| Hero "Promo Video" (outline) | `hover:bg-yellow-500 hover:border-0` |
| PromoGrid "VIEW OFFER" large | `hover:bg-yellow-500 hover:border-0 hover:text-primary!` |
| PromoGrid small cards "VIEW OFFER" | No extra (white variant with gray border) |
| FeaturedProducts "View All" | `hover:bg-yellow-500` |

### Product Card Image Hover
```
group-hover:scale-110
transition-transform duration-500
```
Image zooms in on card hover (entire card is the group).

### PromoGrid Large Card Hover
```
group-hover:scale-105
transition-transform duration-300
```
Background image scales gently.

### PromoGrid Small Card Image Hover
```
group-hover:scale-110
transition-transform duration-500
```
Product image inside the small card scales.

### ProductCard Actions (Wishlist, Compare, Eye)
- Default: `bg-[#f4f6f8] text-[#5a6c7d]` (light grey circle)
- Hover: `hover:bg-ink hover:text-white`
- Active/Pressed: `bg-ink text-white` (stays toggled)
- These are **client-side toggle buttons** using React `useState`, not links

### ProductCard Text Hover
- Product name `<h3>`: `hover:text-yellow-500` (direct on element)
- Category text `<p>`: `hover:text-yellow-500`
- "Add to cart" link: `hover:text-yellow-500!`

### PhonePill Hover
```
hover:bg-gray-200 transition-colors duration-200
```

### Subscribe Button Hover
```
hover:bg-yellow-500 hover:text-primary
```
Background changes from `bg-ink` to yellow; text changes from white to primary ink.

### Category Pills (TrustedCustomers) — No explicit hover defined
These are `<Link>` elements styled as pills. Only the base style is defined; hover is inherited (cursor pointer from browser).

---

## 8. Global CSS (`globals.css`)

```css
@import "tailwindcss";

:root {
  --primary-color: #212529;
  --ink: #212529;
  --heading-color: #212529;
  --heading-weight: 800;
  --secondary-color: #576471;
  --secondary-size: 12px;
  --secondary-padding-y: 0px;
  --secondary-padding-x: 17.5px;
  --body: #4d6680;
  --muted: #8d99a6;
  --line: #e7eaed;
  --soft: #f7f8f9;
  --white: #ffffff;
  --lavender: #f0eafd;
  --cream: #fff0c9;
  --yellow: #ffecbc;
  --pink: #fcedf1;
  --green: #eaf8ef;
  --cyan: #e8f7f8;
  --purple: #f0ebff;
  --accent: #c78d20;
  --container: 1660px;
  --page-gutter: 115.4px;
}

@theme inline {
  --color-primary: var(--primary-color);
  --color-ink: var(--ink);
  --color-secondary: var(--secondary-color);
  --color-body: var(--body);
  --color-muted: var(--muted);
  --color-line: var(--line);
  --color-soft: var(--soft);
  --color-lavender: var(--lavender);
  --color-cream: var(--cream);
  --color-yellow: var(--yellow);
  --color-pink: var(--pink);
  --color-green: var(--green);
  --color-cyan: var(--cyan);
  --color-purple: var(--purple);
  --font-sans: var(--font-alexandria);
  --font-heading: var(--font-alexandria);
}
```

---

## 9. Project File Structure

```
kiddyweb/
├── app/
│   ├── favicon.ico
│   ├── globals.css           ← Design tokens, base styles
│   ├── layout.tsx            ← Root layout: loads fonts, wraps with Header + Footer
│   └── page.tsx              ← Home page: composes section components
├── components/
│   ├── home/
│   │   ├── Benefits.tsx      ← Dark strip: 4 benefit icons + text
│   │   ├── FeaturedProducts.tsx  ← Section header + ProductGrid
│   │   ├── Hero.tsx          ← H1 + CTA buttons + image cards + DiscountBadge
│   │   ├── LogoStrip.tsx     ← Dark strip: brand logos
│   │   ├── PromoGrid.tsx     ← Large + 2 small promo cards
│   │   ├── TrustedCustomers.tsx  ← Stacked avatars + category pills
│   │   └── VoucherSection.tsx    ← Subscribe CTA with image
│   ├── layout/
│   │   ├── Footer.tsx        ← Brand + blurb + 4-column links + copyright
│   │   ├── Header.tsx        ← Top bar (brand, search, phone) + nav bar
│   │   ├── MainNavigation.tsx    ← Desktop nav with active state + Shop dropdown
│   │   └── MobileMenu.tsx    ← Hamburger toggle, mobile search, mobile nav
│   ├── products/
│   │   ├── ProductActions.tsx    ← Wishlist/Compare/Eye toggle buttons
│   │   ├── ProductCard.tsx   ← Full product card article
│   │   ├── ProductGrid.tsx   ← CSS grid wrapper for ProductCard array
│   │   └── ProductPrice.tsx  ← Price + optional strikethrough old price
│   └── ui/
│       ├── Brand.tsx         ← Logo image link
│       ├── ButtonLink.tsx    ← Reusable button-styled Next.js Link
│       ├── PhonePill.tsx     ← Pill-shaped phone number link
│       └── SubscribeForm.tsx ← Email subscribe form with client state
├── data/
│   ├── categories.ts         ← 5 category objects
│   └── products.ts           ← 8 product objects
├── lib/
│   └── format.ts             ← formatPrice() using Intl.NumberFormat
├── types/
│   └── product.ts            ← Product + Category TypeScript interfaces
├── public/
│   ├── logo.svg
│   └── web1.webp … web19.webp
├── next.config.ts
├── tsconfig.json
├── package.json
└── postcss.config.mjs
```

---

## 10. Page Structure (Home)

The home page (`app/page.tsx`) is a pure server component that renders sections in this exact vertical order:

```
<main>
  1. <Hero />           ← Full-width 2-col grid: text left, image cards right
  2. <PromoGrid />      ← 2-col grid: 1 large card + 2 stacked small cards
  3. <LogoStrip />      ← Dark pill with 4 text logos
  4. <FeaturedProducts /> ← 4-col product grid with section header
  5. <TrustedCustomers /> ← Customer avatars + category pills
  6. <VoucherSection /> ← Yellow section with subscribe form
  7. <Benefits />       ← Dark strip with 4 icon+text benefits
</main>
```

The `<Header />` and `<Footer />` are rendered from `app/layout.tsx`, wrapping all page content.

---

## 11. Layout Components

### `Header.tsx`

The header is a `<header>` element with `bg-white` and `relative` positioning (needed for mobile menu absolute positioning).

**Structure (two rows):**

**Row 1 — Top bar** (`min-h-18` mobile, `min-h-26` lg):
- `flex items-center justify-between gap-4`
- Left: `<Brand />` (logo image link)
- Center (desktop only `hidden lg:grid`): Search bar — `h-12.5 w-145`, `grid-cols-[1fr_auto_55px]`, `bg-[#F9FAFB]`, `rounded-[11px]`
  - `<input>` — placeholder "What are you looking for?", `text-[18px] font-normal`
  - `<select>` — category dropdown, `text-[13px] font-light`; options: Select Category, Toys & Games, Dresses, Hats & Scarfs, Shoes & socks, Sweaters, T-shirts
  - `<button>` — Search icon (`lucide Search`, size 19)
- Right desktop (`hidden lg:block`): `<PhonePill />`
- Right mobile (`lg:hidden`): `<MobileMenu />` hamburger button

**Row 2 — Navigation bar** (`hidden lg:flex`, `min-h-[72px]`, `border-b border-line`, `text-[#576471]`):
- `flex items-end justify-between`
- Left: `<MainNavigation />` — 5 links
- Right: utility nav — 4 links (Login, Compare, Wishlist, $0.00) each `h-[72px] items-center gap-6` with `lucide` icon + label, `12px uppercase`

**Utility nav links data:**
```ts
[
  { label: "Login",   href: "/login",   icon: UserRound },
  { label: "Compare", href: "/compare", icon: Shuffle },
  { label: "Wishlist",href: "/wishlist",icon: Heart },
  { label: "$0.00",   href: "/cart",    icon: ShoppingBag },
]
```

---

### `MainNavigation.tsx`
- `"use client"` — uses `usePathname()` for active state
- Nav height: `h-[72px]`
- Gap between items: `gap-6`
- Active detection:
  - Home (`"/"`) → exact match `pathname === "/"`
  - Others → `pathname.startsWith(link.href)`
- Links:
  ```ts
  [
    { label: "Home",       href: "/" },
    { label: "Shop",       href: "/shop", hasMenu: true },
    { label: "News",       href: "/news" },
    { label: "About Us",   href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ]
  ```
- Active link class: `text-ink after:opacity-100`
- Inactive link class: `text-secondary after:opacity-0 hover:text-ink! hover:after:opacity-100`

**Shop dropdown** (CSS-only, group-hover):
- Items: Variable Product (`/shop/variable-product`), Product Gallery (`/shop/product-gallery`), Custom Tab (`/shop/custom-tab`), Advanced Reviews (`/shop/advanced-reviews`)
- Each item: `block px-5 py-3 text-sm text-secondary hover:bg-gray-50 hover:text-yellow-500!`

---

### `MobileMenu.tsx`
- `"use client"` — `useState(false)` for `open`
- Toggle button: `h-11 w-11 rounded-full border border-line bg-white`, shows `<Menu>` or `<X>` lucide icon
- Open panel: `absolute inset-x-3 top-[86px] z-20 rounded-2xl border border-line bg-white p-4 shadow-xl`
- Search row: `grid h-12 grid-cols-[1fr_44px] rounded-[10px] bg-soft`
- Nav links: uppercase, `13px bold`, `rounded-xl px-3 py-3`
- Bottom 2-column grid: Login link + Cart link, both `bg-soft rounded-xl px-3 py-3`

---

### `Footer.tsx`

**Four sections:**

**Section 1 — Brand row** (`flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-line pb-12 lg:pb-[75px]`):
- Left: `<Brand />` + `<p>` blurb (`text-[17px] text-body max-w-[750px] mt-[30px]`)
- Right: `<PhonePill />`

**Section 2 — 4-column links** (`grid grid-cols-2 md:grid-cols-4 gap-x-5 md:gap-[50px] py-12 md:py-[70px] border-b border-line`):
```ts
// Each array: [GroupTitle, ...links]
["Shop", "Dresses & Suits", "Shoes & Socks", "Blouses & T-Shirts", "Toys & Games", "Caps & Accessories"],
["Company", "About Us", "FAQ", "Our News", "Our Story", "Contact Us"],
["Useful", "Site Map", "Affiliate Area", "Delivery", "Locations", "Collaboration"],
["Legal", "Shipping Policy", "Returns & Exchanges", "Terms of Use", "Privacy Policy", "Cookies Policy"],
```
- Title: `<h4>` `text-[18px] font-semibold mb-5`
- Link: `block w-max mb-2 text-[#263b50]`
- Special: "Returns & Exchanges" renders with `text-[var(--accent)]` (#c78d20)
- Link href: auto-generated from label by lowercasing + replacing ` & ` → `-` and ` ` → `-`

**Section 3 — Copyright row** (`flex flex-col md:flex-row min-h-20 items-start md:items-center justify-center md:justify-between gap-5 text-body pt-6 md:pt-0`):
- Left: `Copyright © 2026 - WordPress Theme by CreativeThemes`
- Right: 5 social icons from lucide: `Circle, Mail, Heart, Music2, Phone` (size 18, `font-medium text-ink`)

---

## 12. Home Section Components

### `Hero.tsx`

**Layout:** `container grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-[35px] lg:gap-[50px] min-h-[700px] py-[55px] lg:py-[85px_80px] items-center`

**Left column — Text:**
- `<h1>` "Where / Every Little / One Finds / Style" — multiline with `<br />` tags
  - Size: `20px` mob → `76px` md → `90px` lg
  - Weight: bold, tracking `-3px` mob / `-5px` lg, line-height `1.06`
- `<p>` — subtitle, `text-[16px] lg:text-[18px] leading-[1.7] text-secondary max-w-[620px] mb-[42px]`
- CTA row (`flex flex-wrap gap-7`):
  - "Explore Collection" — `ButtonLink` `variant="dark"`, extra: `text-white! font-medium hover:bg-yellow-500 hover:border-0 hover:text-primary! px-6`, icon: `ArrowUpRight size=18`
  - "Promo Video" — `ButtonLink` `variant="outline"` (default), extra: `font-medium hover:bg-yellow-500 hover:border-0`, icon: `Play size=18`

**Right column — Image cards:** `relative w-full h-full flex justify-between gap-8 pb-20`
- `<DiscountBadge>` — centred absolutely, `left-1/2 -translate-x-1/2 top-[45px] md:top-[20px]`, `h-[135px] w-[135px] md:h-48 md:w-48`
- Left card: `bg-yellow rounded-2xl w-full mt-15` — contains `web1.webp` (233×405)
- Right column (flex-col, gap-8):
  - Top card: `bg-lavender rounded-2xl h-full` — contains `web2.webp` (233×405)
  - Bottom: `<SubscribeForm variant="mini" placeholder="Email address" />`

**DiscountBadge SVG:**
- Custom-drawn burst/starburst shape via `buildBurstPath()` helper function (pure math, no library)
- Outer burst: `outerR=102, innerR=82, radius=8`, gradient fill: `#DCCEEB → #E2D0C9 → #EBD39A` (top-to-bottom)
- Inner burst: `outerR=87, innerR=68, radius=7`, white fill
- Text overlay: `30%` (font-extrabold `31px` mob / `44px` desktop) + `OFF` (`16px` mob / `22px` desktop)
- `viewBox="0 0 200 200"`

---

### `PromoGrid.tsx`

**Layout:** `container mb-[100px] grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] gap-7`

**Large card (left):**
- `article` with `relative min-h-[450px] lg:min-h-[590px] overflow-hidden rounded-[25px] bg-[#dcefe9] group`
- `Image` fill mode, `object-cover`, `group-hover:scale-105 transition-transform duration-300`
- Gradient overlay: `absolute inset-0 bg-gradient-to-t from-black/40 to-transparent to-60%`
- Text: `absolute bottom-10 left-[45px] text-white`
  - Label: `text-[15px] font-bold` — "NEW TOYS COLLECTION"
  - Discount: `text-[60px] font-extrabold leading-[0.95]` — "20 %OFF" (with `<small>` for "% OFF")
  - Button: `ButtonLink variant="white"`, `min-h-[58px] text-primary! font-medium hover:bg-yellow-500 hover:border-0 px-3`
- Image: `/web3.webp`

**Right column (2 stacked small PromoCards):**

`PromoCard` component props: `title, discount, image, alt, tone`

Card 1 (Shoes):
- `title="NEW SHOES COLLECTION"`, `discount="10"`, `image="/web4.webp"`, `tone="bg-lavender"`

Card 2 (Hats):
- `title="NEW HATS COLLECTION"`, `discount="12"`, `image="/web5.webp"`, `tone="bg-yellow"`

**PromoCard layout:** `flex items-center justify-between min-h-[250px] md:min-h-[280px] p-7 md:p-11 rounded-[25px] overflow-hidden group`
- Left: text block
  - Title: `text-[15px] font-medium`
  - Discount: `text-[55px] font-medium leading-[0.95]` + `<small>` for "%OFF"
  - Button: `ButtonLink variant="white"`, border gray, `min-h-[58px] px-6`
- Right: image `relative h-[120px] w-[43%] group-hover:scale-110 transition-transform duration-500`

---

### `LogoStrip.tsx`

`container mb-[90px] flex flex-wrap items-center justify-center lg:justify-around gap-10 min-h-[140px] rounded-[25px] bg-ink px-[50px] py-[25px] text-white`

Four text logos: `"✦ Logoipsum"`, `"LOCO°"`, `"◎ Logoipsum"`, `"▣ LOCO"` — each `text-[24px] font-extrabold`

---

### `FeaturedProducts.tsx`

`container mb-[120px]`

**Header row:** `flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mb-[45px]`
- `<h2>` "Featured Products" — `text-[42px] lg:text-[clamp(42px,4vw,62px)] font-bold leading-[1.1] tracking-[-2.5px]`
- `ButtonLink` "View All Products ↗" — `min-h-[58px] font-medium hover:bg-yellow-500`

**Grid:** `<ProductGrid products={products} />` (8 products)

---

### `TrustedCustomers.tsx`

`container mb-[110px] text-center`

**Avatar row:** `flex justify-center mb-[25px]`
- 4 circular avatars from `/web16.webp` to `/web19.webp`
- Size: `h-[72px] w-[72px]`, `rounded-full`, `border-[3px] border-white`, `object-cover`
- Overlap effect: `-ml-[9px]` (negative margin), `first:ml-0`

**Heading:** `<h2>` "Trusted by over 10K+ customers" — `text-[34px] md:text-[42px] font-semibold leading-[1.1] tracking-[-2.5px] mb-[55px]`

**Category pills:** `mx-auto flex flex-wrap justify-center max-w-[1250px] gap-x-[22px] gap-y-[25px]`

Each pill (`<Link>`): `grid grid-cols-[58px_1fr_60px] items-center min-h-[125px] rounded-full py-[18px] pr-[22px] pl-[38px] text-left md:min-w-[390px] md:w-auto`
- Column 1: Lucide icon, `size=35`
- Column 2: `<span>` label, `text-[18px] uppercase font-semibold leading-[1.45] whitespace-pre-line`
- Column 3: white circle `h-[60px] w-[60px] rounded-full bg-white grid place-items-center` with `ArrowRight size=24`

**Category data:**
```ts
{ id: "hats",    label: "Hats &\nScarfs",       icon: Crown,     tone: "cream" → bg-[#fff7e8] }
{ id: "toys",    label: "Toys &\nGames",         icon: Gamepad2,  tone: "pink"  → bg-[#fff0f4] }
{ id: "dresses", label: "Dresses &\nSuits",      icon: Sparkles,  tone: "green" → bg-[#ecfaef] }
{ id: "shirts",  label: "Blouses &\nT-Shirts",   icon: Shirt,     tone: "blue"  → bg-[#eaf8f9] }
{ id: "shoes",   label: "Shoes &\nSocks",        icon: Footprints,tone: "purple"→ bg-[#f1edff] }
```

---

### `VoucherSection.tsx`

`container mb-[90px] grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] items-center overflow-hidden rounded-[25px] bg-yellow`

**Left column:** `relative h-[380px] lg:h-[500px] mx-auto w-[90%] lg:w-[80%] self-end`
- `Image` `/web15.webp` fill, `object-contain object-bottom`

**Right column:** `px-[25px] pb-[45px] lg:py-[50px] lg:pr-20 lg:pl-0`
- `<h2>` "Get Voucher" — `text-[35px] lg:text-[40px] font-semibold leading-[1.1] tracking-[-2.5px]`
- `<p>` — "Subscribe Today and Unlock Up to **20% OFF** Your Next Purchase!" — `text-[20px] my-[22px] max-w-[680px]`
- `<SubscribeForm variant="large" placeholder="Your email address" />`

---

### `Benefits.tsx`

`container mb-[85px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[35px] min-h-[180px] rounded-[25px] bg-ink p-[30px] md:p-[42px] text-white`

4 benefit items, each: `grid grid-cols-[50px_1fr] gap-[15px]`
- Icon: lucide, `size=35 strokeWidth=1.5`
- Text: `<h3>` (`text-[17px] font-semibold mb-2`) + `<p>` (`text-[14px] leading-[1.65] text-[#d1d8df] m-0`)

```ts
{ title: "Secure Payments", icon: CreditCard,      body: "Tellus gravida ipsum at facilisis tempus at aliquam estsem." }
{ title: "Free Shipping",   icon: Truck,           body: "Non pulvinar aenean ultrices lectus vitae imperdiet aeu." }
{ title: "24/7 Support",    icon: MessagesSquare,  body: "Nullam iaculis vestibulum arcu id urnain pellentesque quis." }
{ title: "Gifts & Sales",   icon: Gift,            body: "Aliquet ullamcorper leo mi vel sit pretium euismod eget libero." }
```

---

## 13. Product Components

### `ProductGrid.tsx`
Pure layout wrapper:
```
grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[30px]
```

### `ProductCard.tsx`
`article overflow-hidden rounded-2xl border border-[#e6e9ec] bg-white group`

**Image area:** `relative h-[360px] md:h-[430px] p-[35px] grid place-items-center`
- Optional badge: `absolute top-[18px] left-[18px] rounded bg-[#ffb935] px-[13px] py-[7px] text-[13px] font-extrabold uppercase text-white`
- `Image` — fill, `p-[35px] object-contain group-hover:scale-110 transition-transform duration-500`
- `<ProductActions />` — top-right absolute overlay

**Info area:** `border-t border-[#f0f1f3] px-[15px] py-[24px_27px] text-center`
- `<h3>` name — `text-[18px] font-semibold mb-[3px] hover:text-yellow-500`
- `<p>` category — `text-[12px] uppercase text-[#a0aab4] hover:text-yellow-500 m-0`

**Footer area:** `grid grid-cols-2 items-center min-h-[65px] border-t border-[#eceff1]`
- Left: `<ProductPrice />` (with right border `border-r border-[#eceff1]`)
- Right: "Add to cart" link — `grid h-full place-items-center font-medium text-[15px] text-secondary! hover:text-yellow-500!`

### `ProductActions.tsx`
`"use client"` component — top-right absolute: `absolute top-[18px] right-[18px] grid gap-2.5`

3 icon buttons (Heart, Shuffle, Eye) — toggle on click:
- Default: `bg-[#f4f6f8] text-[#5a6c7d]`
- Active: `bg-ink text-white`
- Hover (inactive): `hover:bg-ink hover:text-white`
- All: `h-[38px] w-[38px] rounded-full grid place-items-center transition`
- Icon: `size=18 strokeWidth=1.7`

### `ProductPrice.tsx`
`<strong>` with `grid h-full place-items-center border-r border-[#eceff1] font-medium text-[15px] text-[#52687e]`
- Current price via `formatPrice(price)` — USD format e.g. `$35.00`
- Optional `<del>` old price — `ml-1.5 text-[12px] text-[#aeb6bd]`

---

## 14. UI Primitive Components

### `Brand.tsx`
`<Link href="/">` wrapping `<Image src="/logo.svg" width=82 height=32 className="h-auto w-[87px]" />`
- Link: `inline-flex w-max items-center gap-3 text-[21px] font-extrabold tracking-[-0.5px]`

### `ButtonLink.tsx`
Props: `href`, `children`, `variant?: "dark" | "outline" | "white"` (default: `"outline"`), `className?`

Variant base classes:
```
dark:    border-ink bg-ink text-white
outline: border-[#dfe4e8] bg-white text-ink
white:   border-white bg-white text-ink
```

All variants share: `inline-flex min-h-[62px] items-center justify-center gap-[15px] rounded-[10px] border px-[30px] text-[14px] font-extrabold transition hover:-translate-y-0.5 hover:shadow-sm`

### `PhonePill.tsx`
`<a href="tel:+73099321312">` — pill shape:
`inline-flex items-center gap-2.5 rounded-full border border-[#dce1e5] py-[7px] pr-4 pl-2 text-[13px] hover:bg-gray-200 transition-colors duration-200`

Left icon circle: `grid h-8 w-8 place-items-center rounded-full bg-ink text-white`
- `Phone` lucide icon, `size=17 strokeWidth=1.8`

Phone number text: `+73 099 321 312`

### `SubscribeForm.tsx`
`"use client"` — `useState(false)` for `sent` state

Props: `variant: "mini" | "large"`, `placeholder: string`

Form: `grid grid-cols-[1fr_auto] bg-white`
- Large: `h-[75px] rounded-[14px] p-2`
- Mini: `h-[67px] rounded-[14px] border border-[#e0e4e8] p-[7px]`

Input: `min-w-0 border-0 bg-transparent px-[18px] text-ink outline-0 placeholder:text-[#a5afb9]`
- When `sent=true`: placeholder changes to "Thanks for subscribing"

Button: `rounded-[10px] bg-ink px-[22px] font-extrabold text-white hover:bg-yellow-500 hover:text-primary`

---

## 15. Data Layer

### `data/products.ts` — 8 products

| id | name | category | price | oldPrice | badge | image |
|---|---|---|---|---|---|---|
| fames-primis | Fames Primis | Sweaters | $35 | — | — | web6.webp |
| justo-finibus | Justo Finibus | Dresses | $35 | — | — | web7.webp |
| montes-dictum | Montes Dictum | Hats & Scarfs | $15 | $20 | **Sale** | web8.webp |
| morbi-dapibus | Morbi Dapibus | Shoes & Socks | $45 | — | — | web9.webp |
| porta-primis | Porta Primis | Toys & Games | $18 | — | — | web10.webp |
| quam-venenatis | Quam Venenatis | T-Shirts | $25 | — | — | web11.webp |
| tellus-conubia | Tellus Conubia | Toys & Games | $20 | — | — | web12.webp |
| velit-eleifend | Velit Eleifend | Toys & Games | $15 | — | — | web13.webp |

### `data/categories.ts` — 5 categories

| id | label | icon | tone |
|---|---|---|---|
| hats | "Hats &\nScarfs" | hat (Crown) | cream |
| toys | "Toys &\nGames" | toy (Gamepad2) | pink |
| dresses | "Dresses &\nSuits" | dress (Sparkles) | green |
| shirts | "Blouses &\nT-Shirts" | shirt (Shirt) | blue |
| shoes | "Shoes &\nSocks" | shoes (Footprints) | purple |

---

## 16. TypeScript Types

### `types/product.ts`
```typescript
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;    // optional — shows strikethrough if present
  image: string;        // path relative to /public
  alt: string;
  badge?: string;       // optional — "Sale" shows amber badge on card
}

export interface Category {
  id: string;
  label: string;
  icon: "hat" | "toy" | "dress" | "shirt" | "shoes";
  tone: "cream" | "pink" | "green" | "blue" | "purple";
}
```

---

## 17. Utility Functions

### `lib/format.ts`
```typescript
export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}
// formatPrice(35) → "$35.00"
// formatPrice(15) → "$15.00"
```

---

## 18. Assets & Images

All images are in `/public/`. Format: `.webp`.

| File | Used In | Role |
|---|---|---|
| `logo.svg` | Brand component | Site logo (87×32px) |
| `web1.webp` | Hero | Child in yellow outfit (left card) |
| `web2.webp` | Hero | Child in lavender outfit (right card) |
| `web3.webp` | PromoGrid (large) | Toys promo background image |
| `web4.webp` | PromoGrid (small 1) | Shoes product image |
| `web5.webp` | PromoGrid (small 2) | Hat product image |
| `web6.webp` | ProductCard | Sweater |
| `web7.webp` | ProductCard | Dress |
| `web8.webp` | ProductCard | Scarf (Sale badge) |
| `web9.webp` | ProductCard | Shoes |
| `web10.webp` | ProductCard | Teddy bear |
| `web11.webp` | ProductCard | T-shirt |
| `web12.webp` | ProductCard | Soft toy |
| `web13.webp` | ProductCard | Wooden horse toy |
| `web15.webp` | VoucherSection | Child in winter clothes |
| `web16.webp` | TrustedCustomers | Avatar 1 |
| `web17.webp` | TrustedCustomers | Avatar 2 |
| `web18.webp` | TrustedCustomers | Avatar 3 |
| `web19.webp` | TrustedCustomers | Avatar 4 |

> Note: `web14.webp` is absent/unused.

---

## 19. Responsive Breakpoints

Tailwind default breakpoints used:
| Prefix | Min-width | Usage |
|---|---|---|
| `md:` | 768px | 2-col grids, footer row, avatar row changes |
| `lg:` | 1024px | Desktop layout activates (header nav, hero 2-col, promo 2-col) |
| `xl:` | 1280px | 4-col product grid, 4-col benefits |

Custom CSS breakpoints (in globals.css only for container):
| Breakpoint | Width |
|---|---|
| `≤ 1200px` | `calc(100% - 40px)` |
| `≤ 760px` | `calc(100% - 28px)` |

**Mobile (`< lg`) behaviour:**
- Header: shows Brand + MobileMenu hamburger button only
- Search bar: hidden (appears in mobile menu when open)
- Nav bar row: completely hidden
- Hero: single column (text stacked above image area)
- PromoGrid: single column
- FeaturedProducts header: stacks vertically
- Category pills: wrap and shrink
- Benefits: 1 col → 2 col (md) → 4 col (xl)
- Footer columns: 2 col → 4 col (md)

---

## 20. Component Interaction Map

```
app/layout.tsx
├── Header
│   ├── Brand (logo)
│   ├── Search bar (desktop inline)
│   ├── PhonePill (desktop)
│   ├── MobileMenu (mobile, client)
│   │   └── SubscribeForm (inside mobile search — NO, mobile has its own input)
│   ├── MainNavigation (desktop, client)
│   │   └── Shop dropdown (CSS group-hover)
│   └── Utility links (Login, Compare, Wishlist, Cart)
│
├── page.tsx (Home)
│   ├── Hero
│   │   ├── ButtonLink × 2
│   │   ├── DiscountBadge (SVG, internal)
│   │   └── SubscribeForm (mini variant, client)
│   ├── PromoGrid
│   │   ├── ButtonLink (large card)
│   │   └── PromoCard × 2 (each with ButtonLink)
│   ├── LogoStrip (static)
│   ├── FeaturedProducts
│   │   ├── ButtonLink
│   │   └── ProductGrid
│   │       └── ProductCard × 8
│   │           ├── ProductActions (client, toggles)
│   │           └── ProductPrice
│   ├── TrustedCustomers
│   │   └── Category Link × 5
│   ├── VoucherSection
│   │   └── SubscribeForm (large variant, client)
│   └── Benefits (static)
│
└── Footer
    ├── Brand
    ├── PhonePill
    ├── Link groups × 4
    └── Social icon links × 5
```

---

## 21. AI Reconstruction Guide

If you are an AI given an HTML file and asked to convert it to this Next.js codebase, follow these rules:

### Step 1 — Project Setup
1. Create Next.js 16 app with TypeScript and Tailwind CSS v4
2. Install: `lucide-react`
3. Set path alias `@/*` → `./` in `tsconfig.json`
4. Configure `postcss.config.mjs` with `@tailwindcss/postcss`

### Step 2 — globals.css
Copy the exact `:root` and `@theme inline` blocks from Section 8 of this document verbatim. Do not change any hex values.

### Step 3 — Fonts
Load `Alexandria` (primary) and `Manrope` (secondary) from `next/font/google`. Apply both as CSS variables on `<html>`. Map `--font-sans` and `--font-heading` to `var(--font-alexandria)` in `@theme inline`.

### Step 4 — Types & Data
Create `types/product.ts`, `data/products.ts`, `data/categories.ts`, and `lib/format.ts` exactly as documented in Sections 15–17.

### Step 5 — UI Primitives
Build `Brand`, `ButtonLink`, `PhonePill`, `SubscribeForm` in `components/ui/`. `ButtonLink` and `PhonePill` are server components; `SubscribeForm` is a client component.

### Step 6 — Layout Shell
Build `Header`, `MainNavigation`, `MobileMenu`, `Footer` in `components/layout/`. `MainNavigation` and `MobileMenu` need `"use client"`. Header and Footer are server components.

### Step 7 — Product Components
Build `ProductGrid`, `ProductCard`, `ProductActions`, `ProductPrice` in `components/products/`. Only `ProductActions` needs `"use client"`.

### Step 8 — Home Sections
Build all 7 home sections in `components/home/`. All are server components except what they consume (SubscribeForm, ProductActions are client).

### Step 9 — App Pages
- `app/layout.tsx` — import fonts, Header, Footer, globals.css; return `<html>` with both font variables
- `app/page.tsx` — import and render all 7 section components in order

### Step 10 — Images
Place all `.webp` and `.svg` files in `/public/`. Use `next/image` with `fill` (for background-like images) or explicit `width/height` (for inline images). Always provide `alt` text.

### Critical Rules
- **All colours** must use the exact hex values or CSS variables from Section 3 — do not substitute or approximate
- **Hover states** must be exact — see Section 7 — especially `hover:text-yellow-500!` with the `!` important modifier
- **Tailwind important modifier `!`** is used intentionally on hover colours to override specificity — reproduce this exactly
- **`"use client"`** must only be placed on components that use React hooks or browser APIs
- **Dropdown menu** must be CSS-only (group-hover), not JavaScript
- **Container** class must use the CSS custom property system, not hardcoded values
- **Font sizes** are often hardcoded as `text-[Npx]` not Tailwind scale steps — reproduce these exactly
- **`bg-yellow`** refers to the CSS variable `--yellow: #ffecbc` (not Tailwind's yellow-500)
- **`bg-lavender`**, **`bg-soft`**, **`bg-ink`**, **`text-secondary`**, **`text-body`** etc. are all custom tokens from `@theme inline`

---

*Document version: 1.0 · Generated: September 2026 · Project: KiddyWeb*
