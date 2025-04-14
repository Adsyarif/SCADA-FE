import { z } from "zod"

const userRoleSchema = z.object({
    name: z.string().min(5,{message: "Name must be at least 5 characters long"}),
})

export function UserRoleForm() {
    return (
        <div>
            
        </div>
    )
}