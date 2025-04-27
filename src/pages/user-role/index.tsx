import { Layout } from "@/components";
import { requirePermissions } from "@/lib/ssrAuth";
import { UserRoleWrapper } from "@/views";
import React from "react";

export default function Index() {
    return (
        <UserRoleWrapper />
    )
}

Index.getLayout = (page: React.ReactNode) => {
    return <Layout>{page}</Layout>
}