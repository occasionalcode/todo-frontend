import { createFileRoute } from "@tanstack/react-router";
import { useFetchTodoByTab } from "../../../../services/todo";
import { useFetchTodotabById } from "../../../../services/todotab";
import { TodoCards } from "../../../../components/common/TodoCards";

export const Route = createFileRoute("/_auth/todotab/$todotabId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const todotabId = Route.useParams();
  const { data, isLoading, error } = useFetchTodoByTab(todotabId.todotabId);
  const {
    data: todotab,
    isLoading: todotabLoading,
    error: todotabError,
  } = useFetchTodotabById(todotabId.todotabId);

  if (isLoading || todotabLoading) {
    return <div>Loading...</div>;
  }
  if (error || todotabError) {
    return <div>Error</div>;
  }

  if (data && todotab) {
    const dataLength = data.data.length;
    return (
      <div className="text-[#2A3774] px-4 py-3 flex flex-col gap-4 min-h-dvh">
        <h2 className="text-4xl font-bold hero-gradient">
          {todotab.data.title || "Untitled"}
        </h2>
        <p>
          {dataLength
            ? dataLength + " to-dos in this category"
            : "No todos here"}
        </p>
        <div className="flex gap-5 h-full">
          <TodoCards data={data} todotabId={todotabId.todotabId} />
        </div>
      </div>
    );
  }
  return (
    <div>
      <p>No data</p>
    </div>
  );
}
