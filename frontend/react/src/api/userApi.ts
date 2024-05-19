import client from "./axiosClient";

const getUser = async (): Promise<User> => {
  return client
    .get("/user")
    .then(({ data }): User => {
      return data;
    })
    .catch((err) => {
      return { message: err };
    });
};

const login = async (user: UserCredentials): Promise<User> => {
  return client
    .post("/login", { ...user })
    .then(({ data }): User => {
      return data;
    })
    .catch((err) => {
      return { message: err };
    });
};

const logout = () => {
  return client.post("/logout", {}, { responseType: "text" });
};

const register = async (user: NewUser) => {
  return client
    .post("/register", { ...user })
    .then(({ data }): User => {
      if (data.path == "username")
        return { message: "Username is already taken.", path: "username" };
      if (data.path == "email")
        return { message: "Email is already taken.", path: "email" };
      return data;
    })
    .catch((err): User => {
      return { message: err };
    });
};

export { getUser, login, logout, register };

export type UserCredentials = {
  username: string | "";
  email: string | "";
  password: string;
};

export type NewUser = {
  username: string;
  email: string;
  password: string;
};

export type User =
  | {
      username: string;
      email: string;
    }
  | { message: string; path?: "email" | "username" };
