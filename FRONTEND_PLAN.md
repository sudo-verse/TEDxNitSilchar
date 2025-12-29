# TEDxNITSilchar Frontend Implementation Plan

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **shadcn/ui** components library (already configured)
- **Tailwind v4** for styling
- **Lucide React** for icons
- **React Hook Form** + Zod for forms
- **React Router DOM** for navigation

## Brand Configuration

### Theme Setup

- Primary colors: Black (#000000), White (#FFFFFF), TEDx Red (#EB0028)
- Typography: Inter/Geist Sans for headings, system fonts for body
- Create custom CSS variables in `src/styles/index.css`

## Page Structure & Implementation Plan

### Phase 1: Core Layout & Navigation

**Files to create/modify:**

- `src/components/layout/Navbar.tsx` - Sticky navigation with smooth scroll
- `src/components/layout/Layout.tsx` - Main layout wrapper
- `src/components/ui/logo.tsx` - TEDxNITSilchar logo component
- `src/hooks/useScrollSpy.ts` - Active section detection
- `src/lib/smooth-scroll.ts` - Smooth scrolling utility

**Features:**

- Responsive navbar with hamburger menu
- Smooth scroll to sections
- Active section highlighting

### Phase 2: Hero Section

**Files to create:**

- `src/components/sections/HeroSection.tsx` - Main hero component
- `src/components/ui/event-card.tsx` - Event details card
- `src/components/ui/cta-button.tsx` - Call-to-action button
- `src/types/event.ts` - Event data types

**Features:**

- Full-width dark background with pattern
- Two-column layout (content + event card)
- Background video/image support
- Primary/Secondary CTA buttons

### Phase 3: About Section

**Files to create:**

- `src/components/sections/AboutSection.tsx`
- `src/components/ui/stats-grid.tsx` - Statistics display
- `src/data/about.ts` - About content and stats

**Features:**

- Two-column responsive layout
- Animated statistics cards
- TEDx program description

### Phase 4: Theme Section

**Files to create:**

- `src/components/sections/ThemeSection.tsx`
- `src/components/ui/theme-card.tsx` - Individual theme cards
- `src/data/theme.ts` - Theme content data

**Features:**

- Theme explanation with cards
- Responsive grid layout
- Hover animations

### Phase 5: Speakers Section

**Files to create:**

- `src/components/sections/SpeakersSection.tsx`
- `src/components/ui/speaker-card.tsx` - Speaker profile cards
- `src/components/modals/SpeakerModal.tsx` - Speaker details modal
- `src/types/speaker.ts` - Speaker data types
- `src/data/speakers.ts` - Speakers data

**Features:**

- Responsive grid of speaker cards
- Modal popup for speaker details
- Image lazy loading
- "More speakers TBA" placeholder

### Phase 6: Schedule Section

**Files to create:**

- `src/components/sections/ScheduleSection.tsx`
- `src/components/ui/schedule-timeline.tsx` - Timeline component
- `src/types/schedule.ts` - Schedule data types
- `src/data/schedule.ts` - Schedule data

**Features:**

- Clean timeline/table layout
- Session grouping (Morning/Afternoon/Evening)
- Mobile-optimized view

### Phase 7: Partners Section

**Files to create:**

- `src/components/sections/PartnersSection.tsx`
- `src/components/ui/partner-grid.tsx` - Partner logos grid
- `src/types/partner.ts` - Partner data types
- `src/data/partners.ts` - Partners data

**Features:**

- Multi-tier partner categories
- Logo grid with hover effects
- Download/Partnership CTAs

### Phase 8: Venue Section

**Files to create:**

- `src/components/sections/VenueSection.tsx`
- `src/components/ui/map-embed.tsx` - Map component
- `src/components/ui/photo-gallery.tsx` - Venue photos
- `src/data/venue.ts` - Venue information

**Features:**

- Interactive map embed
- Campus photo gallery
- NIT Silchar description
- Directions integration

### Phase 9: Team Section

**Files to create:**

- `src/components/sections/TeamSection.tsx`
- `src/components/ui/team-card.tsx` - Team member cards
- `src/types/team.ts` - Team member types
- `src/data/team.ts` - Team data

**Features:**

- Grid layout for team cards
- Role-based organization
- Social links (LinkedIn)

### Phase 10: FAQ Section

**Files to create:**

- `src/components/sections/FAQSection.tsx`
- `src/components/ui/faq-accordion.tsx` - Custom accordion
- `src/data/faqs.ts` - FAQ content

**Features:**

- Expandable accordion interface
- Search functionality
- Categories for different FAQ types

### Phase 11: CTA Band & Footer

**Files to create:**

- `src/components/sections/CTABand.tsx` - Call-to-action banner
- `src/components/layout/Footer.tsx` - Site footer
- `src/components/ui/social-links.tsx` - Social media links

**Features:**

- Prominent ticket purchase CTA
- Multi-column footer layout
- Social media integration

### Phase 12: Authentication & Login

**Files to create/modify:**

- `src/pages/LoginPage.tsx` - Login page with form
- `src/components/forms/LoginForm.tsx` - Login form component
- `src/hooks/useAuth.ts` - Authentication hook
- `src/components/ui/auth-layout.tsx` - Layout for auth pages

**Features:**

- User login with email/password
- Form validation with error handling
- Remember me functionality
- Redirect to admin dashboard after login
- Responsive design matching site theme

### Phase 13: Global Features & Polish

**Files to create/modify:**

- `src/hooks/useInView.ts` - Intersection Observer hook
- `src/lib/animations.ts` - Animation utilities
- `src/components/ui/loading-states.tsx` - Loading components
- `src/lib/constants.ts` - Site-wide constants

**Features:**

- Scroll-triggered animations
- Loading states for images
- SEO meta tags
- Performance optimization

## API Integration (if needed)

**Files to create:**

- `src/services/events.ts` - Event data service
- `src/services/tickets.ts` - Ticket booking integration
- `src/hooks/useEventData.ts` - Event data fetching

## Responsive Design Breakpoints

- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

## Performance Considerations

- Image optimization and lazy loading
- Bundle splitting by sections
- Critical CSS inlining
- Smooth scroll polyfill for older browsers

## Content Management

All content stored in `/src/data/` files for easy editing:

- Speaker profiles and bios
- Event schedule and timing
- Partner logos and information
- Team member details
- FAQ content

## Accessibility Features

- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast mode compatibility
- Screen reader optimization
