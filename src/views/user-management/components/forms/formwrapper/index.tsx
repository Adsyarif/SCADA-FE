import { Button, LoadingPage, Title } from "@/components";
import { useCreateUser, useRtuConfigurations, useUserRoles } from "@/views/user-management/api";
import { updateUserSchema, UpdateUserValues, UserFormValues, userSchema } from "@/views/user-management/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StepOne } from "../step-one";
import { StepTwo } from "../step-two";
import { StepThree } from "../step-three";
import { useRouter } from "next/router";


interface UserFormWrapperProps { 
  initialValues?: UserFormValues & { id?: string };
  onSubmit?: (values: UserFormValues) => void;
}
export function UserFormWrapper({ initialValues, onSubmit }: UserFormWrapperProps) {
  const router = useRouter();
  const isEdit = Boolean(initialValues?.id);

  const methods = useForm<UserFormValues | UpdateUserValues>({
    resolver: zodResolver(isEdit ? updateUserSchema: userSchema),
    defaultValues: isEdit
      ? initialValues
      : {
        rtuAssignments: []
      }
  });

  const values = methods.getValues()
  const [step, setStep] = useState(1);
  const { data: roles, isLoading: rolesLoading } = useUserRoles();
  const { data: rtus, isLoading: rtusLoading } = useRtuConfigurations();
  const createMutation = useCreateUser();

  useEffect(() => {
    if (initialValues) {
      const { id, ...rest } = initialValues;
      methods.reset(rest);
    }
  }, [initialValues, methods]);

  if (rolesLoading || rtusLoading) {
    return <LoadingPage />;
  }

  const onNext = async () => {
    let valid = false;
    if (step === 1) {
      valid = await methods.trigger([
        "userRoleId",
        "employee_number",
        "nik",
        "address",
        "phone_number",
      ]);
    } else if (step === 2) {
      valid = await methods.trigger("rtuAssignments");
    } else {
      valid = await methods.trigger([
        "username",
        "email",
        "password",
        "office_phone_number",
      ]);
    }
    if (!valid) return;

    if (step < 3) {
      setStep(s => s + 1);
      return
    }
    
    const values = methods.getValues()
    if (isEdit && onSubmit) {
      onSubmit(values);
      router.push("/user");
    } else {
      createMutation.mutate(values, {
        onSuccess: () => router.push("/user"),
      })
    }
  };

  const onBack = () => { if (step > 1) setStep(s => s - 1); };

  return (
    <div className="p-4 w-full">
      <Title isButton text={isEdit ? "Edit User" : "Create User"} />
      <FormProvider {...methods}>
        {step === 1 && <StepOne roles={roles || []} />}
        {step === 2 && <StepTwo rtus={rtus || []} />}
        {step === 3 && <StepThree />}
        <div className="flex justify-between gap-8 mt-4">
          {step > 1 && <Button onClick={onBack}>Back</Button>}
          <Button onClick={onNext}>{step < 3 ? "Next" : "Submit"}</Button>
        </div>
      </FormProvider>
    </div>
  );
}