import { z } from "zod";

const registerFormSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Username is missing." })
    .min(4, { message: "Username must be at least 4 characters long" })
    .max(16, { message: "Username must be less than 16 characters long" }),
  email: z
    .string()
    .min(1, { message: "Email is missing." })
    .email({ message: "Email is invalid." }),
  password: z
    .string()
    .min(1, { message: "Password is missing." })
    .min(4, { message: "Password must be at least 4 characters long" })
    .max(16, { message: "Password must be less than 16 characters long" }),
  repeatPassword: z.string().min(1, { message: "Must confirm password." }),
});

export default registerFormSchema;
