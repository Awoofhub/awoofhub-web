"use client";

import { useSubscription } from "@/features/subscription/useSubscription";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import Loading from "../loading/Loading";

export type Props = {
    children: ReactNode;
};

export default function CreatorProtected({ children }: Props) {
    const router = useRouter();
    const pathname = usePathname();

    const { data: subscription, isLoading, } = useSubscription();

    useEffect(() => {
        if (!isLoading && subscription?.status !== "active") {
            router.replace(`/creator-studio`);
        }
    }, [subscription, isLoading, pathname, router]);

    if (isLoading) {
        return <Loading />;
    }

    if (subscription?.status !== "active") {
        return null;
    }

    return <>{children}</>;
}