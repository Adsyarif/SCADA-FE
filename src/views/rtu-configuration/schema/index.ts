import { z } from "zod";

export const rtuSchema = z.object({
  id: z.string().optional(),
  rtuEngineId: z.string().optional(),
  rtuName:   z.string().min(1, "Name is required"),
  latitude:  z.number(),
  longitude: z.number(),
  radius:    z.number().positive("Radius must be positive"),
});

export type RtuFormData = z.infer<typeof rtuSchema>;