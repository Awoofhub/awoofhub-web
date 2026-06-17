/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { checkUsernameAvailability, updateUsernameService } from "@/services/user-service";
import { User } from "@/types/user";
import { notificationsStore } from "@/store/notifications/notifications";
import { Check, X, Loader2, Lock, AtSign } from "lucide-react";
import { Button } from "../button/Button";
import dayjs from "dayjs";

interface Props {
    user: User & { usernameUpdatedAt?: string; username?: string };
    onSuccess: () => void;
}

export const UsernameField = ({ user, onSuccess }: Props) => {
    const [username, setUsername] = useState(user.username || "");
    const [debouncedUsername] = useDebounce(username, 500);

    const [isChecking, setIsChecking] = useState(false);
    const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isUpdating, setIsUpdating] = useState(false);

    // 60-Day Lockout Math
    const lastUpdated = user.usernameUpdatedAt ? dayjs(user.usernameUpdatedAt) : null;
    const daysSinceUpdate = lastUpdated ? dayjs().diff(lastUpdated, 'day') : 60;
    const isLocked = daysSinceUpdate < 60;
    const daysLeft = 60 - daysSinceUpdate;

    const generateSuggestions = (baseName: string) => {
        const randomNum = Math.floor(Math.random() * 999);
        return [
            `${baseName}${randomNum}`.slice(0, 20), // Ensure suggestions respect the 20 char limit
            `${baseName}_official`.slice(0, 20),
            `real_${baseName}`.slice(0, 20)
        ];
    };

    useEffect(() => {
        const checkAvailability = async () => {
            // 1. Skip if locked, unchanged, or empty
            if (isLocked || !debouncedUsername || debouncedUsername === user.username) {
                setIsAvailable(null);
                setSuggestions([]);
                return;
            }

            if (debouncedUsername.length < 3) {
                setIsAvailable(false);
                setSuggestions([]);
                return;
            }

            setIsChecking(true);
            try {
                const available = await checkUsernameAvailability(debouncedUsername);
                setIsAvailable(available);

                if (!available) {
                    setSuggestions(generateSuggestions(debouncedUsername));
                } else {
                    setSuggestions([]);
                }
            } catch (err) {
                console.error("Failed to check username", err);
            } finally {
                setIsChecking(false);
            }
        };

        checkAvailability();
    }, [debouncedUsername, user.username, isLocked]);

    const handleUpdate = async () => {
        if (!isAvailable || username === user.username || username.length < 3) return;

        setIsUpdating(true);
        try {
            await updateUsernameService(username);
            notificationsStore.getState().showNotification({
                type: 'success', title: 'Success', duration: 3000,
                message: 'Username updated successfully!',
            });
            onSuccess();
        } catch (err: any) {
            notificationsStore.getState().showNotification({
                type: 'error', title: 'Update Failed', duration: 5000,
                message: err.message || 'Failed to update username.',
            });
        } finally {
            setIsUpdating(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.toLowerCase();
        // Allow only lowercase letters, numbers, and underscores
        val = val.replace(/[^a-z0-9_]/g, '');
        // Limit to 20 characters max
        val = val.slice(0, 20);
        setUsername(val);
    };

    return (
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 mb-8">
            <div className="flex justify-between items-start mb-2">
                <label className="block text-sm font-bold text-slate-800">Username</label>
                {isLocked && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                        <Lock size={12} /> Locked for {daysLeft} more days
                    </span>
                )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <AtSign size={16} className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={username}
                        onChange={handleInputChange}
                        disabled={isLocked || isUpdating}
                        className={`w-full pl-9 pr-10 py-3 border rounded-xl outline-none transition-colors text-sm font-medium ${isLocked ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200'
                            : username.length > 0 && username.length < 3 ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' // Short username warning
                                : isAvailable === false ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                                    : isAvailable === true ? 'border-green-500 focus:border-green-500 focus:ring-1 focus:ring-green-500'
                                        : 'border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary'
                            }`}
                        placeholder="Choose a unique username (3-20 chars)"
                    />

                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        {isChecking && <Loader2 size={16} className="animate-spin text-gray-400" />}
                        {!isChecking && isAvailable === true && username.length >= 3 && <Check size={16} className="text-green-500" />}
                        {!isChecking && (isAvailable === false || (username.length > 0 && username.length < 3)) && <X size={16} className="text-red-500" />}
                    </div>
                </div>

                <Button
                    type="button"
                    onClick={handleUpdate}
                    isDisabled={isLocked || isUpdating || !isAvailable || username === user.username || username.length < 3}
                    isLoading={isUpdating}
                    className="rounded-xl! sm:w-auto w-full"
                >
                    Save Username
                </Button>
            </div>

            {!isLocked && debouncedUsername && debouncedUsername !== user.username && (
                <div className="mt-3">
                    {debouncedUsername.length < 3 ? (
                        <p className="text-xs font-semibold text-red-500">Username must be at least 3 characters long.</p>
                    ) : isAvailable === true ? (
                        <p className="text-xs font-semibold text-green-600">This username is available!</p>
                    ) : isAvailable === false ? (
                        <div>
                            <p className="text-xs font-semibold text-red-500 mb-2">This username is already taken.</p>
                            {suggestions.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-xs text-gray-500 self-center">Suggestions:</span>
                                    {suggestions.map((suggestion) => (
                                        <button
                                            key={suggestion}
                                            onClick={() => setUsername(suggestion)}
                                            className="text-xs font-semibold px-3 py-1.5 bg-white border border-gray-300 rounded-lg hover:border-primary hover:text-primary transition-colors"
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
};