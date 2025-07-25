// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser, JWT } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken: string;
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      permissions: string[];
    };
  }

  interface User extends DefaultUser {
    id: string;
    role: string;
    permissions: string[];
    accessToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    id: string;
    name: string;
    role: string;
    permissions: string[];
  }
}

declare module 'jwt-decode' {
  interface JwtPayload extends UserData {
    email: string;
    username: string;
    role: string;
    permissions: string[];
  }
}