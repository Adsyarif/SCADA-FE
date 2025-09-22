import { ReactNode, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Bell,
  House,
  Mail,
  LogOut,
  User,
  Settings,
  Menu,
  X,
  BarChart3,
  Calendar,
  CalendarCheck,
  Laptop,
  Rss,
  Eye,
  User as User2Icon,
  Users,
  UserCheck,
  Wallet,
  File,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";

interface MobileLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  showHeader?: boolean;
  showFooter?: boolean;
}

interface MenuItem {
  permission: string;
  href: string;
  name: string;
  icon: React.ComponentType<any>;
}

const MobileLayout = ({
  children,
  title = "SCADA ONLINE",
  description = "Monitoring System",
  showHeader = true,
  showFooter = true,
}: MobileLayoutProps) => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const userPermissions = session?.user?.permissions || [];
  const userName = session?.user?.name;

  const checkPermission = (permission: string) => {
    return userPermissions.includes(permission);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSidebarOpen]);

  const menuItems: MenuItem[] = [
    {
      permission: "manage:schedule",
      href: "/operator-schedule",
      name: "Lihat Jadwal",
      icon: Calendar,
    },
    {
      permission: "manage:schedule",
      href: "/schedule-management",
      name: "Manajemen Jadwal",
      icon: Calendar,
    },
    {
      permission: "staff:attendance",
      href: "/attendance",
      name: "Absensi",
      icon: CalendarCheck,
    },
    {
      permission: "create:reports",
      href: "/reports",
      name: "Buat Laporan",
      icon: File,
    },
    {
      permission: "view:operators",
      href: "/list-operator",
      name: "Daftar Operator",
      icon: UserCheck,
    },
    {
      permission: "reporting",
      href: "/financial-reports",
      name: "Laporan Keuangan",
      icon: Wallet,
    },
    {
      permission: "manage:roles",
      href: "/user-role",
      name: "Manajemen Role",
      icon: Users,
    },
    {
      permission: "manage:users",
      href: "/user",
      name: "Daftar User",
      icon: User2Icon,
    },
    {
      permission: "manage:rtu-site",
      href: "/rtu-configuration",
      name: "Konfigurasi RTU",
      icon: Laptop,
    },
    {
      permission: "manage:permissions",
      href: "/permissions",
      name: "Manajemen Permissions",
      icon: Eye,
    },
    {
      permission: "manage:content",
      href: "/content",
      name: "Manajemen Konten",
      icon: Rss,
    },
    {
      permission: "manage:settings",
      href: "/shift-configuration",
      name: "Pengaturan Shift",
      icon: Settings,
    },
  ];

  const footerItems = [
    { id: "home", href: "/home", icon: House, label: "Home" },
    {
      id: "monitoring",
      href: "/monitoring",
      icon: BarChart3,
      label: "Monitor",
    },
    {
      id: "messages",
      href: "/messages",
      icon: Mail,
      label: "Pesan",
      badge: hasUnreadMessages ? 1 : undefined,
    },
    { id: "profile", href: "/profile", icon: User, label: "Profil" },
  ];

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleNotificationClick = () => {
    router.push("/notifications");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 relative w-full max-w-[100vw] overflow-x-hidden">
      {showHeader && (
        <header
          className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/60 transition-all duration-300 ${
            isScrolled ? "shadow-md" : "shadow-sm"
          }`}
        >
          <div className="w-full px-4">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3 flex-1">
                <button
                  onClick={toggleSidebar}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors active:scale-95"
                  aria-label="Toggle menu"
                  aria-expanded={isSidebarOpen}
                >
                  {isSidebarOpen ? (
                    <X className="w-5 h-5 text-gray-700" />
                  ) : (
                    <Menu className="w-5 h-5 text-gray-700" />
                  )}
                </button>
                <div className="flex items-center gap-2 min-w-0">
                  <div className="relative flex-shrink-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="relative flex-shrink-0">
                        <img
                          src="/img/Logo.png"
                          alt="scada-logo"
                          className="w-8 h-8 md:w-10 md:h-10 drop-shadow-sm"
                        />
                        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-400 rounded-full border border-white"></div>
                      </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-400 rounded-full border border-white"></div>
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-gray-800 text-sm truncate">
                      {title}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors active:scale-95"
                  onClick={handleNotificationClick}
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5 text-gray-600" />
                  {hasUnreadNotifications && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white"></span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>
      )}

      <main
        className={`flex-grow overflow-y-auto w-full ${
          showHeader ? "pt-16" : ""
        } ${showFooter ? "pb-16" : ""}`}
      >
        {children}
      </main>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div
            className="absolute left-0 top-0 bottom-0 flex flex-col justify-between w-72 bg-white shadow-xl"
            ref={sidebarRef}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative flex-shrink-0">
                    <img
                      src="/img/Logo.png"
                      alt="scada-logo"
                      className="w-8 h-8 md:w-10 md:h-10 drop-shadow-sm"
                    />
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-400 rounded-full border border-white"></div>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">SCADA ONLINE</p>
                    <p className="text-sm text-gray-500">Monitoring System</p>
                  </div>
                </div>
                <button
                  onClick={toggleSidebar}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors active:scale-95 text-gray-700"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="h-[70dvh] space-y-1 overflow-y-auto">
                {menuItems.map((item, idx) => {
                  const Icon = item.icon;
                  const isActive = router.pathname === item.href;

                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      className={`flex items-center gap-3 py-3 rounded-lg transition-colors w-full text-left ${
                        isActive
                          ? "bg-blue-100 text-blue-700 border border-blue-200"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium text-sm">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="p-6 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 p-3 w-full text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-100 text-left"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium text-sm">Keluar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {showFooter && (
        <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200/60 shadow-lg z-20">
          <div className="w-full">
            <div className="flex justify-around items-center p-2">
              {footerItems.map((item) => {
                const Icon = item.icon;
                const isActive = router.pathname === item.href;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200 min-w-[60px] ${
                      isActive
                        ? "bg-blue-100 text-blue-600 transform -translate-y-1 border border-blue-200"
                        : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                    }`}
                    aria-label={item.label}
                  >
                    <div className="relative">
                      <Icon className="w-5 h-5 mx-auto" />
                      {item.badge !== undefined && (
                        <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs mt-1 font-medium">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default MobileLayout;
