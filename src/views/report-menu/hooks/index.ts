import axiosInstance from "@/api/axiosClient";
import { ReportListResponseProps } from "../type/listReport";
import { useQuery } from "@tanstack/react-query";

export const useListReport = (userId: string) => {
  return useQuery<ReportListResponseProps, Error>({
    queryKey: ["report", "list"],
    queryFn: () =>
      axiosInstance
        .get<ReportListResponseProps>(`/api/reports/get-report/${userId}`)
        .then((res) => res.data),
    enabled: !!userId,
  });
};
