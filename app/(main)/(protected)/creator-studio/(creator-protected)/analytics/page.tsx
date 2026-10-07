"use client";
import CreatorClicksChart from "@/components/creator-studio/CreatorClicksChart";
import CreatorStats from "@/components/creator-studio/CreatorStats";
import { ChevronLeft } from "lucide-react";

export default function AnalyticsPage() {

    return (
        <div className="max-w-[1440px] mx-auto p-2 md:p-6 mb-10">
            <button className="flex items-center text-sm text-gray-500 hover:text-gray-800 mb-2 transition-colors">
                <ChevronLeft className="w-4 h-4 mr-1" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Performance Analytics</h1>
            <p className="text-sm text-gray-500">Track your content reach and engagement across the network.</p>

            <CreatorStats />

            <CreatorClicksChart />

        </div>
    );
}
