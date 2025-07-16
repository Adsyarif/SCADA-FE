import { z } from "zod";

export const userSchema = z.object({
  userRoleId:            z.string().uuid("Role is required"),
  employee_number:       z.string().min(1, "Kode is required"),
  nik:                   z.string().min(1, "NIK is required"),
  address:               z.string().optional(),
  phone_number:          z.string().optional(),
  office_phone_number:   z.string().optional(),
  rtuAssignments: z.array(
    z.object({
      rtuId:         z.string().uuid("RTU is required"),
      checkInStatus: z.boolean(),
    })
  ).min(1, "At least one RTU assignment is required"),
  username:              z.string().min(3, "Username must be at least 3 characters"),
  email:                 z.string().email("Invalid email address"),
  password:              z.string().min(6, "Password must be at least 6 characters"),
});

export const updateUserSchema = userSchema
  .partial()              
  .extend({              
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .optional(),
  });

export type UserFormValues = z.infer<typeof userSchema>;
export type UpdateUserValues = z.infer<typeof updateUserSchema>;
