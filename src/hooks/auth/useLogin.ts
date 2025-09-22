import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession, signIn } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { clearError, setError, setRememberMe } from "@/store/auth/auth.slicer";
import {
  LoginFormValues,
  loginSchema,
} from "@/components/sections/auth/schemas/login.schema";

export const useLogin = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const { error: authError, rememberMe } = useAppSelector(
    (state) => state.auth
  );

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMeChange = (checked: boolean) => {
    dispatch(setRememberMe(checked));
  };

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
      form.setError("password", { type: "manual", message: errorMessage });
    }
  };

  return {
    session,
    status,
    router,
    showPassword,
    isCheckingAuth,
    setIsCheckingAuth,
    authError,
    rememberMe,
    form,
    togglePasswordVisibility,
    handleRememberMeChange,
    onSubmit,
  };
};
