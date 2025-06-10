import { Pencil, Trash } from "lucide-react";
import { ScheduleListProps } from "./type";

export function ScheduleList(props: ScheduleListProps) {
    const { rtuName, shiftName, workDays, startTime, endTime,employeeTotal, onEdit, onDelete } = props
    return (
        <div className="flex gap-2 justify-between border border-gray-200 rounded-lg shadow p-4">
            <span className="flex justify-center items-center">
                {rtuName}
            </span>
            <div className="flex flex-col text-xs">
                <span>{shiftName}</span>
                <span>Hari kerja: {workDays}</span>
                <span>Jam Kerja: {startTime} {endTime}</span>
                <span>Total Pekerja: {employeeTotal}</span>
            </div>
            <div className="flex items-center gap-2">
                {onEdit && (
                  <button
                    onClick={() => onEdit()}
                    className="px-2 py-1 rounded-md bg-green-200 hover:bg-green-300"
                  >
                    <Pencil size={16} />
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete()}
                    className="px-2 py-1 rounded-md bg-red-200 hover:bg-red-300"
                  >
                    <Trash size={16} />
                  </button>
                )}
            </div>
        </div>
    )
}