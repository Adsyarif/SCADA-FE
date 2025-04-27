import { Indicator, MenuItems } from "@/components";
import { Calendar, Calendar1, CalendarCheck, File, User, UserSquare2, Wallet } from "lucide-react";
import Link from "next/link";

export function HomepageWrapper () {
    return (
        <div className="flex flex-col">
            <div className="grow flex flex-col">
                <div className="grow flex justify-between items-center w-full px-8">
                    <div>
                        <div className="flex justify-center">
                            <div className="rounded-full bg-slate-200 w-24 h-24 flex justify-center items-center"><User className="w-16 h-16"/></div>
                        </div>
                    </div>
                    <div className={"p-4 flex justify-center"}>
                        <p className="line-clamp-4 text-justify">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed justo nisi, blandit vel est et, pulvinar molestie dui. Quisque rutrum purus et ex ornare, ut blandit justo fermentum. Curabitur eu dapibus elit, eget faucibus neque. Donec pharetra mattis urna ac facilisis. Suspendisse gravida lectus orci, id blandit quam viverra a. Fusce quis diam erat. Vestibulum et malesuada nibh. Integer viverra tempus ullamcorper. Vestibulum quis fringilla ligula, et volutpat velit.
                        </p>
                    </div>
                </div>
                <div className="grow flex flex-col justify-center">
                    <div className="grow flex justify-center my-4 items-center">
                        <div className={"w-full flex justify-around items-center"}>
                            <h2 className="text-xl font-black">Status RTU</h2> <Link href="/" className="text-blue-800 text-xs">Lainnya...</Link>
                        </div>
                    </div>
                    <div className="grow grid grid-cols-3 justify-items-center content-center">
                        <Indicator value={2000} indicatorName={"Indikator 1"}/>
                        <Indicator value={1500} indicatorName={"Indikator 2"}/>
                        <Indicator value={1000} indicatorName={"Indikator 3"}/>
                    </div>
                </div>
            </div>
            <div className="grow bg-gray-200">
                <div className="grid grid-cols-4 gap-4 text-xs justify-items-center align-center p-8">
                    <MenuItems href="/" menuName="Lihat Jadwal"><Calendar1 /></MenuItems>
                    <MenuItems href="/" menuName="Absensi"><CalendarCheck /></MenuItems>
                    <MenuItems href="/" menuName="Buat Laporan"><File /></MenuItems>
                    <MenuItems href="/" menuName="Daftar Operator"><UserSquare2 /></MenuItems>
                    <MenuItems href="/" menuName="Laporan Keurangan"><Wallet /></MenuItems>
                </div>
            </div>
        </div>
    )
}