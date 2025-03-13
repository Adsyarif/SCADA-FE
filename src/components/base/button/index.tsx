import { twMerge } from "tailwind-merge";
import { ButtonProps } from "./type";

export function Button(props: ButtonProps) {
    const { children, className, containerClassName, ...rest } = props
    return (
        <button
            className={twMerge(
                "rounded-[10px] py-3 bg-blue-200 w-full hover: bg-blue-100 fonrt-semibold text-white", containerClassName
            )}
            {...rest}
        >
            {children}
        </button>
    )
}