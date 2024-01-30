import loginFormSchema from "@/schemas/LoginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Switch } from "@/components/ui/switch";
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
import { useState } from "react";
import { useLogin } from "@/hooks/useUserQueries";
import { User, UserCredentials } from "@/api/userApi";
function LoginForm() {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const onLogin = (values: User) => {
    const error = {
      type: "custom",
      message: "Incorrect username or password.",
    };
    if ("message" in values) {
      form.setError(
        form.getValues("nameEmailSwitch") ? "email" : "username",
        error
      );
      form.setError("password", error);
    }
  };
  const { mutate: login } = useLogin(onLogin);
  const onSubmit: SubmitHandler<z.infer<typeof loginFormSchema>> = (
    values: z.infer<typeof loginFormSchema>
  ) => {
    const userData: UserCredentials = {
      username: values.username,
      email: values.email,
      password: values.password,
    };
    login(userData);
  };

  const [displayClass, setDisplayClass] = useState(false);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2 w-5/6 border border-white rounded-md p-5 flex flex-col gap-x-4 [&_div]:text-lg [&_label]:font-bold"
      >
        <FormField
          control={form.control}
          name="nameEmailSwitch"
          render={({ field }) => (
            <FormItem className="absolute end-5">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(e) => {
                    field.onChange(e);
                    form.setValue(!displayClass ? "username" : "email", "");
                    form.trigger(displayClass ? "username" : "email");
                    setDisplayClass(!displayClass);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className={displayClass ? "hidden" : "" + ""}>
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
            <FormItem className={displayClass ? "" : "hidden" + ""}>
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
            <FormItem className="">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" autoComplete="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-1/2 mx-auto mt-2 font-bold text-lg">
          Login
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
