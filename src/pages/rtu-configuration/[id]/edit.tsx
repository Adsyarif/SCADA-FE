import axiosInstance from "@/api/axiosClient";
import { Layout } from "@/components";
import withAuth from "@/lib/withAuth";
import { RtuConfigurationForm } from "@/views/rtu-configuration/components/form";
import { RtuFormData } from "@/views/rtu-configuration/schema";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";

const ProtectedRTUForm = withAuth(RtuConfigurationForm, ['manage:rtu-site']);

type SingleRtuResponse = {
    id: string;
    rtuEngineId: string;
    rtuName: string;
    latitude: number;
    longitude: number;
    radius: number;
}

export default function EditRtu() {
    const router = useRouter()
    const { id } = router.query as { id?: string}

    const { data: fetchedRtu, isLoading, isError } = useQuery<SingleRtuResponse>(
        {
        queryKey: ["rtu-configuration", id],
        queryFn: () =>
            axiosInstance.get(`/rtu-configuration/${id}`).then((res) => res.data),
        enabled: typeof id === "string",
        retry: false,
        }
    );

    if (!id || isLoading) {
        return <p>Loading…</p>;
    }
    if (isError || !fetchedRtu) {
        return <p className="text-red-600">Could not load RTU #{id}</p>;
    }

        const initialData: RtuFormData & { id: string } = {
        id,
        rtuName: fetchedRtu.rtuName,
        latitude: fetchedRtu.latitude,
        longitude: fetchedRtu.longitude,
        radius: fetchedRtu.radius,
        rtuEngineId: fetchedRtu.rtuEngineId ?? undefined,
    };

    return (
        <ProtectedRTUForm initialData={initialData}/>
    )
}

EditRtu.getLayout = (page: React.ReactNode) => {
    return <Layout>{page}</Layout>
}