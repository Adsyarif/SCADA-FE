import axiosInstance from "@/api/axiosClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CreateReportInterfaceRequest,
  CreateReportInterfaceResponse,
  ReportCategoriesInterface,
} from "../types/report";
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

export const useSubmitReport = () => {
  return useMutation<
    CreateReportInterfaceResponse,
    Error,
    CreateReportInterfaceRequest
  >({
    mutationFn: (payload) =>
      axiosInstance
        .post<CreateReportInterfaceResponse>("/api/reports", payload)
        .then((res) => res.data),
  });
};

