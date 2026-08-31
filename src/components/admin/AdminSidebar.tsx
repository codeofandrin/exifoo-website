"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { LogoutButton } from "@/components/admin/LogoutButton"
import { navItems } from "@/components/admin/nav-items"
import { useFeedbackReadState } from "@/hooks/use-feedback-read-state"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from "@/components/ui/sidebar"

function groupByCategory(items: typeof navItems) {
  const groups = new Map<string, typeof navItems>()
  for (const item of items) {
    groups.set(item.category, [...(groups.get(item.category) ?? []), item])
  }
  return [...groups.entries()]
}

type AdminSidebarProps = React.ComponentProps<typeof Sidebar> & { feedbackIds: string[] }

export function AdminSidebar({ feedbackIds, ...props }: AdminSidebarProps) {
  const pathname = usePathname()
  const categories = groupByCategory(navItems)
  const { isRead } = useFeedbackReadState()
  const hasNewFeedback = feedbackIds.some((id) => !isRead(id))

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="px-2 py-1.5 text-sm font-semibold">exifoo Admin</div>
      </SidebarHeader>
      <SidebarContent>
        {categories.map(([category, items]) => (
          <SidebarGroup key={category}>
            <SidebarGroupLabel>{category}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton isActive={pathname === item.href} render={<Link href={item.href} />}>
                      <item.icon />
                      <span>{item.label}</span>
                      {item.href === "/admin/feedback" && hasNewFeedback && (
                        <span className="relative ml-auto flex size-full items-center justify-end overflow-visible!">
                          <span className="bg-destructive/75 absolute inline-flex size-2 animate-ping rounded-full" />
                          <span className="bg-destructive relative inline-flex size-2 rounded-full" />
                        </span>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <LogoutButton />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
