import { ButtonHTMLAttributes, forwardRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  LucideArrowLeft,
  MapPin,
  Activity,
  CheckCircle,
  XCircle,
} from "lucide-react";

// Button Component
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = "primary",
      size = "md",
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95";

    const variantClasses = {
      primary:
        "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 focus:ring-blue-500 shadow-md",
      secondary:
        "bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 focus:ring-gray-500 shadow-md",
      outline:
        "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500 shadow-sm",
    };

    const sizeClasses = {
      sm: "px-4 py-2.5 text-sm",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
    };

    const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

// ResultResponse Component
interface ResultResponseProps {
  isSuccess: boolean;
  title: string;
  description: string;
  redirect: string;
  btnName: string;
}

const ResultResponse = ({
  isSuccess,
  title,
  description,
  redirect,
  btnName,
}: ResultResponseProps) => {
  const [currentTime] = useState(
    new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Jakarta",
    })
  );

  const router = useRouter();

  const handleBackClick = () => {
    router.push("/reports");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header dengan gradient seperti referensi */}
      <div className="bg-gradient-to-br from-blue-700 to-indigo-800 text-white p-5 pb-6 shadow-md relative">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <button
              onClick={handleBackClick}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3 hover:bg-white/30 transition-colors"
            >
              <LucideArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <p className="text-sm opacity-90 mb-1">Manajemen Laporan</p>
              <h1 className="text-lg font-bold">
                {isSuccess ? "Laporan Berhasil" : "Laporan Gagal"}
              </h1>
            </div>
          </div>

          <div className="text-right">
            <div className="text-md font-semibold flex items-center justify-end">
              {currentTime} WIB
            </div>
            <div className="text-xs opacity-80 mt-1 flex items-center justify-end">
              <MapPin className="w-3 h-3 mr-1" />
              <span>System Location</span>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-4 left-5 bg-white rounded-xl shadow-md py-2 px-4 flex items-center border border-gray-100">
          <div
            className={`w-2 h-2 rounded-full mr-2 ${
              isSuccess ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
          <span className="text-xs font-medium text-gray-700">
            <Activity className="w-3 h-3 inline mr-1" />
            {isSuccess ? "Laporan Berhasil Dikirim" : "Laporan Gagal Dikirim"}
          </span>
        </div>
      </div>

      {/* Konten utama */}
      <div className="flex-1 flex flex-col justify-center items-center px-5 py-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          {/* Ikon status */}
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
              isSuccess ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {isSuccess ? (
              <CheckCircle className="w-12 h-12 text-green-600" />
            ) : (
              <XCircle className="w-12 h-12 text-red-600" />
            )}
          </div>

          {/* Judul dan deskripsi */}
          <h2 className="text-2xl font-bold text-gray-800 mb-3">{title}</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">{description}</p>

          {/* Tombol aksi */}
          <Link href={redirect} className="block">
            <Button
              variant={isSuccess ? "primary" : "secondary"}
              className="w-full"
            >
              {btnName}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export { Button, ResultResponse };
