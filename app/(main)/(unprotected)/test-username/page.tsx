"use client";

import { TestUsernameComponent } from "@/components/profile/TestUsernameComponent";

export default function TestUsernamePage() {
    return (
        <section className="w-full min-h-screen bg-gray-50 p-6 md:p-10">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-800">Testing Environment</h1>
                    <p className="text-sm text-gray-500">Testing the standalone Username component</p>
                </header>

                <TestUsernameComponent />
            </div>
        </section>
    );
}