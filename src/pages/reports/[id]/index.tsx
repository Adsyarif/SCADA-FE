import { Layout } from "@/components";
import { useParams } from "next/navigation";

const ReportById = () => {
  const param = useParams();
  const id = param?.id;

  console.log(id);
  return <div>{id}</div>;
};

export default ReportById;

ReportById.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};
