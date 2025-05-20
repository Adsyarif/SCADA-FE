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
  if (reports.length === 0) return <p>Tidak ada laporan yang sesuai.</p>;

  return (
    <>
      <div className="space-y-3 grid gap-2 grid-cols-2 grid-rows-2 ">
        {reports.map((report, index) => (
          <div
            key={`${report.reportDescription}-${index}`}
            className="p-2 border rounded shadow bg-white"
          >
            <p className="font-semibold">{report.reportDescription}</p>
            <p className="text-sm text-gray-600">
              Kategori: {report.reportCategory}
            </p>
            <p className="text-sm text-gray-600">Kepada: {report.reportTo}</p>
            <p className="text-sm text-gray-600">
              Tanggal: {new Date(report.create_at).toLocaleDateString()}
            </p>
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
