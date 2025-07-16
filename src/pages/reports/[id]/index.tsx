import { Layout } from "@/components";
import { ReportDetailInterface } from "@/views/report-detail/type/reportDetail";
import { useParams } from "next/navigation";
import { ReportDetail } from "@/views";
import ErrorBoundary from "@/views/report-detail/components/errorBoundary";

const ReportById = () => {
  const param = useParams();
  const id = param?.id?.toLocaleString();

  if (!id) {
    return <p>No report found</p>;
  }

  const ReportDetailId: ReportDetailInterface = {
    reportDetailId: id,
  };

  return (
    <ErrorBoundary fallback={<p>Could not load report details</p>}>
      <ReportDetail reportDetailId={ReportDetailId.reportDetailId} />
    </ErrorBoundary>
  );
};

export default ReportById;

ReportById.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};
