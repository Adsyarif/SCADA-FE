import { axiosInstance } from "@/api/axiosClient";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type LoginResponse = {
  access_token: string;
  user: {
    id: string;
    email: string;
    permissions: string[];
  };
};

type AuthUser = {
  id: string;
  email: string;
  permissions: string[];
  accessToken: string;
};

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const res = await axiosInstance.post<LoginResponse>("/auth/login", {
            email: credentials?.email,
            password: credentials?.password,
          });
          const data = res.data;
          if (data && data.access_token && data.user) {
            return { 
              ...data.user, 
              accessToken: data.access_token 
            } as AuthUser;
          }
          return null;
        } catch (error) {
          console.error("Error authorizing:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as AuthUser).accessToken;
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user = token.user as AuthUser;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
});
