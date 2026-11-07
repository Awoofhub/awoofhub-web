"use client";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown, Mail, MapPin, Phone } from "lucide-react";
import { showToast } from "@/components/toast/Toast";
import { useHelpAndSupport } from "@/features/help-and-support/useHelpAndSupport";
import Footer from "@/components/footer/Footer";

const benefits = [
  {
    title: "Reach the right audience",
    text: "Connect with people looking for deals and discounts.",
  },
  {
    title: "Boost offer visibility",
    text: "Showcase your deals, products, and promotions.",
  },
  {
    title: "Measure performance",
    text: "Track engagement and campaign results where available.",
  },
  {
    title: "Build partnerships",
    text: "Explore campaign and collaboration opportunities.",
  },
];

const subjects = [
  "Advertising",
  "Sponsored offers",
  "Brand collaboration",
  "Business listing",
  "Other",
];

const contacts = [
  {
    icon: Mail,
    label: "Email Address",
    value: "partnerships@awoofhub.ng",
    href: "mailto:partnerships@awoofhub.ng",
  },
  {
    icon: Phone,
    label: "Call",
    value: "+234 800 333 3330",
    href: "tel:+2348003333330",
  },
  { icon: MapPin, label: "Location", value: "Lagos, Nigeria" },
];

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-4 text-base outline-none placeholder:text-gray-400 focus:border-[#FF4A00]";

export default function PartnershipPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { submit, isPending: sending } = useHelpAndSupport({
    onSuccess: () => {
      showToast("success", "Your partnership message has been sent.");
      setForm({ name: "", email: "", subject: "", message: "" });
    },
  });

  const update =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submit({
      name: form.name.trim(),
      email: form.email.trim(),
      category: form.subject,
      message: form.message.trim(),
    });
  }

  return (
    <div className="bg-[#F6F7F9]">
      {/* Hero */}
      <section>
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-10 sm:px-8 md:grid-cols-2 lg:px-20 lg:py-16">
          <div>
            <span className="inline-block rounded-lg bg-white px-4 py-3 text-xs font-semibold tracking-wide text-[#FF4A00] shadow-sm sm:text-sm">
              PARTNERSHIP
            </span>
            <h1 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Become an <span className="text-[#FF4A00]">Awoof</span>Hub
              partner!
            </h1>
            <p className="mt-5 max-w-[640px] text-lg leading-8 text-gray-600 sm:text-xl lg:text-2xl lg:leading-9">
              Put your business in front of more potential customers, and grow
              your audience. Great deals deserve a bigger audience, join us and
              let&apos;s make more happen together.
            </p>
            <a
              href="#contact-form"
              className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-sm bg-[#FF4A00] px-12 text-base font-semibold text-white hover:bg-[#e04200] sm:w-auto sm:min-w-[270px]"
            >
              Send Message
            </a>
          </div>

          <div className="relative mx-auto h-[260px] w-full max-w-[420px] sm:h-[320px] md:h-[360px]">
            <Image
              src="/partner.png"
              alt="Two business partners shaking hands in front of a chart"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Key benefits */}
      <section className="bg-[#F6F7F9]">
        <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-20 lg:py-16">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Key <span className="text-[#FF4A00]">benefits?</span>
          </h2>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
            <div className="relative hidden min-h-[300px] overflow-hidden rounded-2xl bg-white sm:block lg:min-h-[340px]">
              <Image
                src="/partnerdeal.png"
                alt="Partners meeting in a lobby"
                fill
                className="object-contain p-4"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="flex flex-col items-center justify-center rounded-xl bg-white px-6 py-8 text-center shadow-sm"
                >
                  <h3 className="text-lg font-semibold sm:text-xl">
                    {b.title}
                  </h3>
                  <p className="mt-3 text-base leading-6 text-gray-600 sm:text-lg">
                    {b.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="contact-form" className="scroll-mt-24 bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-24 lg:py-16">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Send us a <span className="text-[#FF4A00]">direct message</span> to
            become our partner
          </h2>

          <form onSubmit={onSubmit} className="mt-10 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block font-medium">
                  Name
                </label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={update("name")}
                  placeholder="John Debby"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block font-medium">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@email.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="mb-2 block font-medium">
                Subject
              </label>
              <div className="relative">
                <select
                  id="subject"
                  required
                  value={form.subject}
                  onChange={update("subject")}
                  className={`${inputClass} appearance-none pr-12 ${
                    form.subject ? "text-black" : "text-gray-400"
                  }`}
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  {subjects.map((s) => (
                    <option key={s} value={s} className="text-black">
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block font-medium">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={form.message}
                onChange={update("message")}
                placeholder="Enter your message"
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={sending}
                className="h-12 w-full rounded-sm bg-[#FF4A00] text-base font-semibold text-white hover:bg-[#e04200] disabled:opacity-60 sm:w-[390px]"
              >
                {sending ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Contact info */}
      <section>
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 lg:px-20 lg:py-14">
          {contacts.map(({ icon: Icon, label, value, href }) => (
            <div key={label}>
              <div className="flex items-center gap-4">
                <Icon className="h-7 w-7 shrink-0" />
                <span className="text-xl sm:text-2xl">{label}</span>
              </div>
              {href ? (
                <a
                  href={href}
                  className="mt-4 block break-words text-xl font-semibold sm:text-2xl lg:text-3xl"
                >
                  {value}
                </a>
              ) : (
                <p className="mt-4 text-xl font-semibold sm:text-2xl lg:text-3xl">
                  {value}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
        <Footer />
    </div>
  );
}