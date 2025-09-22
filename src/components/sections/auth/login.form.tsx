import React from "react";
import Link from "next/link";
import { Eye, EyeClosed, Info, LockKeyhole, Mail } from "lucide-react";
import { Input, Button } from "@/components";
import { useLogin } from "@/hooks/auth/useLogin";
import { LoginHeader } from "./login.header";

export const LoginForm: React.FC = () => {
  const {
    showPassword,
    authError,
    rememberMe,
    form,
    togglePasswordVisibility,
    handleRememberMeChange,
    onSubmit,
  } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div className="p-8">
      <LoginHeader title="Sign In" subtitle="Welcome back to SCADA ONLINE" />

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
              onClick={togglePasswordVisibility}
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
  );
};
