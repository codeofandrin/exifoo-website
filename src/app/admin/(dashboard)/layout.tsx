export const dynamic = "force-dynamic"

import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { DashboardBreadcrumb } from "@/components/admin/DashboardBreadcrumb"
// import { DUMMY_FEEDBACKS } from "@/components/admin/feedback/dummy-feedbacks"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { getFeedbackIds } from "@/utils/server/neon"

export default async function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const feedbackIds = await getFeedbackIds()
  // const feedbackIds = DUMMY_FEEDBACKS.map(f => f.licenseKeyId)

  return (
    <SidebarProvider>
      <AdminSidebar feedbackIds={feedbackIds} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <DashboardBreadcrumb />
        </header>
        <div className="bg-muted/50 flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
