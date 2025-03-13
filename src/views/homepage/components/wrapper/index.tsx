import { Indicator } from "@/components";
import { Calendar, CalendarCheck, File, User, UserSquare2, Wallet } from "lucide-react";
import Link from "next/link";

export function HomepageWrapper () {
    return (
        <div>
            <div>
                <div className="rounded-full"><User /></div>
                <div>
                    <p>
                        here written what should be written
                    </p>
                </div>
            </div>
            <div>
                <div>
                    <h2>Status RTU</h2> <Link href="/">Lainnya...</Link>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <Indicator value={2000} />
                    <Indicator value={1500} />
                    <Indicator value={1000} />
                </div>
            </div>
            <div>
                <Link href="/"><Calendar />Lihat Jadwal</Link>
                <Link href="/"><CalendarCheck />Absensi</Link>
                <Link href="/"><File />Buat Laporan</Link>
                <Link href="/"><UserSquare2 />Daftar Operator</Link>
                <Link href="/"><Wallet />Laporan Keuangan</Link>
            </div>
        </div>
    )
}