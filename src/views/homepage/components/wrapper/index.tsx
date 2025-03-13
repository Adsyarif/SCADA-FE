import { Indicator } from "@/components";
import { Calendar, CalendarCheck, File, User, UserSquare2, Wallet } from "lucide-react";
import Link from "next/link";

export function HomepageWrapper () {
    return (
        <div>
            <div className="flex justify-between items-center w-full p-8">
                <div className="w-1/3 flex justify-center">
                    <div className="rounded-full bg-slate-200 w-16 h-16 flex justify-center items-center"><User className="w-12 h-12"/></div>
                </div>
                <div>
                    <p className="line-clamp-2 text-justify">
                        here written what should be written
                    </p>
                </div>
            </div>
            <div>
                <div className="flex justify-around my-4 items-end">
                    <h2 className="text-xl font-black">Status RTU</h2> <Link href="/" className="text-blue-800 text-xs">Lainnya...</Link>
                </div>
                <div className="grid grid-cols-3 justify-items-center">
                    <Indicator value={2000} />
                    <Indicator value={1500} />
                    <Indicator value={1000} />
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4 text-xs justify-items-center align-center p-8">
                <Link href="/"><Calendar />Lihat Jadwal</Link>
                <Link href="/"><CalendarCheck />Absensi</Link>
                <Link href="/"><File />Buat Laporan</Link>
                <Link href="/"><UserSquare2 />Daftar Operator</Link>
                <Link href="/"><Wallet />Laporan Keuangan</Link>
            </div>
        </div>
    )
}