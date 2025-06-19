import {
  ClipboardCheck,
  LayoutDashboard,
  ListTodo,
  PlusIcon,
} from "lucide-react";
import { useFetchAllTodotab, useTodoTabCreate } from "../../services/todotab";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { type ReactNode } from "react";
import { Link, useNavigate, type LinkProps } from "@tanstack/react-router";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSessionAuthenticate } from "../../services/auth";
import { Button } from "../ui/button";

import { toast } from "sonner";

type MainRoutesType = {
  title: string;
  icon: ReactNode;
  link: LinkProps;
};

export function SideBar() {
  const { data: userInfo } = useSessionAuthenticate();
  const { data, isLoading, error } = useFetchAllTodotab();
  const { mutateAsync: createTodotab } = useTodoTabCreate();
  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      const newTab = await createTodotab({
        title: undefined,
        description: undefined,
      });
      const newTabId = newTab?.data?.id; // Adjust based on actual response structure

      if (newTabId) {
        navigate({
          to: "/todotab/$todotabId",
          params: { todotabId: newTabId },
          search: { isNew: true },
        });
      } else {
        toast.error("Failed to get the new Todo Tab ID.");
      }
    } catch (error) {
      console.error("Error creating Todo Tab:", error);
      toast.error("Something went wrong while creating a Todo Tab.");
    }
  }

  const mainRoutes: MainRoutesType[] = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard strokeWidth={2.5} />,
      link: { to: "/dashboard" },
    },
    {
      title: "All Todos",
      icon: <ClipboardCheck strokeWidth={2.5} />,
      link: { to: "/dashboard" },
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  if (data) {
    return (
      <Sidebar
        collapsible="icon"
        variant="inset"
        className="border-none  text-[#2B3674]  "
      >
        <SidebarHeader className="bg-white w-full py-5 border-b border-gray-200  ">
          <div className="flex gap-3 ">
            <div className="size-10 bg-[#9333EA] font-black rounded-br-2xl  text-white flex justify-center items-center">
              !
            </div>
            <h2 className="font-bold text-3xl w-full text-[#9333EA] group-data-[collapsible=icon]:hidden">
              DOWIT
            </h2>
          </div>
        </SidebarHeader>
        <SidebarContent className="bg-white">
          <SidebarGroup className="">
            <SidebarGroupLabel className="text-black">
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainRoutes.map((route, i) => {
                  return (
                    <SidebarMenuItem key={i}>
                      <SidebarMenuButton asChild>
                        <Link className="text-[#2B3674] " {...route.link}>
                          {route.icon}
                          <p className="font-semibold">
                            {route.title ?? "New Tab"}
                          </p>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel className="text-black justify-between flex">
              <p>Categories</p>
              <Button
                onClick={() => handleSubmit()}
                className="flex justify-center items-center size-5   bg-gray-100 hover:bg-gray-200"
              >
                <PlusIcon className="p-0.5 text-[#2B3674]" strokeWidth={3} />
              </Button>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {data.data.map((tab) => (
                  <SidebarMenuItem key={tab.id}>
                    <SidebarMenuButton asChild>
                      <Link
                        className="text-[#2B3674]"
                        to={"/todotab/$todotabId"}
                        search={{ isNew: false }}
                        params={{ todotabId: tab.id }}
                      >
                        <ListTodo strokeWidth={3} />
                        <span className="font-semibold">
                          {tab.title ?? "New Tab"}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          {/* <SidebarGroup /> */}
          <SidebarMenu></SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="w-full bg-white">
          <div className="flex justify-start items-center pr-2 py-2 gap-2">
            <Avatar className="size-9">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col  group-data-[collapsible=icon]:hidden">
              <div className="flex gap-1 font-semibold w-40 ">
                <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {userInfo?.data.user.firstName}
                </p>
                <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {userInfo?.data.user.lastName}
                </p>
              </div>
              <div className="text-xs w-40">
                <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {userInfo?.data.user.email}
                </p>
              </div>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
    );
  }
  return <div>No todo tab!!! Create one</div>;
}
