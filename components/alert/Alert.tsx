"use client";

import { useEffect, useState } from "react";
import AlertService from "@/services/alert-service";

interface AlertButtonProps {
  contributorId: string;
}

export default function AlertButton({ contributorId }: AlertButtonProps) {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    AlertService.getBusinessAlert(contributorId)
      .then((res) => setEnabled(!!res.data))
      .catch((err) => console.error("Failed to fetch alert status:", err))
      .finally(() => setChecking(false));
  }, [contributorId]);

  const handleToggle = async () => {
    setLoading(true);
    const next = !enabled;
    try {
      if (next) {
        await AlertService.setAlert(contributorId);
      } else {
        await AlertService.removeAlert(contributorId);
      }
      setEnabled(next);
    } catch (err) {
      console.error("Failed to toggle alert:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      disabled={loading || checking}
      onClick={handleToggle}
      className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors disabled:opacity-50 ${
        enabled ? "bg-primary" : "bg-[#CCCCCC]"
      }`}
    >
      <span
        className={`inline-block h-4 w-5 transform rounded-full border border-[#F7D9CC] bg-white shadow transition-transform ${
          enabled ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  );
}