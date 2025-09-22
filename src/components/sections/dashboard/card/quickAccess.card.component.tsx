import {
  BarChart3,
  File,
  Settings,
  Clock,
  CalendarCheck,
  Wifi,
  ChevronRight,
} from "lucide-react";

const QuickAccess = () => {
  const quickAccessItems = [
    { icon: BarChart3, label: "Monitor", color: "blue" },
    { icon: File, label: "Reports", color: "green" },
    { icon: Settings, label: "Settings", color: "purple" },
    { icon: Clock, label: "History", color: "orange" },
  ];

  const recentActivities = [
    {
      icon: CalendarCheck,
      color: "blue",
      title: "System update completed successfully",
      description: "2 minutes ago • Status: Normal",
    },
    {
      icon: Wifi,
      color: "green",
      title: "Pressure reading within normal parameters",
      description: "15 minutes ago • Pressure: 75psi",
    },
  ];

  return (
    <div className="bg-gray-50 rounded-t-3xl p-5 pt-6 w-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Access</h3>

      <div className="grid grid-cols-4 gap-3 mb-6 w-full">
        {quickAccessItems.map((item, index) => (
          <button
            key={index}
            className="bg-white rounded-xl p-3 text-center shadow-xs border border-gray-100 transition-transform hover:scale-105 active:scale-95 w-full"
          >
            <div
              className={`w-10 h-10 bg-${item.color}-100 rounded-xl flex items-center justify-center mx-auto mb-2`}
            >
              <item.icon className={`w-5 h-5 text-${item.color}-600`} />
            </div>
            <p className="text-xs font-medium">{item.label}</p>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 w-full">
        <div className="flex justify-between items-center mb-3 w-full">
          <h4 className="font-semibold text-gray-800">Recent Activity</h4>
          <button className="text-xs text-blue-600 font-medium flex items-center">
            View All <ChevronRight className="w-3 h-3 ml-1" />
          </button>
        </div>

        <div className="space-y-3 w-full">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-start w-full">
              <div
                className={`w-8 h-8 bg-${activity.color}-100 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0`}
              >
                <activity.icon
                  className={`w-4 h-4 text-${activity.color}-600`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{activity.title}</p>
                <p className="text-xs text-gray-500">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickAccess;
