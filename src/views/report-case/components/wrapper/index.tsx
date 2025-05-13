import { Button, Dropdown } from "@/components";
import { ImgUpload } from "@/components/base/img-upload-btn";
import { XIcon } from "lucide-react";
import { useState } from "react";
import { useAsignedSupervisor, useReportCategory } from "../../hooks";
import { useSession } from "next-auth/react";

export function ReportCase() {
  const [selectedValue, setSelectedValue] = useState("");
  const [fileName, setFileName] = useState("");

  const { data: session } = useSession();
  const staffId = session?.user?.id;

  const {
    data: supervisor,
    isLoading: superVisorLoading,
    error: supervisorError,
  } = useAsignedSupervisor(staffId!);

  console.log(supervisor?.data.superVisorName);

  const { data: categories, isLoading, error } = useReportCategory();
  const reportCategories = categories?.data;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const options = reportCategories!?.map((cat) => cat.categoryName);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }

    if (!event.target.files?.[0]) return;
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        console.log("File content: ", reader.result);
      }
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="flex flex-col w-full pt-16">
      <form id={"action"} className={"grow"}>
        <div className="w-full flex justify-center">
          <h1 className={"text-2xl font-semibold p-4"}>Buat Laporan</h1>
        </div>
        <div className={"flex flex-col justify-start items-start gap-4 m-4"}>
          <div className="flex flex-col">
            <span>Kepada:</span>
            <span>{supervisor?.data.superVisorName}</span>
          </div>
          <div>
            <Dropdown
              options={options}
              value={selectedValue}
              onValueChange={(val) => setSelectedValue(val)}
            />
          </div>
        </div>
        <div className="flex flex-col p-4">
          <textarea
            name="text-area"
            id="text-area"
            placeholder="Tulis Laporan Kamu disini"
            className="border border-black rounded-lg p-4 w-full h-96"
          />
          <div>
            <div className="flex gap-2 py-2">
              {fileName && (
                <div className="flex gap-2 w-32">
                  <p className="truncate">{fileName}</p>
                  <button onClick={() => setFileName("")}>
                    <XIcon className="cursor-pointer" />
                  </button>
                </div>
              )}

              <ImgUpload
                onChange={handleFileChange}
                accept=".jpg, .png"
                multiple={true}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-4 p-4">
          <Button>Kirim</Button>
          <Button containerClassName="bg-white border text-black">Batal</Button>
        </div>
      </form>
    </div>
  );
}
