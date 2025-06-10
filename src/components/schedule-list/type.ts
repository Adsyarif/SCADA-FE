export type ScheduleListProps = {
   rtuName: string
   shiftName: string
   workDays: string
   startTime: string
   endTime: string
   employeeTotal: number
   onEdit?: () => void;
   onDelete?: () => void;
   key?: string
} & React.HTMLAttributes<HTMLDivElement>;