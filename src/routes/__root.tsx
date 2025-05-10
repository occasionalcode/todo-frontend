import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Navbar } from "../components/layouts/Navbar";

export const Route = createRootRoute({
  component: () => (
    <div className="max-w-screen w-screen">
      <Navbar />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
