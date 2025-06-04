import { Pencil, Trash } from "lucide-react";
import { RtuListProps } from "./type";
import { LoadingPage } from "../loading-page";

export function RtuList(props: RtuListProps) {
    const { rtuName, rtuRadius, rtuCoordinates, onEdit, onDelete, isLoading} = props;

    if (isLoading) {
        return <div className="p-4 text-center"><LoadingPage /></div>;
    }
    return (
        <div className="flex justify-between items-center p-4 border border-gray-200 hover:bg-gray-50 transition-colors rounded-md shadow-sm">
            <div>
              <div className="text-lg font-semibold text-gray-800 truncate">
                {rtuName}
              </div>
            </div>
            <div className="flex flex-col gap-2 text-xs justify-start items-start">
                <span>Radius: {rtuRadius}</span>
                <span>Coordinates: {rtuCoordinates}</span>
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