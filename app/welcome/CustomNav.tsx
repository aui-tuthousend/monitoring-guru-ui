import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";

export function NavMenu() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link to="/">
                        <NavigationMenuLink className="px-4 py-2">
                            Home
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link to="/about">
                        <NavigationMenuLink className="px-4 py-2">
                            About
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link to="/login">
                        <NavigationMenuLink className="px-4 py-2">
                            <Button size={"sm"} className="to-blue-400 bg-blue-500">Login</Button>
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}
