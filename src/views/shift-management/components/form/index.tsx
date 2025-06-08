import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components";
import { Title, Button, LoadingPage } from "@/components";
import type { ShiftFormData } from "../../types";
import { shiftSchema } from "../../schema";
import { useCreateShift, useShift, useUpdateShift } from "../../api";

interface ShiftFormProps {
  shiftId?: string;
}

export function ShiftForm({ shiftId }: ShiftFormProps) {
  const router = useRouter();
  const isEdit = Boolean(shiftId);

  const methods = useForm<ShiftFormData>({
    resolver: zodResolver(shiftSchema),
    defaultValues: { startTime: "", endTime: "", isActive: true },
  });

  const createShift = useCreateShift();
  const updateShift = useUpdateShift(shiftId || "");
  const { data: existing, isLoading } = useShift(shiftId || "");

  useEffect(() => {
    if (existing) {
        const startDate = new Date(existing.startTime);
        const endDate   = new Date(existing.endTime);

        methods.reset({
        startTime: startDate.toTimeString().slice(0,5),
        endTime:   endDate.toTimeString().slice(0,5),
        isActive:  existing.isActive,
        });
    }
    }, [existing, methods]);

  if (isEdit && isLoading) return <LoadingPage />;

  const onSubmit = (vals: ShiftFormData) => {
    if (isEdit) {
      updateShift.mutate(vals, { onSuccess: () => router.push("/shift-configuration") });
    } else {
      createShift.mutate(vals,   { onSuccess: () => router.push("/shift-configuration") });
    }
  };

  return (
    <div className="p-4 w-full max-w-md">
      <Title text={isEdit ? "Edit Shift" : "Create Shift"} />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit as any)} className="space-y-4">
          <Controller
            control={methods.control}
            name="startTime"
            defaultValue=""
            render={({ field, fieldState }) => (
                <Input
                label="Start Time"
                type="time"
                {...field}
                />
            )}
            />
          <Controller
            control={methods.control}
            name="endTime"
            defaultValue=""
            render={({ field, fieldState }) => (
                <Input
                label="End Time"
                type="time"
                {...field}
                />
            )}
            />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...methods.register("isActive")}
              id="isActive"
            />
            <label htmlFor="isActive">Active?</label>
          </div>
          <div className="flex justify-end space-x-2">
            <Button onClick={() => router.back()}>Cancel</Button>
            <Button type="submit">{isEdit ? "Save" : "Create"}</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
