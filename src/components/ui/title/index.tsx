import { LucideArrowLeft } from "lucide-react";
import { useRouter } from "next/router";

interface TitleProps {
  text: string;
  isButton?: boolean;
  handleBackClick?: () => void;
  backHref?: string;
}

const Title = ({ text, isButton, handleBackClick, backHref }: TitleProps) => {
  const router = useRouter();
  
  const onBack = handleBackClick
    ? handleBackClick
    : backHref
    ? () => router.push(backHref)
    : () => router.back();

  return (
    <div className="flex px-5 relative h-[65px] w-full">
      {isButton && (
        <div
          className="absolute left-5 top-1/2 -translate-y-1/2 -translate-x-1/12"
          onClick={onBack}
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
