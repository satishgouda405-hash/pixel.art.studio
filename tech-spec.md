# Pixel Art Studio — Technical Specification

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.0.0 | UI framework |
| react-dom | ^19.0.0 | DOM renderer |
| react-router-dom | ^7.0.0 | Client-side routing (4 pages) |
| gsap | ^3.12.0 | Animation engine, ScrollTrigger plugin |
| @gsap/react | ^2.1.0 | useGSAP hook for React lifecycle |
| lenis | ^1.1.0 | Smooth scroll with inertia |
| lucide-react | ^0.460.0 | Icons (arrows, menu, x, chevrons, camera, etc.) |
| tailwindcss | ^4.0.0 | Utility-first CSS |
| @tailwindcss/vite | ^4.0.0 | Tailwind Vite integration |
| vite | ^6.0.0 | Build tool |
| @vitejs/plugin-react | ^4.0.0 | React Vite plugin |
| typescript | ^5.6.0 | Type safety |
| @types/react | ^19.0.0 | React type definitions |
| @types/react-dom | ^19.0.0 | ReactDOM type definitions |

**Design constraint clarification:** The design calls for Inter throughout but specifies tight heading line-heights (0.9–1.05) and wide accent text letter-spacing. These are purely CSS properties — no special font packages needed. Lucide provides all icons (no separate icon font).

---

## Component Inventory

### Layout (shared across all pages)

| Component | Source | Notes |
|-----------|--------|-------|
| Navigation | Custom | Fixed, transparent→solid on scroll, mobile full-screen overlay. Used on all pages. |
| Footer | Custom | 4-column dark footer. Used on all pages. |
| PageLayout | Custom | Wraps Nav + Footer, handles Lenis init, page transition wrapper, scroll-to-top on route change. |

### Sections (page-specific, used once)

**Home:**
- HeroSection
- FeaturedWorkSection — 4 alternating editorial project rows
- ServicesOverviewSection — 4-column service cards grid
- PhilosophySection — split image/text on warm cream bg
- TestimonialsSection — horizontal carousel with arrow nav
- CTABannerSection — gold full-width banner

**Portfolio:**
- PortfolioHeroSection — compact 50vh hero
- CategoryFilter — sticky filter bar with active underline
- PortfolioGrid — masonry CSS columns with hover overlays

**Services:**
- ServicesHeroSection
- ServicePackagesSection — 4 alternating dark/warm service blocks
- FAQSection — accordion with expand/collapse

**Contact:**
- ContactHeroSection
- ContactFormSection — two-column form + info card + map
- SocialLinksSection — centered social links with follower counts

### Reusable Components

| Component | Source | Used By |
|-----------|--------|---------|
| Lightbox | Custom | PortfolioGrid, FeaturedWorkSection ("View Project" links) |
| ScrollReveal | Custom | Wraps any element/section for scroll-triggered entrance animations. All sections use this. |
| ServiceCard | Custom | ServicesOverviewSection |
| TestimonialCard | Custom | TestimonialsSection |
| AccordionItem | Custom | FAQSection |
| PillButton | Custom | Navigation, HeroSection, CTABannerSection, ServicePackagesSection — three variants: primary (gold), secondary (outline), dark |
| InputField | Custom | ContactFormSection — text input with focus state |
| SelectField | Custom | ContactFormSection — dropdown with custom styling |

