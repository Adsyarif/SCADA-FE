import { BottomMenu, LayoutProps, Topbar } from "@/components";

export function Layout({children}: LayoutProps) {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="sticky top-0 z-50">
                <Topbar />
            </div>
            <main className="flex-grow">
                {children}
            </main>
            <div className="sticky bottom-0 z-50">
                <BottomMenu />
            </div>
        </div>
    )
}