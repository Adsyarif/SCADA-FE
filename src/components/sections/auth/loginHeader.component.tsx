import React from "react";

interface LoginHeaderProps {
  title: string;
  subtitle: string;
}

export const LoginHeader: React.FC<LoginHeaderProps> = ({
  title,
  subtitle,
}) => {
  return (
    <div className="mb-8 flex flex-col items-center">
      <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-white">
        <img
          src="/img/Logo.png"
          alt="logo"
          className="h-16 w-16 object-contain"
        />
      </div>
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      <p className="mt-2 text-gray-500">{subtitle}</p>
    </div>
  );
};
