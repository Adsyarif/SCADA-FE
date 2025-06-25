import axiosInstance from "@/api/axiosClient";
import { ReportListResponseProps } from "../type/reportDetail";
import { useQuery } from "@tanstack/react-query";

export const useDetailReport = (reportId: string) => {
  return useQuery<ReportListResponseProps, Error>({
    queryKey: ["report", "list"],
    queryFn: () =>
      axiosInstance
        .get<ReportListResponseProps>(
          `/api/reports/get-report-by-id/${reportId}`
        )
        .then((res) => res.data),
    enabled: !!reportId,
  });
};

export const approvedReport = (reportId: string, userId: string) => {
  return useQuery<ReportListResponseProps, Error>({
    queryKey: ["report", "approval"],
    queryFn: () =>
      axiosInstance
        .put<ReportListResponseProps>(`/${reportId}/approve`, userId)
        .then((res) => res.data),
    enabled: !!reportId,
  });
};
