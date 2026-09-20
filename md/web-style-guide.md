# Kiddy Website Style Guide

## Features

- Responsive storefront built with Next.js App Router and TypeScript.
- Server-rendered page sections by default for a lightweight frontend.
- Header with Kiddy branding, product search, category selector, phone call-to-action, navigation, login, compare, wishlist, and cart links.
- Mobile menu with compact search and key account/cart actions.
- Hero section with large editorial typography, split product imagery, discount badge, primary collection button, promo video button, and newsletter capture.
- Promotional grid for toys, shoes, and hats with offer buttons.
- Featured product grid using typed product data and reusable product cards.
- Product cards include image, category, price, sale state, wishlist, compare, quick view, and add-to-cart link.
- Trust section with customer avatars and pastel category pills.
- Voucher subscription section with seasonal promotional messaging.
- Benefits band for secure payments, free shipping, support, and gifts/sales.
- Footer with brand description, phone link, shop/company/useful/legal link groups, social links, and copyright.

## Color Theme

The visual system uses a clean kids-fashion pastel palette with a dark neutral anchor.

| Token | Hex | Usage |
| --- | --- | --- |
| Ink | `#20252A` | Primary text, dark buttons, benefit band |
| Body | `#4D6680` | Paragraph and secondary text |
| Muted | `#8D99A6` | Subtle labels and helper text |
| Line | `#E7EAED` | Borders and dividers |
| Soft | `#F7F8F9` | Search fields and light controls |
| White | `#FFFFFF` | Cards, buttons, page background |
| Lavender | `#F0EAFD` | Hero image panel and promo card |
| Cream | `#FFF0C9` | Pastel category/promo accents |
| Yellow | `#FFECBC` | Hero/promo/voucher warmth |
| Pink | `#FCEDF1` | Category accent |
| Green | `#EAF8EF` | Category accent |
| Cyan | `#E8F7F8` | Category accent |
| Purple | `#F0EBFF` | Category accent |
| Accent | `#C78D20` | Highlight footer legal link |

The global desktop content gutter is `115.4px` on both left and right sides through the shared `.container` class.

## Font Style

- Primary font: Manrope.
- Loading method: `next/font/google`, configured globally in `app/layout.tsx`.
- Overall feel: modern, geometric, friendly, and highly legible.
- Hero heading: extra-bold, oversized, tight line-height, negative letter spacing.
- Section headings: extra-bold with compact line-height and slight negative tracking.
- Navigation: uppercase, compact, medium-bold labels.
- Product names: bold, centered, compact.
- Category labels and small UI text: uppercase or compact labels with restrained sizing.
- Body copy: 16-18px range with generous line-height for a soft retail feel.
