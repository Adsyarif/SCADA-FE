import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { jwtDecode, JwtPayload } from "jwt-decode"
import React, { ComponentType } from 'react';

export type WithAuthProps = {
  requiredPermissions: string[];
};

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>, requiredPermissions: string[] = []) => {
  const HOC = (props: P) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === 'loading') {
        return;
      }

      if (!session) {
        router.push('/');
        return;
      } else {
        router.prefetch('/homepage')
      }

      const token = session?.accessToken;
      if (token) {
        try {
          const decodedToken = jwtDecode<JwtPayload>(token);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp && decodedToken.exp < currentTime) {
            signOut({ redirect: false });
            router.push('/login');
            return;
          }

          const userPermissions = decodedToken.permissions || [];
          const hasPermission = requiredPermissions.every(permission =>
            userPermissions.includes(permission)
          );

          if (!hasPermission) {
            router.push('/unauthorized');
            return;
          }

        } catch (error) {
          signOut({ redirect: false });
          router.push('/');
        }
      }
    }, [session, status, router, requiredPermissions]);

    if (status === 'loading' || !session) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return HOC;
};

export default withAuth;