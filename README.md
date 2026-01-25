# Clean URL App

A modern web application that removes tracking parameters and cleans URLs to protect your privacy. Built with SvelteKit 2, Svelte 5, and Tailwind CSS 4.

## Features

- **URL Cleaning**: Removes tracking parameters (UTM, click tracking, social media, etc.)
- **Platform-Specific Cleaning**: Supports Amazon, YouTube, Twitter, and other platforms
- **Clipboard Integration**: Easy copy/paste functionality
- **Responsive Design**: Mobile-friendly interface with optimized button layouts
- **Theme Support**: Light, dark, and system theme detection
- **Privacy-Focused**: No data collection or tracking

## Getting Started

First, install dependencies and run the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technology Stack

- **Framework**: SvelteKit 2.50.1 with Vite 7.3
- **Svelte**: 5.48.2
- **Styling**: Tailwind CSS 4 with CSS variables
- **UI Components**: Custom Svelte UI components
- **TypeScript**: Full TypeScript setup

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build production bundle
- `pnpm preview` - Preview the production build
- `pnpm check` - Run Svelte type checks
- `pnpm lint` - Run ESLint
- `pnpm test` - Run Vitest in watch mode
- `pnpm test:run` - Run Vitest once

## Project Structure

```
src/
├── routes/          # SvelteKit routes and layouts
├── lib/             # Utilities, config, and UI components
│   └── components/  # Reusable Svelte components
└── app.html         # App template
```

## Deployment

See the official [SvelteKit deployment documentation](https://kit.svelte.dev/docs/deploying) for platform-specific guidance.
