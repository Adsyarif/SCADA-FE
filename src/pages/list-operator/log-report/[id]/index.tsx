import { Layout } from "@/components";
import { AppContext } from "@/context";
import { LogReportWrapper } from "@/views";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const LogReport = () => {
  const router = useRouter();
  const id = router.query.id?.toString()!;
  const { selectedUser } = useContext(AppContext);
  const [currentUser, setCurrentUser] = useState<string>("");

  useEffect(() => {
    if (selectedUser) {
      setCurrentUser(selectedUser?.userName);
    }
  }, [selectedUser]);

  return <LogReportWrapper userId={id} userName={currentUser} />;
};

export default LogReport;

LogReport.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};
