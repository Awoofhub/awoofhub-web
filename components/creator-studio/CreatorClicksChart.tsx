import { useCreatorMonthlyClicks } from "@/features/creator-studio/useCreatorMonthlyClicks";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";


export default function CreatorClicksChart() {

    const { data, isLoading } = useCreatorMonthlyClicks();

    if (isLoading || !data) {
        return <div className="text-gray-400 text-sm">Skeleton</div>;
    }

    const chartData = [
        { name: 'Jan', value: data.jan },
        { name: 'Feb', value: data.feb },
        { name: 'Mar', value: data.march },
        { name: 'Apr', value: data.april },
        { name: 'May', value: data.may },
        { name: 'Jun', value: data.june },
        { name: 'Jul', value: data.july },
        { name: 'Aug', value: data.aug },
        { name: 'Sep', value: data.sep },
        { name: 'Oct', value: data.oct },
        { name: 'Nov', value: data.nov },
        { name: 'Dec', value: data.dec },
    ];


    return (
        <div className="bg-[#FAFAFA] p-5 rounded-2xl flex flex-col border border-gray-100 shadow-sm flex-1 min-w-[300px] flex justify-center">
            <h3 className="text-lg font-semibold text-start text-gray-700">
                Clicks
            </h3>
            <ResponsiveContainer height={250} className="w-full">
                <BarChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                    <XAxis
                        dataKey="name"
                        tickLine={false}
                        fontSize={12}
                        stroke="#9ca3af"
                        tickMargin={12}
                        tick={{ fill: '#000000'}}
                        
                    />
                    <YAxis
                        type="number"
                        orientation="right"
                        stroke="#9ca3af"
                        allowDecimals={false}
                        tickLine={false}
                        width={10}
                        tick={{ fill: '#000000'}}
                    />
                    <Bar dataKey="value" fill="#FE4F04" radius={[6, 6, 0, 0]} />
                        
                    
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

