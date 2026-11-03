import { useCreatorStats } from "@/features/creator-studio/useCreatorStats";

interface Props {
    dateFilter?: string;
}

export default function CreatorStatsCards({ dateFilter }: Props) {
    const { data } = useCreatorStats({
        dateFilter
    });

    const statsData = data || {
        grabs: 0,
        fiveStarRatings: 0,
        shares: 0,
        wishlist: 0,
        comments: 0,
    };

    const STATS = [
        { key: 'grabs', title: 'Total Grabs', value: statsData.grabs },
        { key: 'fiveStarRatings', title: '5 Star Ratings', value: statsData.fiveStarRatings },
        { key: 'wishlist', title: 'Wishlist', value: statsData.wishlist },
        { key: 'shares', title: 'Shares', value: statsData.shares },
        { key: 'comments', title: 'Total Post Comments', value: statsData.comments },
    ];

    return (
        <div className="grid grid-cols-1 xs:grid-cols-3 lg:grid-cols-5 gap-4">
            {STATS.map((stat) => (
                <div key={stat.key} className="bg-white p-5 rounded-xl shadow-sm flex flex-col justify-between">
                    <span className="text-sm font-medium text-muted">{stat.title}</span>
                    <h3 className="text-3xl lg:text-4xl font-medium text-gray-900 mt-2">{stat.value}</h3>
                </div>
            ))}
        </div>
    );
}