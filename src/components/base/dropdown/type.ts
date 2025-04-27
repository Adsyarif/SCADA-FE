import { SelectHTMLAttributes } from "react";

export type DropdownProps =SelectHTMLAttributes<HTMLSelectElement> & {
    name?: string
    options: string[]
    value: string
    onValueChange?: (val: string) => void
}