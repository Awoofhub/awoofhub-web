import Footer from "@/components/footer/Footer";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

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
        <div className="mx-auto grid max-w-[1440px] items-start gap-10 px-5 py-10 sm:px-8 md:grid-cols-2 lg:px-20 lg:py-16">
          <div>
            <span className="inline-block rounded-lg bg-white px-4 py-3 text-xs font-semibold tracking-wide text-[#FF4A00] shadow-sm sm:text-sm">
              PARTNERSHIP
            </span>
            <h1 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl">
              Become an <span className="text-[#FF4A00]">Awoof</span>Hub
              partner!
            </h1>
            <p className="mt-5 max-w-[640px] text-lg leading-8 text-gray-600 sm:text-xl lg:leading-9">
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
          {logoRows.map((row, rowindex) => (
            <ul
              key={rowindex}
              className={`flex flex-wrap items-center justify-center gap-x-8 gap-y-6 lg:flex-nowrap lg:justify-between ${rowindex === 1 ? "lg:px-12" : ""
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
        <div className="px-4 md:px-6 lg:px-8 xl:px-12">
          <div className="my-5 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-8 justify-between">
             <div className="flex flex-col items-start gap-2">
              <div className="flex gap-1 items-center ">
                <MdEmail className="w-6 h-6 xs:w-10 xs:h-10" />
                <h5 className="text-xl xs:text-2xl">Email Address</h5>
              </div>
              <h5 className="font-semibold text-2xl text-gray-900">
                 {CONTACT_EMAIL}
              </h5>
            </div>

            <div className="flex flex-col items-start gap-2">
              <div className="flex gap-1 items-center ">
                <IoCall className="w-6 h-6 xs:w-10 xs:h-10" />
                <h5 className="text-xl xs:text-2xl">Call</h5>
              </div>
              <h5 className="font-semibold text-2xl text-gray-900">
                +234 903 784  8773
              </h5>
            </div>

            <div className="flex flex-col items-start gap-2">
              <div className="flex gap-1 items-center ">
                <FaLocationDot className="w-6 h-6 xs:w-10 xs:h-10" />
                <h5 className="text-xl xs:text-2xl">Location</h5>
              </div>
              <h5 className="font-semibold text-2xl text-gray-900">
                Lagos, Nigeria
              </h5>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}