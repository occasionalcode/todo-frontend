import { createFileRoute } from "@tanstack/react-router";
import { SignIn } from "../../../components/auth/SignIn";
import { SignInNew } from "../../../components/auth/SignInNew";

export const Route = createFileRoute("/_login/sign-in/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SignInNew />;
}
