import { Layout } from "@/components";
import { ScheduleManagementWrapper } from "@/views";
import { ScheduleForm } from "@/views/schedule-management/components/form";

export default function CreateSchedule() {
    return (
        <ScheduleForm />
    )
}

CreateSchedule.getLayout = (page: React.ReactNode) => {
    return <Layout>{page}</Layout>
}