"use client";
import Footer from "@/components/footer/Footer";
import {
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaFacebookF,
} from "react-icons/fa6";

import { useState } from "react";
import { Bell } from "lucide-react";

const socials = [
  { id: 0, icon: <FaInstagram />, handle: "@awoofhub" },
  { id: 1, icon: <FaLinkedinIn />, handle: "AwoofHub" },
  { id: 2, icon: <FaXTwitter />, handle: "@awoofhub" },
  { id: 3, icon: <FaFacebookF />, handle: "@awoofhub" },
];

export default function AdvertisingPage() {
   const [enabled, setEnabled] = useState(false);
  return (
    <main className="bg-white">
      <div className="bg-background py-8 md:py-10 lg:py-16 px-4 md:px-6 lg:px-8 xl:px-12 max-w[1440px] ">
        <section className=" max-w-[1222px] mx-auto">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-black mb-4">
            Advertise with <span className="text-primary">Awoof</span>Hub!
          </h1>
          <h4 className="flex flex-col gap-4 loading-6 text-sm md:text-lg lg:text-xl text-muted font-[600] font-montserrat">
            <span className="italic text-black">Coming soon!</span>
            <span className="font-[500]">
              Every day, more Awoofers open the app looking for one thing — a
              deal worth their money. Soon, businesses will be able to put their
              offers directly in front of that audience: not random reach, but
              people already in a buying mood.
            </span>
            <span className="font-[500]">
              We&apos;re still shaping what this looks like. If you want early
              access or a heads-up the moment it&apos;s live, let us know below.
            </span>
            <span className="text-primary">Notify me when this launched</span>
          </h4>

          <div className="my-6 py-2 px-3 md:py-1 md:px-2 lg:py-1 lg:px-4 bg-[#FFF6F2] lg:max-w-[674px] md:max-w-[509px] max-auto">
            <section className="flex justify-center items-center gap-3 md:gap-4 lg:gap-5">
              {/* Bell icon */}
              <Bell
                className="w-8 h-8 md:w-10 md:h-10 lg:w- text-gray-900 shrink-0"
                strokeWidth={1.8}
              />

              {/* Text */}
              <div className="flex-1">
                <p className=" text-sm md:text-xl lg:text-2xl font-semibold font-baloo text-gray-900">Notify me</p>
                <p className="text-sm md:text-lg lg:text-2xl font-baloo text-gray-500 font[400]">
                  Allow these updates delivered to your email
                </p>
              </div>
              {/* Toggle switch */}
              <button
                type="button"
                role="switch"
                aria-checked={enabled}
                onClick={() => setEnabled((prev) => !prev)}
                className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400
            ${enabled ? "bg-primary" : "bg-gray-300"}`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out
              ${enabled ? "translate-x-6" : "translate-x-1"}`}
                />
              </button>
            </section>
          </div>
        </section>
      </div>

      {/* Social Media */}
      <div className="bg-background my-5 py-8 md:py-10 lg:py-16 px-4 md:px-6 lg:px-8 xl:px-12 ">
        <section className=" max-w-[1288px] mx-auto">
          <h2 className="text-2xl xs:text-3xl lg:text-4xl font-semibold text-black mb-10">
            Connect with us:
          </h2>
          <div className="grid grid-cols-2 xs:grid-cols-4 gap-8">
            {socials.map((s) => (
              <div key={s.id} className="flex flex-col gap-2">
                <span className="text-primary text-3xl xs:text-4xl lg:text-5xl">
                  {s.icon}
                </span>
                <h4 className="text-primary font-normal text-base md:text-lg lg:text-xl">
                  {s.handle}
                </h4>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
