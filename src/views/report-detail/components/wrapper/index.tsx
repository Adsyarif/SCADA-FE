import { useDetailReport } from "../../hooks";
import { ReportDetailInterface } from "../../type/reportDetail";

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
    <div className="px-2 flex flex-col gap-4">
      <div>{reportCategoryName}</div>
      <div>{new Date(create_at).toLocaleString()}</div>
      <div>{reportDescription}</div>
    </div>
  );
};

export default ReportMenu;
