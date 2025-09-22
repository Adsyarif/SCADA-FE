import { Cpu, Gauge, Thermometer, Database, ChevronRight } from "lucide-react";

interface SystemCardsProps {
  systemData: {
    namaInjector: string;
    namaMesin: string;
    flowLine: number;
    pressure: number;
    settingPress: number;
    tankCap: number;
  };
}

const SystemCards = ({ systemData }: SystemCardsProps) => {
  const getPressureColor = (pressure: number): string => {
    if (pressure > 90) return "bg-red-500";
    if (pressure > 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const cards = [
    {
      icon: Cpu,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
      title: "Injector",
      value: systemData.namaInjector,
      subtitle: `Mesin: ${systemData.namaMesin}`,
      truncate: true,
    },
    {
      icon: Gauge,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
      title: "Flow Line",
      value: systemData.flowLine.toString(),
      subtitle: "Active lines",
      truncate: false,
    },
    {
      icon: Thermometer,
      iconColor: "text-red-600",
      bgColor: "bg-red-100",
      title: "Pressure",
      value: `${systemData.pressure} psi`,
      subtitle: `Setting: ${systemData.settingPress} psi`,
      progress: systemData.pressure,
      progressColor: getPressureColor(systemData.pressure),
      truncate: false,
    },
    {
      icon: Database,
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
      title: "Tank Capacity",
      value: `${systemData.tankCap} L`,
      subtitle: "Maximum capacity",
      progress: (systemData.tankCap / 200) * 100,
      progressColor: "bg-green-500",
      truncate: false,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 mb-5 w-full">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 w-full"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 ${card.bgColor} rounded-lg flex items-center justify-center mr-2`}
              >
                <card.icon className={`w-4 h-4 ${card.iconColor}`} />
              </div>
              <h3 className="font-medium text-gray-700 text-sm">
                {card.title}
              </h3>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>

          <p
            className={`text-xl font-bold text-gray-800 ${
              card.truncate ? "truncate" : ""
            }`}
          >
            {card.value}
          </p>

          {card.progress && (
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className={`h-2 rounded-full ${card.progressColor}`}
                style={{ width: `${Math.min(card.progress, 100)}%` }}
              ></div>
            </div>
          )}

          <p className="text-xs text-gray-500 mt-1">{card.subtitle}</p>
        </div>
      ))}
    </div>
  );
};

export default SystemCards;
