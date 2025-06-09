import { useRouter } from "next/router";

interface Report {
  reportId: string;
  reportToId: string;
  reportTo: string;
  create_at: Date;
  reportCategoryId: string;
  reportCategory: string;
  reportDescription: string;
  status: "PENDING" | "REJECTED" | "APPROVED" | "REVISION";
}

interface Props {
  reports: Report[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const ReportList = ({
  reports,
  currentPage,
  totalPages,
  setCurrentPage,
}: Props) => {
  const router = useRouter();
  if (reports.length === 0) return <p>Tidak ada laporan yang sesuai.</p>;

  const onClick = (id: string) => {
    router.push(`/reports/${id}`);
  };

  const colorStatus = (
    status: "PENDING" | "REJECTED" | "APPROVED" | "REVISION"
  ) => {
    return {
      PENDING: "bg-[#5A56FF]",
      APPROVED: "bg-[#39C252]",
      REVISION: "bg-[#FF7856]",
      REJECTED: "bg-[#FF2400]",
    }[status];
  };

  const shorterMessage = (str: string): string => {
    const maxChar = 40;
    return str.length > maxChar ? str.slice(0, maxChar) + " ..." : str;
  };

  const getTime = (date: string | Date) => {
    const parsedDate = typeof date === "string" ? new Date(date) : date;

    if (isNaN(parsedDate.getTime())) {
      return {
        formattedTime: "-",
        formattedDate: "-",
        dayNameID: "Invalid",
      };
    }

    const dayNameInID = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];

    return {
      formattedTime: new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      }).format(parsedDate),
      formattedDate: new Intl.DateTimeFormat("en-US", {
        day: "numeric",
      }).format(parsedDate),
      dayNameID: dayNameInID[parsedDate.getDay()],
    };
  };

  console.log(reports[0].create_at);
  return (
    <>
      <div className="space-y-3 flex flex-col gap-1 ">
        {reports.map((report, index) => {
          const { formattedTime, formattedDate, dayNameID } = getTime(
            report.create_at
          );
          return (
            <div
              className="p-2 flex gap-1 items-center rounded shadow bg-white hover:bg-gray-50 cursor-pointer"
              key={index}
              onClick={() => onClick(report.reportId)}
            >
              <div
                className={`${colorStatus(
                  report.status
                )} w-18 h-13 py-1 rounded-xl flex flex-col justify-center items-center`}
              >
                <p className="text-xs text-white">{dayNameID}</p>
                <p className="text-white text-2xl">{formattedDate}</p>
              </div>
              <div className="flex justify-between items-center w-full rounded-2xl px-3 py-1">
                <div>
                  <p className="font-bold text-sm">{report.reportCategory}</p>
                  <p className="text-sm">
                    {shorterMessage(report.reportDescription)}
                  </p>
                </div>
                <div className="self-start">
                  <p>{formattedTime}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1 font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ReportList;
