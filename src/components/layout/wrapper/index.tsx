import { BottomMenu, LayoutProps, Topbar } from "@/components";

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen w-screen lg:w-[450px] bg-white">
      <div className="sticky top-0 z-50">
        <Topbar />
      </div>
      <main className="flex grow overflow-y-auto">{children}</main>
      <div className="sticky bottom-0 z-50">
        <BottomMenu />
      </div>
    </div>
  )
}
