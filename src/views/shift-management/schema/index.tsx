import { z } from "zod";

export const shiftSchema = z.object({
  startTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Must be 24-hour format (HH:mm)"),
  endTime:   z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Must be 24-hour format (HH:mm)"),
  isActive:  z.boolean()
});

export type ShiftFormData = z.infer<typeof shiftSchema>;
