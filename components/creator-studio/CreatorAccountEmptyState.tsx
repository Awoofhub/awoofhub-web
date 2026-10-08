import Link from "next/link";
import { List } from "lucide-react";

export default function CreatorAccountEmptyState() {
  return (
    <section className="flex min-h-[60vh] w-full items-center justify-center px-4 py-16">
      <div className="flex w-full max-w-[700px] flex-col items-center text-center">
        <List className="size-12 text-[#FF5003]" strokeWidth={3} aria-hidden="true" />

        <h2 className="mt-6 text-2xl font-bold text-[#14142B] md:text-[28px]">
          No Bank Account yet
        </h2>

        <p className="mt-2 max-w-[360px] text-base text-neutral-600 md:text-lg">
          Set up your account you would use to receive payouts
        </p>

        <button
          type="button"
          onClick={() => window.location.href = "/creator-studio/payment-settings"}
          className="mt-10 flex h-14 w-full items-center justify-center rounded-md bg-[#FF5003] text-base font-semibold text-white transition hover:bg-[#e04500] md:text-lg"
        >
          Add an account
        </button>
      </div>
    </section>
  );
}