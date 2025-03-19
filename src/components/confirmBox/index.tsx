import { Button } from "@/components";
import Link from "next/link";

interface ConfirmBoxProps {
  title: string;
  description: string;
}

const ConfirmBox = ({ title, description }: ConfirmBoxProps) => {
  return (
    <div className="h-screen lg:w-[450px] flex flex-col justify-center items-center gap-8 bg-gray-200">
      <div className="flex flex-col justify-center items-center bg-white min-w-[400px] rounded-2xl p-4 gap-5">
        <div className="p-4">
          <h1 className="font-bold text-xl">{title}</h1>
        </div>
        <div className="flex items-center justify-center gap-2 max-w-[350px]">
          <input type="checkbox" value="confirmed" name="confirmed" />
          <label htmlFor="confirmed" className="">
            {description}
          </label>
        </div>
        <div className="flex gap-4">
          <Link href={"/homepage"}>
            <div className="w-24">
              <Button>Ya</Button>
            </div>
          </Link>
          <Link href={"/homepage"}>
            <div className="w-24">
              <Button containerClassName="bg-white text-black border">
                Tidak
              </Button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;
