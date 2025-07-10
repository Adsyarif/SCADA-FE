import { LoadingPage, ScheduleList, Title } from "@/components";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useDefinitions, useDeleteDefinition } from "../../api";

export function ScheduleManagementWrapper() {
    const router = useRouter()
     const { data: defs = [], isLoading } = useDefinitions();
    const del = useDeleteDefinition();

    if (isLoading) return <LoadingPage />;

    const format24 = (iso: string) =>
        new Date(iso).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,    // ← this makes it 00–23
    });

    return (
        <div className="w-full p-4 space-y-4">
            <Title isButton backHref="/homepage" text="Manajemen Jadwal"/>
            <div className="flex justify-end">
                <button
                    onClick={() => router.push("/schedule-management/create")}
                    className="px-2 py-1 rounded-md bg-blue-500 hover:bg-blue-700 text-white flex items-center gap-2"
                    >
                    <PlusIcon size={16} />Add
                </button>
            </div>
            <div className="space-y-2">
               {defs.map((d) => (
                <ScheduleList
                    key={d.id}
                    rtuName={d.rtu.rtuName}
                    shiftName={d.shift.shiftName}
                    workDays={d.daysOfWeek.split(",").join(" - ")}
                    startTime={format24(d.shift.startTime)}
                    endTime={format24(d.shift.endTime)}
                    employeeTotal={d.userSites.length}
                    onEdit={() => router.push(`/schedule-management/${d.id}/edit`)}
                    onDelete={() => del.mutate(d.id)}
                />
                ))}
            </div>
        </div>
    )
}