import { Title } from "@/components";
import dynamic from "next/dynamic";

const CalendarSchedule = dynamic(
  () => import("@/views").then((mod) => mod.CalendarSchedule),
  { ssr: false }
);

export function OperatorScheduleWrapper() {
  return (
    <div className="flex flex-col w-full">
      <Title isButton backHref="/homepage" text="Calendar" />
      <div>
        <CalendarSchedule shiftId={""} />
      </div>
    </div>
  );
}
