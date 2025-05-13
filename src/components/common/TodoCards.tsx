import { EllipsisVertical } from "lucide-react";
import type { TodoByTabIdResponse } from "../../types/todo";
import { Button } from "../ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { PurpleProgress } from "../ui/PurpleProgres";
import { useEffect, useState } from "react";
import { TodoCard } from "./TodoCard";

type Props = {
  data: TodoByTabIdResponse;
  todotabId: string;
};

export function TodoCards({ data, todotabId }: Props) {
  const navigate = useNavigate();

  return (
    <>
      {data.data.length === 0 && <div>Start creating To Dos!!</div>}
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
    </>
  );
}
