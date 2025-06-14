import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosClient";
import type { RtuConfiguration, PaginatedRtus } from "../types";
import { AxiosResponse } from "axios";
import { RtuFormData } from "../schema";
import { useRouter } from "next/router";

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

export function useCreateRTU() {
  const qc = useQueryClient()
  const router = useRouter()

  return useMutation<AxiosResponse<any>, Error, RtuFormData>({
    mutationFn: data => axiosInstance.post('/rtu-configuration', data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['rtus'] })
      router.push('/rtu-configuration')
    }
  })
}

export function useUpdateRtuConfiguration(id: string) {
  const qc = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: (data: RtuFormData) =>
      axiosInstance.patch(`/rtu-configuration/${id}`, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['rtus'] })
      router.push('/rtu-configuration')
    }
  })
}
