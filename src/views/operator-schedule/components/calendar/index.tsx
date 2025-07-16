import React from "react";
import { Title, LoadingPage } from "@/components";
import { OperatorScheduleList } from "@/components/operator-schedule-list";
import { useShift } from "../../api";

interface CalendarScheduleProps {
  shiftId: string;
}

export function CalendarSchedule({ shiftId }: CalendarScheduleProps) {
  const { data: shift, isLoading } = useShift(shiftId);

  if (isLoading) return <LoadingPage />;
  if (!shift) return <div>Shift not found</div>;

  // helper: format a Date to "HH:mm"
  const formatTime = (d: Date) =>
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });

  // build next 14 days (including today)
  const today = new Date();
  const days: Date[] = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });

  // Indonesian day names; adjust if you need English
  const dayNames = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];

  const monthName = today.toLocaleString("default", { month: "long" });

  const start = new Date(shift.startTime);
  const end   = new Date(shift.endTime);

  return (
    <div className="flex flex-col justify-center items-center">
      <Title text="Schedule" isButton backHref="/schedule-management" />

      <span className="text-2xl font-bold">{monthName}</span>

      <div className="space-y-2 w-full mt-4">
        {days.map((date) => {
          const day = dayNames[date.getDay()];
          const dd  = date.getDate().toString().padStart(2, "0");
          return (
            <OperatorScheduleList
              key={date.toISOString()}
              day={day}
              date={dd}
              startTime={formatTime(start)}
              endTime={formatTime(end)}
            />
          );
        })}
      </div>
    </div>
  );
}