---

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| Smooth scroll (site-wide) | Lenis | Initialize in PageLayout, disable during mobile nav overlay | Low |
| Hero entrance choreography | GSAP + useGSAP | Timeline: image fade+scale → label slide → title lines stagger (120ms) → subtitle+CTA. Single timeline with position offsets. | Medium |
| Navigation scroll state | CSS + scroll listener | Toggle class at 100vh scroll threshold for solid bg transition (300ms CSS). Scroll listener via Lenis onScroll or native scroll. | Low |
| Nav active underline | GSAP | Animate width 0→100% on page load, 600ms Power4.easeOut | Low |
| Mobile nav overlay | GSAP | Full-screen overlay, links stagger fade-in (100ms each), reverse on close | Medium |
| Page transitions | GSAP | Fade out (200ms) → route swap → fade in (300ms). Coordinate with React Router + GSAP. | Medium |
| **ScrollReveal (universal)** | GSAP + ScrollTrigger | Reusable component: translateY 30px→0, opacity 0→1, 600ms, triggered at 85% viewport. One-shot. Accepts stagger delay prop. | Medium |
| Featured Work row entrance | GSAP + ScrollTrigger | Image slides from side (±60px), text elements stagger (100ms) with 200ms delay after image. Each row is independent ScrollTrigger. | Medium |
| Service cards stagger | GSAP + ScrollTrigger | translateY 40px→0, opacity 0→1, 800ms, stagger 120ms | Low |
| Philosophy section entrance | GSAP + ScrollTrigger | Image translateX -40px→0, text stagger translateY 30px→0 with 300ms delay | Low |
| Testimonials entrance | GSAP + ScrollTrigger | Header fade, cards stagger translateY 40px→0, 150ms | Low |
| Carousel navigation | GSAP + state | Smooth horizontal scroll to next/prev card position. No library needed — scrollLeft animation with GSAP. | Medium |
| Portfolio grid stagger | GSAP + ScrollTrigger | translateY 30px→0, opacity 0→1, stagger 60ms. Re-triggers on filter change. | Medium |
| Portfolio grid filter | GSAP | Non-matching: opacity 0, scale 0.97 (300ms) → remove from flow → matching fade in. Use GSAP flip or manual reflow. | Medium |
| Portfolio hover overlay | CSS | Overlay opacity 0→1 (300ms), image scale 1→1.05 (400ms). Pure CSS transition. | Low |
| Service package entrance | GSAP + ScrollTrigger | Image from side (±60px), text stagger (100ms). Same pattern as Featured Work. | Low |
| FAQ accordion | CSS | max-height 0→auto (300ms), chevron rotate 180°. No JS animation library needed. | Low |
| Contact form entrance | GSAP + ScrollTrigger | Form translateX -40px, info card translateX 40px, 800ms | Low |
| Lightbox open/close | GSAP | Overlay opacity 0→1 (300ms), image scale 0.9→1 (400ms Power4.easeOut). Reverse on close. | Medium |
| Lightbox navigation | GSAP | Cross-fade between images with scale transition | Low |
| Button hover states | CSS | All button hovers are simple CSS transitions (background-color, color, 300ms) | Low |
| Card hover lift | CSS | translateY -4px + box-shadow on hover, 300ms CSS transition | Low |
| Image hover zoom | CSS | scale 1→1.03, overflow hidden clip, 300ms CSS | Low |
| Input focus state | CSS | border-bottom-color transition to gold, 300ms | Low |

---

## State & Logic

### Lightbox State Management (Portfolio)

The lightbox is a portal-based overlay that needs global awareness of which images are viewable and the current index. Key decisions:

- **LightboxProvider context** wrapping the app (or a shared state in PageLayout). Provides `openLightbox(images[], startIndex)`, `closeLightbox()`, `next()`, `prev()`.
- Image arrays are passed from the triggering component (PortfolioGrid passes its filtered items, FeaturedWork could pass a single-image array).
- Keyboard listeners (Escape, ←, →) registered on mount, cleaned up on unmount.
- Lenis must be paused when lightbox is open (scrolling behind overlay).

### Portfolio Filtering

- Category state: `"all" | "portrait" | "wedding" | "commercial" | "editorial"`
- Filtered items computed from state. All 12 items have a `category` field.
- GSAP handles the visual transition (fade out non-matching, fade in matching). Use a ref to track item DOM elements; GSAP animates them directly.

### Page Transitions

- React Router outlet wrapped in a transition container.
- On route change: GSAP timeline — fade out current page → scroll to top → render new route → fade in.
- Lenis scroll reset at start of transition.
- The transition wrapper lives in PageLayout and triggers on `location.pathname` change.

### Lenis ↔ GSAP ScrollTrigger Integration

- Lenis must feed its scroll position to GSAP ScrollTrigger via `ScrollTrigger.scrollerProxy` or Lenis's `scroll` event calling `ScrollTrigger.update()`.
- This is the standard Lenis+GSAP integration pattern — required for all scroll-triggered animations to work correctly.

### Mobile Nav Overlay

- Toggle state: `isOpen: boolean`
- When open: disable body scroll (Lenis stop), show overlay with staggered link animations.
- When closed: reverse stagger animation, then hide overlay, re-enable Lenis.

### FAQ Accordion

- Track `openIndex: number | null` — only one item open at a time.
- max-height transition on the answer container. Measure content height or use a large max-height value for CSS-only animation.

---

## Other Key Decisions

**Routing:** React Router v7 with 4 routes (`/`, `/portfolio`, `/services`, `/contact`). No lazy loading needed — the site is small enough for a single bundle.

**Image strategy:** All images are static assets in `/public/images/`. The 18 photography images + 1 video are AI-generated assets referenced by file path. No external image hosting or CDN.

**Video:** Hero video is a static file in `/public/video/`. Autoplay, muted, loop. Used as a background element. Fallback to static hero image if video fails.

**Google Maps:** Embedded iframe with the provided API key. Grayscale filter via CSS for brand consistency.

**Form handling:** Contact form is frontend-only (no backend). Show a success message on submit. No actual email sending.

**Tailwind v4:** Custom theme extends Tailwind with the design token colors. Inter is the default font (system/Inter, no Google Fonts CDN needed as it's widely available). Accent text styling is a custom utility class.
