import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://solvynconsulting.com"
  ),
  title: "Solvyn: Technology and AI Consulting for Growing Businesses",
  description:
    "Solvyn scopes, builds, and supports technology and AI systems for small and medium businesses. One firm, end to end, no hand-offs.",
  openGraph: {
    title: "Solvyn: Technology and AI Consulting for Growing Businesses",
    description:
      "Solvyn scopes, builds, and supports technology and AI systems for small and medium businesses. One firm, end to end, no hand-offs.",
    images: [{ url: "/solvyn-og-dark.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solvyn: Technology and AI Consulting for Growing Businesses",
    description:
      "Solvyn scopes, builds, and supports technology and AI systems for small and medium businesses. One firm, end to end, no hand-offs.",
    images: ["/solvyn-og-dark.png"],
  },
  icons: { icon: "/favicon.ico" },
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
