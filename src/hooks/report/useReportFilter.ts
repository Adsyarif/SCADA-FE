import { ReportListResponseDataInterface } from "@/types/report.types";
import { useState, useMemo } from "react";

interface UseReportFiltersProps {
  reports: ReportListResponseDataInterface[];
}

export const useReportFilters = ({ reports }: UseReportFiltersProps) => {
  const [searchText, setSearchText] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterReportTo, setFilterReportTo] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const categoryOptions = useMemo(() => {
    const categories = reports.map((r) => r.reportCategory);
    return Array.from(new Set(categories));
  }, [reports]);

  const reportToOptions = useMemo(() => {
    const reportTos = reports.map((r) => r.reportTo);
    return Array.from(new Set(reportTos));
  }, [reports]);

  const reportStatusOptions = useMemo(() => {
    const statuses = reports.map((r) => r.status);
    return Array.from(new Set(statuses));
  }, [reports]);

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
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
      const matchesStatus = filterStatus
        ? report.status === filterStatus
        : true;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesReportTo &&
        matchesDate &&
        matchesStatus
      );
    });
  }, [
    reports,
    searchText,
    filterCategory,
    filterReportTo,
    filterDate,
    filterStatus,
  ]);

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const hasActiveFilters =
    filterCategory || filterReportTo || filterDate || filterStatus;
  const activeFilterCount = [
    filterCategory,
    filterReportTo,
    filterDate,
    filterStatus,
  ].filter(Boolean).length;

  const resetFilters = () => {
    setFilterCategory("");
    setFilterReportTo("");
    setFilterDate("");
    setFilterStatus("");
    setCurrentPage(1);
  };

  return {
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
    filteredReports,
    paginatedReports,
    totalPages,
    hasActiveFilters,
    activeFilterCount,
    resetFilters,
  };
};
