import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LucideArrowLeft, MapPin, Activity } from "lucide-react";
import { TitleProps } from "@/types/report/report.types";

const Title = ({ text, isButton, handleBackClick, backHref }: TitleProps) => {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const onBack = handleBackClick
    ? handleBackClick
    : backHref
    ? () => router.push(backHref)
    : () => router.back();

  return (
    <div className="bg-gradient-to-br from-blue-700 to-indigo-800 text-white p-5 pb-6 shadow-md relative">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          {isButton && (
            <button
              onClick={onBack}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3 hover:bg-white/30 transition-colors"
            >
              <LucideArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <p className="text-sm opacity-90 mb-1">Manajemen Laporan</p>
            <h1 className="text-lg font-bold">{text}</h1>
          </div>
        </div>

        <div className="text-right">
          <div className="text-md font-semibold flex items-center justify-end">
            {currentTime} WIB
          </div>
          <div className="text-xs opacity-80 mt-1 flex items-center justify-end">
            <MapPin className="w-3 h-3 mr-1" />
            <span>System Location</span>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-4 left-5 bg-white rounded-xl shadow-md py-2 px-4 flex items-center border border-gray-100">
        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
        <span className="text-xs font-medium text-gray-700">
          <Activity className="w-3 h-3 inline mr-1" />
          Active Reports
        </span>
      </div>
    </div>
  );
};

export default Title;
