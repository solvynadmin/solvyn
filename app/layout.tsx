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
const DEFAULT_TITLE = "Solvyn: Technology and AI Consulting for Growing Businesses";
const DEFAULT_DESCRIPTION =
  "Solvyn scopes, builds, and supports technology and AI systems for small and medium businesses. We take you from strategy to deployment and stay involved after launch — one firm, end to end, no hand-offs.";

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
    "website development",
    "app development",
    "business systems integration",
    "workflow automation",
    "IT consulting",
    "Arizona technology consulting",
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
    images: [{ url: "/solvyn-og-dark.png", width: 1200, height: 630, alt: "Solvyn — Technology and AI Consulting" }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/solvyn-og-dark.png"],
    site: "@solvynconsulting",
  },
  icons: { icon: "/favicon.ico" },
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
