import axiosInstance from "@/api/axiosClient";
import { SupervisorsInterface } from "@/types/report/reportCase.type";
import { useQuery } from "@tanstack/react-query";

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
