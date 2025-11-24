import { FileInputProps } from "@/types/report/reportCase.type";
import { ImagePlus, XIcon } from "lucide-react";

const FileInput = ({
  fileName,
  onFileChange,
  onRemoveFile,
}: FileInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
        <span>📎</span>
        Lampiran File
      </label>
      <div className="flex items-center gap-3">
        {fileName && (
          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 bg-blue-50 shadow-sm">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <ImagePlus className="w-4 h-4 text-blue-600" />
            </div>
            <p className="truncate max-w-[120px] text-sm text-gray-700 font-medium">
              {fileName}
            </p>
            <button
              type="button"
              onClick={onRemoveFile}
              aria-label="Remove file"
              className="hover:opacity-80 transition-opacity"
            >
              <XIcon className="w-4 h-4 text-red-500" />
            </button>
          </div>
        )}

        <label
          htmlFor="file-upload"
          className="flex items-center gap-2 text-sm cursor-pointer text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center hover:bg-blue-200 transition-colors">
            <ImagePlus className="w-5 h-5" />
          </div>
          Upload Gambar
        </label>

        <input
          id="file-upload"
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          onChange={onFileChange}
          className="hidden"
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">Format: JPG, PNG (Maks. 5MB)</p>
    </div>
  );
};

export default FileInput;
