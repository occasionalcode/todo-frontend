import { createRootRoute, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="max-w-screen w-screen font-poppins">
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </div>
  ),
});
