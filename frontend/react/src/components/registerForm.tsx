import registerFormSchema from "@/schemas/RegisterFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NewUser, User } from "@/api/userApi";
import { useRegister } from "@/hooks/useUserQueries";

function RegisterForm() {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  const onRegister = (data: User) => {
    if ("message" in data && data.path) {
      form.setError(data.path, { type: "custom", message: data.message });
    }
  };

  const { mutate: register } = useRegister(onRegister);

  const onSubmit = (values: z.infer<typeof registerFormSchema>) => {
    const User: NewUser = {
      username: values.username,
      email: values.email,
      password: values.password,
    };
    register(User);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-x-4 xl:w-1/4 md:w-1/2 w-10/12 border rounded-md border-white p-5 [&_div]:text-lg [&_label]:font-bold"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input autoComplete="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input autoComplete="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="col-span-2 lg:col-span-1">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" autoComplete="new-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="repeatPassword"
          render={({ field }) => (
            <FormItem className="col-span-2 lg:col-span-1">
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input type="password" autoComplete="new-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-1/2 mx-auto mt-2 font-bold text-lg col-span-2"
        >
          Register
        </Button>
      </form>
    </Form>
  );
}

export default RegisterForm;
