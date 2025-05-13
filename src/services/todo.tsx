import { useQuery } from "@tanstack/react-query";
import { api } from "../variables/axiosInstances/backendAxiosInstances";
import type { TodoByTabIdResponse, TodoResponse } from "../types/todo";

export function useFetchAllTodo() {
  return useQuery({
    queryKey: ["todo"],
    queryFn: async () => {
      const { data } = await api.get("/todos");
      return data as TodoResponse;
    },
  });
}
export function useFetchTodoByTab(tabId: string) {
  return useQuery({
    queryKey: ["todoByTabId", tabId],
    queryFn: async () => {
      const { data } = await api.get(`todotabs/${tabId}/todos`, {
        params: { tabId: tabId },
      });
      return data as TodoByTabIdResponse;
    },
  });
}

export function useFetchTodoById(id: string) {
  return useQuery({
    queryKey: ["todoById", id],
    queryFn: async () => {
      const { data } = await api.get(`/todos/${id}`, { params: { id: id } });
      return data as TodoByTabIdResponse;
    },
  });
}
