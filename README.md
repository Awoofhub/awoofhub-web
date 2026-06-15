## 1. Project Overview

**Project Name:** AwoofHub

**Type:** Community-Driven Deal Discovery Platform

**Purpose:** To help Nigerian consumers discover, share, save, and redeem verified deals, discounts, freebies, and promotions through a trusted community-powered platform where users can contribute, rate, and discover the best offers available.


## 2. Folder Structure

### app/
Next.js App Router structure. Contains all routes, layouts, and route groups.

- (auth)/ → Authentication flow (login, signup, password reset, email verification)
- (main)/ → Main application area (authenticated + public user experience)
  - (protected)/ → Routes that require authentication (profile, offers, messages, etc.)
  - (unprotected)/ → Public discovery pages (explore, trending, expiring offers)
  - (footer)/ → Static informational pages (about, FAQ, terms, privacy, etc.)
- layout.tsx → Root layout (global providers, navigation shell)
- globals.css → Global styling (base styles, resets, typography)
- error.tsx → Global error boundary
- not-found.tsx → 404 page
- unauthorized/ → Access denied page

### components/
Reusable UI components grouped by domain.

- offer/ → Offer UI components (cards, detail view, trust section, etc.)
- offers/ → Offer lists, feeds, infinite scroll UI
- profile/ → Profile UI components (header, tabs, edit forms)
- header/ → Desktop + mobile navigation
- footer/ → App footer
- chat/ → Chat UI system
- comment/ → Comment system UI
- notifications/ → Notification UI
- modals/ → Global modals (report, logout, share)
- form/ → Form inputs and fields
- home/ → Landing page sections (hero, trending, categories)
- protected/ → Auth guard UI wrapper
- seo/ → SEO/meta helpers

Purpose: UI layer only — no business logic here.

### features/
Domain logic hooks (React Query / stateful logic).

- auth/ → Login, signup, logout, password reset logic
- offers/ → Fetching, filtering, trending, creating offers
- user/ → User data and profile updates
- wishlist/ → Save/unsave offers
- chat/ → Chat initialization and messaging logic
- comment/ → Comment creation and fetching
- review/ → Ratings and reviews system
- moderation/ → Admin review and approval logic
- activity/ → User activity tracking
- alert/ → Alert/notification triggers

Purpose: Business logic layer (data + state + API orchestration)

### services/
API layer (backend communication abstraction).

- auth-service.ts → Authentication API calls
- offer-service.ts → Offers CRUD + fetch logic
- user-service.ts → User API interactions
- wishlist-service.ts → Wishlist backend calls
- chat-service.ts → Messaging API
- moderation-service.ts → Admin moderation APIs

Purpose: Single place for all backend requests.

### lib/
Core utilities and infrastructure setup.

- api-client.ts → Base HTTP client (fetch/axios wrapper)
- utils.ts → Shared low-level helpers

### store/
Global state management.

- notifications/ → Notification state logic + tests

### hooks (inside features/)
Custom reusable hooks tied to business features.

Purpose: Encapsulates reusable logic per domain.

### types/
TypeScript domain models.

- offer.ts → Offer data types
- user.ts → User models
- auth.ts → Auth types
- etc.

Purpose: Shared type definitions across app

### utils/
Pure helper functions.

- formatDate.ts → Date formatting
- truncate.ts → Text shortening
- uid.ts → ID generation helpers

Purpose: Stateless utility functions

### providers/
Global context providers.

- app-provider.tsx → Global app wrapper
- react-query-provider.tsx → Server state management setup
- chat-provider.tsx → Chat system provider

Purpose: App-wide context + configuration

## 3. Tech Stack

| Category | Technologies |
|----------|------------|
| Frontend | Next.js, React, TypeScript |
| UI | Chakra UI, MUI, Tailwind CSS |
| State | Zustand, TanStack Query |
| API | Axios |
| Testing | Vitest, Testing Library, MSW |
