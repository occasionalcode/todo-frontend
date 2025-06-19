import { createFileRoute, Navigate } from "@tanstack/react-router";

import { useSessionAuthenticate } from "../services/auth";
import { Navbar } from "../components/layouts/Navbar";
import { Hero } from "../components/landingPage/hero";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data, isLoading } = useSessionAuthenticate();

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
