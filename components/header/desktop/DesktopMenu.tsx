"use client";
import { Button } from '@/components/button/Button';
import LogoutModal from "@/components/modals/LogoutModal";
import { useLogout } from "@/features/auth/useLogout";
import { useMessageCount } from "@/features/chat/useMessageCount";
import { useUser } from "@/features/user/useUser";
import { capitalizeFirstLetter } from "@/utils/truncate";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { FaList } from "react-icons/fa6";
import { FiHelpCircle, FiHome, FiLogOut, FiUser } from "react-icons/fi";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { IoNotificationsOutline } from "react-icons/io5";
import { PiHeart } from "react-icons/pi";

export default function DesktopMenu() {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const { data: currentUser } = useUser();
  const { data: messageCount } = useMessageCount(); // It needs to be below useUser() unless it keeps refreshing.

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    window.addEventListener("click", handleClickOutSide);
    return () => {
      window.removeEventListener("click", handleClickOutSide);
    };
  }, []);

  const handleClickOutSide = (e: Event) => {
    const target = e.target;
    if (target instanceof Node && dropdownRef.current?.contains(target)) {
      return;
    }
    setIsOpenDropdown(false);
  };

  const { submit } = useLogout({
    onSuccess: () => {
      const redirect = "/login";
      router.push(redirect);
    },
  });

  const toggleDropdown = () => {
    setIsOpenDropdown((prev) => !prev);
  };

  const isLoggedIn = !!currentUser;
  const isBusiness = currentUser?.role === "business";

  return (
    <ul className="hidden lg:flex items-center list-none p-0 m-0">
      {isLoggedIn && (
        <>
          <li className="px-[10px] flex items-center text-[1.7rem] relative group border-r border-gray-300">
            <Link
              href="/"
              className={`${pathname === "/" ? "text-primary" : ""}`}
            >
              <FiHome size={26} />
            </Link>
          </li>

          <li className="px-[10px] flex items-center text-[1.7rem] relative group border-r border-gray-300">
            <Link
              href="/my-offers"
              className={`relative ${pathname === "/my-offers" ? "text-primary" : ""}`}
            >
              <FaList size={24} />
            </Link>
          </li>

          <li className="px-[10px] flex items-center text-[1.7rem] relative group border-r border-gray-300">
            <Link
              href="/wishlist"
              className={`${pathname === "/wishlist" ? "text-primary" : ""}`}
            >
              <PiHeart size={28} />
            </Link>
          </li>

          <li className="px-[10px] flex items-center text-[1.7rem] relative group border-r border-gray-300">
            <Link
              href="/notifications"
              className={`${pathname === "/notifications" ? "text-primary" : ""}`}
            >
              <IoNotificationsOutline size={28} />
              {/*
                {!!messageCount && messageCount > 0 && (
                <div className="absolute -top-1 -right-2 w-6 h-6 bg-red-500 text-white text-[12px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                  {messageCount > 99 ? "99+" : messageCount}
                </div>
              )} */}
            </Link>
          </li>

          <li>
            <Link href="/offer/create">
              <Button type="button">
                Post Offer
              </Button>
            </Link>
          </li>

          <li
            ref={dropdownRef}
            className="pl-[10px] flex items-center text-[1.7rem] relative"
          >
            <div
              role="button"
              tabIndex={-1}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => toggleDropdown()}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden">
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

            {/* Dropdown Menu */}
            {isOpenDropdown && (
              <div className="w-70 absolute top-full right-0 mt-3 bg-white rounded-2xl shadow-xl border border-muted/10 overflow-hidden z-50">
                <ul className="flex flex-col">
                  {/* Standard Items */}
                  {[
                    {
                      label: "Profile",
                      icon: <FiUser />,
                      href: `/profile/${currentUser.id}`,
                    },
                    {
                      label: "Message",
                      icon: <HiOutlineEnvelope />,
                      href: "/message",
                      badge: messageCount,
                    },
                    {
                      label: "Help & Support",
                      icon: <FiHelpCircle />,
                      href: "/help",
                    },
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="border-b border-muted/10 last:border-none"
                    >
                      <Link
                        href={item.href}
                        onClick={() => toggleDropdown()}
                        className="flex items-center gap-4 px-6 py-4 hover:bg-primary/5 transition-colors"
                      >
                        <span className="text-primary text-xl">
                          {item.icon}
                        </span>
                        <span className="text-foreground text-[20px] font-light">
                          {item.label}
                        </span>

                        {!!item.badge && item.badge > 0 && (
                          <div className="min-w-6 h-6 px-1 bg-red-500 text-white text-sm font-bold flex items-center justify-center rounded-full">
                            {item.badge > 99 ? "99+" : item.badge}
                          </div>
                        )}
                      </Link>
                    </li>
                  ))}

                  {/* Logout - Special Styling */}
                  <li>
                    <button
                      onClick={() => {
                        setIsLogoutModalOpen(true);
                        setIsOpenDropdown(false);
                      }}
                      className="cursor-pointer w-full flex items-center gap-4 px-6 py-4 hover:bg-primary/5 transition-colors text-primary"
                    >
                      <FiLogOut className="text-xl" />
                      <span className="text-[20px] font-medium">Logout</span>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </li>
          <LogoutModal
            isOpen={isLogoutModalOpen}
            onClose={() => setIsLogoutModalOpen(false)}
          />
        </>
      )}

      {!isLoggedIn && (
        <li
          ref={dropdownRef}
          className="px-[10px] flex items-center  gap-4 text-[1.7rem] text-[var(--color-text-primary)]"
        >
          <Link
            href="/login"
            className="px-8 py-2 rounded-lg border border-primary text-primary font-semibold text-[18px] hover:bg-primary/5 transition-colors"
          >
            Log In
          </Link>

          <Link
            href="/signup"
            className="px-8 py-2 rounded-lg bg-primary text-white font-semibold text-[18px] hover:bg-secondary transition-colors shadow-md"
          >
            Sign Up
          </Link>
        </li>
      )}
    </ul>
  );
}
