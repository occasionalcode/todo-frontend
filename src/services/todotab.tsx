import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../variables/axiosInstances/backendAxiosInstances";
import type {
  TodoTabByIDResponse,
  TodoTabCreateResponse,
  TodotabResponse,
  TodoTabUpdateResponse,
} from "../types/todotab";
import { queryClient } from "../variables/axiosInstances/queryClient";

export function useFetchAllTodotab() {
  return useQuery({
    queryKey: ["todotab"],
    queryFn: async () => {
      const { data } = await api.get("/todotabs");
      return data as TodotabResponse;
    },
  });
}
export function useFetchTodotabById(id: string) {
  return useQuery({
    queryKey: ["todotabById", id],
    queryFn: async () => {
      const { data } = await api.get(`/todotabs/${id}`, { params: { id: id } });
      return data as TodoTabByIDResponse;
    },
  });
}

export function useTodoTabCreate() {
  return useMutation({
    mutationFn: async ({
      title,
      description,
    }: {
      title?: string;
      description?: string;
    }) => {
      const { data } = await api.post("/todotabs", { title, description });
      return data as TodoTabCreateResponse;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todotab"] });
    },
  });
}

export function useTodoTabEdit(id: string) {
  return useMutation({
    mutationFn: async ({
      title,
      description,
    }: {
      title?: string;
      description?: string;
    }) => {
      const { data } = await api.put(`/todotabs/${id}`, { title, description });
      return data as TodoTabUpdateResponse;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todotabById"] });
      queryClient.invalidateQueries({ queryKey: ["todotab"] });
    },
  });
}
