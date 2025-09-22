import { Thermometer } from "lucide-react";

interface TemperatureMonitoringProps {
  temperature: number;
}

const TemperatureMonitoring = ({ temperature }: TemperatureMonitoringProps) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-5 w-full">
      <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
        <Thermometer className="w-4 h-4 mr-2 text-red-500" />
        Temperature Monitoring
      </h3>

      <div className="flex items-center justify-center mb-3">
        <div className="text-3xl font-bold text-gray-800 mr-2">
          {temperature}°C
        </div>
        <div
          className={`text-sm font-medium px-2 py-1 rounded-full ${
            temperature > 35
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {temperature > 35 ? "High" : "Normal"}
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
          style={{ width: `${Math.min(temperature, 100)}%` }}
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
  );
};

export default TemperatureMonitoring;
