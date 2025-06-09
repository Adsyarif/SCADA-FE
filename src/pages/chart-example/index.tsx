import { Layout } from "@/components";
import ChartExampleWrapper from "@/views/chart-example/components/wrapper";

const chartExample = () => {
  return (
    <>
      <ChartExampleWrapper />
    </>
  );
};

export default chartExample;

chartExample.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};
