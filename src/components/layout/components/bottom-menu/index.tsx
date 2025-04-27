import { Bell, HouseIcon, Mail, User } from "lucide-react";
import Link from "next/link";

export function BottomMenu() {
    return (
        <div className="flex justify-around gap-4 p-4 bg-white">
            <Link href="/"><HouseIcon /></Link>
            <Link href="/"><Mail /></Link>
            <Link href="/"><Bell/></Link>
            <Link href="/"><User /></Link>
        </div>
    )
}