import { Input } from "@/components";
import { UserFormData } from "@/views/user-management/types";
import { useFormContext } from "react-hook-form";

type StepOneProps = {
    roles: { id: string; name: string }[];
}

export function StepOne({roles}: StepOneProps) {
    const {
    register,
    formState: { errors },
  } = useFormContext<UserFormData>();

    return (
    <div className="space-y-4 w-full">
      <h2 className="text-lg font-medium flex justify-center">Informasi Penugasan</h2>
      <div>
        <label>Role</label>
        <select {...register("userRoleId")} className="mt-1 block w-full border border-gray-300 rounded-md p-2">
          <option value="">Select role</option>
          {roles.map(role => (
            <option key={role.id} value={role.id}>{role.name}</option>
          ))}
        </select>
        {errors.userRoleId && <p className="text-red-500">{errors.userRoleId.message}</p>}
      </div>
      <Input label="Kode" {...register("employee_number")} />
      <Input label="NIK" {...register("nik")}/>
      <Input label="Alamat" {...register("address")} />
      <Input label="No HP" {...register("phone_number")} />
    </div>
    )
}