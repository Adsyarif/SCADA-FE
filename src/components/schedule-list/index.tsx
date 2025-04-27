import { ScheduleListProps } from "./type";

export function ScheduleList(props: ScheduleListProps) {
    const { day, date, time, onSchedule, shiftTime} = props
    return (
        <div>
            <div id="day-date">
                <span>{day}</span>
                <span>{date}</span>
            </div>
            <div>
                {shiftTime?.map((shift, index) => (
                    <span
                        key={index}
                        className="flex"
                    >{shift}</span>
                ))}
            </div>
        </div>
    )
}