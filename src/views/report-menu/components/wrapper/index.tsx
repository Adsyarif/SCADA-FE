import { useMemo, useState } from "react";
import { Title } from "@/components";
import { FilePlus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useListReport } from "../../hooks";
import Link from "next/link";
import ReportList from "../ReportList";
import FilterPanel from "../FilterPanel";
import SearchInput from "../SearchInput";
import SkeletonReport from "../SkeletonReport";
import { useRouter } from "next/router";

const ReportMenu = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const userPermissions = session?.user?.permissions || [];
  const userId = session?.user.id;

  const { data: reports, isLoading, error } = useListReport(userId || "");

  const checkPermission = (permission: string) => {
    return userPermissions.includes(permission);
  };

  const [searchText, setSearchText] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterReportTo, setFilterReportTo] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const categoryOptions = useMemo(() => {
    const data = Array.isArray(reports?.data) ? reports.data : [];
    const categories = data.map((r) => r.reportCategory);
    return Array.from(new Set(categories));
  }, [reports?.data]);

  const reportToOptions = useMemo(() => {
    const data = Array.isArray(reports?.data) ? reports.data : [];
    const reportTos = data.map((r) => r.reportTo);
    return Array.from(new Set(reportTos));
  }, [reports?.data]);

  const filteredReports = useMemo(() => {
    if (!Array.isArray(reports?.data)) return [];

    return reports.data.filter((report) => {
      const matchesSearch = report.reportDescription
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const matchesCategory = filterCategory
        ? report.reportCategory === filterCategory
        : true;
      const matchesReportTo = filterReportTo
        ? report.reportTo === filterReportTo
        : true;
      const matchesDate = filterDate
        ? new Date(report.create_at).toLocaleDateString("sv-SE") === filterDate
        : true;

      return matchesSearch && matchesCategory && matchesReportTo && matchesDate;
    });
  }, [reports?.data, searchText, filterCategory, filterReportTo, filterDate]);

  console.log(filteredReports);

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setSearchText("");
    setFilterCategory("");
    setFilterReportTo("");
    setFilterDate("");
    setCurrentPage(1);
  };

  return (
    <div className="px-2 w-full flex flex-col gap-4">
      <Title
        isButton={true}
        text="Daftar Laporan"
        handleBackClick={() => {
          router.push("/homepage");
        }}
      />

      {checkPermission("reporting") && (
        <Link
          href="/reports/report-case/"
          className="inline-flex gap-1 items-center text-blue-600 hover:underline"
        >
          <FilePlus size={18} /> Tambah Laporan
        </Link>
      )}

      <SearchInput searchText={searchText} setSearchText={setSearchText} />

      <FilterPanel
        isLoading={isLoading}
        categoryOptions={categoryOptions}
        reportToOptions={reportToOptions}
        filterCategory={filterCategory}
        filterReportTo={filterReportTo}
        filterDate={filterDate}
        setFilterCategory={setFilterCategory}
        setFilterReportTo={setFilterReportTo}
        setFilterDate={setFilterDate}
        resetFilters={resetFilters}
      />

      {isLoading ? (
        <SkeletonReport />
      ) : reports?.data.filter((report) => report.reportId).length === 0 ? (
        <p>Laporan tidak ditemukan</p>
      ) : error ? (
        <p>Gagal memuat laporan.</p>
      ) : (
        <ReportList
          reports={paginatedReports}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default ReportMenu;
