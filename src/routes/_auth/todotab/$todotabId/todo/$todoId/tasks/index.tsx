import { createFileRoute } from "@tanstack/react-router";
import {
  PageHeader,
  PageHeaderCrumb,
} from "../../../../../../../components/common";
import { TaskCards } from "../../../../../../../components/tasks/TaskCards";
import { useFetchAllTaskByTodoId } from "../../../../../../../services/task";
import { useFetchTodoById } from "../../../../../../../services/todo";

export const Route = createFileRoute(
  "/_auth/todotab/$todotabId/todo/$todoId/tasks/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { todoId } = Route.useParams();
  const {
    data: todo,
    isLoading: todoLoading,
    error: todoError,
  } = useFetchTodoById(todoId);
  const {
    data: tasks,
    isLoading: taskLoading,
    error: taskError,
  } = useFetchAllTaskByTodoId(todoId);

  if (todoLoading && taskLoading) {
    return <div>Loading</div>;
  }

  if (todoError && taskError) {
    return <div>Error</div>;
  }

  if (todo || tasks) {
    return (
      <div className="container text-[#2A3774]  gap-4 min-h-dvh">
        <PageHeader>
          <h1>{todo?.data.TodoTab.title || "Untitled"}</h1>
          <PageHeaderCrumb>{todo?.data.title ?? "Untitled"}</PageHeaderCrumb>
        </PageHeader>

        <p>{todo?.data.description || "No description"}</p>
        <div className="flex  gap-3 ">
          <TaskCards sortBy={"Ongoing"} title="Ongoing" tasks={tasks} />
          <TaskCards sortBy={"Finished"} title="Finished" tasks={tasks} />
        </div>
      </div>
    );
  }
}
