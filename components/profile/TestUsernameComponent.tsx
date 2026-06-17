"use client";

import { useUser } from '@/features/user/useUser';
import { UsernameField } from './UsernameField';
import { useQueryClient } from '@tanstack/react-query';

export const TestUsernameComponent = () => {
    const { data: currentUser, isLoading } = useUser();
    const queryClient = useQueryClient();


    if (isLoading) {
        return <div className="p-8 text-center text-gray-500">Loading user profile...</div>;
    }

    if (!currentUser) {
        return <div className="p-8 text-center text-red-500">No user found. Please ensure you are logged in.</div>;
    }


    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Username Update Test</h2>

            <UsernameField
                user={currentUser}
                onSuccess={() => queryClient.invalidateQueries({ queryKey: ['auth-user'] })}
            />
        </div>
    );
};