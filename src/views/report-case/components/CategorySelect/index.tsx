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
    <div className="flex flex-col">
      <label htmlFor="category">Kategori:</label>
      <select
        id="category"
        className="border border-gray-400 p-2 rounded"
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>
          Pilih kategori
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.label}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelect;
