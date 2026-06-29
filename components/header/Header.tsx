'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ExpandableSearch from '../search/ExpandableSearch';
import SearchInput from '../search/SearchInput';
import DesktopMenu from './desktop/DesktopMenu';
import MobileMenu from './mobile/MobileMenu';

export default function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    useEffect(() => {
        console.log("HEADER MOUNTED");
        return () => console.log("HEADER UNMOUNTED");
    }, []);

    return (
        <header className="sticky top-0 left-0 z-[99] bg-white shadow-lg shadow-black/5 relative">
            <div className="flex justify-between items-center max-w-[1440px] mx-auto h-[70px] lg:h-[80px] px-4 md:px-6 lg:px-8 xl:px-12">
                <Link href="/">
                    <Image src="/Logo.png" alt="Logo" width={180} height={60} priority className="w-[120px] sm:w-[160px] lg:w-[170px] xl:w-[180px] h-auto" />
                </Link>

                <SearchInput />

                <div className="flex justify-end gap-4">
                    <ExpandableSearch onOpen={() => setIsSearchOpen(true)} />
                    <DesktopMenu />
                    <MobileMenu />
                </div>
            </div>
            <ExpandableSearch
                isOverlay
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            />
        </header>
    )

}