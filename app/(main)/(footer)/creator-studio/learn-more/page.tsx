"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Plus, Minus } from "lucide-react";
import Footer from "@/components/footer/Footer";

const faqs = [
  {
    question: "What is Creator Studio?",
    answer:
      "Creator Studio is a premium feature on AwoofHub that allows eligible creators to track how their Awoofs perform, monitor engagement metrics, understand how the community engages with their content, view performance scores, and earn based on verified performance. Premium users can view their deal grabs, saves, shares, and comments, track their overall performance score, monitor their earnings and payout history.",
  },
  {
    question: "Who can access Creator Studio?",
    answer:
      "Creator Studio is available to users with AwoofHub Premium subscription. An active subscription is required to access the feature and accumulate engagement toward performance-based earnings.",
  },
  {
    question: "How can I earn through Creator Studio?",
    answer:
      "You can qualify for earnings by publishing valuable Awoofs and meeting all five monthly performance benchmarks: Deal Grabs, Saves, Shares, and Comments and 5-star ratings. Your engagement must also satisfy AwoofHub’s verification and payout requirements.",
  },
  {
    question:
      "What are the performance benchmarks, and how is my performance score calculated?",
    answer:
      "Creators must meet all five monthly benchmarks to qualify for earnings. Each metric has a target and a weighting that determines its contribution to your overall performance score.",
  },
  {
    question: "What happens if I meet some benchmarks but miss others?",
    answer:
      "You will not qualify for earnings for that performance period if you fail to meet any one of the five required benchmarks. Strong performance in one metric cannot compensate for a missed benchmark in another. You can use your Creator Studio analytics to identify areas that need improvement.",
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
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <main className="bg-white">
      {/* Header */}
      <section className="bg-[#F6F7F8] mb-2 xs:mb-3 lg:mb-4">
        <div className="mx-auto max-w-[1440px] px-4 pb-6 pt-4 md:px-6 lg:px-8 lg:pb-10 xl:px-12 xs:pt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex cursor-pointer items-center gap-1 text-sm font-bold hover:text-gray-700 xs:text-base"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>

          <div className="mt-4 max-w-6xl lg:mt-6">
            <h1 className="text-2xl xs:text-3xl lg:text-4xl leading-tight font-semibold text-black ">
              Learn how Creator Rewards work
            </h1>
            <p className="mt-2 text-base xs:text-xl lg:text-2xl text-muted font-medium">
              Find answers to common questions about your account, earnings, payouts, and using AwoofHub.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ accordion */}
      <section className="bg-[#F6F7F8]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-6 md:px-6 lg:px-8 lg:py-10 xl:px-12">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.question}
                className="rounded-lg bg-white shadow-md"
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="flex w-full cursor-pointer items-center gap-3 px-4 h-20 xs:h-25 text-left xs:gap-4 xs:px-6 lg:px-8"
                >
                  <span className="shrink-0">
                    {isOpen ? (
                      <Minus className="h-4 w-4 text-[#52BD95] xs:h-5 xs:w-5" />
                    ) : (
                      <Plus className="h-4 w-4 text-[#1B1139] xs:h-5 xs:w-5" />
                    )}
                  </span>
                  <span className="text-sm font-semibold text-black xs:text-base">
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
                    <div className="px-4 pb-5 xs:pl-6 xs:pb-6 lg:pl-8 lg:pb-8">
                      {typeof faq.answer === "string" ? (
                        <p className="text-xs leading-5 text-muted xs:text-sm xs:leading-6 lg:text-base lg:leading-7">
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