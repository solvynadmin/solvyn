import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Services } from "@/components/Services";
import { HowWeWork } from "@/components/HowWeWork";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://solvynconsulting.com/#organization",
      name: "Solvyn LLC",
      url: "https://solvynconsulting.com",
      logo: {
        "@type": "ImageObject",
        url: "https://solvynconsulting.com/solvyn-wordmark-light-bg.svg",
        width: 120,
        height: 28,
      },
      description:
        "Solvyn scopes, builds, and supports technology and AI systems for small and medium businesses. One firm, end to end, no hand-offs.",
      email: "contactus@solvynconsulting.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "25255 N 19th Ave Unit 4039",
        addressLocality: "Phoenix",
        addressRegion: "AZ",
        postalCode: "85085",
        addressCountry: "US",
      },
      areaServed: {
        "@type": "Country",
        name: "United States",
      },
      sameAs: ["https://www.instagram.com/solvynconsulting/"],
    },
    {
      "@type": "WebSite",
      "@id": "https://solvynconsulting.com/#website",
      url: "https://solvynconsulting.com",
      name: "Solvyn",
      description:
        "Technology and AI consulting for growing businesses.",
      publisher: {
        "@id": "https://solvynconsulting.com/#organization",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://solvynconsulting.com/#business",
      name: "Solvyn LLC",
      url: "https://solvynconsulting.com",
      description:
        "Technology and AI consulting for small and medium businesses. We scope, build, and support custom software, AI tools, and systems integrations. End to end, no hand-offs.",
      email: "contactus@solvynconsulting.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "25255 N 19th Ave Unit 4039",
        addressLocality: "Phoenix",
        addressRegion: "AZ",
        postalCode: "85085",
        addressCountry: "US",
      },
      areaServed: {
        "@type": "Country",
        name: "United States",
      },
      priceRange: "$$",
      parentOrganization: {
        "@id": "https://solvynconsulting.com/#organization",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Technology and AI Consulting Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Website and App Development",
              description:
                "Custom marketing sites, internal tools, and customer-facing applications. Designed and built for your business, maintained after launch.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Implementation",
              description:
                "AI agents, customer-facing chatbots, and automated workflows tailored to your existing tools and business environment.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Systems and Integrations",
              description:
                "Setup, management, and integration of the tools your business runs on — from initial configuration through day-to-day support.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Strategic Technology Consulting",
              description:
                "An honest assessment of your current technology stack, a clear picture of what to build, and a realistic plan — no jargon, no overselling.",
            },
          },
        ],
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main id="main-content">
        <Hero />
        <Problem />
        <Services />
        <HowWeWork />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
