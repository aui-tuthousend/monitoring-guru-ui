"use client"
import { CalendarClock, CircleGauge, LifeBuoy, NotebookPen, School, Settings, UserLock, Warehouse } from "lucide-react"

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
            icon: <CircleGauge />
        },
        {
            title: "Guru",
            url: "/admin/guru",
            icon: <UserLock />,
        },
        {
            title: "Kelas",
            url: "/admin/kelas",
            icon: <School />
        },
        {
            title: "Mata Pelajaran",
            url: "/admin/mapel",
            icon: <NotebookPen />
        },
        {
            title: "Jadwal Ajar",
            url: "/admin/jadwalajar",
            icon: <CalendarClock />
        },
        {
            title: "Ruangan",
            url: "/admin/ruangan",
            icon: <Warehouse />
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
                    <span className="font-semibold">SMKN 02 Dashboard</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu className="pt-2 px-2 gap-2">
                    {navigationData.navMain.map((item) => {
                        const isActive = pathname === item.url
                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild isActive={isActive}>
                                    <Link to={item.url}>
                                        {item.icon}
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
