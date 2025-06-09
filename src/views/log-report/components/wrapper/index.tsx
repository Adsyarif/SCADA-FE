import { ListDateItem, Title } from "@/components";
// import { DataProps } from "@/pages/list-operator/log-report/[id]";

// const LogReportWrapper = ({ name, rtu, report }: DataProps) => {
const LogReportWrapper = () => {
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
          <ListDateItem
            status={"approved"}
            page={"log-report"}
            reportName={"Report Kategori"}
            reportDesc={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, itaque sit optio earum vitae atque blanditiis enim perferendis laudantium sequi animi ratione minima aspernatur est eaque. Cupiditate asperiores nulla laboriosam?"
            }
            onClick={() => {}}
          />
          <ListDateItem
            status={"needRevision"}
            page={"log-report"}
            reportName={"Report Kategori"}
            reportDesc={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, itaque sit optio earum vitae atque blanditiis enim perferendis laudantium sequi animi ratione minima aspernatur est eaque. Cupiditate asperiores nulla laboriosam?"
            }
            onClick={() => {}}
          />
          <ListDateItem
            status={"review"}
            page={"log-report"}
            reportName={"Report Kategori"}
            reportDesc={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, itaque sit optio earum vitae atque blanditiis enim perferendis laudantium sequi animi ratione minima aspernatur est eaque. Cupiditate asperiores nulla laboriosam?"
            }
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default LogReportWrapper;
