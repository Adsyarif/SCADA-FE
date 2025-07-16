import axiosInstance from "@/api/axiosClient";
import { Shift } from "@/views/shift-management/types";
import { useQuery } from "@tanstack/react-query";

export function useShift(id: string) {
    return useQuery<Shift, Error>({
        queryKey: ["shift", id],
        queryFn: () => axiosInstance.get<Shift>(`/shifts/${id}`).then(res => res.data),
        enabled: Boolean(id)
    })
}