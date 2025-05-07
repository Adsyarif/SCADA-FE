import { Layout } from "@/components";
import { UserRoleForm } from "@/views";
import React from "react";

export default function CreateRole() {
    return (
        <UserRoleForm />
    )
}

CreateRole.getLayout = (page: React.ReactNode) => {
    return <Layout>{page}</Layout>
}