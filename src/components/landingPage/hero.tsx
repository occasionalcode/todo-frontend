import { Link, useNavigate } from "@tanstack/react-router";

import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export function Hero() {
  const navigate = useNavigate();
  return (
    <div className="min-h-dvh w-full bg-[#FAF8FA] text-white ">
      {/* Hero Content */}
      <div className="w-full h-[60vh] flex flex-col justify-end items-center text-center px-4">
        <div className="flex flex-col items-center gap-5 max-w-4xl">
          <Badge className="text-sm bg-[#F2E9FF] text-violet-500 px-4 py-0.5">
            Tasks in Action –{" "}
            <Link to="/" className="text-sm underline">
              Learn More
            </Link>
          </Badge>
          <h2 className="text-5xl md:text-7xl xl:text-7xl font-bold hero-gradient">
            Organize Your Tasks with Style and Ease
          </h2>
          <p className="text-sm sm:text-xl text-gray-700 max-w-xl">
            Reimagine your to-do list as a powerful productivity tool that keeps
            you focused, organized, and motivated.
          </p>
          <div className="flex gap-4">
            <Button
              onClick={() => {
                navigate({ to: "/sign-in" });
              }}
              className="px-10 py-5 text-white bg-[#9333EA] hover:bg-gray-300"
            >
              Get Started
            </Button>
            <Button className="px-10 py-5 text-gray-700 bg-transparent border hover:bg-transparent hover:text-gray-800">
              Login
            </Button>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full flex justify-center items-center py-10">
        <div className="rounded-lg w-4/7 border p-2 shadow-xl shadow-[#9233ea67]">
          <img
            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="TaskPurple Dashboard"
            className="rounded-xl "
          />
        </div>
      </div>
    </div>
  );
}
