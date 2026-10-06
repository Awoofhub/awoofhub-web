"use client";

import CreatorNotSubscribed from "@/components/creator-studio/CreatorNotSubscribed";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ContributorPage() {
  const router = useRouter();
  return (
    <div className="max-w-[1440px] mx-auto p-2 md:p-6 mb-10">
      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm xs:text-lg font-baloo font-semibold mb-4"
      >
        <ChevronLeft size={16} /> Back
      </button>
      <CreatorNotSubscribed />
    </div>
  );
}
