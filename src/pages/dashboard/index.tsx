import { useSession } from "next-auth/react";
import MobileLayout from "@/components/layout/mobile.layout";
import MobileContainer from "@/components/layout/mobile.container";
import { Activity } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  FullscreenLoading,
  Header,
  QuickAccess,
  SystemCards,
  SystemHealth,
  TemperatureMonitoring,
} from "@/components";

const Dashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
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
    if (status === "loading") return;

    if (!session) {
      router.push("/login");
    }
  }, [session, status, router]);

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

  if (status === "loading") {
    return <FullscreenLoading text="Checking authentication..." />;
  }

  if (!session) {
    return <FullscreenLoading text="Redirecting to login..." />;
  }

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  return (
    <MobileLayout>
      <MobileContainer>
        <Header
          userName={session?.user?.name}
          currentTime={currentTime}
          systemData={systemData}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />

        <div className="pt-6 px-4 w-full">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-blue-600" />
            System Overview
          </h2>

          <SystemCards systemData={systemData} />
          <SystemHealth
            lastUpdate={systemData.lastUpdate}
            healthPercentage={92}
          />
          <TemperatureMonitoring temperature={systemData.temperature} />
        </div>

        <QuickAccess />
      </MobileContainer>
    </MobileLayout>
  );
};

export default Dashboard;
