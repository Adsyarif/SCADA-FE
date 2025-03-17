import {Button} from "@/components";
import { MapComponent } from "../map";

export function AttendanceWrapper () {
   const position = [51.505, -0.09]

    return (
        <div className="flex flex-col w-full">
            <div id={"action"} className={"grow"}>
                <div className="w-full flex justify-center">
                    <h1 className={"text-2xl font-semibold p-4"}>Absensi</h1>
                </div>
                <div className={"flex flex-col justify-center items-center gap-4 m-4"}>
                    <span>Rabu, 28 April 2024</span>
                    <span className={"text-6xl mb-6"}>08:10</span>
                    <Button>{"Clock In"}</Button>
                </div>
            </div>
            <div id={"map"} className={"h-96"}>
                <MapComponent />
            </div>
        </div>
    )
}