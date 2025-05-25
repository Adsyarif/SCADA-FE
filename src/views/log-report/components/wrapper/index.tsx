import { Title } from "@/components";
import { UserNameInterface } from "@/context";
import ReportList from "@/views/report-menu/components/ReportList";
import { useListReport } from "@/views/report-menu/hooks";
import { useRouter } from "next/router";
import { useState } from "react";

const LogReportWrapper = ({ userId, userName }: UserNameInterface) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const route = useRouter();
  const { data: reports, error, isLoading } = useListReport(userId);
  const reportsData = reports?.data;
  console.log(reportsData);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading reports</p>;
  const handleBackBtn = () => {
    route.push("/list-operator");
  };
  let data: any = [];
  if (Array.isArray(reportsData)) {
    data = reportsData;
  }
  const totalPages = Math.ceil(data.length || 0 / itemsPerPage);
  const paginatedReports = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex grow">
      <div className="grow w-full">
        <Title
          text={"Log Report"}
          isButton={true}
          handleBackClick={() => handleBackBtn()}
        />
        <div className="h-14 flex items-center justify-center">
          <h1 className="font-bold text-xl">{userName}</h1>
        </div>
        <div className="">
          <ReportList
            reports={paginatedReports}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default LogReportWrapper;
