import { Button, Input } from "@/components";
import Link from "next/link";

export default function LoginWrapper() {
    return (
        <div className="w-96 flex justify-center">
            <div className="w-full flex flex-col justify-center items-center gap-8">
                <img src="/img/Logo.png" alt="logo" className="w-32"/>
                <h1 className="text-2xl">Sign In</h1>
                <form action="submit" className="w-full flex flex-col gap-4 p-4">
                    <Input
                        label="Email"
                    />
                    <Input
                        label="Password"
                    />
                    <Link href="/">Forgot Password?</Link>
                    <Button type="submit">Login</Button>
                </form>
            </div>
        </div>
    )
}