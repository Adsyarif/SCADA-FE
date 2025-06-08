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

  const { data: shifts = [], isLoading } = useShifts();
  const deleteShift = useDeleteShift();

  if (isLoading) return <LoadingPage />;

  const handleEdit = (id: string) => router.push(`/shift-configuration/${id}/edit`);
  const handleDelete = (id: string, name: string) => {
    if (confirm(`Delete shift ${name}?`)) deleteShift.mutate(id);
  };

  const calcDuration = (start: string, end: string) => {
    const diff = (new Date(end).getTime() - new Date(start).getTime()) / 1000 / 3600;
    return `${diff} hour${diff !== 1 ? "s" : ""}`;
  };

  return (
    <div className="w-full p-4 space-y-4">
        <Title isButton text="Shift Management" />
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
            startTime={new Date(s.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            endTime={new Date(s.endTime).toLocaleTimeString([],   { hour: "2-digit", minute: "2-digit" })}
            shiftDuration={calcDuration(s.startTime, s.endTime)}
            isLoading={false}
            onEdit={() => handleEdit(s.id)}
            onDelete={() => handleDelete(s.id, s.shiftName)}
          />
        ))}
      </div>

    </div>
  );
}
