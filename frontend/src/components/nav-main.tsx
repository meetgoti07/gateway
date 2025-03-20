"use client"

import { type LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

export function NavMain({
  items,SecName
}: {
  items: {
    name: string
    url: string
    icon?: LucideIcon
  }[],
  SecName : string
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{SecName}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
            <SidebarMenuButton tooltip={item.name} className={"cursor-pointer"}>
              {item.icon && <item.icon />}
              <span>{item.name}</span>
            </SidebarMenuButton>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
