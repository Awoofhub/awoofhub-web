"use client";

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { useState } from "react";
import { IoChevronBack, IoChevronDown, IoChevronForward } from "react-icons/io5";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

type CalendarProps = {
  month: Date;
  selectedDate: string;
  minDate: string;
  maxDate: string;
  rangeStart: string;
  rangeEnd: string;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onSelect: (date: string) => void;
};

function Calendar({
  month,
  selectedDate,
  minDate,
  maxDate,
  rangeStart,
  rangeEnd,
  onPreviousMonth,
  onNextMonth,
  onSelect,
}: CalendarProps) {
  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month)),
    end: endOfWeek(endOfMonth(month)),
  });
  const selected = selectedDate ? parseISO(selectedDate) : undefined;
  const min = minDate ? parseISO(minDate) : undefined;
  const max = maxDate ? parseISO(maxDate) : undefined;
  const rangeStartDate = rangeStart ? parseISO(rangeStart) : undefined;
  const rangeEndDate = rangeEnd ? parseISO(rangeEnd) : undefined;
  const rangeLabel = rangeStartDate && rangeEndDate
    ? `${format(rangeStartDate, "d/M/yyyy")} - ${format(rangeEndDate, "d/M/yyyy")}`
    : "Select date range";

  return (
    <div className="rounded-xl bg-[#fafafa] p-5">
      <div className="mb-4 flex items-center gap-3 border-b border-gray-200 pb-4 text-xs text-gray-800">
        <p className="min-w-fit font-semibold">{format(month, "MMMM yyyy")}</p>
        <p className="flex-1 truncate text-center">{rangeLabel}</p>
        <div className="flex gap-2">
          <button type="button" onClick={onPreviousMonth} className="rounded bg-gray-200 p-1 text-gray-600 hover:bg-gray-300" aria-label="Previous month"><IoChevronBack /></button>
          <button type="button" onClick={onNextMonth} className="rounded bg-gray-200 p-1 text-gray-600 hover:bg-gray-300" aria-label="Next month"><IoChevronForward /></button>
        </div>
      </div>
      <div className="grid grid-cols-7 text-center text-xs">
        {WEEKDAYS.map((day) => <span key={day} className="pb-2 font-semibold text-gray-900">{day}</span>)}
        {days.map((day) => {
          const outsideMonth = !isSameMonth(day, month);
          const disabled = outsideMonth || (min && isBefore(day, min)) || (max && isAfter(day, max));
          const isSelected = selected && isSameDay(day, selected);
          const isInRange = rangeStartDate && rangeEndDate && !isBefore(day, rangeStartDate) && !isAfter(day, rangeEndDate);

          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={Boolean(disabled)}
              onClick={() => onSelect(format(day, "yyyy-MM-dd"))}
              className={`flex h-9 w-full items-center justify-center transition ${isSelected ? "rounded-md bg-primary font-semibold text-white" : isInRange ? "bg-[#fde5dc] text-gray-700" : disabled ? "cursor-not-allowed text-gray-300" : outsideMonth ? "text-gray-400 hover:bg-orange-50" : "text-gray-700 hover:bg-orange-50 hover:text-primary"}`}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}

type OfferDateRangePickerProps = {
  createdFrom?: string;
  createdTo?: string;
  onApply: (dates: { createdFrom: string; createdTo: string }) => void;
};

export function OfferDateRangePicker({ createdFrom, createdTo, onApply }: OfferDateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [draftFrom, setDraftFrom] = useState(createdFrom ?? "");
  const [draftTo, setDraftTo] = useState(createdTo ?? "");
  const [calendarMonth, setCalendarMonth] = useState(() => createdFrom ? startOfMonth(parseISO(createdFrom)) : startOfMonth(new Date()));

  const toggle = () => {
    if (!isOpen) {
      setDraftFrom(createdFrom ?? "");
      setDraftTo(createdTo ?? "");
      setCalendarMonth(createdFrom ? startOfMonth(parseISO(createdFrom)) : startOfMonth(new Date()));
    }
    setIsOpen((open) => !open);
  };

  const apply = () => {
    onApply({ createdFrom: draftFrom, createdTo: draftTo });
    setIsOpen(false);
  };

  const hasRange = Boolean(createdFrom && createdTo);
  const triggerLabel = hasRange
    ? `${format(parseISO(createdFrom!), "d/M/yyyy")} – ${format(parseISO(createdTo!), "d/M/yyyy")}`
    : "Date";

  return (
    <div className="relative font-baloo">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className={[
          "flex h-12 items-center justify-between gap-2 rounded-[8px] border px-4 text-[16px] font-medium transition",
          hasRange ? "w-auto min-w-[110px]" : "w-[92px]",
          hasRange || isOpen
            ? "border-primary bg-primary text-white"
            : "border-[#595858B2] bg-white text-[#0C0C0C] hover:border-[#737373]",
        ].join(" ")}
      >
        <span className="truncate">{triggerLabel}</span>
        <IoChevronDown
          className={[
            "shrink-0 text-sm transition-transform duration-200",
            isOpen ? "rotate-180" : "",
            hasRange || isOpen ? "text-white" : "text-[#595858]",
          ].join(" ")}
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 z-20 mt-2 w-[min(47rem,calc(100vw-2rem))] rounded-xl border border-gray-200 bg-white p-1 shadow-xl" role="dialog" aria-label="Choose a date range">
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            <Calendar month={calendarMonth} selectedDate={draftFrom} minDate="" maxDate={draftTo} rangeStart={draftFrom} rangeEnd={draftTo} onPreviousMonth={() => setCalendarMonth((month) => subMonths(month, 1))} onNextMonth={() => setCalendarMonth((month) => addMonths(month, 1))} onSelect={setDraftFrom} />
            <Calendar month={addMonths(calendarMonth, 1)} selectedDate={draftTo} minDate={draftFrom} maxDate="" rangeStart={draftFrom} rangeEnd={draftTo} onPreviousMonth={() => setCalendarMonth((month) => subMonths(month, 1))} onNextMonth={() => setCalendarMonth((month) => addMonths(month, 1))} onSelect={setDraftTo} />
          </div>
          <div className="flex justify-end gap-3 border-t border-gray-200 px-4 py-3">
            <button type="button" onClick={() => setIsOpen(false)} className="rounded-md border border-primary px-5 py-2 text-xs font-semibold text-primary hover:bg-orange-50">Cancel</button>
            <button type="button" onClick={apply} className="rounded-md bg-primary px-5 py-2 text-xs font-semibold text-white transition hover:bg-[#e64703]">Apply</button>
          </div>
        </div>
      )}
    </div>
  );
}
