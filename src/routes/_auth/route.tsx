import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { useSessionAuthenticate } from "../../services/auth";
import { SideBar } from "../../components/layouts/SideBar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../../components/ui/sidebar";
import { Toaster } from "sonner";

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
});

export function AuthLayout() {
  const { data, isLoading, error } = useSessionAuthenticate();
  // const { firstName, setFirstName, lastName, setLastName, email, setEmail } =
  //   useUserInfo();
  // setFirstName(data.data.user.firstName);
  // setLastName(data.data.user.lastName);
  // setEmail(data.data.user.email);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log("ajysdguasgd");
    return <Navigate to="/sign-in" />;
  }
  if (data) {
    return (
      <div className="flex ">
        <SidebarProvider>
          <SideBar />
          <SidebarInset>
            <main className="w-full  rounded-2xl bg-[#FBF9FA]  shadow-[-1px_-20px_20px_rgba(0,0,0,0.08)]  ">
              <SidebarTrigger />
              <Outlet />
            </main>
            <Toaster />
          </SidebarInset>
        </SidebarProvider>
      </div>
    );
  }
}
