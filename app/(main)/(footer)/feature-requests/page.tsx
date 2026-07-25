"use client";

import Footer from "@/components/footer/Footer";
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

export default function FeatureRequest() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <div className="bg-background my-5">
      <section className="px-6 md:px-12 py-8 md:py-10 lg:py-16 max-w-[1440px] mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold text-black mb-4 md:mb-6">
          Got a <span className="text-primary">Feature</span> Request?
        </h1>
        <p className="text-muted text-base md:text-lg lg:text-xl font-medium  mb-4 md:mb-6">
         Got an idea that would make AwoofHub better? We're building this with Awoofers, not just for them, so if something's missing, annoying, or could just work smarter, we want to hear it.
        </p>
        <p className="font-semibold text-black text-base md:text-lg lg:text-xl mb-4 md:mb-6">
          Share your idea in the feedback form below.  
        </p>
        <p className="text-muted text-base md:text-lg lg:text-xl font-medium mb-4 md:mb-6">
          Not every idea makes it in, but every idea gets read. The best ones come from people actually using the app every day — that's you.
        </p>
        <p className="text-primary font-semibold text-base md:text-lg lg:text-xl">
          AwoofHub is built by its community. Help us build it right.
        </p>
      </section>
      </div>

      {/* Feature Request Form */}
      <div className="bg-background my-5">
      <section className="px-6 md:px-12 py-8 md:py-10 lg:py-16 max-w-[1440px] mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-black mb-8">
          Feature request form
        </h2>

        <div className="space-y-6">
          {/* Feature input */}
          <div>
            <label className="block font-baloo text-base md:text-lg font-medium text-black mb-1">
              Which feature are you missing?
            </label>
            <input
              type="text"
              placeholder="Your feature request"
              className="w-full p-4 border border-[#D9D9D9] rounded-md text-xs md:text-sm font-montserrat outline-none focus:border-primary transition-colors placeholder:text-muted/50"
            />
          </div>

          {/* Problem textarea */}
          <div>
            <label className="block font-baloo text-base md:text-lg font-medium text-black mb-1">
              What problem would it solve for you?
            </label>
            <textarea
              placeholder="Describe your ultimate goal for this feature"
              rows={5}
              className="w-full p-4 border border-[#D9D9D9] rounded-md text-xs md:text-sm font-montserrat outline-none focus:border-primary transition-colors placeholder:text-muted/50 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button className="w-full py-3 bg-primary font-baloo text-white font-semibold text-base rounded-md hover:bg-orange-600 transition-colors">
            Submit
          </button>
        </div>
      </section>
      </div>

      {/* Social Media */}
      <div className="bg-background my-5">
        <section className="py-8 md:py-10 lg:py-16 px-6 md:px-12 max-w-[1440px] mx-auto">
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
