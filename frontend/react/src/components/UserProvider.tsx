import { PropsWithChildren, createContext } from "react";
import { getUser, User } from "@/api/userApi";
import { useQuery } from "@tanstack/react-query";

export const UserContext = createContext<User | undefined>(undefined);
export default function UserProvider(props: PropsWithChildren) {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  return (
    <UserContext.Provider value={data}>{props.children}</UserContext.Provider>
  );
}
