'use client'
import { useUser } from '@/features/user/useUser';
import { capitalizeFirstLetter } from '@/utils/truncate';
import Image from "next/image";
import Link from 'next/link';
import { useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import Sidebar from './Sidebar';

export default function MobileMenu() {
    const [isOpenSideBar, setIsOpenSideBar] = useState(false);
    const { data: currentUser } = useUser();

    return (
        <>
            <div className="flex lg:hidden items-center list-none p-0 m-0">

                {currentUser ? (
                    <>
                        <div className="flex items-center text-[24px] relative">

                            <div role="button" className="flex items-center gap-2 cursor-pointer" onClick={() => setIsOpenSideBar(!isOpenSideBar)}>
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden">
                                    {currentUser.profileImageUrl ? (
                                        <Image
                                            width={500}
                                            height={500}
                                            src={currentUser.profileImageUrl}
                                            alt={currentUser.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="bg-green-500 text-white flex items-center justify-center w-full h-full">
                                            {capitalizeFirstLetter(currentUser.name)}
                                        </div>
                                    )}
                                </div>
                                <BsChevronDown size={14} />
                            </div>
                            <Sidebar user={currentUser} isOpen={isOpenSideBar} onClose={() => setIsOpenSideBar(false)} />
                        </div>
                    </>
                ) : (
                    <div className=" flex items-center text-[1.7rem] text-primary">
                        <Link
                            href="/login"
                            className="pr-3 py-1 rounded-lg text-primary font-semibold text-[15px] sm:text-[18px] hover:bg-primary/5 transition-colors"
                        >
                            Log In
                        </Link>

                        <Link
                            href="/signup"
                            className="px-3 py-2 rounded-sm bg-primary text-white font-semibold text-[15px] sm:text-[18px] hover:bg-secondary transition-colors shadow-md"
                        >
                            Sign Up
                        </Link>

                    </div>
                )}
            </div>

        </>
    )
};



