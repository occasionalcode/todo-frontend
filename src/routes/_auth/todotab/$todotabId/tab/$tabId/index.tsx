import { createFileRoute } from "@tanstack/react-router";
import { useFetchTodoById } from "../../../../../../services/todo";

export const Route = createFileRoute("/_auth/todotab/$todotabId/tab/$tabId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { tabId } = Route.useParams();
  const { data, isLoading, error } = useFetchTodoById(tabId);
  if (data) {
    console.log(data);
    return (
      <div className="">Hello "/_auth/todotab/$todotabId/tab/$tabId/"!</div>
    );
  }
}
