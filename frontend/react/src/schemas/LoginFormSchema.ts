import { z } from "zod";
const loginFormSchema = z
  .object({
    nameEmailSwitch: z.boolean().default(false),
    username: z.union([
      z.string().min(4, { message: "Username is too short." }),
      z.literal(""),
    ]),
    email: z.union([z.string().email(), z.literal("")]),
    password: z.string().min(1, { message: "Enter password" }),
  })
  .superRefine(({ nameEmailSwitch, username, email }, ctx) => {
    if (nameEmailSwitch) {
      if (email == "")
        ctx.addIssue({
          code: "custom",
          message: "Email is missing.",
          path: ["email"],
        });
    } else if (username == "")
      ctx.addIssue({
        code: "custom",
        message: "Username is missing.",
        path: ["username"],
      });
  });

export default loginFormSchema;
