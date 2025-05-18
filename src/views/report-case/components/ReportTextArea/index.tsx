interface ReportTextareaProps {
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
}

const ReportTextarea = ({ inputRef }: ReportTextareaProps) => {
  return (
    <textarea
      id="text-area"
      placeholder="Tulis Laporan Kamu disini"
      className="border border-black rounded-lg p-4 w-full h-96"
      ref={inputRef}
    />
  );
};

export default ReportTextarea;
