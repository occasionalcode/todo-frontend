import { createFileRoute, Navigate } from "@tanstack/react-router";

import { useSessionAuthenticate } from "../services/auth";
import { Navbar } from "../components/layouts/Navbar";
import { Hero } from "../components/landingPage/hero";
import { use } from "react";
import { useUserInfo } from "../stores/userInfoStore";
import { useShallow } from "zustand/shallow";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data, isLoading } = useSessionAuthenticate();
  // const [firstName, setFirstName, lastName, setLastName, email, setEmail] =
  //   useUserInfo(
  //     useShallow((state) => [
  //       state.firstName,
  //       state.setFirstName,
  //       state.lastName,
  //       state.setLastName,
  //       state.email,
  //       state.setEmail,
  //     ])
  //   );

  if (data) {
    return <Navigate to="/dashboard" />;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Navbar />
      <Hero />
    </div>
  );
}
