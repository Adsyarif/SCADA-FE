import { Layout } from "@/components";
import { HomepageWrapper } from "@/views";
import React from "react";
import { useGetUsersQuery } from "@/store/api";

export default function Index() {
  const { data, isLoading, isError, error } = useGetUsersQuery();
  console.log(data);
  return <HomepageWrapper />;
}

Index.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};
