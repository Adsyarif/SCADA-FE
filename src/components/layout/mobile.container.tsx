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
    <div className={`${padding ? "p-4" : ""} ${className}`}>{children}</div>
  );
};

export default MobileContainer;
