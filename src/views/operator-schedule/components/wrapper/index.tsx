import { Title } from "@/components";
import { CalendarSchedule } from "@/views";

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
