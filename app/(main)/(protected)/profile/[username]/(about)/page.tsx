"use client"
import { useUserByUsername } from "@/features/user/useUserByUsername";
import { use } from "react";
import { About } from "./About";


interface Props {
    params: Promise<{ username: string }>;
}

export default function AboutPage({ params }: Props) {
    const { username } = use(params);
    const { data: user } = useUserByUsername({ username });
    if (!user) return null

    return (
        <div className="mt-2 mb-25 lg:mb-10 px-5">
            <About profile={user} />
        </div>
    );
}