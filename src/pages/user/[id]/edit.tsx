import { Layout, LoadingPage } from "@/components";
import { UserFormWrapper, useUpdateUser, useUser } from "@/views";
import { useRouter } from "next/router";

export default function EditUser() {
    const { query } = useRouter()
    const userId = query.id as string;
    const { data: user, isLoading } = useUser(userId);
    const update = useUpdateUser(userId);

    if (isLoading || !user) return <LoadingPage />

    const initialValues = {
        userRoleId: user.role.id ?? "",
        employee_number: user.employee_number ?? "",
        nik: user.nik ?? "",
        rtuAssignments: (user.userSites ?? []).map((assignment: any) => ({
            rtuId: assignment.rtuConfiguration.id,
            checkInStatus: assignment.checkInStatus,
        })),
        username: user.username ?? "",
        email: user.email ?? "",
        password: "", 
        address: user.address ?? "",
        phone_number: user.phone_number ?? "",
        office_phone_number: user.office_phone_number ?? "",
        id: user.id ?? "",
    };

    return (
        <UserFormWrapper
            initialValues={initialValues}
            onSubmit={(values) => update.mutate(values)}
        />      
    )
}

EditUser.getLayout = (page: React.ReactNode) => {
    return <Layout>{page}</Layout>
}