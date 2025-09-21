export const siteConfig = {
  name: "Clean URL",
  title: "Clean URL - Simplify and Clean Your URLs",
  description: "A powerful tool to clean, simplify, and optimize URLs. Remove tracking parameters, shorten links, and make your URLs cleaner and more user-friendly.",
  url: "https://cleanurl.com",
  ogImage: "/og-image.jpg",
  links: {
    twitter: "https://twitter.com/cleanurl",
    github: "https://github.com/cleanurl/clean-url-app",
  },
  keywords: [
    "URL cleaner",
    "URL shortener",
    "Remove tracking parameters",
    "Clean links",
    "URL optimizer",
    "Link simplifier",
    "Privacy tool",
    "URL utility",
  ],
  authors: [
    {
      name: "Clean URL Team",
      url: "https://cleanurl.com",
    },
  ],
  creator: "Clean URL Team",
  metadataBase: new URL("https://cleanurl.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Clean URL",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@cleanurl",
  },
} as const;

export type SiteConfig = typeof siteConfig;