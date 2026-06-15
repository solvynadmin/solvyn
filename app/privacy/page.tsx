import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Solvyn LLC collects, uses, and protects your personal information.",
  alternates: { canonical: "https://solvynconsulting.com/privacy" },
};

export default function PrivacyPage() {
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
              Privacy Policy
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
              Solvyn LLC ("Solvyn," "we," or "us") operates this website and provides technology and AI consulting services to businesses. This policy explains what personal information we collect, how we use it, and what options you have.
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

            <section aria-labelledby="privacy-collect">
              <h2
                id="privacy-collect"
                className="text-xl font-medium text-zinc-900 dark:text-zinc-50 mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                What information we collect
              </h2>
              <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <p>
                  <strong className="font-medium text-zinc-800 dark:text-zinc-200">Information you give us directly.</strong>{" "}
                  When you fill out a contact form or reach out to us by email, we collect what you provide: your name, email address, company name, and the content of your message. We do not collect this passively — it comes from you choosing to send it.
                </p>
                <p>
                  <strong className="font-medium text-zinc-800 dark:text-zinc-200">Website analytics.</strong>{" "}
                  We use Google Analytics to understand how visitors use our site. This may include pages visited, time spent on the site, general geographic region, device type, and how you arrived. Analytics data is collected by Google and is not linked to your personal identity. Google's use of this data is governed by their{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-700 dark:text-teal-400 underline underline-offset-2 hover:text-teal-800 dark:hover:text-teal-300 transition-colors"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
                <p>
                  <strong className="font-medium text-zinc-800 dark:text-zinc-200">Cookies.</strong>{" "}
                  Our site may use cookies for analytics purposes. You can control or disable cookies through your browser settings. Disabling them will not affect your ability to use the site.
                </p>
              </div>
            </section>

            <section aria-labelledby="privacy-use">
              <h2
                id="privacy-use"
                className="text-xl font-medium text-zinc-900 dark:text-zinc-50 mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                How we use your information
              </h2>
              <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <p>
                  We use the contact information you submit to respond to your inquiry, follow up on a potential engagement, or send information you have specifically requested. We do not enroll you in any marketing list or newsletter without your explicit consent.
                </p>
                <p>
                  We use analytics data to understand which parts of the site are useful and to improve the experience over time.
                </p>
              </div>
            </section>

            <section aria-labelledby="privacy-share">
              <h2
                id="privacy-share"
                className="text-xl font-medium text-zinc-900 dark:text-zinc-50 mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Who we share it with
              </h2>
              <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <p>
                  We do not sell your personal information. We do not share it with third parties for their own marketing.
                </p>
                <p>
                  We may work with third-party service providers to help operate the website or manage communications — email platforms, scheduling tools, or a CRM. These providers handle your data only as needed to perform services on our behalf and are not permitted to use it for their own purposes.
                </p>
                <p>
                  If required by applicable law or a valid legal process, we may disclose information as necessary.
                </p>
              </div>
            </section>

            <section aria-labelledby="privacy-retention">
              <h2
                id="privacy-retention"
                className="text-xl font-medium text-zinc-900 dark:text-zinc-50 mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Data retention
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                We keep contact information as long as it is relevant to an active or potential client relationship. If you want us to delete your information, send a request to{" "}
                <a
                  href="mailto:contactus@solvynconsulting.com"
                  className="text-teal-700 dark:text-teal-400 underline underline-offset-2 hover:text-teal-800 dark:hover:text-teal-300 transition-colors"
                >
                  contactus@solvynconsulting.com
                </a>{" "}
                and we will do so promptly, unless we have a legal or contractual obligation to retain it.
              </p>
            </section>

            <section aria-labelledby="privacy-rights">
              <h2
                id="privacy-rights"
                className="text-xl font-medium text-zinc-900 dark:text-zinc-50 mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Your rights
              </h2>
              <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <p>
                  <strong className="font-medium text-zinc-800 dark:text-zinc-200">For California residents:</strong>{" "}
                  The California Consumer Privacy Act (CCPA) gives you the right to know what personal information we hold about you, to request that we delete it, and to opt out of any sale of your information. We do not sell personal information. To make a request under the CCPA, contact us at{" "}
                  <a
                    href="mailto:contactus@solvynconsulting.com"
                    className="text-teal-700 dark:text-teal-400 underline underline-offset-2 hover:text-teal-800 dark:hover:text-teal-300 transition-colors"
                  >
                    contactus@solvynconsulting.com
                  </a>
                  .
                </p>
                <p>
                  We extend these same rights to all users regardless of location.
                </p>
              </div>
            </section>

            <section aria-labelledby="privacy-security">
              <h2
                id="privacy-security"
                className="text-xl font-medium text-zinc-900 dark:text-zinc-50 mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Security
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                We take reasonable technical and organizational precautions to protect information submitted through this site. No method of electronic transmission or storage is entirely secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section aria-labelledby="privacy-links">
              <h2
                id="privacy-links"
                className="text-xl font-medium text-zinc-900 dark:text-zinc-50 mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Links to other sites
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Our site may contain links to external websites. We are not responsible for the content or privacy practices of those sites and encourage you to review their policies before providing any personal information.
              </p>
            </section>

            <section aria-labelledby="privacy-changes">
              <h2
                id="privacy-changes"
                className="text-xl font-medium text-zinc-900 dark:text-zinc-50 mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Changes to this policy
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                If we make material changes to this policy, we will update the "last updated" date at the top of this page. Continued use of the site after any update constitutes acceptance of the revised policy.
              </p>
            </section>

            <section aria-labelledby="privacy-contact">
              <h2
                id="privacy-contact"
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
