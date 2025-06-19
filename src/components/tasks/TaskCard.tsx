import { Calendar as CalendarIcon, Folder, SquarePen } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Status, type TaskByTabIdDatum } from "../../types/task";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";
import { Calendar } from "../ui/calendar";
import { useDeleteTaskById, useTaskEdit } from "../../services/task";
import { toast } from "sonner";
import { Toast } from "../common";
import { TaskCreateCard } from "./TaskCreateCard";
import { CustomAlertDialog } from "../common/AlertDialog";
import { cn } from "../../lib/utils";
import { useFetchTodoById } from "../../services/todo";

type Props = {
  task: TaskByTabIdDatum;
  className?: string;
  todoId?: string;
};

export function TaskCard({ task, className, todoId }: Props) {
  if (!task) {
    return null; // or a loading spinner or error message
  }
  const [date, setDate] = useState<Date | null>(
    task?.deadline ? new Date(task.deadline) : null
  );

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { mutateAsync: editTask } = useTaskEdit();
  const { mutateAsync: deleteTaskById } = useDeleteTaskById();

  const { data: todoTab } = useFetchTodoById(todoId!);

  async function handleDateEdit(selectedDate: Date | null) {
    setDate(selectedDate);
    try {
      await editTask({
        id: task.id,
        deadline: selectedDate,
      });

      toast.custom(() => (
        <Toast
          title="Task Updated Successfully"
          description="Start Grinding!!!"
        />
      ));
    } catch (error) {
      console.error(error);
    } finally {
      setIsPopoverOpen(false);
    }
  }

  async function handlePermanentDelete(id: string) {
    try {
      await deleteTaskById({
        id: id,
      }).then(() => {
        toast.custom(() => (
          <Toast title="Task Deleted" description="Start Grinding!!!" />
        ));
      });
    } catch (error) {
      () => {
        toast.custom(() => (
          <Toast title="Cant Delete Task" description="Try again" />
        ));
      };
    }
  }
  async function handleStatusChange(checked: boolean) {
    try {
      await editTask({
        id: task.id,
        status: checked ? Status.Finished : Status.Ongoing, // Adjust based on your enum values
      });

      toast.custom(() => (
        <Toast
          title="Task Status Updated"
          description={
            checked ? "Well done! Task marked as finished." : "Keep going!"
          }
        />
      ));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className={cn(
        `border p-2 rounded-lg bg-white flex flex-row gap-2 justify-start items-start ${
          task.status === "Finished"
            ? "line-through text-gray-500"
            : "text-gray-900"
        }`,
        className
      )}
    >
      {isEditing ? (
        <TaskCreateCard
          task={task}
          onSubmit={() => setIsEditing(false)}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <Checkbox
            checked={task.status === "Finished"}
            onCheckedChange={(checked) => handleStatusChange(!!checked)}
            className="mt-1"
          />
          <div className="flex flex-col w-full">
            <div className="flex justify-between w-full">
              <div className="flex gap-2">
                <h3 className="text-lg">{task.name}</h3>
                {todoId && todoTab && (
                  <div className="flex items-center justify-center gap-1 text-gray-500">
                    <Folder size={16} />
                    <p className="text-sm">{todoTab?.data.title}</p>
                  </div>
                )}
              </div>
              <div className="flex text-sm text-gray-500 gap-2">
                <div className="flex gap-1 items-center">
                  <p>
                    {task.deadline
                      ? new Date(task.deadline).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                      : "Free"}
                  </p>
                  <Popover open={isPopoverOpen}>
                    <PopoverTrigger
                      onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                    >
                      <CalendarIcon size={16} />
                    </PopoverTrigger>
                    <PopoverContent className="text-center px-2 py-3">
                      <p className="font-semibold pb-3">Deadline</p>
                      <Calendar
                        mode="single"
                        selected={date ?? undefined}
                        onSelect={(selected) => {
                          const selectedDateStr = selected?.toDateString();
                          const taskDeadlineStr = task.deadline
                            ? new Date(task.deadline).toDateString()
                            : null;
                          if (selectedDateStr === taskDeadlineStr) {
                            handleDateEdit(null);
                          } else {
                            handleDateEdit(selected ?? null);
                          }
                        }}
                        className="rounded-md border"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <button onClick={() => setIsEditing(true)}>
                  <SquarePen size={16} />
                </button>
                <CustomAlertDialog
                  action={() => handlePermanentDelete(task.id)}
                />
              </div>
            </div>
            <p className="text-gray-500 text-sm">
              {task.description || "No Description"}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
