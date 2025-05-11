import { getSession } from 'next-auth/react';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';

interface RequirePermissionsOptions {
  perms: string[];
  loginPath?: string;
  unauthorizedRedirect?: string;
}

export function requirePermissions<T extends Record<string, any>>({
  perms,
  loginPath = '/auth/login',
  unauthorizedRedirect,
}: RequirePermissionsOptions): GetServerSideProps<T> {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<T>> => {
    const session = await getSession(ctx);

    if (!session) {
      const callback = encodeURIComponent(ctx.resolvedUrl);
      return {
        redirect: {
          destination: `${loginPath}?callbackUrl=${callback}`,
          permanent: false,
        },
      };
    }

    const userPerms = session.user.permissions || [];
    const hasAll = perms.every((p) => userPerms.includes(p));
    if (!hasAll) {
      if (!unauthorizedRedirect) {
        return { notFound: true };
      }
      return {
        redirect: {
          destination: unauthorizedRedirect,
          permanent: false,
        },
      };
    }
    return { props: {} as T };
  };
}
