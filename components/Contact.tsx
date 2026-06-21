"use client";

import { useState } from "react";
import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";

type FormState = {
  name: string;
  email: string;
  company: string;
  phone: string;
  budget: string;
  message: string;
  website: string; // honeypot
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const BUDGET_OPTIONS = [
  { value: "", label: "Select a range" },
  { value: "under-5k", label: "Under $5k" },
  { value: "5k-15k", label: "$5k – $15k" },
  { value: "15k-50k", label: "$15k – $50k" },
  { value: "50k-plus", label: "$50k+" },
  { value: "not-sure", label: "Not sure yet" },
];

export function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    phone: "",
    budget: "",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!form.message.trim()) errs.message = "Please tell us what you're looking to solve.";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("loading");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      } else {
        setStatus("success");
      }
    } catch {
      setServerError("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  const inputClass =
    "w-full px-4 py-3 rounded-[7px] border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-teal-700 dark:focus:border-teal-400 focus:ring-2 focus:ring-teal-700/30 dark:focus:ring-teal-400/30 transition-colors text-base";

  if (status === "success") {
    return (
      <section id="contact" className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <FadeIn>
            <div className="flex items-start gap-4 mb-4">
              <span
                className="mt-1 inline-block h-8 w-8 rounded-full bg-teal-700 dark:bg-teal-400 flex-shrink-0"
                aria-hidden="true"
              />
              <h2
                className="text-3xl md:text-4xl font-medium text-zinc-900 dark:text-zinc-50"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                We got your message.
              </h2>
            </div>
            <p
              className="text-lg text-zinc-500 dark:text-zinc-400 ml-12"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Thanks for reaching out. We&apos;ll follow up within one business day.
            </p>
          </FadeIn>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24 items-start">
          {/* Left: decorative panel */}
          <FadeIn direction="left" className="hidden lg:block">
            <div className="sticky top-28 space-y-10">
              <Image
                src="/solvyn-icon-light-bg.svg"
                alt=""
                width={80}
                height={80}
                className="dark:hidden opacity-60"
                aria-hidden="true"
              />
              <Image
                src="/solvyn-icon-dark-bg.svg"
                alt=""
                width={80}
                height={80}
                className="hidden dark:block opacity-60"
                aria-hidden="true"
              />
              <div className="space-y-6">
                {[
                  { label: "Response time", value: "Within one business day" },
                  { label: "Initial consultation", value: "No cost, no commitment" },
                  { label: "Based in", value: "Arizona, serving clients nationwide" },
                ].map((item) => (
                  <div key={item.label}>
                    <p
                      className="text-xs font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="text-base text-zinc-700 dark:text-zinc-300"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right: form */}
          <div className="max-w-2xl w-full">
          <FadeIn>
            <h2
              className="text-3xl md:text-4xl font-medium text-zinc-900 dark:text-zinc-50 mb-3"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Let&apos;s talk about what you&apos;re building.
            </h2>
            <p
              className="text-lg text-zinc-500 dark:text-zinc-400 mb-10"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Tell us where you are and what you&apos;re looking to get done. We&apos;ll
              follow up within one business day.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Name <span className="text-teal-700 dark:text-teal-400" aria-hidden="true">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={inputClass}
                  style={{ fontFamily: "var(--font-inter)" }}
                />
                {errors.name && (
                  <p id="name-error" role="alert" className="mt-1.5 text-sm text-red-600" style={{ fontFamily: "var(--font-inter)" }}>
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Email <span className="text-teal-700 dark:text-teal-400" aria-hidden="true">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className={inputClass}
                  style={{ fontFamily: "var(--font-inter)" }}
                />
                {errors.email && (
                  <p id="email-error" role="alert" className="mt-1.5 text-sm text-red-600" style={{ fontFamily: "var(--font-inter)" }}>
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Company{" "}
                  <span className="text-zinc-500 dark:text-zinc-500 font-normal">(optional)</span>
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Your business name"
                  className={inputClass}
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Phone{" "}
                  <span className="text-zinc-500 dark:text-zinc-500 font-normal">
                    (optional)
                  </span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className={inputClass}
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="budget"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Approximate budget{" "}
                <span className="text-zinc-500 dark:text-zinc-500 font-normal">(optional)</span>
              </label>
              <select
                id="budget"
                name="budget"
                value={form.budget}
                onChange={handleChange}
                className={`${inputClass} cursor-pointer`}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {BUDGET_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                What are you looking to solve?{" "}
                <span className="text-teal-700 dark:text-teal-400" aria-hidden="true">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                aria-required="true"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your business and what you're trying to build or fix."
                className={`${inputClass} resize-none`}
                style={{ fontFamily: "var(--font-inter)" }}
              />
              {errors.message && (
                <p id="message-error" role="alert" className="mt-1.5 text-sm text-red-600" style={{ fontFamily: "var(--font-inter)" }}>
                  {errors.message}
                </p>
              )}
            </div>

            {/* Honeypot — hidden from real users */}
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={handleChange}
              tabIndex={-1}
              aria-hidden="true"
              autoComplete="off"
              style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}
            />

            {serverError && (
              <p
                role="alert"
                className="text-sm text-red-600"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {serverError}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 rounded-[7px] bg-teal-700 dark:bg-teal-400 text-white dark:text-zinc-900 font-medium text-base hover:bg-teal-800 dark:hover:bg-teal-300 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {status === "loading" ? "Sending..." : "Send message"}
            </button>
          </form>
          </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
