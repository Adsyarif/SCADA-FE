import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import LoginWrapper from "@/views/auth/components/wrapper";

export default function Home() {
  return (
    <div className="h-screen w-full flex justify-center">
        <LoginWrapper />
    </div>
  );
}
