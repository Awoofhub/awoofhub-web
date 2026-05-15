import Footer from "@/components/footer/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaFacebookF,
} from "react-icons/fa6";

const socials = [
  { id: 0, icon: <FaInstagram />, handle: "@awoofhub" },
  { id: 1, icon: <FaLinkedinIn />, handle: "AwoofHub" },
  { id: 2, icon: <FaXTwitter />, handle: "@awoofhub" },
  { id: 3, icon: <FaFacebookF />, handle: "@awoofhub" },
];

export default function GetInvolved() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <div className="bg-background my-5">
        <section className="px-6 md:px-12 py-8 max-w-[1440px] mx-auto text-center">
          <h2 className="text-primary px-6 py-2 rounded-xl mb-8 font-semibold inline-flex uppercase bg-gray-50 border border-gray-100 shadow-md">
            Community
          </h2>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black mb-6">
            Join the <span className="text-primary">Awoof</span> Community!
          </h1>
          <p className="text-muted text-base md:text-lg lg:text-xl font-medium max-w-5xl mx-auto mb-8">
            Stay updated on the latest verified deals and trending offers.
            Connect with members, share experiences, and keep the conversation
            going. The AwoofHub community is where questions get answered and
            ideas take off.
          </p>
          <Link
            href="https://slack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-12 py-2 font-baloo bg-primary text-base md:text-lg lg:text-xl text-white font-semibold rounded-md hover:bg-orange-600 transition-colors mb-6"
          >
            Join us on Slack
          </Link>

          {/* Illustration */}
          <div className="flex justify-center mt-6">
            <Image
              src="/community.png"
              alt="Community illustration"
              width={800}
              height={700}
              className="w-full max-w-4xl h-auto"
            />
          </div>
        </section>
      </div>

      {/* Get Involved */}
        <section className="px-6 md:px-12 py-16 max-w-[1440px] mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-semibold text-black mb-6">
            Get Involved
          </h2>
          <p className="text-muted text-base md:text-lg lg:text-xl font-medium max-w-5xl mx-auto mb-10">
            Whether you're hunting for the best deals or looking to put your
            business in front of the right people, AwoofHub is built for you.
            Join a growing community of smart shoppers discovering verified
            discounts, giveaways, and offers from businesses that actually
            deliver.
          </p>
          <Link
            href="https://slack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-12 py-2 font-baloo bg-primary text-base md:text-lg lg:text-xl text-white font-semibold rounded-md hover:bg-orange-600 transition-colors mb-12"
          >
            Join us on Slack
          </Link>
        </section>

      {/* Social Media */}
      <div className="bg-background my-5">
        <section className="py-16 px-6 md:px-12 max-w-[1440px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-black mb-10">
            Connect with us:
          </h2>
          <div className="flex flex-wrap gap-16">
            {socials.map((s) => (
              <div key={s.id} className="flex flex-col gap-2">
                <span className="text-primary text-3xl">{s.icon}</span>
                <h4 className="text-primary font-normal text-lg">{s.handle}</h4>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
