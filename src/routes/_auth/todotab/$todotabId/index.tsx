import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { TodoCards } from "../../../../components/Todo";
import { Button } from "../../../../components/ui/button";
import { PageHeader, Toast } from "../../../../components/common";
import { useFetchTodoByTodoTabId as useFetchTodoByTodoTabId } from "../../../../services/todo";
import { useCreateTodoStore } from "../../../../stores/Todo";
import { useShallow } from "zustand/shallow";
import {
  useFetchTodotabById,
  useTodoTabEdit,
} from "../../../../services/todotab";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { z } from "zod";
import {
  TodoTabForm,
  type formSchema,
} from "../../../../components/TodoTab/TodoTabForm";

import { UrgentDeadlines } from "../../../../components/TodoTab";

const todotTabSchema = z.object({
  isNew: z.boolean().optional(),
});

export const Route = createFileRoute("/_auth/todotab/$todotabId/")({
  validateSearch: todotTabSchema,
  component: RouteComponent,
});

function RouteComponent() {
  const todotabId = Route.useParams();

  const { isNew } = Route.useSearch();

  const { data, isLoading, error } = useFetchTodoByTodoTabId(
    todotabId.todotabId
  );
  const {
    data: todotab,
    isLoading: todotabLoading,
    error: todotabError,
  } = useFetchTodotabById(todotabId.todotabId);
  const { mutateAsync: UpdateTodotab } = useTodoTabEdit(todotabId.todotabId);

  const navigate = useNavigate();

  const [createTodoOpen, setCreateTodoOpen] = useCreateTodoStore(
    useShallow((state) => [state.createTodoOpen, state.setCreateTodoOpen])
  );

  if (isLoading || todotabLoading || !todotab?.data) {
    return <div>Loading...</div>;
  }

  if (error || todotabError) {
    return <div>Error</div>;
  }

  async function handleSubmit(data: z.infer<typeof formSchema>) {
    try {
      await UpdateTodotab({
        title: data.title ?? undefined,
        description: data.description ?? undefined,
      }).then(() => {
        toast.custom(
          () => (
            navigate({
              to: "/todotab/$todotabId",
              params: { todotabId: todotabId.todotabId },
            }),
            (
              <Toast
                title="Task Created Successfully"
                description="Start Grinding!!!"
              />
            )
          )
        );
      });
    } catch (error) {
      toast.error("Failed to update TodoTab.");
    }
  }

  if (data && todotab) {
    const dataLength = data.data.length;
    console.log(dataLength);
    return (
      <div className="text-[#2A3774] px-4 py-3 flex flex-col gap-4 min-h-dvh">
        {isNew ? (
          <TodoTabForm
            defaultValues={{
              title: todotab.data.title,
              description: todotab.data.description,
            }}
            onSubmit={handleSubmit}
          />
        ) : (
          <div>
            <div className="flex justify-between pr-5">
              <div className="flex flex-col gap-1">
                <PageHeader>
                  <h1>{todotab.data.title || "Untitled"}</h1>
                </PageHeader>
                <p>{todotab.data.description || "No description"}</p>
              </div>
              {createTodoOpen ? (
                <Button
                  onClick={() => setCreateTodoOpen(false)}
                  className="bg-[#9332EB]"
                >
                  Cancel
                </Button>
              ) : (
                <Button
                  onClick={() => setCreateTodoOpen(true)}
                  className={`bg-[#9332EB] ${dataLength === 0 && "hidden"}`}
                >
                  <Plus className="mr-1" strokeWidth={3} />
                  Add Todo
                </Button>
              )}
            </div>
            <div className="flex flex-col pt-5">
              <UrgentDeadlines />
              <p>{dataLength ? dataLength + " to-dos in this category" : ""}</p>
              <div className="flex gap-5 h-full">
                <TodoCards data={data} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <p>No data</p>
    </div>
  );
}
