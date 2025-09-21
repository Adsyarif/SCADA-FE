import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { signIn, SignInResponse } from "next-auth/react";
import { baseQueryApi } from "../base.api";

interface LoginCredentials {
  email: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryApi,
  endpoints: (builder) => ({
    login: builder.mutation<SignInResponse, LoginCredentials>({
      queryFn: async (credentials) => {
        try {
          const result = await signIn("credentials", {
            redirect: false,
            ...credentials,
          });

          if (!result) {
            throw new Error("Unexpected signIn result");
          }

          if (result.error) {
            throw new Error(result.error);
          }

          return { data: result };
        } catch (error: any) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
