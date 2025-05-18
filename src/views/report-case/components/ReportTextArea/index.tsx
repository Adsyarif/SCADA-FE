interface ReportTextareaProps {
  value: string;
  onChange: (val: string) => void;
}

const ReportTextarea = ({ value, onChange }: ReportTextareaProps) => (
  <div className="flex flex-col gap-1">
    <label htmlFor="text-area" className="text-sm font-medium">
      Deskripsi Laporan
    </label>
    <textarea
      id="text-area"
      placeholder="Tulis laporan kamu di sini..."
      className="border border-gray-300 rounded-md p-3 w-full h-30 resize-none focus:outline-none"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);


export default ReportTextarea;
