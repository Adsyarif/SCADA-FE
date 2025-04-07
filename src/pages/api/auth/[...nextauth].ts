import { axiosInstance } from "@/api/axiosClient";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials) {
                try {
                    const response = await axiosInstance.post("/auth/login", credentials)
                    const data = response.data;

                    if (data && data.access_token && data.user) {
                        return {
                            id: data.user.id,
                            email: data.user.email,
                            permissions: data.user.permissions,
                            accessToken: data.access_token,
                        }
                    }
                    return null;
                } catch (error) {
                    throw new Error ("Login failed")
                }
            }
        })
    ],
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.accessToken = user.accessToken;
                token.permissons = user.permissions;
            }
            return token
        },
        async session({session, token }) {
            session.accessToken = token.accessToken;
            if(session.user) {
                session.user.permissions = token.permissions;
            }
            return session;
        }
    },

    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/'"
    }
}

export default NextAuth(authOptions);