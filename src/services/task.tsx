import { useMutation, useQuery } from "@tanstack/react-query";

import { api } from "../variables/axiosInstances/backendAxiosInstances";
import type {
  AllTasksResponse,
  Status,
  TaskByTabIdResponse,
  TaskCreateResponse,
  TaskDeleteByIDResponse,
  TaskUpdateResponse,
} from "../types/task";
import { queryClient } from "../variables/axiosInstances/queryClient";

export function useFetchAllTask() {
  return useQuery({
    queryKey: ["task"],
    queryFn: async () => {
      const { data } = await api.get("/tasks");
      return data as AllTasksResponse;
    },
  });
}

export function useFetchAllTaskByTodoId(id: string) {
  return useQuery({
    queryKey: ["taskByTodoId", id],

    queryFn: async () => {
      const { data } = await api.get(`/todos/${id}/tasks`, {
        params: { id: id },
      });
      return data as TaskByTabIdResponse;
    },
  });
}

export function useFetchAllTaskByTodoTabId(id: string) {
  return useQuery({
    queryKey: ["taskByTodoTabId", id],
    queryFn: async () => {
      const { data } = await api.get(`/todotabs/${id}/tasks`, {
        params: { id: id },
      });
      return data as AllTasksResponse;
    },
  });
}

export function useTaskCreate() {
  return useMutation({
    mutationFn: async ({
      todoId,
      name,
      description,
      deadline,
    }: {
      todoId: string;
      name: string;
      description: string;
      deadline: Date | undefined;
    }) => {
      const { data } = await api.post("/tasks", {
        todoId,
        name,
        description,
        deadline,
      });
      return data as TaskCreateResponse;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taskByTodoId"] });
    },
  });
}

export function useDeleteTaskById() {
  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const { data } = await api.delete(`/tasks/${id}`);
      return data as TaskDeleteByIDResponse;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taskByTodoId"] });
    },
  });
}
export function useTaskEdit() {
  return useMutation({
    mutationFn: async ({
      id,
      name,
      description,
      deadline,
      status,
    }: {
      id: string;
      name?: string;
      description?: string;
      deadline?: Date | null;
      status?: Status;
    }) => {
      const { data } = await api.put(`/tasks/${id}`, {
        name,
        description,
        deadline,
        status,
      });
      return data as TaskUpdateResponse;
    },
    onSuccess: (_, {}) => {
      queryClient.invalidateQueries({ queryKey: ["taskByTodoId"] });
      queryClient.invalidateQueries({ queryKey: ["todoByTodoTabId"] });
      queryClient.invalidateQueries({ queryKey: ["taskByTodoTabId"] });
    },
  });
}
