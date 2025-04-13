// components/withPermission.tsx
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ComponentType, JSX, useEffect } from "react";

type WithPermissionProps = {
  requiredPermission: string;
};

export function withPermission<P extends JSX.IntrinsicAttributes>(
  WrappedComponent: ComponentType<P>,
  { requiredPermission }: WithPermissionProps
) {
  const ComponentWithPermission = (props: P) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status !== "loading") {
        const permissions = session?.user?.permissions ?? [];
        if (!permissions.includes(requiredPermission)) {
          router.replace("/unauthorized");
        }
      }
    }, [session, status, router, requiredPermission]);

    if (status === "loading") {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithPermission;
}
