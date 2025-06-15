import { ListDateItem, Title } from "@/components";
import { UserNameInterface } from "@/context";
import { useListReport } from "@/views/report-menu/hooks";
import { useRouter } from "next/router";

interface UserProps {
  userId: string | undefined;
  userName: string | undefined;
  errMessage: string;
}

const LogReportWrapper = ({ userId, userName, errMessage }: UserProps) => {
  const { data: reports, error, isLoading } = useListReport(userId || "");
  const router = useRouter();
  const backToListReport = () => {
    router.push("/list-operator");
  };

  const selectReport = (reportId: string) => {
    router.push(`/reports/${reportId}`);
  };
  return (
    <div className="flex grow">
      <div className="grow w-full ">
        <Title
          text={"Log Report"}
          isButton={true}
          handleBackClick={() => backToListReport()}
        />
        <div className="h-14 flex items-center justify-center">
          <h1 className="font-bold text-xl">{userName}</h1>
        </div>
        <div className="">
          {reports && errMessage === "" && !isLoading && !error ? (
            reports.data.map((report, index) => (
              <div key={index}>
                <ListDateItem
                  status={report.status}
                  page={"log-report"}
                  reportName={report.reportCategory}
                  reportDesc={report.reportDescription}
                  timeUpdate={report.create_at}
                  onClick={() => selectReport(report.reportId)}
                />
              </div>
            ))
          ) : (
            <p>Belum ada laporan dari operator</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogReportWrapper;
