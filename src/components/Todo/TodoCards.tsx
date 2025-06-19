import type { TodoByTodoTabIdResponse } from "../../types/todo";

import { TodoCard } from "./TodoCard";
import { useCreateTodoStore } from "../../stores/Todo";
import { CreateTodoCard } from "./CreateTodoCard";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

type Props = {
  data: TodoByTodoTabIdResponse;
};

export function TodoCards({ data }: Props) {
  const [createTodoOpen, setCreateTodoOpen] = useCreateTodoStore(
    useShallow((state) => [state.createTodoOpen, state.setCreateTodoOpen])
  );
  useEffect(() => {
    setCreateTodoOpen(false);
  }, []);
  return (
    <div className="py-5 grid gap-6 grid-cols-[repeat(auto-fill,minmax(250px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(320px,1fr))] w-full">
      {createTodoOpen ? (
        <CreateTodoCard />
      ) : (
        data.data.length === 0 && <CreateTodoCard hasCancel={false} />
      )}
      {data.data.map((todo) => {
        const progressPercent =
          todo.taskCount && todo.taskCount > 0
            ? Math.round((todo.finishedCount / todo.taskCount) * 100)
            : 0;
        return (
          <TodoCard
            progressPercent={progressPercent}
            todo={todo}
            key={todo.id}
          />
        );
      })}
    </div>
  );
}
