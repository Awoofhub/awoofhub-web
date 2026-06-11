"use client"
import { useUserById } from "@/features/user/useUserById";
import { use } from "react";
import { About } from "./About";


interface Props {
    params: Promise<{ userId: string }>;
}

export default function AboutPage({ params }: Props) {
    const { userId } = use(params);
    const { data: user } = useUserById({ id: userId });
    if (!user) return null

    return (
        <div className="mt-2 mb-25 lg:mb-10 px-5">
            <About profile={user} />
        </div>
    );
}