export type CreateAttendanceRequest = {
  latitude:  number;
  longitude: number;
}

export type AttendanceItem = {
  id:        string;
  staffName:  string;
  checkIn:    string;
  checkOut?:   string | null;
}

export type RawAttendanceRecord = {
  staffId:   string;
  staffName: string;
  checkedIn: string;
  checkedOut?: string;  
}

export type ScheduleDef = {
  id: string;
  rtuId: string;
  shift: { startTime: string, endTime: string };
  daysOfWeek: string;
}

export type AttendanceInitDto = {
  latitude:  number;
  longitude: number;
  radius:    number;
  shiftStart: Date;
  shiftEnd:   Date;
  checkedIn?: Date;
  checkedOut?: Date;
}