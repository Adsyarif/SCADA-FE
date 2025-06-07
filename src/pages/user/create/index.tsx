import { Layout } from "@/components";
import withAuth from "@/lib/withAuth";
import { UserFormWrapper } from "@/views";

const ProtectedUserForm = withAuth(UserFormWrapper, ['manage:users']);

export default function Index() {
    return (
        <ProtectedUserForm />
    )
}

Index.getLayout = (page: React.ReactNode) => {
    return <Layout>{page}</Layout>
}