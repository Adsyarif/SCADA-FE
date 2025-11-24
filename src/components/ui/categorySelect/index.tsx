import { CategorySelectProps } from "@/types/report/reportCase.type";
import { ChevronDown } from "lucide-react";

const CategorySelect = ({
  options,
  selectedValue,
  onChange,
}: CategorySelectProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="category"
        className="text-sm font-medium text-gray-700 flex items-center gap-2"
      >
        <span>🏷️</span>
        Kategori Laporan
      </label>
      <div className="relative">
        <select
          id="category"
          className="w-full border border-gray-200 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white shadow-sm transition-all duration-200"
          value={selectedValue}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled>
            Pilih kategori laporan
          </option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
      </div>
    </div>
  );
};

export default CategorySelect;
