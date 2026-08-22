"use client";

import { useReport } from "@/features/report/useReport";
import { CreateReportData } from "@/types/report";
import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormSelectDropdown } from "../form/FormSelectDropdown";
import ReportConfirmationModal from "./ReportConfirmationModal";

const ReportReasons = [
  { label: "Select Option", value: undefined },
  { label: "Spam or repetitive posting", value: "spam" },
  { label: "Scam or fraudulent activities", value: "scam" },
  { label: "Explicit content", value: "explicit" },
  { label: "Violence", value: "violence" },
  { label: "Abuse", value: "abuse" },
  { label: "Illegal activity", value: "illegal" },
  { label: "Self harm", value: "self_harm" },
  { label: "Others", value: "other" },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  targetType: "offer" | "user" | 'comment';
  targetId: string;
}

export default function ReportModal({ isOpen, onClose, targetType, targetId }: Props) {

  const [isDone, setIsDone] = useState(false);

  const { submit, isPending, reset: resetReport } = useReport({
    onSuccess: () => {
      setIsDone(true)
    },
  });

  const { register, handleSubmit, reset: resetForm, control } = useForm<CreateReportData>();

  if (!isOpen) return null;

  const handleClose = () => {
    if (isPending) return;

    resetForm();
    resetReport();
    setIsDone(false);
    onClose();
  };


  const onSubmit = (data: CreateReportData) => {
    submit({ targetType, targetId, type: data.type, description: data.description });
  };

  return (
    <>
      {!isDone && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={handleClose}>

          <div className="max-w-xl bg-white rounded-2xl p-6" onClick={(e) => e.stopPropagation()}>

            <div className="flex items-center gap-3 my-6">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#CD0F0F1A] shrink-0">
                <Image src="/reportFlag.png" width={20} height={18} alt="report" />
              </div>
              <div>
                <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-black">
                  {targetType === "offer" && "Report this Deal"}
                  {targetType === "user" && "Report this Account"}
                  {targetType === "comment" && "Report this Comment"}
                </h2>
                <p className="text-muted text-xs md:text-sm lg:text-base">
                  {(targetType === "user" || targetType === "offer") && "Spotted something off? Let us know so we can fix it fast"}
                  {targetType === "comment" && "Something off with this comment? Let us know so we can fix it fast"}
                </p>
              </div>
            </div>

            <hr className="text-muted/20" />

            <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>

              <Controller
                name="type"
                control={control}
                rules={{ required: "Please select a report reason." }}
                render={({ field, fieldState }) => (
                  <FormSelectDropdown
                    label="Reason for this report"
                    data={ReportReasons}
                    value={field.value}
                    onChange={field.onChange}
                    error={fieldState.error?.message}
                  />
                )}
              />

              {targetType !== "comment" && (
                <textarea
                  {...register("description", { required: "Please provide a description." })}
                  placeholder="Write a short note"
                  rows={3}
                  disabled={isPending}
                  className="w-full border mb-4 border-gray-200 rounded-lg p-3 text-sm resize-none disabled:bg-gray-50 disabled:text-gray-400"
                />
              )}

              <div className="flex flex-col-reverse xs:flex-row justify-end gap-2">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isPending}
                  className="px-6 py-2 border text-xs xs:text-sm border-primary text-primary font-medium rounded-md hover:bg-orange-50 transition-colors"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-2 bg-primary text-xs xs:text-sm text-white font-medium rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50"
                >
                  {isPending ? "Submitting..." : "Submit"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      <ReportConfirmationModal
        isOpen={isDone}
        onDone={handleClose}
      />
    </>

  );
}