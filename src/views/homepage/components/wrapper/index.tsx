import { Indicator, MenuItems } from "@/components";
import { Calendar1, CalendarCheck, File, Laptop2, Rss, ScanEye, Settings, User, User2Icon, UserPen, Users, UserSquare2, Wallet } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export function HomepageWrapper () {
    const { data: session } = useSession()
    const userPermissions = session?.user?.permissions || []

    const checkPermission = (permission: string) => {
        return userPermissions.includes(permission)
    }

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
                    {checkPermission("manage:schedule") && (
                    <MenuItems href="/" menuName="Lihat Jadwal"><Calendar1 /></MenuItems>
                    )}
                    {checkPermission("staff:attendance") && (
                    <MenuItems href="/" menuName="Absensi"><CalendarCheck /></MenuItems>
                    )}
                    {checkPermission("create:reports") && (
                    <MenuItems href="/" menuName="Buat Laporan"><File /></MenuItems>
                    )}
                    {checkPermission("view:operators") && (
                    <MenuItems href="/" menuName="Daftar Operator"><UserSquare2 /></MenuItems>
                    )}
                    {checkPermission("reporting") && (
                    <MenuItems href="/" menuName="Laporan Keuangan"><Wallet /></MenuItems>
                    )}
                    {checkPermission("manage:roles") && (
                    <MenuItems href="/user-role" menuName="Manajemen User Role"><Users /></MenuItems>
                    )}
                    {checkPermission("manage:users") && (
                    <MenuItems href="/" menuName="Daftar User"><User2Icon /></MenuItems>
                    )}
                    {checkPermission("manage:rtu-site") && (
                    <MenuItems href="/" menuName="Konfigurasi RTU"><Laptop2 /></MenuItems>
                    )}
                    {checkPermission("manage:permissions") && (
                    <MenuItems href="/" menuName="Manajemen Permissions"><ScanEye /></MenuItems>
                    )}
                    {checkPermission("manage:content") && (
                    <MenuItems href="/" menuName="Manajemen Konten"><Rss /></MenuItems>
                    )}
                    {checkPermission("manage:settings") && (
                    <MenuItems href="/" menuName="Pengaturan"><Settings /></MenuItems>
                    )}
                </div>
            </div>
        </div>
    )
}