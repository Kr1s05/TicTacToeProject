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

export function UserNav(props: {
  logoutCallback: () => void;
  username: string;
  email: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <User size={36} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="flex items-center gap-3 p-4">
          <Avatar className="h-16 w-16">
            <AvatarImage alt="" src="/placeholder-avatar.jpg" />
            <AvatarFallback>{props.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="grid gap-0.5 text-xs">
            <div className="font-medium">{props.username}</div>
            <div className="text-gray-500 dark:text-gray-400">
              {props.email}
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button onClick={props.logoutCallback} className="w-1/2 ms-2">
            Изход
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
