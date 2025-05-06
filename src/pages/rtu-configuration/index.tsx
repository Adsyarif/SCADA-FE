import { Layout } from "@/components";
import React from "react";
import {RTUConfigurationWrapper} from "@/views";

export default function Index() {
    return (
        <RTUConfigurationWrapper />
    )
}

Index.getLayout = (page: React.ReactNode) => {
    return <Layout>{page}</Layout>
}