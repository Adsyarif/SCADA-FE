import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/router";
import { Input, Button } from "@/components";
import MobileLayout from "@/components/layout/mobile.layout";
import { useEffect, useState } from "react";
import { Eye, EyeClosed, Info, Loader, LockKeyhole, Mail } from "lucide-react";
import { useLoginMutation } from "@/store";
import { clearError, setError, setRememberMe } from "@/store/auth/auth.slicer";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useSession } from "next-auth/react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const { data: session, status } = useSession();
  const currentuser = session?.user;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const { error: authError, rememberMe } = useAppSelector(
    (state) => state.auth
  );
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (status === "authenticated" && currentuser) {
      router.replace("/home");
    } else if (status === "unauthenticated") {
      setIsCheckingAuth(false);
    }
  }, [status, currentuser, router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (status === "loading") {
        setIsCheckingAuth(false);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [status]);

  const onSubmit = async (data: LoginFormValues) => {
    dispatch(clearError());

    try {
      const result = await login(data).unwrap();
      if (result.ok) {
        const dest = (router.query.callbackUrl as string) || "/home";
        router.push(dest);
      }
    } catch (error: any) {
      const errorMessage =
        error?.error || error?.data?.message || "Login failed";
      dispatch(setError(errorMessage));
      setFormError("password", { type: "manual", message: errorMessage });
    }
  };

  const handleRememberMeChange = (checked: boolean) => {
    dispatch(setRememberMe(checked));
  };

  const FullscreenLoading = ({ text }: { text: string }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="flex flex-col items-center">
        <Loader className="mb-4 h-8 w-8 animate-spin text-blue-600" />
        <p className="text-gray-600">{text}</p>
      </div>
    </div>
  );

  if (isCheckingAuth || status === "loading") {
    return <FullscreenLoading text="Checking authentication..." />;
  }

  if (status === "authenticated" && currentuser) {
    return <FullscreenLoading text="Redirecting to home..." />;
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
                disabled={isLoggingIn}
                className="w-full justify-center rounded-md border border-transparent bg-blue-600 py-3 px-4 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:from-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-opacity-50"
              >
                {isLoggingIn ? (
                  <div className="flex items-center gap-2">
                    <Loader className="h-5 w-5 animate-spin" />
                    <span>Signing In...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default LoginPage;
