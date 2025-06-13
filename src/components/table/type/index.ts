import { ReactNode } from "react"

export type TableColumn<T> = {
    header: string
    accessor: keyof T
    cell?: (value: T[keyof T], row: T) => ReactNode
}

export type PaginationProps = {
  page: number;
  limit: number;
  total: number;
  onChangePage: (page: number) => void;
}

export type TableProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
  rowsPerPage?: number;
  isLoading?: boolean;
  pagination?: PaginationProps;
  currentPage?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}