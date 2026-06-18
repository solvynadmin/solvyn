import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "The terms governing your use of the Solvyn website and consulting services.",
  alternates: { canonical: "https://www.solvynconsulting.com/terms" },
  openGraph: { url: "https://www.solvynconsulting.com/terms" },
};

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 pt-32 pb-20 md:pb-28">
          {/* Page header */}
          <div className="max-w-2xl mb-12 border-b border-zinc-200 dark:border-zinc-800 pb-10">
            <p
              className="text-sm font-medium text-teal-700 dark:text-teal-400 uppercase tracking-wide mb-4"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Legal
            </p>
            <h1
              className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Terms and Conditions
            </h1>
            <p
              className="text-base text-zinc-500 dark:text-zinc-400"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Last updated: <time dateTime="2026-06">June 2026</time>
            </p>
          </div>

          {/* Content */}
          <div
            className="max-w-2xl space-y-10"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {/* Intro */}
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
              These Terms and Conditions govern your use of this website, operated by Solvyn LLC ("Solvyn," "we," or "us"), an Arizona limited liability company. By accessing or using this site, you agree to these terms. If you do not agree, please do not use the site.
            </p>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed -mt-6">
              Questions? Reach us at{" "}
              <a
                href="mailto:contactus@solvynconsulting.com"
                className="text-teal-700 dark:text-teal-400 underline underline-offset-2 hover:text-teal-800 dark:hover:text-teal-300 transition-colors"
              >
                contactus@solvynconsulting.com
              </a>
              .
            </p>

            <section aria-labelledby="terms-use">
              <h2
                id="terms-use"
                className="text-xl font-medium text-zinc-900 dark:text-zinc-50 mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Use of this site
              </h2>
              <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <p>
                  This website is provided for informational purposes. You may use it to learn about Solvyn, review our services, and contact us. You may not use this site for any unlawful purpose, to transmit harmful or malicious content, to interfere with the site's operation, or to misrepresent your identity or affiliation.
                </p>
                <p>
                  We reserve the right to restrict or terminate access to the site at any time, for any reason, without notice.
                </p>
              </div>
            </section>

            <section aria-labelledby="terms-ip">
              <h2
                id="terms-ip"
                className="text-xl font-medium text-zinc-900 dark:text-zinc-50 mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Intellectual property
              </h2>
              <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <p>
                  All content on this site, including text, graphics, logos, and other materials, is the property of Solvyn LLC or its content providers and is protected by applicable intellectual property laws. Nothing on this site grants you a license to reproduce, distribute, or create derivative works from our content without our prior written permission.
                </p>
                <p>
                  If you quote or reference our content, appropriate attribution to Solvyn LLC is required.
                </p>
              </div>
            </section>

            <section aria-labelledby="terms-advice">
              <h2
                id="terms-advice"
                className="text-xl font-medium text-zinc-900 dark:text-zinc-50 mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                No professional advice
              </h2>
              <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <p>
                  The content on this site is for general informational purposes only. It does not constitute legal, financial, tax, or professional advice of any kind. Nothing here creates a client relationship or any professional obligation between you and Solvyn.
                </p>
                <p>
                  For professional advice tailored to your specific situation, consult a qualified professional in the relevant field.
                </p>
              </div>
            </section>

            <section aria-labelledby="terms-services">
              <h2
                id="terms-services"
                className="text-xl font-medium text-zinc-900 dark:text-zinc-50 mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Consulting services
              </h2>
              <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <p>
                  Solvyn provides technology and AI consulting services to businesses. Any engagement with Solvyn for actual services (including website and app development, AI implementation, workflow automation, or strategic consulting) is governed by a separate written agreement between you and Solvyn, not by these Terms and Conditions.
                </p>
                <p>
                  These terms cover your use of this website only.
                </p>
              </div>
            </section>

            <section aria-labelledby="terms-warranties">
              <h2
                id="terms-warranties"
                className="text-xl font-medium text-zinc-900 dark:text-zinc-50 mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Disclaimer of warranties
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                This site and its content are provided "as is" and "as available," without any representation or warranty of any kind, express or implied. Solvyn makes no warranties regarding the accuracy, completeness, or fitness for a particular purpose of any content on this site. We do not warrant that the site will be uninterrupted, error-free, or free of viruses or other harmful components.
              </p>
            </section>

            <section aria-labelledby="terms-liability">
              <h2
                id="terms-liability"
                className="text-xl font-medium text-zinc-900 dark:text-zinc-50 mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Limitation of liability
              </h2>
              <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <p>
                  To the fullest extent permitted by law, Solvyn LLC and its members, officers, and agents will not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of this site or reliance on its content. This includes, without limitation, loss of profits, data, or business opportunities.
                </p>
                <p>
                  Some jurisdictions do not allow the exclusion of certain warranties or the limitation of liability for certain types of damages. In those jurisdictions, our liability is limited to the greatest extent permitted by law.
                </p>
              </div>
            </section>

            <section aria-labelledby="terms-links">
              <h2
                id="terms-links"
                className="text-xl font-medium text-zinc-900 dark:text-zinc-50 mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Third-party links
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                This site may contain links to third-party websites. Those links are provided for convenience only. Solvyn does not control those sites, does not endorse them, and is not responsible for their content, accuracy, or privacy practices. Clicking a third-party link is at your own risk.
              </p>
            </section>

            <section aria-labelledby="terms-governing">
              <h2
                id="terms-governing"
                className="text-xl font-medium text-zinc-900 dark:text-zinc-50 mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Governing law
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                These terms are governed by the laws of the State of Arizona, without regard to conflict of law principles. Any dispute arising out of or related to these terms or your use of this site will be subject to the exclusive jurisdiction of the state and federal courts located in Maricopa County, Arizona.
              </p>
            </section>

            <section aria-labelledby="terms-changes">
              <h2
                id="terms-changes"
                className="text-xl font-medium text-zinc-900 dark:text-zinc-50 mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Changes to these terms
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                We may update these terms from time to time. When we do, we will revise the "last updated" date at the top of this page. Your continued use of the site after any update constitutes your acceptance of the revised terms.
              </p>
            </section>

            <section aria-labelledby="terms-contact">
              <h2
                id="terms-contact"
                className="text-xl font-medium text-zinc-900 dark:text-zinc-50 mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Contact
              </h2>
              <address className="not-italic text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-1">
                <p className="font-medium text-zinc-800 dark:text-zinc-200">Solvyn LLC</p>
                <p>25255 N 19th Ave Unit 4039</p>
                <p>Phoenix, AZ 85085</p>
                <a
                  href="mailto:contactus@solvynconsulting.com"
                  className="inline-block mt-1 text-teal-700 dark:text-teal-400 underline underline-offset-2 hover:text-teal-800 dark:hover:text-teal-300 transition-colors"
                >
                  contactus@solvynconsulting.com
                </a>
              </address>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
