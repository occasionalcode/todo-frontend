import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "../components/hero";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <Hero />
    </div>
  );
}
