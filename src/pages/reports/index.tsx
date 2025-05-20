import { Layout } from "@/components";
import ReportMenu from "@/views/report-menu/components/wrapper";

const Report = () => {
  return (
    <>
      <ReportMenu />
    </>
  );
};

export default Report;

Report.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};
