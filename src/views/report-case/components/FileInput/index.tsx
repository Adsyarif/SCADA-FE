import { ImagePlus, XIcon } from "lucide-react";

interface FileInputProps {
  fileName: string;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: () => void;
}

const FileInput = ({
  fileName,
  onFileChange,
  onRemoveFile,
}: FileInputProps) => {
  return (
    <div className="flex items-center gap-2 py-2">
      {fileName && (
        <div className="flex items-center gap-2 border rounded px-2 py-1 bg-gray-100">
          <p className="truncate max-w-[100px] text-sm">{fileName}</p>
          <button type="button" onClick={onRemoveFile} aria-label="Remove file">
            <XIcon className="w-4 h-4 text-red-500 hover:opacity-80" />
          </button>
        </div>
      )}

      <label htmlFor="file-upload" className="cursor-pointer hover:opacity-80">
        <ImagePlus className="w-5 h-5 text-black" />
      </label>

      <input
        id="file-upload"
        type="file"
        accept=".jpg, .png"
        onChange={onFileChange}
        className="hidden"
      />
    </div>
  );
};

export default FileInput;
