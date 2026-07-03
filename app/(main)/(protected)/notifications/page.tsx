"use client";
import { ActivityError } from "@/components/activity/ActivityError";
import ActivityList from "@/components/activity/ActivityList";
import ActivityListSkeleton from "@/components/activity/ActivitySkeleton";
import { useActivity } from "@/features/activity/useActivity";
import { useActivityCount } from "@/features/activity/useActivityCount";
import { useActivityMarkAllAsRead } from "@/features/activity/useActivityMarkAllAsRead";
import { Spinner } from "@chakra-ui/react";
import { Bell } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { GiCheckMark } from "react-icons/gi";


export default function ActivityPage() {
  const [ref, inView] = useInView();

  const {
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
  } = useActivity({
    limit: 8,
  });

  const { data: count } = useActivityCount();

  const { markAllAsRead, isPending } = useActivityMarkAllAsRead();

  const allActivities = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) ?? [];
  }, [data]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  // Early returns make JSX cleaner
  if (isError) {
    return <ActivityError />;
  }

  const hasUnread = (count?.unread ?? 0) > 0;
  const isLoading = isFetching && allActivities.length === 0;
  const isEmpty = !allActivities.length;

  return (
    <section className="max-w-[1440px] mx-auto pt-6 pb-20 lg:py-8 px-4 md:px-6 lg:px-8 xl:px-12">
      <div className="flex items-center justify-between mb-6 border-b-2 border-gray-200 pb-4">
        <h1 className="text-lg xs:text-xl lg:text-2xl font-semibold text-black">
          Notifications
        </h1>
        <button
          type="button"
          onClick={() => markAllAsRead()}
          disabled={!hasUnread || isPending}
          className={`flex items-center gap-2 text-xs xs:text-sm font-semibold text-primary transition ${hasUnread ? "hover:text-orange-700 cursor-pointer" : "opacity-40 cursor-not-allowed"}`}
        >
          <GiCheckMark size={12} />
          {isPending ? "Marking..." : "Mark all read"}
        </button>
      </div>

      {isLoading ? (
        <ActivityListSkeleton number={5} />
      ) : isEmpty ? (
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
      ) : (
        <>
          <ActivityList activities={allActivities} />
          <div
            ref={ref}
            className="h-10 flex items-center justify-center mt-4 lg:mt-6"
          >
            {isFetchingNextPage && (
              <Spinner
                className="mt-5 w-17 h-17 text-primary"
                data-testid="loading"
              />
            )}
            {!hasNextPage && allActivities.length > 0 && (
              <p className="text-center text-[14px] sm:text-[16px]">
                No more Notifications
              </p>
            )}
          </div>
        </>
      )}
    </section>
  );
}