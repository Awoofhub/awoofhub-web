"use client";

import { useCategory } from "@/features/category/useCategory";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ScrollSync from "./ScrollSync";

export default function FeaturedOffers() {
    const { data: categories = [], isFetching: isCategoryFetching } = useCategory();

    const [visibleSection, setVisibleSection] = useState("");

    const headerRef = useRef<HTMLElement | null>(null);

    const navRef = useRef<HTMLUListElement | null>(null);
    const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});

    useEffect(() => {
        const activeEl = itemRefs.current[visibleSection];
        const container = navRef.current;

        if (!activeEl || !container) return;

        const containerWidth = container.offsetWidth;
        const elementLeft = activeEl.offsetLeft;
        const elementWidth = activeEl.offsetWidth;

        const scrollLeft =
            elementLeft - containerWidth / 2 + elementWidth / 2;

        container.scrollTo({
            left: scrollLeft,
            behavior: "smooth",
        });
    }, [visibleSection]);

    if (isCategoryFetching) {
        return <p>Loading categories...</p>;
    }

    return (
        <div className="bg-gray-50 pt-6 md:pt-12">

            <header ref={headerRef} className="max-w-[1440px] mx-auto sticky bg-white top-16 lg:top-20 z-40 mb-10 border-b border-gray-200 py-3 px-6 md:px-12">
                <div className="flex flex-col md:flex-row md:gap-10 md:items-center md:justify-between">
                    <h2 className="text-primary font-bold text-xl py-2 mb-2 md:mb-0">
                        Categories
                    </h2>

                    <ul ref={navRef} className="flex gap-4 flex-nowrap whitespace-nowrap no-scrollbar scroll-smooth overflow-x-auto">
                        {categories.map((category) => (
                            <li
                                key={category.id}
                                ref={(el) => {itemRefs.current[category.slug] = el}}
                                className={`px-5 py-1.5 font-semibold rounded-full text-sm whitespace-nowrap transition-all duration-200 ease-in-out ${visibleSection === category.slug
                                    ? "bg-primary text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                <Link href={`#${category.slug}`}>{category.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </header>

            <main>
                {categories.map((category) => (
                    <ScrollSync
                        key={category.id}
                        category={category}
                        setVisibleSection={setVisibleSection}
                    />
                ))}
            </main>
        </div>
    );
}