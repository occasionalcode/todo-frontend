import { Button } from "../ui/button";
import { useParams } from "@tanstack/react-router";
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
import { useTaskCreate, useTaskEdit } from "../../services/task";
import { toast } from "sonner";
import { Toast } from "../common/Toast";
import { CalendarDays } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import type { TaskByTabIdDatum } from "../../types/task";
import { useTaskStore } from "../../stores/Task";

const formSchema = z.object({
  taskName: z.string().optional(),
  description: z.string().optional(),
  deadline: z.date().optional(),
});

type FormData = z.infer<typeof formSchema>;

type Props = {
  task?: TaskByTabIdDatum;
  onSubmit?: () => void;
  onCancel?: () => void;
};

export function TaskCreateCard({ task, onSubmit, onCancel }: Props) {
  const { todoId } = useParams({
    from: "/_auth/todotab/$todotabId/todo/$todoId/tasks/",
  });
  const setCreateTaskOpen = useTaskStore((state) => state.setCreateTaskOpen);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskName: task?.name ?? "",
      description: task?.description ?? "",
      deadline: task?.deadline ? new Date(task.deadline) : undefined,
    },
  });

  const { mutateAsync: createTask } = useTaskCreate();
  const { mutateAsync: editTask } = useTaskEdit();

  async function handleSubmit(data: FormData) {
    try {
      if (!task) {
        await createTask({
          todoId,
          name: data.taskName?.trim() || "Untitled",
          description: data.description?.trim() || "No description",
          deadline: data.deadline,
        }).then(() => {
          setCreateTaskOpen(false);
          toast.custom(() => (
            <Toast
              title="Task Created Successfully"
              description="Start Grinding!!!"
            />
          ));
        });
      } else {
        await editTask({
          id: task.id,
          name: data.taskName?.trim() || "Untitled",
          description: data.description?.trim() || "No description",
          deadline: data.deadline ?? null,
        }).then(() => {
          setCreateTaskOpen(false);
          toast.custom(() => (
            <Toast
              title="Task Updated Successfully"
              description="Keep Going!"
            />
          ));
          onSubmit?.();
          onCancel?.();
        });
      }
    } catch (error) {
      console.error("Error in task mutation:", error);
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="w-full rounded-2xl border bg-white text-[#9333EA] px-4 py-5 flex flex-col justify-between">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-5 text-gray-600 justify-between h-full w-full"
        >
          <div className="flex flex-col gap-5 w-full">
            <div className="flex w-full justify-start items-center gap-3">
              <FormField
                control={form.control}
                name="taskName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Task</FormLabel>
                    <FormControl>
                      <Input
                        className="text-gray-800 h-10"
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
                name="deadline"
                render={({ field }) => (
                  <FormItem className="pt-5">
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="flex items-center gap-2"
                            type="button"
                          >
                            <CalendarDays />
                            {field.value ? field.value.toDateString() : ""}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="text-center px-2 py-3">
                          <p className="font-semibold pb-3">Select Deadline</p>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            className="rounded-md border"
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage className="text-red-500 text-start" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <textarea
                      className="text-gray-800 h-20 border rounded-lg p-2"
                      placeholder="What's on your mind?"
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
            <Button
              onClick={() => {
                setCreateTaskOpen(false), onCancel?.();
              }}
              className="bg-gray-200 text-black hover:bg-gray-300"
              type="button"
            >
              Cancel
            </Button>
            <Button className="bg-[#9333EA]" type="submit">
              {task ? "Update Task" : "Create Task!"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
