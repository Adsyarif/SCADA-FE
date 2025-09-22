import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { FullscreenLoading, MobileLayout } from "@/components";
import { useLogin } from "@/hooks/auth/useLogin";
import { LoginForm } from "@/components/sections/auth/loginForm.component";

const LoginPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const { isCheckingAuth, setIsCheckingAuth } = useLogin();

  useEffect(() => {
    if (status === "authenticated") {
      const callbackUrl = router.query.callbackUrl as string;
      router.replace(callbackUrl || "/dashboard");
    } else if (status === "unauthenticated") {
      setIsCheckingAuth(false);
    }
  }, [status, router, setIsCheckingAuth]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (status === "loading") {
        setIsCheckingAuth(false);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [status, setIsCheckingAuth]);

  if (isCheckingAuth || status === "loading") {
    return <FullscreenLoading text="Checking authentication..." />;
  }

  if (status === "authenticated") {
    return <FullscreenLoading text="Redirecting to dashboard..." />;
  }

  return (
    <MobileLayout showHeader={false} showFooter={false}>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
          <LoginForm />
        </div>
      </div>
    </MobileLayout>
  );
};

export default LoginPage;
