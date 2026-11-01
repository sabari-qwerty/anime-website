# Manga Mart responsive screen report

Generated from the current React/Vite build on 1 November 2026. Captures use Chromium at three representative viewport sizes and include the full scrollable page for each route.

## Viewport coverage

| Device class | Viewport | Expected representation |
| --- | ---: | --- |
| Phone | 390×844 | Single-column content, compact header, hamburger navigation, swipe-friendly hero, stacked purchase and contact controls. |
| Tablet | 768×1024 | Two-column content where space allows, larger image cards, tablet-friendly spacing, mobile navigation retained until desktop breakpoint. |
| Desktop | 1440×900 | Full navigation, search field, spacious editorial composition, multi-column product grids, side-by-side product detail layout. |

## Screen-by-screen representation

### 1. Home / storefront

The home screen leads with the “More Than Anime.” hero, responsive hero art, collection CTA, trust stats, new arrivals, best sellers, anime collections, feature cards, and footer. The hero changes from a split editorial layout on desktop to a stacked, swipeable image panel on phone/tablet.

| Phone | Tablet | Desktop |
| --- | --- | --- |
| [Open screenshot](report/screenshots/home-phone.png) | [Open screenshot](report/screenshots/home-tablet.png) | [Open screenshot](report/screenshots/home-desktop.png) |

### 2. Gallery / product listing

The gallery screen presents the full catalog with the shared site header, collection intro, product cards, filters/controls where available, and a responsive grid. Cards reduce from multiple columns to a readable two-column mobile layout.

| Phone | Tablet | Desktop |
| --- | --- | --- |
| [Open screenshot](report/screenshots/gallery-phone.png) | [Open screenshot](report/screenshots/gallery-tablet.png) | [Open screenshot](report/screenshots/gallery-desktop.png) |

### 3. Product detail

The product screen prioritizes the product image, title, price, rating, size/color/quantity selectors, add-to-cart actions, delivery benefits, product details, related items, and collection banner. Desktop places imagery beside purchase information; phone stacks the same flow vertically.

| Phone | Tablet | Desktop |
| --- | --- | --- |
| [Open screenshot](report/screenshots/product-phone.png) | [Open screenshot](report/screenshots/product-tablet.png) | [Open screenshot](report/screenshots/product-desktop.png) |

### 4. About

The about screen communicates the brand story, values, community, and premium-fabric positioning with editorial imagery. On smaller screens, the content becomes a vertical story sequence with full-width image blocks.

| Phone | Tablet | Desktop |
| --- | --- | --- |
| [Open screenshot](report/screenshots/about-phone.png) | [Open screenshot](report/screenshots/about-tablet.png) | [Open screenshot](report/screenshots/about-desktop.png) |

### 5. Contact

The contact screen combines a visual hero/help section with the contact form and support information. The phone view stacks fields for touch entry; tablet and desktop use broader form layouts with more breathing room.

| Phone | Tablet | Desktop |
| --- | --- | --- |
| [Open screenshot](report/screenshots/contact-phone.png) | [Open screenshot](report/screenshots/contact-tablet.png) | [Open screenshot](report/screenshots/contact-desktop.png) |

### 6. Cart

The cart screen represents the empty-cart state with a clear return-to-shop action and shared footer. It remains centered and lightweight on phone, while desktop uses the available width for stronger visual balance.

| Phone | Tablet | Desktop |
| --- | --- | --- |
| [Open screenshot](report/screenshots/cart-phone.png) | [Open screenshot](report/screenshots/cart-tablet.png) | [Open screenshot](report/screenshots/cart-desktop.png) |

## QA notes

- Build check: `npm run build` passed.
- Responsive captures: 18 screenshots generated, covering 6 routes × 3 viewport classes.
- Navigation is desktop-first at the `lg` breakpoint; phone and tablet use the compact menu.
- The home hero supports desktop arrow navigation, phone/tablet swipe navigation, keyboard arrows, and timed slide progression.
- Images use descriptive alt text on content imagery and decorative hero layers are hidden from assistive technology.
- The report captures reflect the current implementation; interactive states such as an open menu, selected size, and populated cart are not represented in the default screenshots.
