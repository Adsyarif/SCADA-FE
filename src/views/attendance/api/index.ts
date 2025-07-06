import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AttendanceInitDto, AttendanceItem, CreateAttendanceRequest, RawAttendanceRecord, ScheduleDef } from "../types";
import axiosInstance from "@/api/axiosClient";

export function useAttendanceLog() {
  return useQuery<AttendanceItem[], Error>({
    queryKey: ['attendanceLog'],
    queryFn: () =>
      axiosInstance
        .get<RawAttendanceRecord[]>('/attendance/all')
        .then((res) => 
          res.data.map((ar) => ({
            id:   ar.staffId,
            staffName: ar.staffName,
            checkIn:   ar.checkedIn,
            checkOut:  ar.checkedOut,
          }))
        ),
  });
}

export function useToggleAttendance() {
  const qc = useQueryClient();
  return useMutation<AttendanceItem, Error, CreateAttendanceRequest>({
    mutationFn: coords =>
      axiosInstance
        .post<RawAttendanceRecord>('/attendance/toggle', coords)
        .then((res) => {
          const ar = res.data;
          return {
            id:        ar.staffId,
            staffName: ar.staffName,
            checkIn:   ar.checkedIn,
            checkOut:  ar.checkedOut,
          };
        }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['attendanceLog'] });
    },
  });
}

export function useTodayShiftWindow(rtuId: string | undefined) {
  return useQuery<
    { windowStart: Date; windowEnd: Date } | null,
    Error
  >({
    queryKey: ['todayShiftWindow', rtuId],
    enabled: Boolean(rtuId),
    queryFn: async () => {
      const defs = await axiosInstance
        .get<ScheduleDef[]>('/schedule-definition')
        .then(r => r.data);
      const today = new Date().toLocaleDateString('en-US', { weekday: 'short' }); 
      const def = defs.find(d =>
        d.rtuId === rtuId &&
        d.daysOfWeek.split(',').includes(today)
      );
      if (!def) return null;

      const st = new Date(def.shift.startTime);
      const now = new Date();
      const windowCenter = new Date(
        now.getFullYear(), 
        now.getMonth(), 
        now.getDate(),
        st.getHours(), 
        st.getMinutes(), 
        st.getSeconds()
      );
      const windowStart = new Date(windowCenter.getTime() - 2 * 60 * 60 * 1000);
      const et = new Date(def.shift.endTime);
      const windowEnd = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        et.getHours() + 1,
        et.getMinutes(),
        et.getSeconds()
      );
      return { windowStart, windowEnd };
    }
  });
}

export function useAttendanceInit() {
  return useQuery<AttendanceInitDto, Error>({
    queryKey: ['attendanceInit'],
    queryFn: () =>
      axiosInstance
        .get<AttendanceInitDto>('/attendance/init')
        .then(res => res.data),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })
}