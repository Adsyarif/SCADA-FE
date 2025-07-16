import { Layout } from "@/components";
import { ShiftForm } from "@/views/shift-management/components/form";
import { useRouter } from "next/router";

export default function EditShiftFormWrapper() {
    const { query } = useRouter()
    return (
        <ShiftForm shiftId={String(query.id)} />
    )
}

EditShiftFormWrapper.getLayout = (page: React.ReactNode) => {
    return <Layout>{page}</Layout>
}