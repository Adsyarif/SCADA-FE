import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosClient";
import type { RtuConfiguration, PaginatedRtus } from "../types";

export function useRtuConfigurations() {
  return useQuery<RtuConfiguration[], Error>({
    queryKey: ["rtus"],
    queryFn: () =>
      axiosInstance
        .get<PaginatedRtus>("/rtu-configuration", {
          params: { page: 1, limit: 100 },
        })
        .then((res) => res.data.data),
  });
}
