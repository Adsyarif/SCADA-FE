import { StatusConfig } from "@/types/report/report.types";

export const getStatusConfig = (
  status: "PENDING" | "REJECTED" | "APPROVED" | "REVISION"
): StatusConfig => {
  const config = {
    PENDING: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      border: "border-blue-200",
      label: "Menunggu",
      icon: "⏳",
    },
    APPROVED: {
      bg: "bg-green-100",
      text: "text-green-700",
      border: "border-green-200",
      label: "Disetujui",
      icon: "✅",
    },
    REVISION: {
      bg: "bg-orange-100",
      text: "text-orange-700",
      border: "border-orange-200",
      label: "Revisi",
      icon: "📝",
    },
    REJECTED: {
      bg: "bg-red-100",
      text: "text-red-700",
      border: "border-red-200",
      label: "Ditolak",
      icon: "❌",
    },
  };
  return config[status];
};

export const shorterMessage = (str: string): string => {
  const maxChar = 67;
  return str.length > maxChar ? str.slice(0, maxChar) + "..." : str;
};

export const formatDate = (date: string | Date) => {
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  if (isNaN(parsedDate.getTime())) {
    return { time: "-", date: "-", day: "Invalid", fullDate: "-" };
  }

  const dayNames = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];

  return {
    time: parsedDate.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    date: parsedDate.getDate(),
    day: dayNames[parsedDate.getDay()].slice(0, 3),
    fullDate: parsedDate.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  };
};
