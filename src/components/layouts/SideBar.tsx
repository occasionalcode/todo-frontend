import { ClipboardCheck, House, LayoutDashboard, ListTodo } from "lucide-react";
import { useFetchAllTodotab } from "../../services/todotab";
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
import type { ReactNode } from "react";
import { Link, type LinkProps } from "@tanstack/react-router";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSessionAuthenticate } from "../../services/auth";

type MainRoutesType = {
  title: string;
  icon: ReactNode;
  link: LinkProps;
};

export function SideBar() {
  const { data: userInfo, isLoading: userInfoLoading } =
    useSessionAuthenticate();
  const { data, isLoading, error } = useFetchAllTodotab();
  // const { firstName, lastName, email } = useUserInfo();
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
                          <p className="font-semibold">{route.title}</p>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel className="text-black">
              Categories
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {data.data.map((tab) => (
                  <SidebarMenuItem key={tab.id}>
                    <SidebarMenuButton asChild>
                      <Link
                        className="text-[#2B3674]"
                        to={"/todotab/$todotabId"}
                        params={{ todotabId: tab.id }}
                      >
                        <ListTodo strokeWidth={3} />
                        <span className="font-semibold">{tab.title}</span>
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
