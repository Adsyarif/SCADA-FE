import { Layout } from "@/components";
import React from "react";
import {AttendanceWrapper} from "@/views";

export default function Index() {
    return (
        <AttendanceWrapper />
    )
}

Index.getLayout = (page: React.ReactNode) => {
    return <Layout>{page}</Layout>
}