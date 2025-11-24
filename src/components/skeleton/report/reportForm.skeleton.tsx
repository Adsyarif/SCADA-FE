const SkeletonReportForm = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-blue-700 to-indigo-800 text-white p-5 pb-6 shadow-md relative animate-pulse">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-white/20 rounded-full mr-3"></div>
            <div>
              <div className="w-20 h-3 bg-white/30 rounded mb-2"></div>
              <div className="w-32 h-4 bg-white/40 rounded"></div>
            </div>
          </div>
          <div className="text-right">
            <div className="w-16 h-4 bg-white/30 rounded ml-auto mb-1"></div>
            <div className="w-24 h-3 bg-white/20 rounded ml-auto"></div>
          </div>
        </div>
        <div className="absolute -bottom-4 left-5 bg-white rounded-xl shadow-md w-32 h-8"></div>
      </div>

      <div className="pt-8 px-5 space-y-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="w-24 h-3 bg-gray-200 rounded mb-3"></div>
          <div className="w-32 h-4 bg-gray-300 rounded"></div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="w-32 h-3 bg-gray-200 rounded mb-3"></div>
          <div className="w-full h-12 bg-gray-200 rounded-xl"></div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="w-40 h-3 bg-gray-200 rounded mb-3"></div>
          <div className="w-full h-32 bg-gray-200 rounded-xl"></div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="w-28 h-3 bg-gray-200 rounded mb-3"></div>
          <div className="w-32 h-10 bg-gray-200 rounded-xl"></div>
        </div>

        <div className="flex gap-4 mt-6">
          <div className="flex-1 h-12 bg-gray-200 rounded-2xl"></div>
          <div className="flex-1 h-12 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonReportForm;
