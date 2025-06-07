import { z } from "zod";

export const userSchema = z.object({
    userRoleId: z.string().uuid({ message: "Role is required" }),
    employee_number: z.string().min(1, { message: "Kode is required" }),
    nik: z.string().min(1, { message: "NIK is required" }),
    address: z.string().optional(),
    phone_number: z.string().optional(),
    office_phone_number: z.string().optional(),
    rtuAssignments: z.array(
        z.object({
            rtuId: z.string().uuid({ message: "RTU is required"}),
            checkInStatus: z.boolean()
        })
    ).min(1, { message: "At least one RTU assignment is required" }),
    username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
})

export type UserFormValues = z.infer<typeof userSchema>;