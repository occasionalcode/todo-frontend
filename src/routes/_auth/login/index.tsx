import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useLogin } from "../../../services/auth";

export const Route = createFileRoute("/_auth/login/")({
  component: RouteComponent,
});

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

function RouteComponent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const login = useLogin();
  const navigate = useNavigate();

  function handleSubmit(data: z.infer<typeof formSchema>) {
    login.mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          navigate({ to: "/dashboard" });
        },
      }
    );
  }

  return (
    <div className="h-dvh">
      <div className=" flex justify-center items-center h-full w-full absolute inset-0 z-10  py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
        <div className="flex  text-white justify-between items-center w-full">
          <div className="absolute inset-0 -z-10 h-full w-full  bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="relative flex justify-center items-center">
            <div className="aspect-[3/4] h-dvh bg-gradient-to-tr from-black from-20% to-90% to-transparent absolute"></div>
            <img
              src="https://img.freepik.com/free-photo/attractive-young-woman-working-laptop-early-morning_169016-24935.jpg?t=st=1746698150~exp=1746701750~hmac=3602a0bf0587503ac01fe01f6bf53782e61213854b45844094cd2a5959100908&w=996"
              alt="picture of a woman"
              className="object-cover aspect-[3/4] h-dvh"
            />
            <div className="absolute z-[100] bottom-14 space-y-3  px-10  ">
              <p className="font-semibold text-4xl">
                "An intuitive and sleek to-do website that makes organization
                effortless!"
              </p>
              <div className="-space-y-1">
                <p className="font-medium text-lg">Jane Rodriguez</p>
                <p className="font-light text-base">Dowit User</p>
              </div>
            </div>
          </div>
          <div className="flex-2">
            <div className="flex justify-center flex-col items-center text-center gap-5">
              <div className="space-y-1">
                <h2 className="text-5xl font-bold">Welcome Back to Dowit! </h2>
                <p>
                  Log in to stay organized, track your tasks, and get things
                  done—one checkmark at a time.
                </p>
              </div>
              <div className="aspect-[5/3] h-96 border rounded-2xl bg-white px-5 py-8">
                <Form {...form}>
                  <form
                    className="flex flex-col gap-5 text-gray-600"
                    onSubmit={form.handleSubmit(handleSubmit)}
                  >
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
                    <Button type="submit">Submit</Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
