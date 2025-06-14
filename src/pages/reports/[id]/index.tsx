import { Layout } from "@/components";
import { ReportDetailInterface } from "@/views/report-detail/type/reportDetail";
import { useParams } from "next/navigation";
import { ReportDetail } from "@/views";

const ReportById = () => {
  const param = useParams();
  const id = param?.id?.toLocaleString();

  if (!id) {
    return <p>No report found</p>;
  }

  const ReportDetailId: ReportDetailInterface = {
    reportDetailId: id,
  };

  return <ReportDetail reportDetailId={ReportDetailId.reportDetailId} />;
};

export default ReportById;

ReportById.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};
