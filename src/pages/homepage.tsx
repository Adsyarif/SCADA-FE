import { Layout } from "@/components";
import { HomepageWrapper } from "@/views";
import React from "react";

export default function Homepage() {
    return (
        <HomepageWrapper />
    )
}

Homepage.getLayout = (page: React.ReactNode) => {
    return <Layout>{page}</Layout>
}