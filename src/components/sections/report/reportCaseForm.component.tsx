import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { User } from "lucide-react";
import { ReportTextarea, FileInput } from "@/components/ui";
import CategorySelect from "@/components/ui/categorySelect";
import { useReportCategory } from "@/hooks/report/useReportCategory";
import { useAsignedSupervisor } from "@/hooks/report/useAssignSupervisor";
import { useSubmitReport } from "@/hooks/report/useSubmitReport";
import { Option } from "@/types/report/reportCase.type";

interface ReportCaseFormProps {
  onLoadingChange?: (loading: boolean) => void;
}

export const ReportCaseForm = ({ onLoadingChange }: ReportCaseFormProps) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [fileName, setFileName] = useState<string>("");
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();
  const staffId = session?.user?.id || "";

  const {
    data: categories,
    isLoading: isCatLoading,
    error: catError,
  } = useReportCategory();
  const {
    data: supervisor,
    isLoading: isSupervisorLoading,
    error: supError,
  } = useAsignedSupervisor(staffId);
  const { mutate } = useSubmitReport();

  const reportCategories = categories?.data;
  const options: Option[] =
    reportCategories?.map((cat) => ({
      id: cat.categoryId,
      label: cat.categoryName,
    })) || [];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.[0]) return;
    const file = event.target.files[0];

    if (!file.type.startsWith("image/")) {
      alert("Hanya file gambar yang diizinkan");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file maksimal 5MB");
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setFileContent(reader.result);
      }
    };
    reader.onerror = () => {
      alert("Error membaca file");
      setFileName("");
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedValue) {
      alert("Mohon pilih kategori laporan.");
      return;
    }

    if (!description.trim()) {
      alert("Mohon isi deskripsi laporan.");
      return;
    }

    if (!supervisor?.data?.supervisorId) {
      alert("Supervisor tidak ditemukan.");
      return;
    }

    const loadingState = true;
    setIsLoading(loadingState);
    onLoadingChange?.(loadingState);

    const payload = {
      reportToId: supervisor.data.supervisorId,
      reportFromId: staffId,
      reportCategoryId: selectedValue,
      updatedBy: session?.user?.name || "unknown",
      reportImage: fileContent,
      reportDescription: description.trim(),
    };

    mutate(payload, {
      onSuccess: () => {
        const loadingState = false;
        setIsLoading(loadingState);
        onLoadingChange?.(loadingState);
        router.push("/report-case/success");
      },
      onError: (error: unknown) => {
        const loadingState = false;
        setIsLoading(loadingState);
        onLoadingChange?.(loadingState);
        console.error("Error submitting report:", error);
        alert("Terjadi kesalahan saat mengirim laporan. Silakan coba lagi.");
      },
    });
  };

  if (isCatLoading || isSupervisorLoading) {
    return null;
  }

  if (catError || supError) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">❌</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Terjadi Kesalahan
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          {(catError || supError)?.message ||
            "Gagal memuat data yang diperlukan"}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="w-full bg-blue-600 text-white py-3 rounded-2xl font-medium hover:bg-blue-700 transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  if (!supervisor?.data) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">⚠️</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Akses Dibatasi
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          Supervisor tidak ditemukan. Anda tidak dapat membuat laporan saat ini.
        </p>
        <button
          onClick={() => router.push("/reports")}
          className="w-full bg-gray-600 text-white py-3 rounded-2xl font-medium hover:bg-gray-700 transition-colors"
        >
          Kembali ke Laporan
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          <span>👤</span>
          Laporan Kepada
        </label>
        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-800">
              {supervisor.data.superVisorName}
            </p>
            <p className="text-xs text-gray-600">Supervisor</p>
          </div>
        </div>
      </div>

      <CategorySelect
        options={options}
        selectedValue={selectedValue}
        onChange={setSelectedValue}
      />

      <ReportTextarea value={description} onChange={setDescription} />

      <FileInput
        fileName={fileName}
        onFileChange={handleFileChange}
        onRemoveFile={() => {
          setFileName("");
          setFileContent(null);
        }}
      />

      <div className="flex gap-4 mt-8">
        <button
          type="button"
          disabled={isLoading}
          className="flex-1 border border-gray-300 text-gray-700 py-4 rounded-2xl font-medium hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm active:scale-95"
          onClick={() => router.push("/reports")}
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={isLoading || !selectedValue || !description.trim()}
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-2xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md active:scale-95"
        >
          Kirim Laporan
        </button>
      </div>

      {(!selectedValue || !description.trim()) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
          <p className="text-sm text-yellow-700 text-center">
            ⚠️ Pastikan semua field telah diisi sebelum mengirim laporan
          </p>
        </div>
      )}
    </form>
  );
};
