import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../variables/axiosInstances/backendAxiosInstances";
import type {
  TodoByIdResponse,
  TodoByTodoTabIdResponse,
  AllTodoResponse,
  TodoPostResponse,
} from "../types/todo";
import { queryClient } from "../variables/axiosInstances/queryClient";

export function useFetchAllTodo() {
  return useQuery({
    queryKey: ["todo"],
    queryFn: async () => {
      const { data } = await api.get("/todos");
      return data as AllTodoResponse;
    },
  });
}
export function useFetchTodoByTodoTabId(tabId: string) {
  return useQuery({
    queryKey: ["todoByTodoTabId", tabId],
    queryFn: async () => {
      const { data } = await api.get(`todotabs/${tabId}/todos`, {
        params: { tabId: tabId },
      });
      return data as TodoByTodoTabIdResponse;
    },
  });
}

export function useFetchTodoById(id: string) {
  return useQuery({
    queryKey: ["todoById", id],
    queryFn: async () => {
      const { data } = await api.get(`/todos/${id}`, { params: { id: id } });
      return data as TodoByIdResponse;
    },
  });
}

export function useTodoCreate() {
  return useMutation({
    mutationFn: async ({
      todoTabId,
      title,
      description,
    }: {
      todoTabId: string;
      title: string;
      description: string;
    }) => {
      const { data } = await api.post("/todos", {
        todoTabId,
        title,
        description,
      });
      return data as TodoPostResponse;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todoByTodoTabId"] });
    },
  });
}
