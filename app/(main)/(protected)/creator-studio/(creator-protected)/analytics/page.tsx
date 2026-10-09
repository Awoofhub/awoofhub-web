"use client";
import CreatorClicksChart from "@/components/creator-studio/CreatorClicksChart";
import CreatorStats from "@/components/creator-studio/CreatorStats";
import CreatorTopOffers from "@/components/creator-studio/CreatorTopOffers";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AnalyticsPage() {
    const router = useRouter();

    return (
        <section className="bg-white">
            <div className="max-w-[1440px] mx-auto p-4 md:p-6 mb-10 space-y-6">
                <div className=" flex flex-col lg:flex-row gap-2 items-start ">
                    <button 
                    type="button"
                    onClick={() => router.back()}
                    className="flex items-center text-sm text-gray-500 font-baloo font-semibold hover:text-gray-800 mb-2 transition-colors">
                        <ChevronLeft className="w-4 h-4 mr-1" /> Back
                    </button>
                    <div className="flex flex-col">
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Performance Analytics</h1>
                    <p className="text-sm text-gray-500">Track your content reach and engagement across the network.</p>
                    </div>
                </div>
                <CreatorStats />

                <CreatorClicksChart />

                <CreatorTopOffers />

            </div>
        </section>
    );
}
