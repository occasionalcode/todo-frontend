import type { Status, TaskByTabIdResponse } from "../../types/task";
import { TaskCard } from "./TaskCard";
import { Button } from "../ui/button";
import { useShallow } from "zustand/shallow";
import { TaskCreateCard } from "./TaskCreateCard";
import { useEffect } from "react";

import { useTaskStore } from "../../stores/Task";

type Props = {
  title: string;
  tasks: TaskByTabIdResponse | undefined;
  sortBy: Status;
};
export function TaskCards({ title, tasks, sortBy }: Props) {
  const [createTaskOpen, setCreateTaskOpen] = useTaskStore(
    useShallow((state) => [state.createTaskOpen, state.setCreateTaskOpen])
  );

  function handleCreateTask() {
    setCreateTaskOpen(true);
  }
  useEffect(() => {
    setCreateTaskOpen(false);
  }, []);
  return (
    <div className="shadow-sm p-5 flex flex-col gap-3 rounded-lg w-full bg-white">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-xl">{title}</h2>
        {sortBy === "Ongoing" && (
          <Button variant={"main"} onClick={() => handleCreateTask()}>
            Add Task
          </Button>
        )}
      </div>
      {createTaskOpen && sortBy === "Ongoing" && <TaskCreateCard />}
      {tasks?.data
        .filter((task) => task.status === sortBy)
        .map((task) => {
          return <TaskCard key={task.id} task={task} />;
        })}
    </div>
  );
}
