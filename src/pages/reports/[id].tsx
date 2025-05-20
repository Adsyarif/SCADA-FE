import { Layout } from "lucide-react";
import { useParams } from "next/navigation";

const ReportById = () => {
  const param = useParams();
  const id = param?.id;
};

export default ReportById;

ReportById.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};
