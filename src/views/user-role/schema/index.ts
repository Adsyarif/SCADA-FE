import { z } from "zod";

export const roleSchema = z.object({
    roleName: z.string().min(3, { message: "Role name must be at least 3 characters long" }),
    permissions: z.array(z.string()).nonempty({ message: "At least one permission is required" }),
})

export type RoleFormData = z.infer<typeof roleSchema>