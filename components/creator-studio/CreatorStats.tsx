import { useState } from "react";
import CreatorStatsCards from "./CreatorStatsCards";
import CreatorStatsTabs from "./CreatorStatsTabs";

export default function CreatorStats() {

    const [dateFilter, setDateFilter] = useState<string>("day");

    const periods = [
        { label: 'Day', value: 'day' },
        { label: 'Week', value: 'week' },
        { label: '1 Month', value: 'month' },
        { label: '3 Months', value: '3months' },
        { label: '1 Year', value: 'year' },
    ];

    return (
        <div className="space-y-6">
            <CreatorStatsTabs 
                tabs={periods} 
                activeTab={dateFilter} 
                onChange={setDateFilter} 
            />
            <CreatorStatsCards dateFilter={dateFilter} />
        </div>
    );
}

