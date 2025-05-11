import { Layout } from "@/components";
import withAuth from "@/lib/withAuth";
import { UserRoleWrapper } from "@/views";
import React from "react";

const ProtectedUserRoleWrapper = withAuth(UserRoleWrapper, ['manage:roles']);
export default function Index() {
    return (
        <ProtectedUserRoleWrapper />
    )
}

Index.getLayout = (page: React.ReactNode) => {
    return <Layout>{page}</Layout>
}