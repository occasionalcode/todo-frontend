// components/TodoTabEdit.tsx
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

export const formSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});

type Props = {
  defaultValues: {
    title?: string;
    description?: string;
  };
  onSubmit: (data: z.infer<typeof formSchema>) => Promise<void>;
};

export function TodoTabForm({ defaultValues, onSubmit }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
    form.setFocus("title");
  }, [defaultValues, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-full p-2"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <input
                  className="text-4xl font-bold hero-gradient border-none shadow-none focus:outline-none caret-black"
                  placeholder="Enter Title  "
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage className="text-red-500 text-start" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <input
                  className="text-gray-800 border rounded-lg w-full caret-black outline-none border-none shadow-none"
                  placeholder="Enter Description"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage className="text-red-500 text-start" />
            </FormItem>
          )}
        />

        <div className="pt-2">
          <Button type="submit" className="bg-[#9333EA] ">
            Create Tab
          </Button>
        </div>
      </form>
    </Form>
  );
}
