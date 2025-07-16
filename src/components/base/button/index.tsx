import { twMerge } from "tailwind-merge";
import { ButtonProps } from "./type";

export function Button(props: ButtonProps) {
    const { children, className, containerClassName, disabled, ...rest } = props

    const base = disabled
    ? "rounded-[10px] py-3 bg-gray-400 w-full font-semibold text-white cursor-not-allowed"
    : "rounded-[10px] py-3 bg-blue-800 w-full hover:bg-blue-700 font-semibold text-white";

    return (
        <button
            className={twMerge(
                base, containerClassName
            )}
            disabled={disabled}
            {...rest}
        >
            {children}
        </button>
    )
}