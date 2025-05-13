import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";

import { z } from "zod";
import { useLogin } from "../../services/auth";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export function SignInNew() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutateAsync: login } = useLogin();
  const navigate = useNavigate();

  async function handleSubmit(data: z.infer<typeof formSchema>) {
    try {
      await login(data);

      navigate({ to: "/dashboard" });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-dvh bg-[#FAF8FA]">
      <div className="flex flex-1 px-5 items-center justify-center w-full h-full">
        <div className="flex justify-center w-full max-w-[40rem] flex-col items-center text-center gap-5">
          <div className="flex flex-col flex-wrap">
            <h2 className="text-3xl sm:text-5xl font-bold hero-gradient">
              Welcome Back to Dowit!{" "}
            </h2>
            <p>
              Log in to stay organized, track your tasks, and get things
              done—one checkmark at a time.
            </p>
          </div>
          <div className="h-[25rem] mx-20 w-full border shadow-xl rounded-2xl bg-white px-5 py-8">
            <Form {...form}>
              <form
                className="flex flex-col gap-5 text-gray-600 justify-between h-full"
                onSubmit={form.handleSubmit(handleSubmit)}
              >
                <div className="flex flex-col gap-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            className="text-gray-800 h-10"
                            placeholder="johndoe@email.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-start" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="">Password</FormLabel>
                        <FormControl>
                          <Input
                            className="text-gray-800 h-10"
                            type="password"
                            placeholder="Enter password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-start" />
                      </FormItem>
                    )}
                  />
                </div>
                <Button className="bg-[#9333EA]" type="submit">
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
