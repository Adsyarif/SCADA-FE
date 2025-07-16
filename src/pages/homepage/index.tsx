import { Layout } from "@/components";
import { HomepageWrapper } from "@/views";
import React from "react";

export default function Index() {
    return (
        <HomepageWrapper />
    )
}

Index.getLayout = (page: React.ReactNode) => {
    return <Layout>{page}</Layout>
}