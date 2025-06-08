import { Layout } from "@/components";
import { ShiftForm } from "@/views/shift-management/components/form";
import { ShiftManagementWrapper } from "@/views/shift-management/components/wrapper";

export default function ShiftFormWrapper() {
    return (
        <ShiftForm />
    )
}

ShiftFormWrapper.getLayout = (page: React.ReactNode) => {
    return <Layout>{page}</Layout>
}