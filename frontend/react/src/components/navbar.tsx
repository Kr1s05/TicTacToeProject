import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { NavLink as Link } from "react-router-dom";
import {
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenu,
} from "@/components/ui/navigation-menu";
import { UserNav } from "./UserNav";
import { Menu } from "react-feather";
import SiteIcon from "../assets/icon.svg?react";
import { useContext } from "react";
import { UserContext } from "./UserProvider";
import { useLogout } from "../hooks/useUserQueries";
export function NavBar() {
  const user = useContext(UserContext);
  const logout = useLogout();
  const authenticated = user && !("message" in user);
  return (
    <header
      className="flex h-20 w-full shrink-0 items-center px-4 md:px-6"
      role="navigation"
    >
      <Sheet>
        <SheetTrigger asChild>
          <Button
            className="lg:hidden aspect-square"
            size="icon"
            variant="outline"
          >
            <Menu />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <div className="grid gap-2 py-6">
            <Link
              className="flex w-full items-center py-2 text-lg font-semibold"
              to={"/"}
            >
              Home
            </Link>
            <Link
              className="flex w-full items-center py-2 text-lg font-semibold"
              to={"/game"}
            >
              Game
            </Link>
            <Link
              className="flex w-full items-center py-2 text-lg font-semibold"
              to={"/about"}
            >
              About
            </Link>
            <Button className="mt-4" variant="outline">
              <Link to={"/login"}>Login</Link>
            </Button>
            <Button className="mt-2">Register</Button>
          </div>
        </SheetContent>
      </Sheet>
      <Link className="mr-6 hidden lg:flex" to={""}>
        <SiteIcon />
        <span className="sr-only">Tic Tac Toe</span>
      </Link>
      <div className="flex w-full justify-center">
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuLink asChild>
              <Link
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-base font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                to={"/"}
              >
                Home
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-base font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                to={"/game"}
              >
                Game
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-base font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                to={"/about"}
              >
                About
              </Link>
            </NavigationMenuLink>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="w-40">
        {!authenticated ? (
          <div className="flex gap-2">
            <Link to={"/login"}>
              <Button variant="outline">Login</Button>
            </Link>
            <Link to={"/register"}>
              <Button>Register</Button>
            </Link>
          </div>
        ) : (
          <UserNav
            logoutCallback={logout}
            username={user.username}
            email={user.email}
          />
        )}
      </div>
    </header>
  );
}
