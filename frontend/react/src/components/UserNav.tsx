import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import {
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { User } from "react-feather";
import { Button } from "./ui/button";

export function UserNav(props: { logoutCallback: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <User />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="flex items-center gap-3 p-4">
          <Avatar className="h-16 w-16">
            <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
          <div className="grid gap-0.5 text-xs">
            <div className="font-medium">John Doe</div>
            <div className="text-gray-500 dark:text-gray-400">
              johndoe@example.com
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button onClick={props.logoutCallback}></Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
