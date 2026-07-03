import { Bell } from "lucide-react";
import Link from "next/link";
import { GiCheckMark } from "react-icons/gi";

export default function ActivityEmptyState() {
  return (
    <section className="max-w-[1440px] mx-auto pt-6 pb-20 lg:py-8 px-4 md:px-6 lg:px-8 xl:px-12">
      <div className="flex items-center justify-between mb-6 border-b-2 border-gray-200 pb-4">
        <h1 className="text-lg xs:text-xl lg:text-2xl font-semibold text-black">
          Notifications
        </h1>
        <button
          type="button"
          className="flex items-center gap-2 text-xs xs:text-sm font-semibold text-primary transition opacity-40 cursor-not-allowed"
        >
          <GiCheckMark size={12} />
          Mark all read
        </button>
      </div>
      <div className="flex flex-col items-center justify-center text-center py-20">
        <Bell size={40} className="text-primary mb-4" />
        <h2 className="text-lg xs:text-xl lg:text-2xl font-bold text-black mb-2">
          You’re all caught up
        </h2>
        <p className="text-sm lg:text-base text-black mb-6 max-w-sm">
          No notifications right now. Check back when there’s something new.
        </p>
        <Link
          href="/offers"
          className="px-4 py-3 bg-primary text-white text-sm lg:text-base font-semibold rounded-sm hover:bg-orange-600 transition-colors"
        >
          Keep exploring deals
        </Link>
      </div>
    </section>
  );
}
