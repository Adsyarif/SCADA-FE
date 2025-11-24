import { ReportTextareaProps } from "@/types/report/reportCase.type";

const ReportTextarea = ({ value, onChange }: ReportTextareaProps) => (
  <div className="flex flex-col gap-2">
    <label
      htmlFor="text-area"
      className="text-sm font-medium text-gray-700 flex items-center gap-2"
    >
      <span>📝</span>
      Deskripsi Laporan
    </label>
    <textarea
      id="text-area"
      placeholder="Tulis laporan kamu di sini dengan detail yang jelas..."
      className="border border-gray-200 rounded-2xl p-4 w-full h-48 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default ReportTextarea;
