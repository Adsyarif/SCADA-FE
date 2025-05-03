import axiosInstance from "@/api/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { ReportCategoriesInterface, ReportCategory } from "../types/report";
import { SupervisorsInterface } from "../types/supervisor";

export const useReportCategory = () => {
  return useQuery<ReportCategoriesInterface, Error>({
    queryKey: ["report", "categories"],
    queryFn: () =>
      axiosInstance
        .get<ReportCategoriesInterface>("/api/reports/categories")
        .then((res) => res.data),
  });
};

export const useAsignedSupervisor = (staffId: string) => {
  return useQuery<SupervisorsInterface, Error>({
    queryKey: ["supervisor", staffId],
    queryFn: () =>
      axiosInstance
        .get<SupervisorsInterface>(`/users/get-supervisor?staffId=${staffId}`)
        .then((res) => res.data),
    enabled: !!staffId,
  });
};
