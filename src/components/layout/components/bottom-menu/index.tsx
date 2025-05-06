import { Bell, HouseIcon, Mail, SquareArrowRightIcon, User } from "lucide-react";
import Link from "next/link";

export function BottomMenu() {
    return (
        <div className="flex justify-around gap-4 p-4 bg-white">
            <Link href="/homepage"><HouseIcon /></Link>
            <Link href="/message"><Mail /></Link>
            <Link href="/notification"><Bell/></Link>
            <Link href="/user-profile"><User /></Link>
            <Link href="/"><SquareArrowRightIcon /></Link>
        </div>
    )
}