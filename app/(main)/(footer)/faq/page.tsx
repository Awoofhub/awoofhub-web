"use client";

import Footer from "@/components/footer/Footer";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { HiMinus, HiPlus } from "react-icons/hi";

const faqs = [
  {
    question: "What is Awoofhub?",
    answer:
      "AwoofHub is a centralized marketplace where you can discover verified deals, discounts, promos, and freebies from businesses across Nigeria — all in one place. Instead of hunting for offers, the deals come to you.",
  },
  {
    question: "How do I redeem a deal on AwoofHub?",
    answer:
      " Each deal comes with clear step-by-step instructions to guide you through the redemption process. Depending on the offer, you may need to copy a promo code, click a redemption link, use a USSD code, or complete an action on a partner platform.",
  },
  {
    question: "Are the deals on AwoofHub verified?",
    answer:
      "Yes. Our team actively reviews and moderates deals before they are published. We also use community feedback and user confirmations to identify active deals, expired, or potentially misleading.",
  },
  {
    question: "How do I find deals on AwoofHub?",
    answer:
      "Simply browse or search by category, location, or business name on our web platform or mobile app (available on iOS and Android). You can also set preferences so we surface the most relevant deals for you automatically.",
  },
  {
    question: "How can my business post deals on AwoofHub?",
    answer:
      "Getting started is easy. Create a business account on AwoofHub, submit your deal or promo for review, and once verified, it goes live to thousands of deal-seekers. It's a fast, affordable way to drive traffic and boost sales.",
  },
  {
    question: "Is AwoofHub free to use?",
    answer:
      "Yes — browsing and discovering deals on AwoofHub is completely free for users. For businesses, we offer flexible listing plans to suit different budgets and marketing goals. Visit our pricing page or contact us to learn more.",
  },
  {
    question: "How often are new deals added?",
    answer:
      "New deals and promos are added regularly based on merchant submissions, trending offers, community discoveries, and verified opportunities across different categories. We recommend checking the platform frequently so you don’t miss limited-time offers.",
  },
  {
    question: "Can I share deals with my friends and family?",
    answer:
      " Absolutely. Every deal on AwoofHub has a share option so you can send great offers to the people you care about via WhatsApp, social media, or a direct link. Good deals are better when shared!",
  },
  {
    question: "What should I do if I find a fake or expired deal?",
    answer:
      "You can report any suspicious, expired, or misleading deals directly from the deal page. Our moderation team reviews reports quickly to maintain a safe and trusted experience for all users.",
  },
  {
    question: "How do I contact AwoofHub support?",
    answer:
      "You can reach us via email at support@awoofhub.online, DM us on Instagram or Facebook. We typically respond within 24 hours.",
  },
];

const categories = [
  "Premium & Pricing",
  "FAQs",
  "Account & Security",
  "Privacy Policy",
  "Terms of Service",
];

export default function FAQs() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!selected || !message) return;
    const subject = encodeURIComponent(`Support Request: ${selected}`);
    const body = encodeURIComponent(
      `Category: ${selected}\n\nMessage: ${message}`,
    );
    window.open(
      `mailto:mmoses061@gmail.com?subject=${subject}&body=${body}`,
      "_blank",
    );
  };

  return (
    <main className="bg-white">
      {/* Hero */}
      <div className="bg-background my-5">
        <section className="px-6 md:px-12 xl:px-24 py-8 md:py-12 lg:py-16 max-w-[1440px] mx-auto">
          <h2 className="text-primary text-sm xs:text-base hidden px-6 py-2 rounded-xl mb-8 font-semibold lg:inline-flex uppercase bg-gray-50 border backdrop-blur-3xl border-gray-100 shadow-md">
            FAQs
          </h2>
          <h1 className="text-3xl text-center lg:text-start md:text-4xl lg:text-5xl font-semibold text-black mb-4 md:mb-6 ">
            Most of your frequently asked{" "}
            <span className="text-primary">questions</span> answered
          </h1>
          <p className="text-muted text-center lg:text-start text-base md:text-lg lg:text-xl font-medium max-w-6xl">
            On this page, the AwoofHub team has answered all your questions
            related to the product and services. If you can't find an answer
            that you're looking for, feel free to drop us a line.
          </p>
        </section>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-background my-5">
        <section className="px-4 md:px-6 lg:px-8 xl:px-12 py-8 md:py-12 lg:py-16 max-w-[1440px] mx-auto">
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-sm overflow-hidden shadow-md"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center gap-4 px-6 py-8 text-left hover:bg-gray-50 transition-colors"
                >
                  {openFaq === index ? (
                    <HiMinus className="text-[#52BD95] w-5 h-5 flex-shrink-0" />
                  ) : (
                    <HiPlus className="text-[#1B1139] w-5 h-5 flex-shrink-0" />
                  )}
                  <span className="font-semibold font-baloo text-black text-base md:text-lg">
                    {faq.question}
                  </span>
                </button>

                {openFaq === index && (
                  <div className="px-6 pb-8 pl-14">
                    <p className="text-muted text-sm md:text-base font-medium">
                      {faq.answer}
                    </p>
                  </div>
                )}
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
                className={`w-full border border-[#D9D9D9] rounded-lg px-4 py-4 outline-none flex items-center justify-between ${
                  selected ? "text-muted text-xs md:text-sm" : "text-muted/50 text-xs md:text-sm"
                }`}
              >
                {selected || "Select category"}
                <FiChevronDown
                  className={`transition-transform duration-200 ${
                    open ? "rotate-180" : ""
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
      <Footer />
    </main>
  );
}
