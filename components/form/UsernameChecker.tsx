"use client";
import { useUsernameChecker } from "@/features/user/useUsernameChecker";
import { useUser } from "@/features/user/useUser";
import { ImSpinner2 } from "react-icons/im";
import { CgDanger } from "react-icons/cg";
import { UsernameCheckResult } from "@/types/user";
import { useEffect, useMemo } from "react";
import { debounce } from "lodash";

interface Props {
  value: string;
  onChange: (username: string) => void;
  disabled?: boolean;
  onResult?: (result: UsernameCheckResult | undefined) => void;
}

export default function UsernameChecker({
  value,
  onChange,
  disabled,
  onResult,
}: Props) {
  const { data: currentUser } = useUser();
  const {
    result,
    isPending: isChecking,
    submit: checkUsername,
    reset,
  } = useUsernameChecker();

  useEffect(() => {
    onResult?.(result);
  }, [result, onResult]);

  const hasChanged = value !== currentUser?.username;

  const debouncedCheck = useMemo(
    () =>
      debounce((username: string) => {
        if (!username) return;
        checkUsername(username);
      }, 500),
    [checkUsername]
  );

  useEffect(() => {
    return () => debouncedCheck.cancel();
  }, [debouncedCheck]);

  const handleBlur = () => {
    debouncedCheck.cancel();
    if (hasChanged && value) checkUsername(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    if (result) reset();

    if (newValue !== currentUser?.username) {
      debouncedCheck(newValue);
    } else {
      debouncedCheck.cancel();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    reset();
  };

  return (
    <div>
      <label className="text-sm text-gray-500 mb-1 block">Username</label>
      <div
        className={`flex items-center border rounded-lg px-4 py-3 transition-colors
        ${
          disabled
            ? "bg-gray-50 border-gray-200"
            : result?.available === false
              ? "border-red-400 bg-white"
              : result?.available === true
                ? "border-green-400 bg-white"
                : "border-gray-200 bg-white"
        }
      `}
      >
        <input
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder="Enter username"
          className="flex-1 outline-none text-sm bg-transparent disabled:text-gray-400"
        />
        {isChecking && (
          <ImSpinner2 className="animate-spin text-gray-400" size={14} />
        )}
      </div>

      {!isChecking && result && (
        <p
          className={`text-xs mt-1 ${result.available ? "text-green-500" : "text-red-500"}`}
        >
          {result.available
            ? "Username is available"
            : "Username is not available"}
        </p>
      )}

      {!isChecking && result && !result.available && result.suggestion && (
        <div className="mt-2">
          <p className="text-xs text-gray-400 mb-1">Suggested username:</p>
          <button
            type="button"
            onClick={() => handleSuggestionClick(result.suggestion!)}
            className="text-xs bg-orange-50 text-primary border border-orange-200 px-3 py-1 rounded-full hover:bg-orange-100 transition-colors"
          >
            {result.suggestion}
          </button>
        </div>
      )}

      {disabled && (
        <p className="text-muted text-xs mt-1 flex items-center gap-1">
          <span className="text-[#E70606]">
            <CgDanger size={12} />
          </span>{" "}
          You can change your username once every 60 days
        </p>
      )}
    </div>
  );
}