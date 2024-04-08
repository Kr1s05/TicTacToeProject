import { z } from "zod";

const registerFormSchema = z
  .object({
    username: z
      .string()
      .min(1, { message: "Въведете име." })
      .min(4, { message: "Името трябва да е поне 4 символа." })
      .max(16, { message: "Името не трябва да превишава 16 символа." }),
    email: z
      .string()
      .min(1, { message: "Въведете имейл." })
      .email({ message: "Имейла е невалиден." }),
    password: z
      .string()
      .min(1, { message: "Въведете парола." })
      .min(4, { message: "Паролата трябва да е поне 4 символа" })
      .max(16, { message: "Паролата не трябва да превишава 16 символа." }),
    repeatPassword: z.string().min(1, { message: "Потвърдете паролата." }),
  })
  .refine(({ password, repeatPassword }) => password === repeatPassword, {
    message: "Паролите не съвпадат.",
    path: ["repeatPassword"],
  });

export default registerFormSchema;
