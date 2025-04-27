import { ReactNode } from "react"

export type TableColumn<T> = {
    header: string
    accessor: keyof T
    cell?: (value: T[keyof T], row: T) => ReactNode
}

export type TableProps<T> = {
    data: T[]
    columns: TableColumn<T>[]
    rowsPerPage?: number
    onEdit?: (row: T) => void
    onView?: (row: T) => void
    onDelete?: (row: T) => void
}