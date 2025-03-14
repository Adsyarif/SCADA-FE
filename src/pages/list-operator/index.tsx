import { Layout } from "@/components";
import { OperatorListWrapper } from "@/views";

const ListOperatorPage = () => {
  return (
    <>
      <OperatorListWrapper />
    </>
  );
};

export default ListOperatorPage;

ListOperatorPage.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};
