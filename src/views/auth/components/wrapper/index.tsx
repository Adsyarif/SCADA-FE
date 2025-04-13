import { Button, Input } from "@/components";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { signIn, SignInResponse } from "next-auth/react";
import { useRouter } from "next/router";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});
type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginWrapper() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useMutation<
    SignInResponse | undefined, 
    Error,                     
    LoginFormValues,            
    unknown                     
  >({
    mutationFn: async (data: LoginFormValues) => {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (res?.error) {
        throw new Error(res.error);
      }
      return res;
    },
    onSuccess: () => {
      router.push("/homepage");
    },
    onError: (error: Error) => {
      console.error("Login failed:", error.message);
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    mutate(data);
  };

  return (
    <div className="w-96 flex justify-center">
      <div className="w-full flex flex-col justify-center items-center gap-8">
        <img src="/img/Logo.png" alt="logo" className="w-32" />
        <h1 className="text-2xl">Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4 p-4">
          <div className="w-full">
            <Input label="Email" type="email" {...register("email")} />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <div className="w-full">
            <Input label="Password" type="password" {...register("password")} />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>
          <Link href="/forgot-password">Forgot Password?</Link>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
