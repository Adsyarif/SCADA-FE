import { ChevronDown } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

interface Props {
  isLoading: boolean;
  categoryOptions: any[];
  reportToOptions: string[];
  filterCategory: string;
  filterReportTo: string;
  filterDate: string;
  setFilterCategory: (value: string) => void;
  setFilterReportTo: (value: string) => void;
  setFilterDate: (value: string) => void;
  resetFilters: () => void;
}

const FilterPanel = ({
  isLoading,
  categoryOptions,
  reportToOptions,
  filterCategory,
  filterReportTo,
  filterDate,
  setFilterCategory,
  setFilterReportTo,
  setFilterDate,
  resetFilters,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) return null;

  return (
    <div className="bg-white rounded shadow border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-3 font-semibold text-left"
      >
        <span>Filter</span>
        <ChevronDown
          className={clsx("transition-transform duration-300", {
            "rotate-180": isOpen,
          })}
        />
      </button>

      <div
        className={clsx(
          "overflow-hidden transition-all duration-500 ease-in-out",
          {
            "max-h-0": !isOpen,
            "max-h-[800px]": isOpen,
          }
        )}
      >
        <div className="px-4 pb-4">
          <div className="flex justify-end mb-2">
            <button
              onClick={resetFilters}
              className="text-sm text-blue-600 hover:underline"
            >
              Reset Filter
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium">Kategori</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Semua Kategori</option>
                {categoryOptions.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Lapor Kepada</label>
              <select
                value={filterReportTo}
                onChange={(e) => setFilterReportTo(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Semua Orang</option>
                {reportToOptions.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Tanggal</label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
