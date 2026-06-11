"use client"
import { useFilter } from '@/features/offers/useFilter';
import { useSearchParams } from 'next/navigation';
import { Suspense } from "react";
import { IoMdClose } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";

interface Props {
    isOverlay?: boolean;
    isOpen?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
}

function ExpandableSearchContent({ isOverlay, isOpen, onOpen, onClose }: Props) {
    const searchParams = useSearchParams();

    const updateFilter = useFilter("/offers");


    if (isOverlay) {
        return (
            <div
                className={`absolute top-0 left-0 h-full w-full bg-white flex items-center transition-all duration-300 lg:hidden ${isOpen ? "opacity-100 z-[200] px-6" : "opacity-0 pointer-events-none -z-10"
                    }`}
            >
                <input
                    type="search"
                    placeholder="Search for Offers"
                    className="w-full outline-none text-[16px]"
                    autoFocus={isOpen}
                    defaultValue={searchParams.get("search")?.toString()}
                    onChange={(e) => updateFilter('search', e.target.value)}
                />

                <button onClick={onClose}>
                    <IoMdClose size={20} />
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={onOpen}
            className="z-[100] cursor-pointer lg:hidden pr-3 border-r border-gray-300"
        >
            <IoSearchSharp size={20} />
        </button>
    );
}


export default function ExpandableSearch(props: Props) {
    return (
        <Suspense fallback={null}>
            <ExpandableSearchContent {...props} />
        </Suspense>
    );
}