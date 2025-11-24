import axiosInstance from "@/api/axiosClient";
import { ReportCategoriesInterface } from "@/types/report/reportCase.type";
import { useQuery } from "@tanstack/react-query";

export const useReportCategory = () => {
  return useQuery<ReportCategoriesInterface, Error>({
    queryKey: ["report", "categories"],
    queryFn: () =>
      axiosInstance
        .get<ReportCategoriesInterface>("/api/reports/categories")
        .then((res) => res.data),
  });
};
