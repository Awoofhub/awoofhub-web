"use client";
import { useActivityCount } from "@/features/activity/useActivityCount";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiBell, FiHeart, FiHome, FiPlus } from "react-icons/fi";
import { TbListCheck } from "react-icons/tb";

export default function MobileBottomMenu() {
  const { data: notificationCount } = useActivityCount()
  const pathname = usePathname();

  const isInsideChannel =
    pathname.includes("/message/") && pathname !== "/message";

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[90] flex items-center border-t border-gray-300 bg-white lg:hidden pb-3 ${isInsideChannel ? "hidden md:flex" : ""}`}
    >
      <div className="flex-1">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center pt-3 ${pathname === "/" ? "text-primary border-t" : "text-gray-700"}`}
        >
          <div className="text-[20px]">
            <FiHome />
          </div>
          <span className="text-[14px] font-baloo">Home</span>
        </Link>
      </div>

      <div className="flex-1">
        <Link
          href="/my-offers"
          className={`flex flex-col items-center justify-center pt-3 ${pathname === "/my-offers" ? "text-primary border-t" : "text-gray-700"}`}
        >
          <div className="text-[20px]">
            <TbListCheck />
          </div>
          <span className="text-[14px] font-baloo">My Posts</span>
        </Link>
      </div>

      {/* Center Post Offer Button */}
      <div className="flex-1 flex justify-center mt-2">
        <Link
          href="/offers/create"
        >
          <div className="w-14 h-10 py-3 bg-primary rounded-full flex items-center justify-center shadow-lg">
            <FiPlus className="text-white text-[28px]" />
          </div>
        </Link>
      </div>

      <div className="flex-1">
        <Link
          href="/wishlist"
          className={`flex flex-col items-center justify-center pt-3 ${pathname === "/wishlist" ? "text-primary border-t" : "text-gray-700"}`}
        >
          <div className="text-[20px]">
            <FiHeart />
          </div>
          <span className="text-[14px] font-baloo">Wishlist</span>
        </Link>
      </div>

      <div className="flex-1">
        <Link
          href="/notifications"
          className={`flex flex-col items-center justify-center pt-3 ${pathname === "/notifications" ? "text-primary border-t" : "text-gray-700"}`}
        >
          <div className="text-[20px]">
            <FiBell />
          </div>
          {!!notificationCount && notificationCount > 0 && (
            <div className="absolute -top-1 right-2 min-w-6 h-6 px-[2px] bg-red-500 text-white text-[12px] font-bold flex items-center justify-center rounded-full border-2 border-white">
              {notificationCount > 99 ? '99+' : notificationCount}
            </div>
          )}
          <span className="text-[14px] font-baloo">Notification</span>
        </Link>
      </div>
    </div>
  );
}
