export type RtuListProps = {
    rtuName: string;
    rtuRadius: number;
    rtuCoordinates: string
    onEdit?: () => void;
    onView?: () => void;
    onDelete?: () => void;
    isLoading?: boolean;
}