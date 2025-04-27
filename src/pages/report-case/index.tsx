import { Layout } from "@/components";
import React from "react";
import {ReportCase} from "@/views";

export default function Index() {
    return (
        <ReportCase />
    )
}

Index.getLayout = (page: React.ReactNode) => {
    return <Layout>{page}</Layout>
}