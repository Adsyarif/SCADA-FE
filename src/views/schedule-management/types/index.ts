export type Definition = {
  id:         string;
  rtuId:      string;
  shiftId:    string;
  daysOfWeek: string;
  rtu:        { id: string; rtuName: string };
  shift:      {
    id: string;
    shiftName: string;
    startTime: string;
    endTime: string;
};
  userSites: Array<{
    id: string;
    userSite: {
      id:      string;
      user:    { id: string; username: string; employee_number: string };
      checkInStatus: boolean;
    };
  }>;
};