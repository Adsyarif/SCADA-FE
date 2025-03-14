import {
  LucideCheckCircle2,
  LucideFileArchive,
  LucideUserCircle,
} from "lucide-react";

import { itemType } from "./type";

const getItemType = (item: itemType) => {
  return {
    operator: "operatorList",
    contact: "contactList",
    message: "messageList",
  }[item];
};

const ContactItem = () => {
  return (
    <div className="px-5 py-2">
      <div className="flex gap-4 items-center">
        <div className="w-20 h-20 ">
          <LucideUserCircle className="w-full h-full" />
        </div>
        <div className="flex justify-between items-center w-full bg-white rounded-2xl px-3 py-2">
          <div className="">
            <p className="font-bold">Nama</p>
            <p className="">Pesan</p>
          </div>
          <div className="flex gap-4 pl-6">
            <div className="w-8">
              <LucideCheckCircle2 className="text-green-500 w-full h-full" />
            </div>
            <div className="w-8" onClick={() => {}}>
              <LucideFileArchive className="text-red-500 w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactItem;
