import { LucideArrowLeft } from "lucide-react";
import { useRouter } from "next/router";

interface TitleProps {
  text: string;
  isButton?: boolean;
}

const Title = ({ text, isButton }: TitleProps) => {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };
  return (
    <div className="w-full flex px-5 relative h-[65px]">
      {isButton && (
        <div
          className="absolute left-5 top-1/2 -translate-y-1/2 -translate-x-1/12"
          onClick={handleBackClick}
        >
          <LucideArrowLeft />
        </div>
      )}
      <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
        <p className="text-xl">{text}</p>
      </div>
    </div>
  );
};

export default Title;
