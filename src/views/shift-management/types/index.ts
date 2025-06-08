export type Shift = {
  id: string;
  shiftName: string;
  startTime: string;
  endTime:   string;
  isActive:  boolean;
  created_at: string;
  updated_at: string;
};

export type ShiftFormData = {
  startTime: string;
  endTime:   string;
  isActive:  boolean;
}