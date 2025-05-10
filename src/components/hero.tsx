import { Link, useNavigate } from "@tanstack/react-router";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export function Hero() {
  const navigate = useNavigate();
  return (
    <div className="h-dvh relative text-white">
      <div className=" absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="flex h-full flex-col justify-center items-center gap-5 w-2/3 text-center">
          <Badge className="text-xs px-4 py-0.5">
            Tasks in Action -
            <Link to="/" className="text-xs p-0 m-0">
              Learn More
            </Link>
          </Badge>
          <h2 className="text-8xl font-semibold">Your Ultimate TO-DO List</h2>
          <p className="text-lg w-3/4">
            Reimagine your to-do list as a powerful productivity tool that keeps
            you focused, organized, and motivated. Whether it’s personal tasks
            or work projects, you’re equipped to tackle them all with ease.
          </p>
          <div>
            <Button
              onClick={() => {
                navigate({ to: "/login" });
              }}
              className="px-10 py-5 text-black bg-white hover:bg-gray-300"
            >
              Start Now
            </Button>
            <Button className="px-10 py-5 text-white bg-transparent hover:bg-transparent hover:text-gray-200">
              Learn More
            </Button>
            <div className="flex bottom-0 right-0 px-24 absolute justify-center items-start h-56 overflow-hidden">
              <img
                className="object-cover rounded-4xl"
                src="https://www.launchuicomponents.com/app-light.png"
                alt="todo uiux"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
