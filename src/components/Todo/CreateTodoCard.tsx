import { Button } from "../ui/button";
import { useNavigate, useParams } from "@tanstack/react-router";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useCreateTodoStore } from "../../stores/Todo";
import { useTodoCreate } from "../../services/todo";
import { toast } from "sonner";

import { Toast } from "../common/Toast";

const formSchema = z.object({
  todoTitle: z.string().optional(),
  description: z.string().optional(),
});

type Props = {
  hasCancel?: boolean;
};
export function CreateTodoCard({ hasCancel = true }: Props) {
  const { todotabId } = useParams({ from: "/_auth/todotab/$todotabId/" });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const setCreateTodoOpen = useCreateTodoStore(
    (state) => state.setCreateTodoOpen
  );
  const navigate = useNavigate();

  const { mutateAsync: createTodo } = useTodoCreate();
  async function handleSubmit(data: z.infer<typeof formSchema>) {
    try {
      await createTodo({
        todoTabId: todotabId,
        title: data.todoTitle ?? "Untitled",
        description: data.description ?? "No description",
      }).then(() => {
        setCreateTodoOpen(false);
        navigate({
          to: "/todotab/$todotabId",
          params: { todotabId: todotabId },
        });
        toast.custom(() => (
          <Toast
            title={"Todo Created Successfully"}
            description={"Start Grinding!!!"}
          />
        ));
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className=" w-full h-80 rounded-2xl border bg-white text-[#9333EA] px-4 py-5  flex flex-col justify-between">
      <div className="w-full h-full">
        <Form {...form}>
          <form
            className="flex flex-col gap-5 text-gray-600 justify-between h-full w-full"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <div className="flex flex-col gap-5 w-full">
              <FormField
                control={form.control}
                name="todoTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        className="text-gray-800 h-10 w-full"
                        placeholder="Some cool task name"
                        {...field}
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
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        className="text-gray-800 h-10"
                        placeholder="Whats on your mind?"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-start" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full justify-center gap-3 items-center">
              {hasCancel && (
                <Button
                  onClick={() => setCreateTodoOpen(false)}
                  className="bg-[#9333EA]"
                  type="button"
                >
                  Cancel
                </Button>
              )}
              <Button className="bg-[#9333EA]" type="submit">
                Create Todo!
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
