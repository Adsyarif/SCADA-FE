import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import {
  useAsignedSupervisor,
  useReportCategory,
  useSubmitReport,
} from "../../hooks";
import { CreateReportInterfaceRequest } from "../../types/report";
import FileInput from "../FileInput";
import CategorySelect from "../CategorySelect";
import ReportTextarea from "../ReportTextArea";

const ReportCase = () => {
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
  const options =
    reportCategories?.map((cat) => ({
      id: cat.categoryId,
      label: cat.categoryName,
    })) || [];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.[0]) return;
    const file = event.target.files[0];
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setFileContent(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedValue || !description) {
      alert("Mohon lengkapi semua field sebelum mengirim laporan.");
      return;
    }

    if (!supervisor?.data?.supervisorId) {
      alert("Supervisor tidak ditemukan.");
      return;
    }

    setIsLoading(true);

    const payload: CreateReportInterfaceRequest = {
      reportToId: supervisor?.data.supervisorId,
      reportFromId: staffId,
      reportCategoryId: selectedValue,
      updatedBy: session?.user?.name || "unknown",
      reportImage: fileContent,
      reportDescription: description,
    };

    mutate(payload, {
      onSuccess: () => {
        setIsLoading(false);
        router.push("/report-case/success");
      },
      onError: () => {
        setIsLoading(false);
        router.push("/report-case/error");
      },
    });
  };

  if (isCatLoading || isSupervisorLoading) return <p>Loading...</p>;
  if (catError || supError)
    return <p>Error: {(catError || supError)?.message}</p>;

  return (
    <div className="w-full justify-center px-6 py-2">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-48">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 mb-4"></div>
          <p className="text-lg font-medium">
            Mengirim laporan, mohon tunggu...
          </p>
          <style jsx>{`
            .loader {
              border-top-color: #000;
              animation: spin 1s linear infinite;
            }
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}</style>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold text-center">Buat Laporan</h1>
          <div>
            <label className="block font-semibold mb-1">Kepada:</label>
            <p>{supervisor?.data?.superVisorName || "-"}</p>
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

          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-grow bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Kirim
            </button>
            <button
              type="button"
              disabled={isLoading}
              className="flex-grow border border-black py-2 rounded hover:bg-gray-100 transition"
              onClick={() => router.push("/reports")}
            >
              Batal
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ReportCase;
