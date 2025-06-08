import { Indicator, MenuItems } from "@/components";
import {
  Calendar1,
  CalendarCheck,
  File,
  Laptop2,
  Rss,
  ScanEye,
  Settings,
  User2Icon,
  Users,
  UserSquare2,
  Wallet,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export function HomepageWrapper() {
  const { data: session } = useSession();
  const userPermissions = session?.user?.permissions || [];
  console.log(`ini isi dari dari userPermissions: `, userPermissions);
  const userName = session?.user.name;

  const checkPermission = (permission: string) => {
    return userPermissions.includes(permission);
  };

  return (
    <div className="flex flex-col">
      <div className="grow flex flex-col">
        <div className="flex justify-between items-center h-1/3 px-8">
          <div>
            <h1>Hi, {userName}</h1>
          </div>
          <div>00:00 AM</div>
        </div>
        <div className="grow flex flex-col justify-center">
          <div className="grow flex justify-center my-4 items-center">
            <div className={"w-full flex justify-around items-center"}>
              <h2 className="text-xl font-black">Status RTU</h2>{" "}
              <Link href="/" className="text-blue-800 text-xs">
                Lainnya...
              </Link>
            </div>
          </div>
          <div className="grow grid grid-cols-3 justify-items-center content-center">
            <Indicator value={2000} indicatorName={"Indikator 1"} />
            <Indicator value={1500} indicatorName={"Indikator 2"} />
            <Indicator value={1000} indicatorName={"Indikator 3"} />
          </div>
        </div>
      </div>
      <div className="grow bg-gray-200">
        <div className="grid grid-cols-4 gap-4 text-xs justify-items-center align-center p-8">
          {checkPermission("manage:schedule") && (
            <MenuItems href="/operator-schedule" menuName="Lihat Jadwal">
              <Calendar1 />
            </MenuItems>
          )}
          {checkPermission("staff:attendance") && (
            <MenuItems href="/attendance" menuName="Absensi">
              <CalendarCheck />
            </MenuItems>
          )}
          {checkPermission("create:reports") && (
            <MenuItems href="/reports" menuName="Buat Laporan">
              <File />
            </MenuItems>
          )}
          {checkPermission("view:operators") && (
            <MenuItems href="/list-operator" menuName="Daftar Operator">
              <UserSquare2 />
            </MenuItems>
          )}
          {checkPermission("reporting") && (
            <MenuItems href="/" menuName="Laporan Keuangan">
              <Wallet />
            </MenuItems>
          )}
          {checkPermission("manage:roles") && (
            <MenuItems href="/user-role" menuName="Manajemen User Role">
              <Users />
            </MenuItems>
          )}
          {checkPermission("manage:users") && (
            <MenuItems href="/user" menuName="Daftar User">
              <User2Icon />
            </MenuItems>
          )}
          {checkPermission("manage:rtu-site") && (
            <MenuItems href="/rtu-configuration" menuName="Konfigurasi RTU">
              <Laptop2 />
            </MenuItems>
          )}
          {checkPermission("manage:permissions") && (
            <MenuItems href="/" menuName="Manajemen Permissions">
              <ScanEye />
            </MenuItems>
          )}
          {checkPermission("manage:content") && (
            <MenuItems href="/" menuName="Manajemen Konten">
              <Rss />
            </MenuItems>
          )}
          {checkPermission("manage:settings") && (
            <MenuItems href="/shift-configuration" menuName="Pengaturan Shift">
              <Settings />
            </MenuItems>
          )}
        </div>
      </div>
    </div>
  );
}
