import { useEffect, useState } from "react";
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

export function ReportCase() {
  const [selectedValue, setSelectedValue] = useState("");
  const [fileName, setFileName] = useState<any>("");
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [statusPage, setStatusPage] = useState<"form" | "loading" | "success" | "error">("form");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data: session, status } = useSession();
  const staffId = session?.user?.id || "";

  const { data: categories, isLoading, error } = useReportCategory();
  const {
    data: supervisor,
    isLoading: superVisorLoading,
    error: supervisorError,
  } = useAsignedSupervisor(staffId);
  const {
    mutate,
    isPending,
    isSuccess,
    isError,
    error: mutationError,
  } = useSubmitReport();

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

    setStatusPage("loading");

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
        setStatusPage("success");
        // Reset form data if you want
        setSelectedValue("");
        setFileName("");
        setFileContent(null);
        setDescription("");
      },
      onError: (error: any) => {
        setErrorMessage(error?.message || "Terjadi kesalahan saat mengirim laporan.");
        setStatusPage("error");
      },
    });
  };

  if (status === "loading" || isLoading || superVisorLoading) return <p>Loading...</p>;

  if (error || supervisorError) return <p>Error: {error?.message || supervisorError?.message}</p>;

  if (statusPage === "loading") {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <p className="text-xl font-semibold mb-4">Mengirim laporan, mohon tunggu...</p>
        {/* Bisa ditambahkan spinner animasi */}
      </div>
    );
  }

  if (statusPage === "success") {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <p className="text-green-600 text-xl font-semibold mb-6">Laporan berhasil dikirim!</p>
        <button
          className="bg-black text-white px-6 py-3 rounded hover:opacity-80"
          onClick={() => {
            // Kembali ke halaman utama, ganti dengan route yang sesuai
            window.location.href = "/homepage";
          }}
        >
          Kembali ke Halaman Utama
        </button>
      </div>
    );
  }

  if (statusPage === "error") {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <p className="text-red-600 text-xl font-semibold mb-6">Gagal mengirim laporan!</p>
        <p className="mb-4">{errorMessage}</p>
        <button
          className="bg-white border border-black text-black px-6 py-3 rounded hover:bg-gray-100"
          onClick={() => setStatusPage("form")}
        >
          Kembali ke Pengisian Laporan
        </button>
      </div>
    );
  }

  // statusPage === "form"
  return (
    <div className="flex flex-col w-full">
      <form onSubmit={handleSubmit} className="grow">
        <div className="w-full flex justify-center">
          <h1 className="text-2xl font-semibold p-4">Buat Laporan</h1>
        </div>

        <div className="flex flex-col justify-start items-start gap-4 m-4">
          <div className="flex flex-col">
            <span>Kepada:</span>
            <span>{supervisor?.data?.superVisorName || "-"}</span>
          </div>
          <CategorySelect
            options={options}
            selectedValue={selectedValue}
            onChange={setSelectedValue}
          />
        </div>
        <div className="flex gap-3 flex-col p-4">
          <ReportTextarea value={description} onChange={setDescription} />
          <FileInput
            fileName={fileName}
            onFileChange={handleFileChange}
            onRemoveFile={() => {
              setFileName("");
              setFileContent(null);
            }}
          />
        </div>

        <div className="flex gap-4 p-4">
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded hover:opacity-80"
            disabled={isPending}
          >
            {isPending ? "Mengirim..." : "Kirim"}
          </button>
          <button
            type="button"
            className="bg-white border border-black text-black px-4 py-2 rounded"
            onClick={() => {
              setSelectedValue("");
              setFileName("");
              setFileContent(null);
              setDescription("");
            }}
            disabled={isPending}
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
