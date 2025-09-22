import { User, MapPin, RefreshCw, Battery } from "lucide-react";

interface HeaderProps {
  userName?: string | null;
  currentTime: string;
  systemData: {
    lokasiInjector: string;
    status: string;
    batteryLevel: number;
    kode: string;
  };
  refreshing: boolean;
  onRefresh: () => void;
}

const Header = ({
  userName,
  currentTime,
  systemData,
  refreshing,
  onRefresh,
}: HeaderProps) => {
  const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return "Selamat Pagi";
    if (hour < 15) return "Selamat Siang";
    if (hour < 19) return "Selamat Sore";
    return "Selamat Malam";
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "normal":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "danger":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-700 to-indigo-800 text-white p-5 pb-6 shadow-md relative w-full">
      <div className="flex justify-between items-start mb-4 w-full">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
            <User className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm opacity-90 mb-1">{getGreeting()}</p>
            <h1 className="text-lg font-bold">{userName || "Pengguna"}</h1>
          </div>
        </div>

        <div className="text-right">
          <div className="text-md font-semibold flex items-center justify-end">
            {currentTime}
            <button
              onClick={onRefresh}
              className="ml-2 p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              disabled={refreshing}
            >
              <RefreshCw
                className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
              />
            </button>
          </div>
          <div className="text-xs opacity-80 mt-1 flex items-center justify-end">
            <MapPin className="w-3 h-3 mr-1" />
            <span>{systemData.lokasiInjector}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 w-full">
        <div className="flex items-center">
          <div
            className={`w-3 h-3 rounded-full mr-2 ${getStatusColor(
              systemData.status
            )}`}
          ></div>
          <span className="text-sm font-medium">
            Status: {systemData.status.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center bg-black/20 px-3 py-1 rounded-full text-xs">
          <Battery className="w-3 h-3 mr-1" />
          <span>{systemData.batteryLevel}%</span>
        </div>
      </div>

      <div className="absolute -bottom-4 left-5 bg-white rounded-lg shadow-md py-2 px-4 flex items-center">
        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
        <span className="text-xs font-medium text-gray-700">
          {systemData.kode}
        </span>
      </div>
    </div>
  );
};

export default Header;
