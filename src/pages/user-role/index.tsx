import { Layout } from "@/components";
import { requirePermissions } from "@/lib/ssrAuth";
import { UserRoleWrapper } from "@/views";
import React from "react";

export const getServerSideProps  = requirePermissions({
    perms: ["manage_roles"],
    unauthorizedRedirect: "/403",
})

export default function Index() {
    return (
        <UserRoleWrapper />
    )
}

Index.getLayout = (page: React.ReactNode) => {
    return <Layout>{page}</Layout>
}