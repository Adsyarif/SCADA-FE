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


  const { data: session } = useSession();
  const staffId = session?.user?.id;

  const { data: categories, isLoading, error } = useReportCategory();
  const {
    data: supervisor,
    isLoading: superVisorLoading,
    error: supervisorError,
  } = useAsignedSupervisor(staffId!);
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
        console.log("File content: ", reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedValue || !description) {
      alert("Please select a category, upload a file, and write a description.");
      return;
    }

    const payload: CreateReportInterfaceRequest = {
      reportToId: supervisor?.data.supervisorId!,
      reportFromId: staffId!,
      reportCategoryId: selectedValue,
      updatedBy: session?.user.name,
      reportImage: fileContent,
      reportDescription: description,
    };
 
    if (!selectedValue ||  !description) {
      alert("Mohon lengkapi semua field sebelum mengirim laporan.");
      return;
    }
    mutate(payload);
  };

  if (isLoading || superVisorLoading) return <p>Loading...</p>;
  if (error || supervisorError)
    return <p>Error: {error?.message || supervisorError?.message}</p>;


  useEffect(() => {
  if (isSuccess) {
    setSelectedValue("");
    setFileName("");
    setFileContent(null);
    setDescription("");
  }
}, [isSuccess]);


  return (
    <div className="flex flex-col w-full pt-16">
      <form onSubmit={handleSubmit} className="grow">
        <div className="w-full flex justify-center">
          <h1 className="text-2xl font-semibold p-4">Buat Laporan</h1>
        </div>

        <div className="flex flex-col justify-start items-start gap-4 m-4">
          <div className="flex flex-col">
            <span>Kepada:</span>
            <span>{supervisor?.data.superVisorName}</span>
          </div>
          <CategorySelect
            options={options}
            selectedValue={selectedValue}
            onChange={setSelectedValue}
          />
        </div>
        <div className="flex flex-col p-4">
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
          >
            Batal
          </button>
        </div>

        {isSuccess && (
          <p className="text-green-600 p-4">Laporan berhasil dikirim!</p>
        )}
        {isError && (
          <p className="text-red-600 p-4">
            Terjadi kesalahan: {mutationError?.message}
          </p>
        )}
      </form>
    </div>
  );
}
