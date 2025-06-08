export type ShiftListProps = {
    shiftName: string;
    startTime?: string;
    endTime?: string;
    shiftDuration: string;
    onEdit?: () => void;
    onDelete?: () => void;
    isLoading?: boolean;
}