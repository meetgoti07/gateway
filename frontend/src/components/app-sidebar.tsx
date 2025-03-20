import * as React from "react"
import {
  ArrowLeftRight,
  GalleryVerticalEnd, LayoutDashboard, ScrollText, Settings, ShoppingCart, Store, ToggleRight,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Vaultcrypt",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    }
  ],
  navMain: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Connect Merchant",
      url: "/merchant-connect",
      icon: Store,
    }
  ],
  reports: [
    {
      name: "Transactions",
      url: "/transactions",
      icon: ArrowLeftRight,
    }
  ],
  plans: [
    {
      name: "Payment Report",
      url: "/payment-report",
      icon: ScrollText,
    },
  ],
  settings: [{
    name: "Payment Settings",
    url: "/settings",
    icon: Settings,
  }]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} SecName={"Main"} />
        <NavMain items={data.reports} SecName={"Reports"}  />
        <NavMain items={data.plans} SecName={"Plans"}  />
        <NavMain items={data.settings} SecName={"Settings"}  />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
