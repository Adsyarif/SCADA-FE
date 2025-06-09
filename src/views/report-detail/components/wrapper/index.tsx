import { useDetailReport } from "../../hooks";
import { ReportDetailInterface } from "../../type/reportDetail";
import { Title } from "@/components";
import { RevisionSection } from "@/components";

const ReportMenu = ({ reportDetailId }: ReportDetailInterface) => {
  const {
    data: reportDetail,
    isLoading,
    isError,
  } = useDetailReport(reportDetailId);

  if (!reportDetail) {
    return <p>Data Not found</p>;
  }
  const {
    reportId,
    reportToId,
    reportTo,
    create_at,
    reportCategoryId,
    reportCategoryName,
    reportDescription,
    reportImage,
  } = reportDetail?.data;

  console.log(reportDetail.data);
  console.log(reportCategoryName);

  return (

        <div className="flex grow">
      <div className="grow w-full">
        <Title isButton={true} text="Laporan" />
        <div className="p-6">

          <div className=" mb-5">
            <h2 className="text-md font-bold">Kepada:</h2>
            <div className="flex justify-between">
            <p className="capitalize">{reportToId}</p>
            <p>{new Date(create_at).toLocaleString()}</p>
            </div>
          </div>

          <div className="mb-12">
            <select disabled className="rounded-md p-2 w-full">
              <option value="category1">{reportCategoryName}</option>
            </select>
          </div>

          <div className="mb-5">
            <textarea disabled
              className="rounded-md p-2 w-full h-full" 
              placeholder={reportDescription}
              rows={5}
            />
          </div>

          <div className="mb-12">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ml-2 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
          </div>

          <RevisionSection />

          {/* <div className="flex justify-center space-x-6 mb-5">
            <button id="accept-button" className="bg-violet-500 text-white px-4 py-2 rounded-md hover:bg-violet-800">
              Terima
            </button>
            <button id="revision-button"  className="bg-white text-dark px-4 py-2 rounded-md hover:bg-violet-800 border-2 border-dark hover:text-white">
              Butuh Revisi
            </button>
          </div>

          <div id="revision-form" className="">
            <div className="mb-5">
              <textarea
                className="rounded-md p-2 w-full h-full border border-gray-300" 
                placeholder="Tulis revisi kamu di sini..."
                rows={5}
              />
            </div>

            <div className="flex justify-center space-x-6 mb-5">
              <button id="send-button" className="bg-violet-500 text-white px-4 py-2 rounded-md hover:bg-violet-800">
                Kirim
              </button>
              <button id="cancel-button"  className="bg-white text-dark px-4 py-2 rounded-md hover:bg-violet-800 border-2 border-dark hover:text-white">
                Batal
              </button>
            </div>
          </div> */}

        </div>
      </div>
    </div>
  );
};

export default ReportMenu;
