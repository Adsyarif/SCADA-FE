import { OperatorScheduleListProps } from "./type"

export function OperatorScheduleList(props : OperatorScheduleListProps) {
    const { day, date, startTime, endTime } = props
    return (
        <div className="flex justify-center items-center w-full">
            <div className="flex flex-col justify-center items-center bg-blue-500 px-6 py-2 text-white rounded-xl mr-8">
                <span className="text-xs">{day}</span>
                <span>{date}</span>
            </div>
            <div>
                <span>{startTime}</span> - <span>{endTime}</span>
            </div>
        </div>
    )
}