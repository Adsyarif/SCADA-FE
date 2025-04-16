import { Layout } from "@/components";
import { requirePermissions } from "@/lib/ssrAuth";
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