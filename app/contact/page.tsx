import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Solvyn to discuss your technology or AI consulting needs. Tell us what you're building and we'll follow up within one business day.",
  alternates: { canonical: "https://solvynconsulting.com/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="pt-16">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
