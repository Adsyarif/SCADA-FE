export type CreateAttendanceRequest = {
  latitude:  number;
  longitude: number;
}

export type AttendanceItem = {
  staffId:    string;
  staffName:  string;
  createDate: string;
}
