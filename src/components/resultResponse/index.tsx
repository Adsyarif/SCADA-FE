import { Button } from "@/components";
import Link from "next/link";

interface ResultResponseProps {
  isSuccess: boolean;
  title: string;
  description: string;
}

const ResultResponse = ({
  isSuccess,
  title,
  description,
}: ResultResponseProps) => {
  return (
    <div className="h-screen lg:w-[450px] flex flex-col justify-center items-center gap-8 bg-white">
      <div className="">
        <div
          className="w-32 h-34"
          style={{
            backgroundImage: `url(/img/${
              isSuccess ? "successLogo.png" : "failedLogo.png"
            })`,
            backgroundSize: "cover",
            backgroundPosition: "top",
          }}
        ></div>
      </div>
      <div>
        <div className="flex flex-col justify-center items-center gap-3">
          <h1 className="font-bold text-xl">{title}</h1>
          <p className="px-20">{description}</p>
        </div>
      </div>
      <Link href={"/homepage"}>
        <div className="w-24">
          <Button>Kembali</Button>
        </div>
      </Link>
    </div>
  );
};

export default ResultResponse;
