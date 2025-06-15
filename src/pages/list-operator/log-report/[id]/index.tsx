import { Layout } from "@/components";
import { AppContext } from "@/context";
import { LogReportWrapper } from "@/views";
import { useContext } from "react";

const LogReport = () => {
  const { selectedUser } = useContext(AppContext);

  console.log(selectedUser);

  let emptyMessage = "";

  if (selectedUser === undefined || selectedUser === null) {
    emptyMessage = "User belum membuat laporan";
  }
  return (
    <>
      <div className="container flex-col justify-center">
        <LogReportWrapper
          userId={selectedUser?.userId}
          userName={selectedUser?.userName}
          errMessage={emptyMessage}
        />
      </div>
    </>
  );
};

export default LogReport;

LogReport.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};
