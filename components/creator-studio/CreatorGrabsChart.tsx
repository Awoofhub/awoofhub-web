import { useCreatorMonthlyGrabs } from "@/features/creator-studio/useCreatorMonthlyGrabs";
import { useMediaQuery } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Bar, BarChart, Rectangle, ResponsiveContainer, XAxis, YAxis } from "recharts";

const LOWEST_SHADE = "#FE4F044D";
const MIDDLE_SHADE = "#FFDBD0";
const HIGHEST_SHADE = "#FE4F04";

const TOP_MARGIN = 10;
const X_AXIS_HEIGHT = 36;
const Y_AXIS_WIDTH = 20;
const HEADROOM = 0.1;
const BAR_CATEGORY_GAP = "7%";

const MONTHS_COUNT = 12;
const MOBILE_MONTH_WIDTH = 60;
const TABLET_MONTH_WIDTH = 70;

const MOBILE_CHART_HEIGHT = 300;
const TABLET_CHART_HEIGHT = 330;
const DESKTOP_CHART_HEIGHT = 400;

interface BarShapeProps {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    payload?: { value: number };
}

interface MonthTickProps {
    x?: number;
    y?: number;
    payload?: { value: string };
}

const getBarColor = (value: number, maxValue: number) => {
    if (maxValue <= 0) return LOWEST_SHADE;

    const ratio = value / maxValue;

    if (ratio > 0.75) return HIGHEST_SHADE;
    if (ratio > 0.25) return MIDDLE_SHADE;
    return LOWEST_SHADE;
};

const getAxis = (maxValue: number) => {
    if (maxValue <= 0) return { ticks: [0, 1, 2, 3, 4], top: 4 };

    const top = maxValue * (1 + HEADROOM);

    const rough = maxValue / 4;
    const power = Math.pow(10, Math.floor(Math.log10(rough)));
    const normalized = rough / power;
    const niceFactor = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
    const step = Math.max(1, niceFactor * power);

    const ticks: number[] = [];
    for (let tick = 0; tick <= top; tick += step) ticks.push(tick);

    return { ticks, top };
};

function MonthTick({ x, y, payload }: MonthTickProps) {
    return (
        <text
            x={x}
            y={y}
            dy="0.71em"
            textAnchor="middle"
            fill="#000000"
            className="font-baloo font-medium text-xs lg:text-lg"
        >
            {payload?.value}
        </text>
    );
}

export default function CreatorGrabsChart() {
    const [isMobile] = useMediaQuery("(max-width: 500px)");
    const [isTablet] = useMediaQuery("(min-width: 501px) and (max-width: 1023px)");
    const { data } = useCreatorMonthlyGrabs();

    const scrollRef = useRef<HTMLDivElement>(null);
    const [indicator, setIndicator] = useState({ scrollable: false, width: 100, left: 0 });

    const monthlyData = data || { jan: 0, feb: 0, march: 0, april: 0, may: 0, june: 0, july: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0, };

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

    const maxValue = Math.max(...chartData.map((item) => item.value));
    const { ticks, top: axisTop } = getAxis(maxValue);
    const domain: [number, number] = [0, axisTop];

    const chartHeight = isMobile
        ? MOBILE_CHART_HEIGHT
        : isTablet
            ? TABLET_CHART_HEIGHT
            : DESKTOP_CHART_HEIGHT;
    const plotHeight = chartHeight - TOP_MARGIN - X_AXIS_HEIGHT;

    const monthWidth = isMobile ? MOBILE_MONTH_WIDTH : isTablet ? TABLET_MONTH_WIDTH : 0;
    const chartMinWidth = monthWidth * MONTHS_COUNT;

    const renderBar = (props: BarShapeProps) => {
        const { x = 0, y = 0, width = 0, height = 0, payload } = props;

        return (
            <Rectangle
                x={x}
                y={y}
                width={width}
                height={height}
                radius={[2, 2, 0, 0]}
                fill={getBarColor(payload?.value ?? 0, maxValue)}
            />
        );
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const update = () => {
            const { scrollWidth, clientWidth, scrollLeft } = el;
            setIndicator({
                scrollable: scrollWidth > clientWidth + 1,
                width: (clientWidth / scrollWidth) * 100,
                left: (scrollLeft / scrollWidth) * 100,
            });
        };

        update();
        el.addEventListener("scroll", update, { passive: true });

        const observer = new ResizeObserver(update);
        observer.observe(el);
        if (el.firstElementChild) observer.observe(el.firstElementChild);

        return () => {
            el.removeEventListener("scroll", update);
            observer.disconnect();
        };
    }, [chartMinWidth]);

    return (
        <div className="bg-white p-4 xs:p-6 rounded-xl flex flex-col shadow-sm flex-1 min-w-72">
            <p className="text-sm lg:text-base font-semibold uppercase text-primary">
                Grabs over time
            </p>
            <p className="font-medium text-xs lg:text-sm text-muted mb-4">
                Monthly grab activity for your published Awoofs
            </p>

            <div className="flex">
                {/* Y-axis labels: stay in place while the bars scroll */}
                <div className="relative shrink-0" style={{ width: Y_AXIS_WIDTH, height: chartHeight }}>
                    <div className="absolute inset-x-0" style={{ top: TOP_MARGIN, height: plotHeight }}>
                        {ticks.map((tick) => (
                            <span
                                key={tick}
                                className="absolute right-2 font-baloo font-medium text-xs lg:text-sm leading-none text-black"
                                style={{ bottom: `${(tick / axisTop) * 100}%`, transform: "translateY(50%)" }}
                            >
                                {tick}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    {/* Scrollable bars */}
                    <div ref={scrollRef} className="overflow-x-auto no-scrollbar">
                        <div className="relative" style={{ height: chartHeight, minWidth: chartMinWidth || undefined }}>
                            <div
                                aria-hidden
                                className="pointer-events-none bg-[#FAFAFACC] absolute inset-x-0 rounded-lg border border-[#E5E7EB]"
                                style={{ top: TOP_MARGIN, height: plotHeight }}
                            />
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={chartData}
                                    margin={{ top: TOP_MARGIN, right: 0, left: 0, bottom: 0 }}
                                    barCategoryGap={BAR_CATEGORY_GAP}
                                >
                                    <XAxis
                                        dataKey="name"
                                        height={X_AXIS_HEIGHT}
                                        axisLine={false}
                                        tickLine={false}
                                        tickMargin={12}
                                        interval={0}
                                        tick={<MonthTick />}
                                    />
                                    <YAxis hide domain={domain} ticks={ticks} />
                                    <Bar
                                        dataKey="value"
                                        shape={(props: unknown) => renderBar(props as BarShapeProps)}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Scroll indicator: visible on every device, only when the chart overflows */}
                    {indicator.scrollable && (
                        <div aria-hidden className="relative mt-2 h-1.5 rounded-full bg-gray-100">
                            <div
                                className="absolute inset-y-0 rounded-full bg-primary/50"
                                style={{ width: `${indicator.width}%`, left: `${indicator.left}%` }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}