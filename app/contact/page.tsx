import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with Solvyn. Tell us what you're working on and we'll follow up within one business day.",
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
