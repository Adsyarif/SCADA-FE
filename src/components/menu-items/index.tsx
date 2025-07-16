import Link from "next/link";
import { MenuItemsProps } from "./type";

export function MenuItems(props: MenuItemsProps) {
    const { href, children, menuName} = props
    return(
        <Link href={href} className="flex flex-col text-centerjustify-center items-center">
            <div className="p-2">{children}</div><span className={"text-center"}>{menuName}</span>
        </Link>
    )
}