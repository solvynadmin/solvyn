import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://solvynconsulting.com";
const DEFAULT_TITLE = "Solvyn: Technology and AI Consulting for Small Businesses";
const DEFAULT_DESCRIPTION =
  "Technology and AI consulting for small and medium businesses. Custom software, AI tools, and integrations. Based in Arizona, serving clients nationwide.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Solvyn",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "technology consulting",
    "AI consulting",
    "small business technology",
    "AI implementation",
    "business systems integration",
    "workflow automation",
    "IT consulting",
    "Arizona technology consulting",
    "small business AI consultant",
    "business automation",
    "technology consultant Phoenix",
    "custom software small business",
  ],
  authors: [{ name: "Solvyn LLC", url: SITE_URL }],
  creator: "Solvyn LLC",
  publisher: "Solvyn LLC",
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: "Solvyn",
    locale: "en_US",
    type: "website",
    images: [{ url: "/solvyn-og-dark.png", width: 1200, height: 630, alt: "Solvyn: Technology and AI Consulting" }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/solvyn-og-dark.png"],
    site: "@solvynconsulting",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
      { url: "/solvyn-icon-light-bg.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body className="min-h-full antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-[7px] focus:bg-white focus:text-zinc-900 focus:shadow-lg focus:ring-2 focus:ring-teal-700 focus:outline-none"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Skip to main content
        </a>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-45JB90FQX4"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-45JB90FQX4');
        `}
      </Script>
    </html>
  );
}
