import { Layout } from "@/components";
import { ScheduleManagementWrapper } from "@/views";

export default function ScheduleManagement() {
    return (
        <ScheduleManagementWrapper />
    )
}

ScheduleManagement.getLayout = (page: React.ReactNode) => {
    return <Layout>{page}</Layout>
}