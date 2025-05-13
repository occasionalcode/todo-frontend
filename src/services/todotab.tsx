import { useQuery } from "@tanstack/react-query";
import { api } from "../variables/axiosInstances/backendAxiosInstances";
import type { TodoTabByIDResponse, TodotabResponse } from "../types/todotab";

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
