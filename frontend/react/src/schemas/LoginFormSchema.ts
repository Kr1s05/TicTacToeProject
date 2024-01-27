import { z } from "zod";
const loginFormSchema = z.object({
  username: z.string().optional(),
});

export default loginFormSchema;
