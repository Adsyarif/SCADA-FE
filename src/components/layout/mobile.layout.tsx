// components/MobileLayout.tsx
import { ReactNode } from "react";
import Link from "next/link";
import {
  Bell,
  HouseIcon,
  Mail,
  SquareArrowRightIcon,
  User,
} from "lucide-react";

interface MobileLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  showHeader?: boolean;
  showFooter?: boolean;
}

const MobileLayout = ({
  children,
  showHeader = true,
  showFooter = true,
}: MobileLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {showHeader && (
        <header className="sticky top-0 z-10 flex border-b border-gray-300 bg-white shadow-sm">
          <div className="grow flex gap-2 justify-between items-center p-4">
            <div className="flex items-center gap-2">
              <img src="/img/Logo.png" alt="scada-logo" className="w-10 h-10" />
              <p className="font-semibold text-gray-800">SCADA ONLINE</p>
            </div>
            {/* Tambahkan elemen tambahan di header jika diperlukan */}
          </div>
        </header>
      )}

      <main className="flex-grow overflow-y-auto">{children}</main>

      {showFooter && (
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-10">
          <div className="flex justify-around items-center p-3">
            <Link
              href="/homepage"
              className="flex flex-col items-center p-2 rounded-lg transition-colors hover:bg-gray-100"
            >
              <HouseIcon className="w-6 h-6 text-gray-700" />
              <span className="text-xs mt-1 text-gray-600">Home</span>
            </Link>

            <Link
              href="/message"
              className="flex flex-col items-center p-2 rounded-lg transition-colors hover:bg-gray-100"
            >
              <Mail className="w-6 h-6 text-gray-700" />
              <span className="text-xs mt-1 text-gray-600">Pesan</span>
            </Link>

            <Link
              href="/notification"
              className="flex flex-col items-center p-2 rounded-lg transition-colors hover:bg-gray-100"
            >
              <Bell className="w-6 h-6 text-gray-700" />
              <span className="text-xs mt-1 text-gray-600">Notif</span>
            </Link>

            <Link
              href="/user-profile"
              className="flex flex-col items-center p-2 rounded-lg transition-colors hover:bg-gray-100"
            >
              <User className="w-6 h-6 text-gray-700" />
              <span className="text-xs mt-1 text-gray-600">Profil</span>
            </Link>

            <Link
              href="/"
              className="flex flex-col items-center p-2 rounded-lg transition-colors hover:bg-gray-100"
            >
              <SquareArrowRightIcon className="w-6 h-6 text-gray-700" />
              <span className="text-xs mt-1 text-gray-600">Keluar</span>
            </Link>
          </div>
        </footer>
      )}
    </div>
  );
};

export default MobileLayout;
