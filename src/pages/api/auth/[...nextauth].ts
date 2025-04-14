import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export default NextAuth({
  debug: true,  // ← enable verbose logs

  providers: [
    CredentialsProvider({
      name: 'Email & Password',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          // console.log('→ authorize() got:', credentials);
          const loginRes = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );
          // console.log('← /auth/login response:', loginRes.data);

          const token = loginRes.data.access_token;
          if (!token) {
            // console.error('✖ no access_token in loginRes');
            return null;
          }

          const meRes = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          // console.log('← /auth/me response:', meRes.data);

          return {
            id: meRes.data.id,
            name: meRes.data.username,
            email: meRes.data.email,    // make sure your /auth/me returns this!
            role: meRes.data.role,
            perms: meRes.data.perms,
            accessToken: token,
          };
        } catch (err: any) {
          // console.error('✖ authorize() error:', err.response?.data || err.message);
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
        token.perms = user.perms;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.user.role = token.role as string;
      session.user.perms = token.perms as string[];
      return session;
    },
  },
});
