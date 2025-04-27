import { Layout } from "@/components";
import { LogReportWrapper } from "@/views";

const LogReport = () => {
  return (
    <>
      <LogReportWrapper />
    </>
  );
};

export default LogReport;

LogReport.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};
