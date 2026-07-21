"use client";
import Footer from "@/components/footer/Footer";
import {
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaFacebookF,
  FaLocationDot,
} from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import Image from "next/image";
import { useState } from "react";

const categories = [
  "Premium & Pricing",
  "FAQs",
  "Account & Security",
  "Privacy Policy",
  "Terms of Service",
];

const topics = [
  {
    icon: "/faq-icon.png",
    title: "FAQs",
    description: "Quick answers to the questions we get asked the most.",
  },
  {
    icon: "/security-icon.png",
    title: "Account & Security",
    description: "How we keep your account — and the community — safe.",
  },
  {
    icon: "/privacy-icon.png",
    title: "Privacy Policy",
    description: "What we collect, why, and how it's protected.",
  },
  {
    icon: "/terms-icon.png",
    title: "Terms of Service",
    description: "The rules that keep AwoofHub fair for everyone.",
  },
  {
    icon: "/community-icon.png",
    title: "Join Community",
    description: "Get verified deals and daily gist straight to your WhatsApp.",
  },
  {
    icon: "/beta-icon.png",
    title: "Still stuck? Message us directly.",
    description: "Choose a category → tell us what's going on → send.",
  },
];

const socials = [
  { id: 0, icon: <FaInstagram />, handle: "@awoofhub" },
  { id: 1, icon: <FaLinkedinIn />, handle: "AwoofHub" },
  { id: 2, icon: <FaXTwitter />, handle: "@awoofhub" },
  { id: 3, icon: <FaFacebookF />, handle: "@awoofhub" },
];

export default function HelpPage() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!selected || !message) return;
    const subject = encodeURIComponent(`Support Request: ${selected}`);
    const body = encodeURIComponent(`Category: ${selected}\n\nMessage: ${message}`);
    window.open(`mailto:mmoses061@gmail.com?subject=${subject}&body=${body}`, "_blank");
  };

  return (
    <main className="bg-white">
      {/* Hero */}
      <div className="bg-background my-5">
        <section className="py-8 md:py-12 lg:py-14 px-4 md:px-6 lg:px-8 xl:px-12 text-center max-w-[1440px] mx-auto">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-black mb-4">
            How can we help you today?
          </h1>
          <p className="text-muted text-base xs:text-lg lg:text-xl font-medium max-w-4xl mx-auto mb-8">
            Whatever's on your mind, we're here for it. Browse FAQs, sort out account issues, or reach the team directly. We're committed to keeping your experience smooth
          </p>
          <div className="flex items-center max-w-2xl mx-auto rounded-2xl overflow-hidden border border-muted/20">
            <input
              type="text"
              placeholder="Search for topics, or questions.."
              className="flex-1 px-4 py-4 text-sm outline-none text-muted"
            />
            <button className="bg-primary w-15 md:w-25 font-semibold flex items-center justify-center py-4 text-white text-xl">
              <FiSearch />
            </button>
          </div>
        </section>
      </div>

      {/* Topics Grid */}
      <div className="bg-background my-5">
        <section className="py-10 md:py-12 lg:py-16 px-4 md:px-6 lg:px-8 xl:px-12 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic) => (
              <div
                key={topic.title}
                className="border border-gray-100 bg-white rounded-xl px-6 py-10 text-center hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="bg-[#F5DBDF] rounded-full inline-flex mb-10">
                  <Image
                    width={60}
                    height={60}
                    src={topic.icon}
                    alt={topic.title}
                    className="w-25 h-25 object-contain"
                  />
                </div>
                <h3 className="font-semibold text-black text-lg md:text-xl mb-2">
                  {topic.title}
                </h3>
                <p className="text-muted font-medium text-base">
                  {topic.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Send a Message */}
      <div className="bg-background my-5">
        <section className="py-10 md:py-12 lg:py-16 px-4 md:px-6 lg:px-8 xl:px-12 max-w-[1440px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-black mb-4 md:mb-8">
            Not resolved? Send us a Message
          </h2>

          {/* Custom Dropdown */}
          <div className="mb-6">
            <label className="block font-baloo text-base md:text-lg text-black font-medium mb-2">
              Select Category
            </label>
            <div className="relative w-full">
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className={`w-full border border-[#D9D9D9] rounded-lg px-4 py-4 outline-none flex items-center justify-between ${selected ? "text-muted text-xs md:text-sm" : "text-muted/50 text-xs md:text-sm"
                  }`}
              >
                {selected || "Select category"}
                <FiChevronDown
                  className={`transition-transform duration-200 ${open ? "rotate-180" : ""
                    }`}
                />
              </button>
              {open && (
                <ul className="absolute z-10 w-full bg-white border border-[#D9D9D9] rounded-lg mt-1 overflow-hidden shadow-md">
                  {categories.map((cat) => (
                    <li
                      key={cat}
                      onClick={() => {
                        setSelected(cat);
                        setOpen(false);
                      }}
                      className="px-4 py-3 text-black cursor-pointer hover:bg-primary hover:text-white transition-colors"
                    >
                      {cat}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label className="block font-baloo text-base md:text-lg text-black font-medium mb-2">
              Message
            </label>
            <textarea
              placeholder="Enter your message"
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-[#D9D9D9] text-xs md:text-sm rounded-lg px-4 py-4 text-muted outline-none resize-none"
            />
          </div>
          <div className="flex justify-center md:justify-end">
            <button
              onClick={handleSend}
              className="bg-primary w-[250px] cursor-pointer text-white font-semibold text-lg px-8 py-3 font-baloo rounded-lg hover:bg-orange-600 transition-colors"
            >
              Send Message
            </button>
          </div>
        </section>
      </div>

      {/* Social Media */}
      <div className="bg-background my-5">
        <section className="py-8 md:py-10 lg:py-16 px-4 md:px-6 lg:px-8 xl:px-12 max-w-[1440px] mx-auto">
          <h2 className="text-2xl xs:text-3xl lg:text-4xl font-semibold text-black mb-10">
            Reach out through Social Media
          </h2>
          <div className="grid grid-cols-2 xs:grid-cols-4 gap-8">
            {socials.map((s) => (
              <div key={s.id} className="flex flex-col gap-2">
                <span className="text-primary text-3xl xs:text-4xl lg:text-5xl">{s.icon}</span>
                <h4 className="text-primary font-normal text-base md:text-lg lg:text-xl">
                  {s.handle}
                </h4>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Contact Info */}
      <div className="bg-background my-5">
        <section className="py-12 px-6 md:px-12 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-8 justify-between">
            <div className="flex flex-col items-start gap-2">
              <div className="flex gap-1 items-center ">
                <FaLocationDot className="w-6 h-6 xs:w-10 xs:h-10" />
                <h5 className="text-xl xs:text-2xl">Location</h5>
              </div>
              <h5 className="font-semibold text-2xl text-gray-900">
                Lagos, Nigeria
              </h5>
            </div>

            <div className="flex flex-col items-start gap-2">
              <div className="flex gap-1 items-center ">
                <IoCall className="w-6 h-6 xs:w-10 xs:h-10" />
                <h5 className="text-xl xs:text-2xl">Call</h5>
              </div>
              <h5 className="font-semibold text-2xl text-gray-900">
                +234 800 333 3330
              </h5>
            </div>

            <div className="flex flex-col items-start gap-2">
              <div className="flex gap-1 items-center ">
                <MdEmail className="w-6 h-6 xs:w-10 xs:h-10" />
                <h5 className="text-xl xs:text-2xl">Email Address</h5>
              </div>
              <h5 className="font-semibold text-2xl text-gray-900">
                supports@awoofhub.com
              </h5>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}