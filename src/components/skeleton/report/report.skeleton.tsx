import { MobileContainer, MobileLayout } from "@/components/layout";
import SkeletonReportCard from "./reportCard.skeleton";

const SkeletonReport = () => {
  return (
    <MobileLayout>
      <MobileContainer>
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
            <div className="flex justify-between items-center mt-4">
              <div className="w-24 h-4 bg-white/30 rounded"></div>
              <div className="w-16 h-6 bg-white/20 rounded-full"></div>
            </div>
            <div className="absolute -bottom-4 left-5 bg-white rounded-xl shadow-md py-2 px-4 w-32 h-8"></div>
          </div>
          <div className="pt-6 px-5">
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="w-16 h-3 bg-gray-200 rounded mb-2"></div>
                      <div className="w-12 h-6 bg-gray-300 rounded"></div>
                    </div>
                    <div className="w-10 h-10 bg-gray-200 rounded-xl"></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mb-4">
              <div className="w-full h-12 bg-gray-200 rounded-2xl"></div>
            </div>
            <div className="mb-5">
              <div className="w-full h-12 bg-gray-200 rounded-2xl"></div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-5">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-xl"></div>
                    <div className="w-24 h-4 bg-gray-200 rounded"></div>
                  </div>
                  <div className="w-5 h-5 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <SkeletonReportCard key={item} />
              ))}
            </div>
            <div className="flex justify-center items-center gap-3 mt-6">
              <div className="w-10 h-10 bg-gray-200 rounded-xl"></div>
              <div className="flex items-center gap-1">
                {[1, 2, 3].map((page) => (
                  <div
                    key={page}
                    className="w-8 h-8 bg-gray-200 rounded-lg"
                  ></div>
                ))}
              </div>
              <div className="w-10 h-10 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </MobileContainer>
    </MobileLayout>
  );
};

export default SkeletonReport;
