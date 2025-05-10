import { useMutation, useQuery } from "@tanstack/react-query";

import axios from "axios";
import { api } from "../variables/axiosInstances/backendAxiosInstances";
import type { LoginResponse, LogoutResponse } from "../types/auth";
import { queryClient } from "../variables/axiosInstances/queryClient";

export function useLogin() {
  console.log("logging in");
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const { data } = await api.post("/auth/login", {
        email,
        password,
      });
      return data as LoginResponse;
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
}

export function useLogout() {
  console.log("logging Out");
  return useMutation({
    mutationFn: async () => {
      const { data } = await api.post("/auth/logout", null);
      return data as LogoutResponse;
    },
    onSuccess: () => {
      queryClient.clear();
      history.replaceState(null, "", "/login");
    },
  });
}
