import { Pencil, Trash } from "lucide-react";
import { ShiftListProps } from "./type";

export function ShiftList(props: ShiftListProps) {
    const { shiftName, startTime, endTime, shiftDuration, onEdit, onDelete, isLoading } = props;
    return (
        <div className="flex justify-between items-center p-4 border border-gray-200 hover:bg-gray-50 transition-colors rounded-md shadow-sm">
            <div>
                {shiftName}
            </div>
            <div>
                <div className="flex gap-2 text-xs justify-start items-start">
                    <span>{startTime}</span> -
                    <span>{endTime}</span>
                </div>
                <div className="text-xs text-gray-500">
                    {shiftDuration}
                </div>
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