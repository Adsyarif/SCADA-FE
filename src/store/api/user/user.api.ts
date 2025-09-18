import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryApi } from "../base.api";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryApi,
  endpoints: (builder) => ({
    getUsers: builder.query<any[], void>({
      query: () => ({
        url: "/users",
        methods: "GET",
      }),
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
