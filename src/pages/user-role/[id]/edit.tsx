import { Layout } from "@/components";
import withAuth from "@/lib/withAuth";
import { UserRoleForm } from "@/views";
import React from "react";

const ProtectedUserRoleForm = withAuth(UserRoleForm, ['manage:roles']);

export default function CreateRole() {
    return (
        <ProtectedUserRoleForm />
    )
}

CreateRole.getLayout = (page: React.ReactNode) => {
    return <Layout>{page}</Layout>
}