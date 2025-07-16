import { Input } from "@/components";
import { UserFormData } from "@/views/user-management/types";
import { useFormContext } from "react-hook-form";

export function StepThree() {
  const {
    register,
    formState: { errors },
  } = useFormContext<UserFormData>();

  return (
    <div className="space-y-4 w-full">
      <h2 className="text-lg font-medium">Informasi Akun</h2>
      <Input label="Username" {...register("username")}/>
      <Input label="Email" {...register("email")} />
      <Input label="Password" type="password" {...register("password")} />
      <Input label="No Ponsel Kantor" {...register("office_phone_number")} />
    </div>
  );
}
