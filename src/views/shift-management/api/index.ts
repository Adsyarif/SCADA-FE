import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosClient";
import type { Shift } from "../types";
import { ShiftFormData } from "../schema";

export function useShifts() {
  return useQuery<Shift[], Error>({
    queryKey: ["shifts"],
    queryFn: () =>
      axiosInstance.get<Shift[]>("/shifts").then(res => res.data),
  });
}

export function useShift(id: string) {
  return useQuery<Shift, Error>({
    queryKey: ["shift", id],
    queryFn: () => axiosInstance.get(`/shifts/${id}`).then(r => r.data),
    enabled: Boolean(id),
  });
}

export function useCreateShift() {
  const qc = useQueryClient();
  return useMutation<Shift, Error, ShiftFormData>({
    mutationFn: (dto) =>
      axiosInstance.post<Shift>("/shifts", dto).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["shifts"] }),
  });
}

export function useUpdateShift(id: string) {
  const qc = useQueryClient();
  return useMutation<Shift, Error, ShiftFormData>({
    mutationFn: (dto) =>
      axiosInstance.put<Shift>(`/shifts/${id}`, dto).then(r => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["shifts"] });
      qc.invalidateQueries({ queryKey: ["shift", id] });
    },
  });
}

export function useDeleteShift() {
  const qc = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (id) => axiosInstance.delete(`/shifts/${id}`).then(() => {}),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["shifts"] }),
  });
}

