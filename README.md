# Clean URL App

A modern web application that removes tracking parameters and cleans URLs to protect your privacy. Built with Next.js 15, React 19, and Tailwind CSS.

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
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technology Stack

- **Framework**: Next.js 15.5.3 with App Router
- **React**: 19.1.0
- **Styling**: Tailwind CSS 4 with CSS variables
- **UI Components**: shadcn/ui components (New York style)
- **Icons**: Lucide React
- **TypeScript**: Full TypeScript setup

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production version
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/              # Next.js App Router pages and layouts
├── components/       # React components
│   └── ui/          # shadcn/ui components
└── lib/             # Utility functions and configuration
```

## Deployment

See the official [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for platform-specific guidance.
