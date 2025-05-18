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
    <div className="flex items-center gap-3">
      {fileName && (
        <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-1 bg-gray-50">
          <p className="truncate max-w-[150px] text-sm text-gray-700">
            {fileName}
          </p>
          <button
            type="button"
            onClick={onRemoveFile}
            aria-label="Remove file"
            className="hover:opacity-80"
          >
            <XIcon className="w-4 h-4 text-red-500" />
          </button>
        </div>
      )}

      <label
        htmlFor="file-upload"
        className="flex items-center gap-1 text-sm cursor-pointer text-black hover:opacity-80"
      >
        <ImagePlus className="w-5 h-5" />
        Upload File
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
