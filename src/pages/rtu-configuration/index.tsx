import { Layout } from "@/components";
import { RtuConfigurationWrapper } from "@/views";
import React from "react";

export default function Index() {
    return (
        <RtuConfigurationWrapper />
    )
}

Index.getLayout = (page: React.ReactNode) => {
    return <Layout>{page}</Layout>
}