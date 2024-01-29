import { PropsWithChildren, createContext } from "react";
import { getUser, User } from "@/api/userApi";
import { useQuery } from "react-query";

export const UserContext = createContext<User | undefined>("Unauthorized");
export default function UserProvider(props: PropsWithChildren) {
  const { data } = useQuery("user", getUser);
  return (
    <UserContext.Provider value={data}>{props.children}</UserContext.Provider>
  );
}
