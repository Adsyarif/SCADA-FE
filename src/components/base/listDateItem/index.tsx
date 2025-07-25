interface DateItemProps {
  onClick: () => void;
  reportName: string;
  reportDesc: string;
  page: string;
  timeUpdate: Date;
  status: "PENDING" | "REJECTED" | "APPROVED" | "REVISION";
}

const ListDateItem = ({
  onClick,
  reportName,
  reportDesc,
  page,
  status,
  timeUpdate,
}: DateItemProps) => {
  const colorStatus = (
    status: "PENDING" | "REJECTED" | "APPROVED" | "REVISION"
  ) => {
    return {
      PENDING: "bg-[#5A56FF]",
      APPROVED: "bg-[#39C252]",
      REVISION: "bg-[#FF7856]",
      REJECTED: "bg-[#FF0000]]",
    }[status];
  };

  const shorterMessage = (str: string): string => {
    const maxChar = 70;
    return str.length > maxChar ? str.slice(0, maxChar) + " ..." : str;
  };

  const getTime = (timeUpdate: Date) => {
    const date = new Date(timeUpdate);
    return {
      formattedDay: new Intl.DateTimeFormat("en-US", {
        weekday: "long",
      }).format(date),
      formattedTime: new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      }).format(date),
      formattedDate: new Intl.DateTimeFormat("en-US", {
        day: "numeric",
      }).format(date),
    };
  };

  const { formattedDay, formattedTime, formattedDate } = getTime(timeUpdate);

  return (
    <div className="px-5 py-2">
      <div className="flex gap-1 items-center cursor-pointer" onClick={onClick}>
        <div
          className={`${colorStatus(
            status
          )} w-24 h-15 py-1 rounded-xl flex flex-col justify-center items-center`}
        >
          <p className="text-xs text-white">{formattedDay}</p>
          <p className="text-white text-2xl">{formattedDate}</p>
        </div>
        <div className="flex justify-between items-center w-full bg-white rounded-2xl px-3 py-1">
          <div>
            <p className="font-bold text-sm">{reportName}</p>
            <p className="text-sm">{shorterMessage(reportDesc)}</p>
          </div>

          {page === "schedule" && <div className="flex gap-4 pl-6"></div>}

          {page === "log-report" && (
            <div className="self-start">
              <p>{formattedTime}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListDateItem;
