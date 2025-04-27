import { UserRole } from "../types";

export const sampleRole: UserRole[] = [
    {
        id: "asdfasdfae",
        name: "Manager",
        permissions: ["create", "read", "update", "delete"],
    },
    {
        id: "fiqwjfopdajkjfoia",
        name: "Supervisor",
        permissions: ["create", "read", "update"],
    },
    {
        id: "jewlkfalksjhfd",
        name: "Staff",
        permissions: ["read"],
    },
]