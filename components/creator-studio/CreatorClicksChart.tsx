import { useCreatorMonthlyClicks } from "@/features/creator-studio/useCreatorMonthlyClicks";
import { useMediaQuery } from "@chakra-ui/react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";


export default function CreatorClicksChart() {
    const [isMobile] = useMediaQuery("(max-width: 500px)");
    const { data } = useCreatorMonthlyClicks();

    const monthlyData = data || { jan: 0, feb: 0, march: 0, april: 0, may: 0, june: 0, july: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0, };

    const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",];

    const mobileMonths = ["Jan", "Mar", "May", "Aug", "Oct", "Dec"];

    const chartData = [
        { name: 'Jan', value: monthlyData.jan },
        { name: 'Feb', value: monthlyData.feb },
        { name: 'Mar', value: monthlyData.march },
        { name: 'Apr', value: monthlyData.april },
        { name: 'May', value: monthlyData.may },
        { name: 'Jun', value: monthlyData.june },
        { name: 'Jul', value: monthlyData.july },
        { name: 'Aug', value: monthlyData.aug },
        { name: 'Sep', value: monthlyData.sep },
        { name: 'Oct', value: monthlyData.oct },
        { name: 'Nov', value: monthlyData.nov },
        { name: 'Dec', value: monthlyData.dec },
    ];


    return (
        <div className="bg-[#FAFAFA] p-5 rounded-2xl flex flex-col border border-gray-100 shadow-sm flex-1 min-w-[300px] flex justify-center">
            <h3 className="text-lg font-semibold text-start text-gray-700">
                Clicks
            </h3>
            <ResponsiveContainer height={250} className="w-full">
                <BarChart data={chartData} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
                    <XAxis
                        dataKey="name"
                        tickLine={false}
                        fontSize={12}
                        stroke="#9ca3af"
                        tickMargin={12}
                        tick={{ fill: '#000000' }}
                        ticks={isMobile ? mobileMonths : allMonths}

                    />
                    <YAxis
                        type="number"
                        orientation="right"
                        stroke="#9ca3af"
                        allowDecimals={false}
                        tickLine={false}
                        width={10}
                        tick={{ fill: '#000000' }}
                    />
                    <Bar dataKey="value" fill="#FE4F04" radius={[6, 6, 0, 0]} />


                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
