import axiosInstance from "@/api/axiosClient";
import { useQuery } from "@tanstack/react-query";

interface ListOperatorInterface {
  data: ListOperatorProps[];
}

export interface ListOperatorProps {
  operatorId: string;
  operatorName: string;
}

export const useListOperator = (supervisorId: string) => {
  return useQuery<ListOperatorInterface, Error>({
    queryKey: ["report", "list"],
    queryFn: () =>
      axiosInstance
        .get<ListOperatorInterface>(
          `/users/get-operators?supervisorId=${supervisorId}`
        )
        .then((res) => res.data),
    enabled: !!supervisorId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
