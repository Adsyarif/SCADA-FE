import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { MobileContainer, MobileLayout } from "@/components/layout";

import {
  Plus,
  Filter,
  ChevronDown,
  X,
  BarChart3,
  User,
  Tag,
  Calendar,
  RefreshCw,
} from "lucide-react";
import { SkeletonReport, Title, SearchInput, ReportList } from "@/components";
import { useReportFilters } from "@/hooks/report/useReportFilter";
import { ReportListResponseDataInterface } from "@/types/report/report.types";
import { useListReport } from "@/views/report-menu/hooks";

const Report = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const userPermissions = session?.user?.permissions || [];
  const userId = session?.user?.id;

  const {
    data: reports,
    isLoading,
    error,
    refetch,
  } = useListReport(userId || "");
  const [refreshing, setRefreshing] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const checkPermission = (permission: string) => {
    return userPermissions.includes(permission);
  };

  const reportData: ReportListResponseDataInterface[] = Array.isArray(
    reports?.data
  )
    ? reports.data
    : [];

  const {
    searchText,
    setSearchText,
    filterCategory,
    setFilterCategory,
    filterReportTo,
    setFilterReportTo,
    filterDate,
    setFilterDate,
    filterStatus,
    setFilterStatus,
    currentPage,
    setCurrentPage,
    categoryOptions,
    reportToOptions,
    reportStatusOptions,
    paginatedReports,
    totalPages,
    hasActiveFilters,
    activeFilterCount,
    resetFilters,
  } = useReportFilters({ reports: reportData });

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setTimeout(() => setRefreshing(false), 1000);
  };

  if (isLoading) return <SkeletonReport />;

  return (
    <MobileLayout>
      <MobileContainer>
        <div className="min-h-screen bg-gray-50">
          <Title
            isButton={true}
            text="Daftar Laporan"
            handleBackClick={() => router.push("/dashboard")}
          />

          <div className="pt-6 px-5">
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Total Laporan</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {reportData.length}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Tersaring</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {paginatedReports.length}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Filter className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 mb-5">
              {checkPermission("reporting") && (
                <button
                  onClick={() => router.push("/reports/report-case/")}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md active:scale-95"
                >
                  <Plus size={20} />
                  Buat Laporan Baru
                </button>
              )}

              <SearchInput
                searchText={searchText}
                setSearchText={setSearchText}
              />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-5">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-full flex justify-between items-center px-4 py-4 font-semibold text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Filter className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <span className="text-gray-800">Filter Laporan</span>
                    {activeFilterCount > 0 && (
                      <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full ml-2">
                        {activeFilterCount} aktif
                      </span>
                    )}
                  </div>
                </div>
                <ChevronDown
                  className={clsx(
                    "text-gray-400 transition-transform duration-300",
                    {
                      "rotate-180": isFilterOpen,
                    }
                  )}
                />
              </button>

              <div
                className={clsx(
                  "overflow-hidden transition-all duration-300 ease-in-out border-t border-gray-100",
                  {
                    "max-h-0": !isFilterOpen,
                    "max-h-[500px]": isFilterOpen,
                  }
                )}
              >
                <div className="p-4 space-y-4">
                  {hasActiveFilters && (
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
                      <span className="text-sm text-blue-700 font-medium">
                        {paginatedReports.length} laporan ditemukan
                      </span>
                      <button
                        onClick={resetFilters}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                      >
                        <X size={14} />
                        Reset Filter
                      </button>
                    </div>
                  )}

                  <div className="grid gap-4">
                    <div>
                      <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        Kategori
                      </label>
                      <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="w-full p-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      >
                        <option value="">Semua Kategori</option>
                        {categoryOptions.map((cat, idx) => (
                          <option key={idx} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Lapor Kepada
                      </label>
                      <select
                        value={filterReportTo}
                        onChange={(e) => setFilterReportTo(e.target.value)}
                        className="w-full p-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      >
                        <option value="">Semua Penerima</option>
                        {reportToOptions.map((name, idx) => (
                          <option key={idx} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Status
                        </label>
                        <select
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                          className="w-full p-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        >
                          <option value="">Semua Status</option>
                          {reportStatusOptions.map((status, idx) => (
                            <option key={idx} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Tanggal
                        </label>
                        <input
                          type="date"
                          value={filterDate}
                          onChange={(e) => setFilterDate(e.target.value)}
                          className="w-full p-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="min-h-[400px]">
              {error ? (
                <div className="text-center py-12">
                  <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <X className="w-8 h-8 text-red-500" />
                  </div>
                  <p className="text-red-600 font-medium mb-2">
                    Gagal memuat laporan
                  </p>
                  <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="text-blue-600 text-sm font-medium flex items-center justify-center gap-2 mx-auto hover:text-blue-700"
                  >
                    <RefreshCw
                      className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
                    />
                    Coba Lagi
                  </button>
                </div>
              ) : (
                <ReportList
                  reports={paginatedReports}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              )}
            </div>
          </div>
        </div>
      </MobileContainer>
    </MobileLayout>
  );
};

export default Report;
