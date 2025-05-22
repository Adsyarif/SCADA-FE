import { Layout } from "@/components";
import ReportMenu from "@/views/report-detail/components/wrapper";
import { ReportDetailInterface } from "@/views/report-detail/type/reportDetail";
import { useParams } from "next/navigation";

const ReportById = () => {
  const param = useParams();
  const id = param?.id?.toLocaleString();

  if (!id) {
    return <p>No report found</p>;
  }

  const ReportDetail: ReportDetailInterface = {
    reportDetailId: id,
  };

  return <ReportMenu reportDetailId={ReportDetail.reportDetailId} />;
};

export default ReportById;

ReportById.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};
