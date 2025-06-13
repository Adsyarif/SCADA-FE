import { Layout } from "@/components";
import withAuth from "@/lib/withAuth";
import { UserRoleForm } from "@/views";
import { useRouter } from "next/router";
import React from "react";

const ProtectedUserRoleForm = withAuth(UserRoleForm, ['manage:roles']);

export default function CreateRole() {
    const { id } = useRouter().query as { id?: string}
    return (
        <ProtectedUserRoleForm initialData={id}/>
    )
}

CreateRole.getLayout = (page: React.ReactNode) => {
    return <Layout>{page}</Layout>
}