"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Plus, Minus } from "lucide-react";
import Footer from "@/components/footer/Footer";

const faqs = [
  {
    question: "What is Creator Studio?",
    answer:
      "Creator Studio is a premium feature on AwoofHub that allows eligible creators to track how their Awoofs perform, monitor engagement metrics, understand how the community engages with their content, view performance scores, and earn based on verified performance. Premium users can view their deal grabs, saves, shares, and comments, track their overall performance score, monitor their earnings, and review their payout history.",
  },
  {
    question: "Who can access Creator Studio?",
    answer:
      "Creator Studio is available to users with AwoofHub Premium subscription. An active subscription is required to access the feature and accumulate engagement toward performance-based earnings.",
  },
  {
    question: "How can I earn through Creator Studio?",
    answer:
      "You can qualify for earnings by publishing valuable Awoofs and meeting all four monthly performance benchmarks: Deal Grabs, Saves, Shares, and Comments. Your engagement must also satisfy AwoofHub’s verification and payout requirements.",
  },
  {
    question:
      "What are the performance benchmarks, and how is my performance score calculated?",
    answer:
      "Creators must meet all four monthly benchmarks to qualify for earnings. Each metric has a target and a weighting that determines its contribution to your overall performance score.",
  },
  {
    question: "What happens if I meet some benchmarks but miss others?",
    answer:
      "You will not qualify for earnings for that performance period if you fail to meet any one of the four required benchmarks. Strong performance in one metric cannot compensate for a missed benchmark in another. You can use your Creator Studio analytics to identify areas that need improvement.",
  },

  {
    question: "What happens if my premium subscription expires?",
    answer:
      "When your eligible Premium subscription expires, your accumulated Creator Studio engagement metrics and performance progress are automatically cleared. The engagement recorded before expiry will no longer count toward earnings, and you will not receive earnings based on that cleared engagement. You must have an active eligible subscription to accumulate engagement toward future earnings.",
  },
  {
    question:
      "What happens if I stop posting Awoofs or become inactive for a while?",
    answer:
      "If you stop posting or become inactive, you may not generate enough engagement to meet the required monthly benchmarks. You will only qualify for earnings if you meet all the required benchmarks and satisfy the applicable eligibility rules. If your subscription expires during your inactivity, your accumulated engagement and performance progress will be automatically cleared.",
  },
 
  {
    question: "When and how will I receive my earnings?",
    answer:
      "Eligible creators are paid monthly, directly into the bank account associated with the account details they provide in Creator Studio. You are responsible for ensuring that your account details are accurate and valid. All payouts are subject to performance verification and confirmation of eligibility.",
  },
];

export default function CreatorStudioPage() {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-[#F5F6F8] px-4 pb-10 pt-10 sm:px-8 sm:pb-16 sm:pt-20 lg:px-20 lg:pb-20 lg:pt-12">
        <button
          type="button"
          onClick={() => router.back()}
          className="hidden items-center gap-1 text-sm font-semibold text-[#1F2937] hover:opacity-70 lg:flex"
        >
          <ChevronLeft size={16} />
          Back
        </button>

        <div className="max-w-4xl lg:mt-4 lg:pl-16">
          <h1 className="text-base font-semibold text-[#0F0F10] sm:text-3xl sm:font-bold">
            Creator Studio — Frequently Asked Questions
          </h1>
          <p className="mt-4 text-xs leading-5 text-[#6B7280] sm:mt-5 sm:text-2xl sm:leading-9 lg:mt-6 lg:text-xl lg:leading-8">
            Got questions about earning on AwoofHub? Find answers to the most
            common questions about contributing deals, engagement, rewards, and
            payouts.
          </p>
        </div>
      </section>

      {/* FAQ accordion */}
      <section className="bg-[#F5F6F8] px-4 pb-10 sm:px-8 sm:pb-12 lg:px-16 lg:pb-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.question}
                className="rounded-lg bg-white shadow-[0_4px_14px_rgba(15,23,42,0.08)] lg:rounded-md"
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="flex w-full items-center gap-3 px-4 py-5 text-left sm:gap-9 sm:px-9 sm:py-8 lg:gap-6 lg:px-8 lg:py-7"
                >
                  <span className="shrink-0">
                    {isOpen ? (
                      <Minus className="h-3.5 w-3.5 text-[#FF4D00] sm:h-5 sm:w-5 sm:text-[#4FD1C5]" />
                    ) : (
                      <Plus className="h-3.5 w-3.5 text-[#2D2A4A] sm:h-5 sm:w-5" />
                    )}
                  </span>
                  <span className="text-[13px] font-semibold leading-5 text-[#1F1B3A] sm:text-lg lg:text-base">
                    {faq.question}
                  </span>
                </button>

                <div
                  id={`faq-panel-${i}`}
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pb-6 sm:px-9 sm:pb-12 lg:px-8 lg:pb-10">
                      {typeof faq.answer === "string" ? (
                        <p className="text-xs leading-5 text-[#6B7280] sm:text-lg sm:leading-7">
                          {faq.answer}
                        </p>
                      ) : (
                        faq.answer
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}
