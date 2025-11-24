import { useRouter } from "next/router";
import { ChevronDown, User, Clock, BarChart3 } from "lucide-react";
import { ReportListProps } from "@/types/report/report.types";
import {
  getStatusConfig,
  shorterMessage,
  formatDate,
} from "@/utils/report.utils";

const ReportList = ({
  reports,
  currentPage,
  totalPages,
  setCurrentPage,
}: ReportListProps) => {
  const router = useRouter();

  if (reports.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <BarChart3 className="w-8 h-8 text-blue-400" />
        </div>
        <p className="text-gray-600 text-lg font-medium mb-2">
          Tidak ada laporan yang sesuai
        </p>
        <p className="text-gray-400 text-sm">
          Coba ubah filter atau buat laporan baru
        </p>
      </div>
    );
  }

  const onClick = (id: string) => {
    router.push(`/reports/${id}`);
  };

  return (
    <div className="space-y-4 pb-5">
      {reports.map((report) => {
        const { time, date, day, fullDate } = formatDate(report.create_at);
        const statusConfig = getStatusConfig(report.status);

        return (
          <div
            className="bg-white flex flex-col gap-3 rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer active:scale-95"
            key={report.reportId}
            onClick={() => onClick(report.reportId)}
          >
            <div
              className={`flex justify-between items-center px-3 py-1 rounded-lg text-xs font-medium ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
            >
              <h3 className="font-semibold text-gray-800 mb-1 text-base pt-1">
                {report.reportCategory}
              </h3>
              {statusConfig.icon} {statusConfig.label}
            </div>
            <div className="flex items-start justify-between w-full mb-3">
              <div className="flex gap-3 w-full">
                <div className="min-w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex flex-col items-center justify-center text-white">
                  <span className="text-xs font-medium">{day}</span>
                  <span className="text-lg font-bold">{date}</span>
                </div>
                <div className="overflow-x-hidden">
                  <p className="text-gray-600 text-sm leading-relaxed overflow-x-hidden">
                    {shorterMessage(report.reportDescription)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>{report.reportTo}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{time}</span>
                </div>
              </div>
              <span className="text-xs">{fullDate}</span>
            </div>
          </div>
        );
      })}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-6">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            <ChevronDown className="w-4 h-4 rotate-90" />
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              );
            })}
            {totalPages > 5 && <span className="text-gray-400">...</span>}
          </div>

          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            <ChevronDown className="w-4 h-4 -rotate-90" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ReportList;
