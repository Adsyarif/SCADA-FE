import Link from "next/link";
import { useRouter } from "next/router";

interface Report {
  reportId: string;
  reportToId: string;
  reportTo: string;
  create_at: Date;
  reportCategoryId: string;
  reportCategory: string;
  reportDescription: string;
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

  const getDayNameInID = (date: Date) => {
    const dates = new Date("2025-05-21T17:15:04.496Z");

    const namaHari = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];

    const hari = namaHari[date.getUTCDay()];

    console.log(hari);
  };

  console.log(reports[0].create_at);
  return (
    <>
      <div className="space-y-3 flex flex-col gap-2 ">
        {reports.map((report, index) => (
          <div
            className="p-2 rounded shadow bg-white"
            key={`${report.reportDescription}-${index}`}
            onClick={() => onClick(report.reportId)}
          >
            <div></div>
            <div>
              <p className="font-semibold">{report.reportCategory}</p>

              <p className="text-sm text-gray-600">Kepada: {report.reportTo}</p>
              <p className="text-sm text-gray-600">
                Tanggal: {new Date(report.create_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
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
