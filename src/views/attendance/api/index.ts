import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AttendanceItem, CreateAttendanceRequest } from "../types";
import axiosInstance from "@/api/axiosClient";

export function useAttendanceLog() {
  return useQuery<AttendanceItem[], Error>({
    queryKey: ['attendanceLog'],
    queryFn: () =>
      axiosInstance
        .get<AttendanceItem[]>('/attendance/all')
        .then(res => res.data),
  });
}

export function useToggleAttendance() {
  const qc = useQueryClient();
  return useMutation<AttendanceItem, Error, CreateAttendanceRequest>({
    mutationFn: coords =>
      axiosInstance
        .post<AttendanceItem>('/attendance/toggle', coords)
        .then(res => res.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['attendanceLog'] });
    },
  });
}