"use client";

import { useState } from "react";
import Link from "next/link";
import { FiCheck, FiX } from "react-icons/fi";
import { HiMinus, HiPlus } from "react-icons/hi";
import Footer from "@/components/footer/Footer";

const freePlanFeatures = [
  { text: "Customer Support", included: true },
  { text: "Free User Account", included: true },
  { text: "Monthly Reports", included: false },
  { text: "Multiple Devices", included: false },
];

const premiumPlanFeatures = [
  { text: "Customer Support", included: true },
  { text: "Upto 10 businesses", included: true },
  { text: "Monthly Reports", included: true },
  { text: "Multiple Devices Supported", included: true },
];

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
];

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="bg-white">
      {/* Why Premium */}
      <div className="bg-background my-5">
        <section className="px-6 md:px-12 py-16 max-w-[1440px] mx-auto">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-semibold text-black mb-4">
              Why <span className="text-primary">Premium</span>?
            </h1>
            <p className="text-muted text-lg md:text-xl font-medium max-w-2xl">
              Premium members get priority visibility, advanced discovery tools,
              and exclusive features built to help you grow faster and connect
              deeper.
            </p>
          </div>
        </section>
      </div>

      {/* Our Pricing Plans */}
      <div className="bg-background my-5">
        <section className="px-6 md:px-12 py-16 max-w-[1440px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-4">
            Our Pricing Plans
          </h2>
          <p className="text-muted text-center text-base md:text-xl font-medium mb-12 max-w-5xl mx-auto">
            Simple, transparent pricing designed for every stage. Whether you're
            just getting started or scaling up, there's a plan that fits.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch max-w-3xl mx-auto">
            {/* Free Plan */}
            <div className="flex-1 shadow-sm bg-white rounded-2xl p-8 flex flex-col">
              <h2 className="text-primary font-medium text-base uppercase mb-4">
                Free Plan
              </h2>
              <div className="flex items-end gap-1 mb-4">
                <span className="text-4xl md:text-6xl font-baloo font-bold text-black">
                  $0
                </span>
                <span className="font-baloo font-bold text-black text-sm mb-2">
                  Per month
                </span>
              </div>
              <p className="text-muted text-sm font-medium mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <hr className="border-muted/20 mb-8" />
              <ul className="space-y-6 mb-8 flex-grow">
                {freePlanFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${feature.included ? "bg-primary" : "bg-[#FF695452]"}`}
                    >
                      {feature.included ? (
                        <FiCheck className="text-white w-3 h-3" />
                      ) : (
                        <FiX className="text-white w-3 h-3" />
                      )}
                    </span>
                    <span
                      className={`text-sm font-montserrat font-medium ${feature.included ? "text-muted" : "text-[#8593A3]"}`}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="w-full py-3 border border-primary text-primary shadow-lg font-semibold rounded-full text-center hover:bg-orange-50 transition-colors"
              >
                Join for free
              </Link>
            </div>

            {/* Premium Plan */}
            <div className="flex-1 bg-primary rounded-2xl p-8 flex flex-col">
              <h2 className="text-white font-medium text-base uppercase mb-4">
                Premium Plan
              </h2>
              <div className="flex items-end gap-1 mb-4">
                <span className="text-4xl md:text-6xl font-baloo font-bold text-white">
                  $55
                </span>
                <span className="text-white font-baloo font-bold text-sm mb-2">
                  Per month
                </span>
              </div>
              <p className="text-white text-sm font-medium mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <hr className="border-white mb-8" />
              <ul className="space-y-6 mb-8 flex-grow">
                {premiumPlanFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                      <FiCheck className="text-primary w-3 h-3" />
                    </span>
                    <span className="text-sm font-montserrat font-medium text-white">
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 bg-white shadow-lg text-black font-semibold rounded-full hover:bg-gray-100 transition-colors">
                Get the premium
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* FAQs */}
      <div className="bg-background my-5">
        <section className="px-6 md:px-12 py-16 max-w-[1440px] mx-auto">
          <h2 className="text-2xl md:text-4xl font-semibold mb-2">FAQs</h2>
          <p className="text-muted text-base md:text-lg lg:text-xl font-medium mb-8">
            Your questions on our premium features answered.
          </p>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-sm overflow-hidden shadow-md"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center gap-6 px-6 py-8 text-left hover:bg-gray-50 transition-colors"
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
                  <div className="px-6 pb-8">
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
      <Footer />
    </main>
  );
}
