import { Layout } from "@/components";
import withAuth from "@/lib/withAuth";
import { UserRoleForm } from "@/views";
import { RtuConfigurationForm } from "@/views/rtu-configuration/components/form";
import React from "react";

const ProtectedRTUForm = withAuth(RtuConfigurationForm, ['manage:rtu-site']);

export default function CreateRtu() {
    return (
        <ProtectedRTUForm />
    )
}

CreateRtu.getLayout = (page: React.ReactNode) => {
    return <Layout>{page}</Layout>
}