interface CategorySelectProps {
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
}

interface Option {
  id: string;
  label: string;
}

const CategorySelect = ({
  options,
  selectedValue,
  onChange,
}: CategorySelectProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="category" className="text-sm font-medium">
        Kategori
      </label>
      <select
        id="category"
        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>
          Pilih kategori
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelect;
