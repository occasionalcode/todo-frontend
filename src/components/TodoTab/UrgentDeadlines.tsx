import { useParams } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { useFetchAllTaskByTodoTabId } from "../../services/task";
import { TaskCard } from "../tasks/TaskCard";
import { Status } from "../../types/task";

export function UrgentDeadlines() {
  const { todotabId } = useParams({
    from: "/_auth/todotab/$todotabId/",
  });

  const { data } = useFetchAllTaskByTodoTabId(todotabId);

  //   const {
  //     data: TodoName,
  //     isLoading: todoLoading,
  //     error: todoError,
  //   } = useFetchTodoById();

  if (data) {
    const filteredDatas = data?.data.filter(
      (task) => task.deadline !== null && task.status === Status.Ongoing
    );

    const filteredDatasCount = filteredDatas.length;
    return (
      <div
        className={`w-full min-h-40 bg-[#FEFBEA] border-[#FCE78A] border-2 rounded-2xl p-4 ${filteredDatasCount === 0 ? "hidden" : ""}`}
      >
        <div className="h-full w-full  ">
          <div className="flex gap-2 justify-start items-center">
            <Clock className="text-[#92410F]" />
            <h2 className="text-[#92410F] text-2xl font-medium">
              Urgent Deadlines
            </h2>
          </div>
          <div className="flex flex-col gap-3 pt-3">
            {filteredDatas.map((filteredData) => {
              return (
                <TaskCard
                  task={filteredData}
                  className="border-[#FCE78A] border-2"
                  todoId={filteredData.todoId}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
