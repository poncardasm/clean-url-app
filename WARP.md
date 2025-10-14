# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Commands

### Development

- `npm run dev` - Start development server with Turbopack (fast refresh enabled)
- `npm run build` - Build production version with Turbopack optimization
- `npm start` - Start production server
- `npm run lint` - Run ESLint with Next.js TypeScript rules

### Package Management

- Uses npm as package manager
- All dependencies managed in package.json

## Architecture

### Technology Stack

- **Framework**: Next.js 15.5.3 with App Router and Turbopack
- **React**: 19.1.0 with client-side state management
- **Styling**: Tailwind CSS 4 with CSS variables for theming
- **UI Components**: shadcn/ui (New York style) with Radix UI primitives
- **Icons**: Lucide React
- **TypeScript**: Full TypeScript setup with strict mode

### Core Application Logic

This is a URL cleaning application with a single-page interface:

1. **URL Cleaning Algorithm** (`src/app/page.tsx`):
   - Comprehensive tracking parameter removal (75+ parameters)
   - Platform-specific cleaning for Amazon, YouTube, Twitter, LinkedIn, etc.
   - Special Amazon URL path cleaning to keep only essential product information
   - Graceful error handling for invalid URLs

2. **User Experience Flow**:
   - Input URL → Clean URL → Automatic clipboard copy → Visual feedback
   - One-click cleaning with immediate clipboard integration
   - Clear functionality to reset state

### Component Architecture

- **Single Page Application**: All functionality contained in `src/app/page.tsx`
- **Theme System**: Custom ThemeProvider with system/light/dark mode detection
- **UI Components**: shadcn/ui components with custom styling variants
- **Path Aliases**: `@/` points to `src/` for clean imports

### Configuration Details

- **shadcn/ui**: Configured with neutral base colors and CSS variables
- **TypeScript**: ES2017 target with strict mode and path aliases
- **ESLint**: Next.js core web vitals and TypeScript rules
- **Next.js**: Minimal configuration relying on framework defaults

### File Structure

```md
src/
├── app/
│   ├── page.tsx          # Main application with URL cleaning logic
│   ├── layout.tsx        # Root layout with theme provider
│   ├── globals.css       # Global styles and CSS variables
│   └── favicon.ico       # App icon
├── components/
│   ├── theme-provider.tsx # Custom theme management
│   └── ui/               # shadcn/ui components
│       ├── button.tsx    # Button with theme-aware variants
│       └── textarea.tsx  # Textarea component
└── lib/
    ├── site-config.ts    # Metadata and SEO configuration
    └── utils.ts          # Utility functions (cn helper)
```

### Theme System

The application includes a sophisticated theme system:

- System preference detection with real-time updates
- localStorage persistence across sessions
- CSS variable-based color system for smooth transitions
- Theme changes affect button variants and backgrounds automatically

### URL Cleaning Logic

The core cleaning function handles:

- UTM parameters (all variants)
- Click tracking (Google, Facebook, Microsoft, etc.)
- Social media tracking parameters
- Platform-specific parameters for major sites
- Amazon URL path optimization for product pages
