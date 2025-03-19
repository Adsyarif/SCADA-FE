import { DropdownProps } from "./type";

export function Dropdown(props: DropdownProps) {
    const { options, value, onValueChange = () => {} } = props
    return (
        <select
            name="report-cateogry"
            id="report-catogry"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring bg-gray-200"
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
        >
            <option value="" disabled>Pilih kategori laporan</option>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}