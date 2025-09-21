# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production version with Turbopack
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Package Management
- Uses npm as package manager
- Dependencies are managed in package.json

## Architecture

### Technology Stack
- **Framework**: Next.js 15.5.3 with App Router
- **React**: 19.1.0
- **Styling**: Tailwind CSS 4 with CSS variables
- **UI Components**: shadcn/ui components (New York style)
- **Icons**: Lucide React
- **Theme**: Custom theme provider with system/light/dark mode support
- **TypeScript**: Full TypeScript setup

### Project Structure
- `src/app/` - Next.js App Router pages and layouts
- `src/components/` - React components
  - `src/components/ui/` - shadcn/ui components
- `src/lib/` - Utility functions and configuration
- Root-level configuration files for Next.js, TypeScript, and tooling

### Key Features
This is a URL cleaning application that:
- Removes tracking parameters from URLs (UTM, click tracking, social media, etc.)
- Supports platform-specific cleaning (Amazon, YouTube, Twitter, etc.)
- Provides clipboard integration
- Includes responsive design with mobile-friendly button layouts

### Component Architecture
- Uses shadcn/ui component system with Tailwind CSS
- Custom theme provider for dark/light/system theme detection
- Path aliases configured with `@/` pointing to `src/`

### Styling System
- Tailwind CSS 4 with CSS variables for theming
- Uses neutral base color scheme
- Responsive design patterns throughout
- Custom button and textarea components

### Configuration
- shadcn/ui configured in components.json
- TypeScript strict mode enabled
- Next.js with minimal custom configuration
- ESLint for code quality