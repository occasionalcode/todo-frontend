import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { useSessionAuthenticate } from "../../services/auth";
import { useUserInfo } from "../../stores/userInfoStore";

export const Route = createFileRoute("/_login")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useSessionAuthenticate();

  if (data) {
    return <Navigate to="/dashboard" />;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
