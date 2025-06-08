import { z } from "zod";

export const shiftSchema = z.object({
  startTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Start time must be HH:mm" }),
  endTime:   z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "End time must be HH:mm" }),
  isActive:  z.boolean()
});

export type ShiftFormData = z.infer<typeof shiftSchema>;
