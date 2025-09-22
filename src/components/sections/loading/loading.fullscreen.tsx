import { Loader } from "lucide-react";

const FullscreenLoading = ({ text }: { text: string }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
    <div className="flex flex-col items-center">
      <Loader className="mb-4 h-8 w-8 animate-spin text-blue-600" />
      <p className="text-gray-600">{text}</p>
    </div>
  </div>
);

export default FullscreenLoading;
