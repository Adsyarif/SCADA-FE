import Link from "next/link";
import { MenuItemsProps } from "./type";

export function MenuItems(props: MenuItemsProps) {
    const { href, children, menuName} = props
    return(
        <Link href={href}>
            <div>{children}</div><span>{menuName}</span>
        </Link>
    )
}