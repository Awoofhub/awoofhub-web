"use client";
import NotificationEmptyState from "@/components/notification/NotificationEmptyState";
import { NotificationError } from "@/components/notification/NotificationError";
import NotificationList from "@/components/notification/NotificationList";
import NotificationListSkeleton from "@/components/notification/NotificationSkeleton";
import { useNotification } from "@/features/notification/useNotification";
import { useNotificationCount } from "@/features/notification/useNotificationCount";
import { useNotificationMarkAllAsRead } from "@/features/notification/useNotificationMarkAllAsRead";
import { Spinner } from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { GiCheckMark } from "react-icons/gi";
import { useInView } from "react-intersection-observer";

export default function NotificationPage() {
  const [ref, inView] = useInView();

  const {
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
  } = useNotification({
    limit: 8,
  });

  const { data: count } = useNotificationCount();

  const { markAllAsRead, isPending } = useNotificationMarkAllAsRead();

  const allNotifications = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) ?? [];
  }, [data]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  // Early returns make JSX cleaner
  if (isError) {
    return <NotificationError />;
  }

  const hasUnread = (count ?? 0) > 0;
  const isLoading = isFetching && allNotifications.length === 0;
  const isEmpty = !isLoading && allNotifications.length === 0;

  if (isEmpty) {
    return <NotificationEmptyState />;
  }

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
        <NotificationListSkeleton number={5} />
      ) : (
        <>
          <NotificationList notifications={allNotifications} />
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
            {!hasNextPage && allNotifications.length > 0 && (
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
