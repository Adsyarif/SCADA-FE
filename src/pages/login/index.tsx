// pages/login.tsx
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/router";
import { Input, Button, FullscreenLoading, MobileLayout } from "@/components";
import { useEffect, useState } from "react";
import { Eye, EyeClosed, Info, Loader, LockKeyhole, Mail } from "lucide-react";
import { useLoginMutation } from "@/store";
import { clearError, setError, setRememberMe } from "@/store/auth/auth.slicer";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useSession, signIn } from "next-auth/react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const { error: authError, rememberMe } = useAppSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    // Jika sudah authenticated, redirect ke dashboard
    if (status === "authenticated") {
      const callbackUrl = router.query.callbackUrl as string;
      router.replace(callbackUrl || "/dashboard");
    } else if (status === "unauthenticated") {
      setIsCheckingAuth(false);
    }
  }, [status, router]);

  useEffect(() => {
    // Timeout untuk mencegah stuck loading terlalu lama
    const timer = setTimeout(() => {
      if (status === "loading") {
        setIsCheckingAuth(false);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [status]);

  const onSubmit = async (data: LoginFormValues) => {
    dispatch(clearError());

    try {
      console.log("Attempting NextAuth signIn...");

      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: "/dashboard",
      });

      console.log("SignIn result:", result);

      if (result?.error) {
        throw new Error(result.error);
      }

      if (result?.ok) {
        const dest = (router.query.callbackUrl as string) || "/dashboard";
        router.push(dest);
      }
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage = error?.message || "Login failed. Please try again.";
      dispatch(setError(errorMessage));
      setFormError("password", { type: "manual", message: errorMessage });
    }
  };

  const handleRememberMeChange = (checked: boolean) => {
    dispatch(setRememberMe(checked));
  };

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
          <div className="p-8">
            <div className="mb-8 flex flex-col items-center">
              <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-white">
                <img
                  src="/img/Logo.png"
                  alt="logo"
                  className="h-16 w-16 object-contain"
                />
              </div>
              <h1 className="text-3xl font-bold text-gray-800">Sign In</h1>
              <p className="mt-2 text-gray-500">Welcome back to SCADA ONLINE</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    className="pl-10"
                    placeholder="Enter your email"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 flex items-center text-sm text-red-600">
                    <Info className="mr-1 h-4 w-4" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockKeyhole className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="pr-10 pl-10"
                    placeholder="Enter your password"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Eye className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeClosed className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {(errors.password || authError) && (
                  <p className="mt-1 flex items-center text-sm text-red-600">
                    <Info className="mr-1 h-4 w-4" />
                    {errors.password?.message || authError}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => handleRememberMeChange(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>

                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-500"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full justify-center rounded-md border border-transparent bg-blue-600 py-3 px-4 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:from-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-opacity-50"
              >
                Sign In
              </Button>
            </form>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default LoginPage;
