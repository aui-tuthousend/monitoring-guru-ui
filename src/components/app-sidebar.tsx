"use client"
import { LifeBuoy, Settings } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { useLocation, Link } from "@tanstack/react-router"

const navigationData = {
    user: {
        name: "Admin SMKN 02 Surabaya",
        email: "admin@smkn2surabaya.sch.id",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/admin",
            // icon: IconDashboard,
        },
        {
            title: "Guru",
            url: "/admin/guru",
            // icon: IconListDetails,
        },
        {
            title: "Kelas",
            url: "/admin/kelas",
            // icon: IconChartBar,
        },
        {
            title: "Mata Pelajaran",
            url: "/admin/mapel",
            // icon: IconFolder,
        },
        {
            title: "Jadwal Ajar",
            url: "/admin/jadwalajar",
            // icon: IconUsers,
        },
        {
            title: "Ruangan",
            url: "/admin/ruangan",
            // icon: IconUsers,
        },
    ],
}


export function AppSidebar() {

    const location = useLocation()
    const pathname = location.pathname

    return (
        <Sidebar>
            <SidebarHeader className="border-b border-sidebar-border">
                <div className="flex h-[2.8rem] items-center px-4">
                    <span className="font-semibold">Acme Dashboard</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {navigationData.navMain.map((item) => {
                        const isActive = pathname === item.url
                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild isActive={isActive}>
                                    <Link to={item.url}>
                                        {/* <item.icon className="size-4" /> */}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="border-t border-sidebar-border">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <a href="#">
                                <Settings className="h-4 w-4" />
                                <span>Settings</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <a href="#">
                                <LifeBuoy className="h-4 w-4" />
                                <span>Help</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
