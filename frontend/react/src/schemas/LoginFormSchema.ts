import { z } from "zod";
const loginFormSchema = z
  .object({
    nameEmailSwitch: z.boolean().default(false),
    username: z.union([
      z.string().min(4, { message: "Името е твърде късо." }),
      z.literal(""),
    ]),
    email: z.union([z.string().email(), z.literal("")]),
    password: z.string().min(1, { message: "Въведи парола!" }),
  })
  .superRefine(({ nameEmailSwitch, username, email }, ctx) => {
    if (nameEmailSwitch) {
      if (email == "")
        ctx.addIssue({
          code: "custom",
          message: "Въведете имейл.",
          path: ["email"],
        });
    } else if (username == "")
      ctx.addIssue({
        code: "custom",
        message: "Въведете име.",
        path: ["username"],
      });
  });

export default loginFormSchema;
