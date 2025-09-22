// utils/date.utils.ts
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const formatReportDate = (date: Date) => {
  return {
    time: format(date, "HH:mm"),
    date: format(date, "dd"),
    day: format(date, "EEE", { locale: id }),
    fullDate: format(date, "dd MMMM yyyy", { locale: id }),
  };
};
