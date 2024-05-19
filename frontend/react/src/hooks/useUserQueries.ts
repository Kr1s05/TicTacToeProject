import {
  User,
  UserCredentials,
  NewUser,
  login,
  logout,
  register,
} from "@/api/userApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLogout = () => {
  const qClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => {
      qClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
  return mutate;
};

export const useLogin = (successCallback: (data: User) => void) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (user: UserCredentials) => login(user),
    mutationKey: ["login"],
    onSuccess: (data: User) => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      successCallback(data);
    },
  });
  return { mutate };
};

export const useRegister = (successCallback: (data: User) => void) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (user: NewUser) => register(user),
    mutationKey: ["login"],
    onSuccess: (data: User) => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      successCallback(data);
    },
  });
  return { mutate };
};
