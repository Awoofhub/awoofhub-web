"use client";

import Footer from "@/components/footer/Footer";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { HiMinus, HiPlus } from "react-icons/hi";

const faqs = [
  {
    question: "How long does it takes to get my offers running?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    question: "How long does it takes to get my offers running?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "How long does it takes to get my offers running?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "How long does it takes to get my offers running?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "How long does it takes to get my offers running?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "How long does it takes to get my offers running?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "How long does it takes to get my offers running?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "How long does it takes to get my offers running?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "How long does it takes to get my offers running?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "How long does it takes to get my offers running?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
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
      <section className="px-6 md:px-12 xl:px-24 py-16 max-w-[1440px] mx-auto">
        <h2 className="text-primary px-6 py-2 rounded-xl mb-8 font-semibold inline-flex uppercase bg-gray-50 border border-gray-100 shadow-md">
          FAQs
        </h2>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black mb-6 ">
          Most of your frequently asked{" "}
          <span className="text-primary">questions</span> answered
        </h1>
        <p className="text-muted text-base md:text-lg lg:text-xl font-medium max-w-6xl">
          On this page, the AwoofHub team has answered all your questions
          related to the product and services. If you can't find an answer that
          you're looking for, feel free to drop us a line.
        </p>
      </section>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-background my-5">
      <section className="px-6 md:px-12 py-16 max-w-[1440px] mx-auto">
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
        <section className="py-16 px-6 md:px-12 max-w-[1440px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-black mb-8">
            Not resolved? Send us a Message
          </h2>

          {/* Custom Dropdown */}
          <div className="mb-6">
            <label className="block font-baloo text-lg text-black font-medium mb-2">
              Select Category
            </label>
            <div className="relative w-full">
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className={`w-full border border-[#D9D9D9] rounded-lg px-4 py-4 outline-none flex items-center justify-between ${
                  selected ? "text-muted" : "text-muted/50"
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
            <label className="block font-baloo text-lg text-black font-medium mb-2">
              Message
            </label>
            <textarea
              placeholder="Enter your message"
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-[#D9D9D9] text-lg rounded-lg px-4 py-4 text-muted outline-none resize-none"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSend}
              className="bg-primary cursor-pointer text-white font-semibold text-lg px-8 py-3 font-baloo rounded-lg hover:bg-orange-600 transition-colors"
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
