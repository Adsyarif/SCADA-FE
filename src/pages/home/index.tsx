import { useSession } from "next-auth/react";
import MobileLayout from "@/components/layout/mobile.layout";
import MobileContainer from "@/components/layout/mobile.container";
import {
  CalendarCheck,
  Settings,
  File,
  Wifi,
  AlertCircle,
  Gauge,
  MapPin,
  Cpu,
  Database,
  Thermometer,
  Zap,
  AlertTriangle,
  Clock,
  BarChart3,
  ChevronRight,
  User,
  Battery,
  Activity,
  RefreshCw,
} from "lucide-react";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const { data: session } = useSession();
  const userName = session?.user?.name;
  const [currentTime, setCurrentTime] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const systemData = {
    kode: "cakraxx-001",
    namaInjector: "DUREN-01",
    lokasiInjector: "DUREN SELATAN",
    namaMesin: "LEU#1",
    flowLine: 4,
    settingPress: 100,
    tankCap: 200,
    status: "normal",
    temperature: 32,
    pressure: 75,
    batteryLevel: 85,
    lastUpdate: "2 menit lalu",
  };

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes} WIB`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Selamat Pagi";
    if (hour < 15) return "Selamat Siang";
    if (hour < 19) return "Selamat Sore";
    return "Selamat Malam";
  };

  const getStatusColor = () => {
    switch (systemData.status) {
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

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const getPressureColor = (pressure: number) => {
    if (pressure > 90) return "bg-red-500";
    if (pressure > 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <MobileLayout>
      <MobileContainer>
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
                  onClick={handleRefresh}
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
                className={`w-3 h-3 rounded-full mr-2 ${getStatusColor()}`}
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

        <div className="pt-6 px-4 w-full">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-blue-600" />
            System Overview
          </h2>

          <div className="grid grid-cols-2 gap-3 mb-5 w-full">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 w-full">
              <div className="flex items-center justify-between mb-3 w-full">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-2">
                    <Cpu className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="font-medium text-gray-700 text-sm">
                    Injector
                  </h3>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
              <p className="text-xl font-bold text-gray-800 truncate">
                {systemData.namaInjector}
              </p>
              <p className="text-xs text-gray-500 mt-1 truncate">
                Mesin: {systemData.namaMesin}
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 w-full">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-2">
                    <Gauge className="w-4 h-4 text-purple-600" />
                  </div>
                  <h3 className="font-medium text-gray-700 text-sm">
                    Flow Line
                  </h3>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
              <p className="text-xl font-bold text-gray-800">
                {systemData.flowLine}
              </p>
              <p className="text-xs text-gray-500 mt-1">Active lines</p>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 w-full">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-2">
                    <Thermometer className="w-4 h-4 text-red-600" />
                  </div>
                  <h3 className="font-medium text-gray-700 text-sm">
                    Pressure
                  </h3>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
              <p className="text-xl font-bold text-gray-800">
                {systemData.pressure} psi
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className={`h-2 rounded-full ${getPressureColor(
                    systemData.pressure
                  )}`}
                  style={{ width: `${Math.min(systemData.pressure, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Setting: {systemData.settingPress} psi
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 w-full">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-2">
                    <Database className="w-4 h-4 text-green-600" />
                  </div>
                  <h3 className="font-medium text-gray-700 text-sm">
                    Tank Capacity
                  </h3>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
              <p className="text-xl font-bold text-gray-800">
                {systemData.tankCap} L
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${(systemData.tankCap / 200) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Maximum capacity</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-5 border border-blue-100 w-full">
            <div className="flex items-center justify-between mb-3 w-full">
              <div>
                <h3 className="font-semibold text-gray-800 flex items-center">
                  <Zap className="w-4 h-4 mr-2 text-blue-600" />
                  System Health
                </h3>
                <p className="text-xs text-gray-600">
                  Updated {systemData.lastUpdate}
                </p>
              </div>
              <div className="text-2xl font-bold text-blue-600">92%</div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
              <div
                className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: "92%" }}
              ></div>
            </div>

            <div className="flex justify-between text-xs text-gray-500 w-full">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-5 w-full">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <Thermometer className="w-4 h-4 mr-2 text-red-500" />
              Temperature Monitoring
            </h3>

            <div className="flex items-center justify-center mb-3">
              <div className="text-3xl font-bold text-gray-800 mr-2">
                {systemData.temperature}°C
              </div>
              <div
                className={`text-sm font-medium px-2 py-1 rounded-full ${
                  systemData.temperature > 35
                    ? "bg-red-100 text-red-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {systemData.temperature > 35 ? "High" : "Normal"}
              </div>
            </div>

            <div className="bg-gray-100 rounded-full h-3 relative w-full">
              <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center px-2">
                {[0, 25, 50, 75, 100].map((point) => (
                  <div key={point} className="w-px h-2 bg-gray-400"></div>
                ))}
              </div>
              <div
                className="bg-gradient-to-r from-blue-500 to-red-500 h-3 rounded-full"
                style={{ width: `${Math.min(systemData.temperature, 100)}%` }}
              ></div>
            </div>

            <div className="flex justify-between text-xs text-gray-500 mt-1 w-full">
              <span>0°C</span>
              <span>25°C</span>
              <span>50°C</span>
              <span>75°C</span>
              <span>100°C</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-t-3xl p-5 pt-6 w-full">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Access
          </h3>

          <div className="grid grid-cols-4 gap-3 mb-6 w-full">
            <button className="bg-white rounded-xl p-3 text-center shadow-xs border border-gray-100 transition-transform hover:scale-105 active:scale-95 w-full">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-xs font-medium">Monitor</p>
            </button>

            <button className="bg-white rounded-xl p-3 text-center shadow-xs border border-gray-100 transition-transform hover:scale-105 active:scale-95 w-full">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <File className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-xs font-medium">Reports</p>
            </button>

            <button className="bg-white rounded-xl p-3 text-center shadow-xs border border-gray-100 transition-transform hover:scale-105 active:scale-95 w-full">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Settings className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-xs font-medium">Settings</p>
            </button>

            <button className="bg-white rounded-xl p-3 text-center shadow-xs border border-gray-100 transition-transform hover:scale-105 active:scale-95 w-full">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <p className="text-xs font-medium">History</p>
            </button>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 w-full">
            <div className="flex justify-between items-center mb-3 w-full">
              <h4 className="font-semibold text-gray-800">Recent Activity</h4>
              <button className="text-xs text-blue-600 font-medium flex items-center">
                View All <ChevronRight className="w-3 h-3 ml-1" />
              </button>
            </div>

            <div className="space-y-3 w-full">
              <div className="flex items-start w-full">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <CalendarCheck className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    System update completed successfully
                  </p>
                  <p className="text-xs text-gray-500">
                    2 minutes ago • Status: Normal
                  </p>
                </div>
              </div>

              <div className="flex items-start w-full">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <Wifi className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    Pressure reading within normal parameters
                  </p>
                  <p className="text-xs text-gray-500">
                    15 minutes ago • Pressure: 75psi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MobileContainer>
    </MobileLayout>
  );
};

export default Dashboard;
