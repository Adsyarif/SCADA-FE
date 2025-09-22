import { SearchInputProps } from "@/types/report.types";
import { Search } from "lucide-react";

const SearchInput = ({ searchText, setSearchText }: SearchInputProps) => (
  <div className="relative">
    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
    <input
      type="text"
      placeholder="Cari laporan..."
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
    />
  </div>
);

export default SearchInput;
