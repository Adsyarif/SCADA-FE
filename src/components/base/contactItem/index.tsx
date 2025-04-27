import {
  LucideCheckCircle2,
  LucideFileArchive,
  LucideUserCircle,
} from "lucide-react";

interface ContactItemProps {
  type: itemType;
  name: string;
  desc: string;
}

interface itemType {
  page: string;
  action: (data: any) => void;
  extendAction?: (data: any) => void;
}

const ContactItem = ({ type, name, desc }: ContactItemProps) => {
  const { page, action, extendAction } = type;
  const shorterMessage = (str: string): string => {
    const maxChar = 40;
    return str.slice(0, maxChar) + " ...";
  };

  const getHourAndMin = () => {
    const date = new Date();
    const formattedTime = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    }).format(date);

    return formattedTime;
  };
  return (
    <div className="px-5 py-2">
      <div className="flex gap-1 items-center">
        <div className="w-16 h-16 ">
          <LucideUserCircle className="w-full h-full" />
        </div>
        <div className="cursor-pointer flex justify-between items-center w-full bg-white rounded-2xl px-3 py-1">
          <div onClick={action}>
            <p className="font-bold text-sm">{name}</p>
            <p className="text-sm">{shorterMessage(desc)}</p>
          </div>

          {page === "operator" && (
            <div className="flex gap-4 pl-6">
              <div className="w-8">
                <LucideCheckCircle2 className="text-green-500 w-full h-full" />
              </div>
              <div className="w-8" onClick={extendAction}>
                <LucideFileArchive className="text-red-500 w-full h-full" />
              </div>
            </div>
          )}

          {page === "message" && (
            <div className="self-start">
              <p>{getHourAndMin()}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactItem;
