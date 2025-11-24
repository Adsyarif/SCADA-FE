import axiosInstance from "@/api/axiosClient";
import {
  CreateReportInterfaceRequest,
  CreateReportInterfaceResponse,
} from "@/types/report/reportCase.type";
import { useMutation } from "@tanstack/react-query";

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
