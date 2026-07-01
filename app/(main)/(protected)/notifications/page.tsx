"use client"
import { ActivityError } from '@/components/activity/ActivityError';
import ActivityList from '@/components/activity/ActivityList';
import ActivityListSkeleton from '@/components/activity/ActivitySkeleton';
import { useActivity } from '@/features/activity/useActivity';
import { useMarkAllActivityRead } from '@/features/activity/useActivityReadStatus';
import { Spinner } from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useInView } from 'react-intersection-observer';

export default function ActivityPage() {
    const [ref, inView] = useInView();

    const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage, isError, error } = useActivity({
        limit: 8,
    });

    const { markAllAsRead, isMarkingAll } = useMarkAllActivityRead();

    const allActivities = useMemo(() => {
        return data?.pages.flatMap((page) => page.data) ?? [];
    }, [data]);


    // Trigger next page load when in view
    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);


    // Early returns make JSX cleaner
    if (isFetching && allActivities.length === 0) {
        return (
            <section className="px-6 flex justify-center">
                <ActivityListSkeleton number={5} />
            </section> 
        );
    }

    if (isError) {
        return <div>{error?.message}</div>
    }

    if (!allActivities.length) {
        return (
            <section className="pt-14 px-6">
                <p className="text-center text-gray-500">No Notifications found.</p>
            </section>
        );
    }

    const hasUnread = allActivities.some((activity) => !activity.isRead);

    return (
        <ErrorBoundary fallback={<ActivityError />}>
            <section className="p-6 mx-10">
                <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4 ">
                    <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Notifications</h1>
                    <button
                        type="button"
                        onClick={() => markAllAsRead()}
                        disabled={!hasUnread || isMarkingAll}
                        className={`text-sm font-semibold transition  ${hasUnread ? 'text-orange-500 hover:text-orange-600 cursor-pointer' : 'text-gray-400 cursor-not-allowed'}`}
                    >
                        {isMarkingAll ? 'Marking all read…' : 'Mark all read'}
                    </button>
                </div>
                <ActivityList activities={allActivities} />
                <div ref={ref} className="h-10 flex items-center justify-center mt-2 sm:mt-6">
                    {isFetchingNextPage && (
                        <Spinner className="mt-5 w-17 h-17 text-primary" data-testid="loading" />
                    )}
                    {!hasNextPage && allActivities.length > 0 && <p className="text-center text-[14px] sm:text-[16px]">No more Notifications</p>}
                </div>
            </section>
        </ErrorBoundary>
    );
};


