import React, { useState } from "react";
import { LoadingPage, ShiftList, Title } from "@/components";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useShifts, useDeleteShift } from "../../api";
import type { Shift } from "../../types";

export function ShiftManagementWrapper() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const limit = 10;


  const format24 = (iso: string) =>
    new Date(iso).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,       // ← forces 24-hour
    });


  const { data: shifts = [], isLoading } = useShifts();
  const deleteShift = useDeleteShift();

  if (isLoading) return <LoadingPage />;

  const handleEdit = (id: string) => router.push(`/shift-configuration/${id}/edit`);
  const handleDelete = (id: string, name: string) => {
    if (confirm(`Delete shift ${name}?`)) deleteShift.mutate(id);
  };

  const calcDuration = (start: string, end: string) => {
    // parse “HH:mm”
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end  .split(":").map(Number);

    let startMinutes = sh * 60 + sm;
    let endMinutes   = eh * 60 + em;

    // if end is earlier or equal to start, assume next day
    if (endMinutes <= startMinutes) {
      endMinutes += 24 * 60;
    }

    const diffHours = (endMinutes - startMinutes) / 60;
    // format “9 hours” or “1 hour”
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""}`;
  };

  return (
    <div className="w-full p-4 space-y-4">
        <Title isButton backHref="/homepage" text="Shift Management" />
      <div className="flex justify-end">
        <button
          onClick={() => router.push("/shift-configuration/create")}
          className="px-2 py-1 rounded-md bg-blue-500 hover:bg-blue-700 text-white flex items-center gap-2"
        >
          <PlusIcon size={16} />Add
        </button>
      </div>

      <div className="space-y-2">
        {shifts.map((s: Shift) => (
          <ShiftList
            key={s.id}
            shiftName={s.shiftName}
            startTime={format24(s.startTime)}
            endTime={format24(s.endTime)}
            shiftDuration={calcDuration(
              format24(s.startTime),
              format24(s.endTime)
            )}
            isLoading={false}
            onEdit={() => handleEdit(s.id)}
            onDelete={() => handleDelete(s.id, s.shiftName)}
          />
        ))}
      </div>

    </div>
  );
}
