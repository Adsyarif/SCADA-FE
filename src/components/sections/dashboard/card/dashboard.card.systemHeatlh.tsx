import { Zap } from "lucide-react";

interface SystemHealthProps {
  lastUpdate: string;
  healthPercentage: number;
}

const SystemHealth = ({ lastUpdate, healthPercentage }: SystemHealthProps) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-5 border border-blue-100 w-full">
      <div className="flex items-center justify-between mb-3 w-full">
        <div>
          <h3 className="font-semibold text-gray-800 flex items-center">
            <Zap className="w-4 h-4 mr-2 text-blue-600" />
            System Health
          </h3>
          <p className="text-xs text-gray-600">Updated {lastUpdate}</p>
        </div>
        <div className="text-2xl font-bold text-blue-600">
          {healthPercentage}%
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
        <div
          className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${healthPercentage}%` }}
        ></div>
      </div>

      <div className="flex justify-between text-xs text-gray-500 w-full">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

export default SystemHealth;
