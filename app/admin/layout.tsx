import { Outlet } from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
// import { ModeToggle } from "~/components/mode-toggle";

export default function GuruLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* ShadCN Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="mr-4 hidden md:flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <span className="hidden font-bold sm:inline-block">Guru Portal</span>
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/guru/dashboard"
                      className={navigationMenuTriggerStyle()}
                    >
                      Dashboard
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/guru/schedule"
                      className={navigationMenuTriggerStyle()}
                    >
                      Jadwal
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/guru/attendance"
                      className={navigationMenuTriggerStyle()}
                    >
                      Presensi
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center space-x-2">
            {/* <ModeToggle /> */}
            <Button variant="outline" size="sm" asChild>
              <Link to="/logout">Logout</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        <div className="container py-4">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-4">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Sekolah Kami. All rights reserved.
        </div>
      </footer>
    </div>
  );
}