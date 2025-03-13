import { BottomMenu, LayoutProps, Topbar } from "@/components";

export default function Layout({children}: LayoutProps) {
    return (
        <div>
            <Topbar />
            <main>
                {children}
            </main>
            <BottomMenu />
        </div>
    )
}