import { Layout } from "@/components";
import { AppContext } from "@/context";
import { LogReportWrapper } from "@/views";
import { useContext } from "react";

const LogReport = () => {
  const { selectedUser } = useContext(AppContext);

  console.log(selectedUser);

  if (selectedUser === undefined || selectedUser === null) {
    return <p>User belum membuat laporan</p>;
  }
  return (
    <>
      <div>
        <LogReportWrapper
          userId={selectedUser.userId}
          userName={selectedUser.userName}
        />
      </div>
    </>
  );
};

export default LogReport;

LogReport.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};
