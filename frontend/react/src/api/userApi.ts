import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3000",
  validateStatus: (status: number) => status == 200 || status == 401,
});

const getUser = async (): Promise<User> => {
  const result = client
    .get("/user")
    .then(({ data, status }): User => {
      if (status == 200) return data;
      else if (status == 401) return "Unauthorized";
      return null;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
  return result;
};

const login = async (user: UserCredentials): Promise<void> => {
  client.put("/login", { user }).then(({ data, status }): User => {
    if (status == 200) return data;
    if (status == 401) return "Unauthorized";
  });
};

export { getUser, login };

type UserCredentials = {
  username: string | "";
  email: string | "";
  password: string;
};

export type User =
  | {
      username: string;
      email: string;
    }
  | "Unauthorized"
  | null;
