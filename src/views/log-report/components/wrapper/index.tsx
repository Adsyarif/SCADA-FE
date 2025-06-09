import { ListDateItem, Title } from "@/components";
import { useRouter } from 'next/router';
// import { DataProps } from "@/pages/list-operator/log-report/[id]";

// const LogReportWrapper = ({ name, rtu, report }: DataProps) => {
const LogReportWrapper = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/list-operator/log-report/report-revision');
  };

  return (
    <div className="flex grow">
      <div className="grow w-full bg-whte">
        <Title text={"Log Report"} isButton={true} />
        <div className="h-14 flex items-center justify-center">
          <h1 className="font-bold text-xl">Pa Malik - RTU1</h1>
        </div>
        <div className="">
          <ListDateItem
            status={"approved"}
            page={"log-report"}
            reportName={"Report Kategori"}
            reportDesc={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, itaque sit optio earum vitae atque blanditiis enim perferendis laudantium sequi animi ratione minima aspernatur est eaque. Cupiditate asperiores nulla laboriosam?"
            }
            onClick={handleClick}
          />
          <ListDateItem
            status={"needRevision"}
            page={"log-report"}
            reportName={"Report Kategori"}
            reportDesc={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, itaque sit optio earum vitae atque blanditiis enim perferendis laudantium sequi animi ratione minima aspernatur est eaque. Cupiditate asperiores nulla laboriosam?"
            }
            onClick={handleClick}
          />
          <ListDateItem
            status={"review"}
            page={"log-report"}
            reportName={"Report Kategori"}
            reportDesc={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, itaque sit optio earum vitae atque blanditiis enim perferendis laudantium sequi animi ratione minima aspernatur est eaque. Cupiditate asperiores nulla laboriosam?"
            }
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
};

export default LogReportWrapper;
