import { ReactNode } from "react";

interface MobileContainerProps {
  children: ReactNode;
  className?: string;
  padding?: boolean;
}

const MobileContainer = ({
  children,
  className = "",
  padding = true,
}: MobileContainerProps) => {
  return (
    <div className={`w-full max-w-[100vw] overflow-x-hidden ${className}`}>
      {children}
    </div>
  );
};

export default MobileContainer;
