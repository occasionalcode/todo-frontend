import { useMutation, useQuery } from "@tanstack/react-query";

import { api } from "../variables/axiosInstances/backendAxiosInstances";
import type {
  AuthUserResponse,
  LoginResponse,
  LogoutResponse,
} from "../types/auth";
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
      history.replaceState(null, "", "/sign-in");
    },
  });
}

export function useSessionAuthenticate() {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      console.log("yeah boii");
      const { data } = await api.get("/me");
      return data as AuthUserResponse;
    },
    retryOnMount: false,
  });
}
