import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

export default NextAuth({
  debug: true,
  providers: [
    CredentialsProvider({
      name: 'Email & Password',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const loginRes = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );
          const token = loginRes.data.access_token;
          if (!token) {
            return null;
          }
         
          const decodedToken = jwtDecode(token)
          const userId = decodedToken.sub as string; 
          console.log(`Decoded token:`, decodedToken);

          return {
            accessToken: token,
            id: userId,
            email: decodedToken.email,
            name: decodedToken.username,
            role: decodedToken.role,
            permissions: decodedToken.permissions,
          }
        } catch (error: any) {
          return null;
        }
      },
    }),
  ],

  session: { strategy: 'jwt' },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.permissions = user.permissions;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.user.role = token.role as string;
      session.user.permissions = token.permissions as string[];
      return session;
    },
  },
});
