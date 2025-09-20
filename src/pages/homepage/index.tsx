import { Layout } from "@/components";
import { HomepageWrapper } from "@/views";
import React, { useEffect } from "react";
import { useGetUsersQuery } from "@/store/api";

export default function Index() {
  const { data, isLoading, isError, error } = useGetUsersQuery();
  useEffect(() => {
    if (error) {
      console.error("Error:", error);
    }
    if (data) {
      console.log("ini adalah data users", {
        data,
        error,
        isLoading,
      });
    }
  }, [data, error]);
  return <HomepageWrapper />;
}

Index.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};
