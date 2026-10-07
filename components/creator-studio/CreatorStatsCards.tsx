import { useCreatorStats } from "@/features/creator-studio/useCreatorStats";

interface Props {
    dateFilter?: string;
}

export default function CreatorStatsCards({ dateFilter }: Props) {
    const { data, isLoading } = useCreatorStats({
        dateFilter
    });

    if (isLoading || !data) {
        return <div className="text-gray-400 text-sm">Skeleton</div>;
    }

    const STATS = [
        { key: 'grabs', title: 'Total Grabs', value: data.grabs },
        { key: 'fiveStarRatings', title: '5-Star Ratings', value: data.fiveStarRatings },
        { key: 'shares', title: 'Shares', value: data.shares },
        { key: 'wishlist', title: 'Wishlist', value: data.wishlist },
        { key: 'comments', title: 'Comments', value: data.comments },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {STATS.map((stat) => (
                <div key={stat.key} className="bg-[#FAFAFA] p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                    <span className="text-xs font-medium text-gray-500">{stat.title}</span>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1 mb-3">{stat.value}</h3>
                </div>
            ))}
        </div>
    );
}