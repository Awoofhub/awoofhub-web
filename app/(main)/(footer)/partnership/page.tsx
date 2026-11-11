import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import Footer from "@/components/footer/Footer";

const CONTACT_EMAIL = "partnerships@awoofhub.ng";

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

const logoRows: { src: string; alt: string }[][] = [
  [
    { src: "/temu.png", alt: "Temu" },
    { src: "/Zara.png", alt: "Zara" },
    { src: "/dhl.png", alt: "DHL" },
    { src: "/Chanel.png", alt: "Chanel" },
    { src: "/YouTube.png", alt: "YouTube" },
    { src: "/tiktok.png", alt: "TikTok" },
    { src: "/Netflix.png", alt: "Netflix" },
    { src: "/facebook.png", alt: "Facebook" },
    { src: "/Google.png", alt: "Google" },
    { src: "/Shopify.png", alt: "Shopify" },
    { src: "/Netflix.png", alt: "Netflix" },
  ],
  [
    { src: "/Gucci.png", alt: "Gucci" },
    { src: "/FedEx.png", alt: "FedEx" },
    { src: "/Upwork.png", alt: "Upwork" },
    { src: "/temu.png", alt: "Temu" },
    { src: "/Zara.png", alt: "Zara" },
    { src: "/FedEx.png", alt: "FedEx" },
    { src: "/dhl.png", alt: "DHL" },
    { src: "/Gucci.png", alt: "Gucci" },
    { src: "/Canva.png", alt: "Canva" },
    { src: "/Figma.png", alt: "Figma" },
  ],
];

export default function PartnershipPage() {
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
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-sm bg-[#FF4A00] px-12 text-base font-semibold text-white hover:bg-[#e04200] sm:w-auto sm:min-w-[270px] lg:min-w-[400px]"
            >
              Send Message
            </a>
          </div>

          <div className="relative mx-auto h-[260px] w-full max-w-[420px] sm:h-[320px] md:h-[380px]">
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

      {/* Brand logos */}
      <section className="bg-white">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 py-10 sm:px-8 lg:gap-12 lg:px-10 lg:py-14">
          {logoRows.map((row,rowindex) => (
            <ul
              key={rowindex}
              className={`flex flex-wrap items-center justify-center gap-x-8 gap-y-6 lg:flex-nowrap lg:justify-between ${
                rowindex === 1 ? "lg:px-12" : ""
              }`}
            >
              {row.map((logo, logoindex) => (
                <li key={`${logo.alt}-${logoindex}`}>
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={120}
                    height={48}
                    className="h-8 w-auto object-contain sm:h-10 lg:h-12"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* Key benefits */}
      <section>
        <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-20 lg:py-16">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Key <span className="text-[#FF4A00]">benefits?</span>
          </h2>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
            <div className="relative hidden min-h-[300px] overflow-hidden rounded-2xl bg-white sm:block lg:min-h-[360px]">
              <Image
                src="/partnerdeal.png"
                alt="Partners meeting in a lobby"
                fill
                className="object-contain p-4"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col items-center justify-center rounded-xl bg-white px-6 py-8 text-center shadow-sm"
                >
                  <h3 className="text-lg font-semibold sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base leading-6 text-gray-600 sm:text-lg">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact info */}
      <section className="bg-[#F6F7F9]">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 lg:px-20 lg:py-14">
          <div>
            <div className="flex items-center gap-4">
              <Mail className="h-7 w-7 shrink-0" />
              <span className="text-xl sm:text-2xl">Email Address</span>
            </div>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-4 block break-words text-xl font-semibold sm:text-2xl lg:text-3xl"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <div>
            <div className="flex items-center gap-4">
              <Phone className="h-7 w-7 shrink-0" />
              <span className="text-xl sm:text-2xl">Call</span>
            </div>
            <a
              href="tel:+2348003333330"
              className="mt-4 block text-xl font-semibold sm:text-2xl lg:text-3xl"
            >
              +234 800 333 3330
            </a>
          </div>

          <div>
            <div className="flex items-center gap-4">
              <MapPin className="h-7 w-7 shrink-0" />
              <span className="text-xl sm:text-2xl">Location</span>
            </div>
            <p className="mt-4 text-xl font-semibold sm:text-2xl lg:text-3xl">
              Lagos, Nigeria
            </p>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}