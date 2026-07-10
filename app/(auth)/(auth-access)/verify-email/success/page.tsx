"use client";
import Spinner from "@/components/loading/Loading";
import { Seo } from "@/components/seo/Seo";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const STEP_DURATION_MS = 2500;

export default function EmailVerifiedPage() {
    const router = useRouter();
    const [step, setStep] = useState<"verified" | "loading">("verified");

    // Step 1 → Step 2
    useEffect(() => {
        const t = setTimeout(() => setStep("loading"), STEP_DURATION_MS);
        return () => clearTimeout(t);
    }, []);

    // Step 2 → redirect home
    useEffect(() => {
        if (step !== "loading") return;
        const t = setTimeout(() => router.push("/"), STEP_DURATION_MS);
        return () => clearTimeout(t);
    }, [step, router]);

    if (step === "verified") {
        return <VerifiedScreen />;
    }

    return <LoadingScreen />;
}

/* ─── Step 1: Email Verified! ───────────────────────────────────────── */
function VerifiedScreen() {
    return (
        <div className="text-center px-4 space-y-6 min-h-[80vh] flex flex-col justify-center items-center">
            <Seo title="Email Verified!" />

            <div className="flex justify-center ">
                <Image
                    src="/emailSuccess.png"
                    alt="Success"
                    width={500}
                    height={500}
                    priority
                    className="w-[140px] md:w-[230px] h-auto flex justify-center"
                />
            </div>

            <div className="space-y-2">
                <h1 className="text-xl xs:text-2xl md:text-3xl font-bold text-gray-900">Email Verified!</h1>
                <p className="text-base xs:text-lg md:text-xl font-medium text-gray-500 leading-relaxed max-w-[450px] mx-auto">
                    Your account have been created successfully.
                </p>
            </div>
        </div>
    );
}

/* ─── Step 2: Great job! ────────────────────────────────────────────── */
function LoadingScreen() {
    return (
        <div className="text-center px-4 space-y-6 min-h-[80vh] flex flex-col justify-center items-center">
            <Seo title="Welcome to AwoofHub!" />

            <div className="space-y-2">
                <h1 className="text-xl xs:text-2xl md:text-3xl font-bold text-gray-900">Great job!</h1>
                <p className="text-base xs:text-lg md:text-xl font-medium text-gray-400 leading-relaxed max-w-[450px] mx-auto">
                    You're all set up and ready! We welcome you onboard!
                </p>
            </div>

            <Spinner />

            <p className="text-base xs:text-lg md:text-xl font-baloo font-bold text-primary">
                Loading up your Awoof space...
            </p>
        </div>
    );
}