import { Layout } from "@/components";
import withAuth from "@/lib/withAuth";
import UserManagementWrapper from "@/views/user-management/components/wrapper";
import React from "react";

const ProtectedUserForm = withAuth(UserManagementWrapper, ['manage:rtu-site']);


export default function Index() {
    return (
        <ProtectedUserForm />
    )
}

Index.getLayout = (page: React.ReactNode) => {
    return <Layout>{page}</Layout>
}