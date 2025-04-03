import { CalendarSchedule } from "@/views";


export function OperatorScheduleWrapper() {
    return (
        <div className="flex flex-col w-full pt-16">
            <div className="grow">
                <h1 className="text-2xl font-semibold p-4">Jadwal</h1>
            </div>
            <div>
                <CalendarSchedule />
            </div>
        </div>
    )
}