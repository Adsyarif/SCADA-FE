import axiosInstance from "@/api/axiosClient";
import { Layout, LoadingPage } from "@/components";
import { ScheduleForm } from "@/views/schedule-management/components/form";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function EditSchedulePage() {
    const { query } = useRouter()
    const id = Array.isArray(query.id) ? query.id[0] : query.id
    console.log(`ini isi dari ${id}`)
    const { data, isLoading, isError, error } = useQuery({
       queryKey: ['definition', id],
       queryFn: () => axiosInstance.get(`/schedule-definition/${id}`).then(r => r.data),
       enabled: !!id
    })

    if (isLoading) return <LoadingPage />
    if (isError)   return <p className="text-red-600">Error: {(error as Error).message}</p>

    return <ScheduleForm defId={id} />
}

EditSchedulePage.getLayout = (page: React.ReactNode) => {
    return <Layout>{page}</Layout>
}