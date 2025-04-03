import { Layout } from "@/components";
import React from "react";
import {AttendanceWrapper, OperatorScheduleWrapper} from "@/views";

export default function Index() {
    return (
        <OperatorScheduleWrapper />
    )
}

Index.getLayout = (page: React.ReactNode) => {
    return <Layout>{page}</Layout>
}