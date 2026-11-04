"use client";
import CreatorGrabsChart from "@/components/creator-studio/CreatorGrabsChart";
import CreatorStats from "@/components/creator-studio/CreatorStats";
import CreatorTopOffers from "@/components/creator-studio/CreatorTopOffers";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AnalyticsPage() {
    const router = useRouter();

    return (
        <section>
            <div className="pt-6 px-4 md:px-6 lg:px-8 xl:px-12 max-w-[1440px] mx-auto mb-24 lg:mb-10 space-y-4 xs:space-y-6">
                <div>
                    <div className="flex gap-2 items-start ">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="cursor-pointer flex items-center text-black font-baloo font-semibold hover:text-gray-800 mb-2 transition-colors">
                            <ChevronLeft className="w-4 h-4 mr-2" /> Back
                        </button>
                    </div>
                    <div className="mt-2 flex flex-col">
                        <h1 className="text-2xl font-bold text-gray-900">Performance Analytics</h1>
                        <p className="mt-0.5 text-sm xs:text-base text-muted">Track your content reach and engagement across the network.</p>
                    </div>
                </div>
                <CreatorStats />

                <CreatorGrabsChart />

                <CreatorTopOffers />

            </div>
        </section>
    );
}
