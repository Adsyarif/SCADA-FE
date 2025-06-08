import { Layout } from "@/components";
import { ShiftManagementWrapper } from "@/views/shift-management/components/wrapper";

export default function ShiftConfiguration() {
    return (
        <ShiftManagementWrapper />
    )
}

ShiftConfiguration.getLayout = (page: React.ReactNode) => {
    return <Layout>{page}</Layout>
}