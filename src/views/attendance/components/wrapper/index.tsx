import {Button} from "@/components";

export function AttendanceWrapper () {
    return (
        <div className="flex flex-col w-full">
            <div id={"action"} className={"grow"}>
                <div className={"flex flex-col m-4"}>
                    <h1>Absensi</h1>
                    <span>Rabu, 28 April 2024</span>
                    <span>08:10</span>
                    <div><Button>{"Clock In"}</Button></div>
                </div>
            </div>
            <div id={"map"} className={"grow bg-blue-200"}>

            </div>
        </div>
    )
}