import { Link } from "@tanstack/react-router";

export function Navbar() {
  return (
    <div className="flex w-full justify-center items-center">
      <div className="py-3 mt-2 flex items-center w-full justify-between gap-2 fixed top-0 max-w-[1440px] px-5 z-[10000] border rounded-lg bg-background/80 backdrop-blur-md">
        <Link to="/" className="flex gap-3">
          <div className="size-10 bg-[#9333EA] font-black rounded-br-2xl  text-white flex justify-center items-center">
            !
          </div>
          <h2 className="font-bold text-3xl w-full text-[#9333EA] group-data-[collapsible=icon]:hidden">
            DOWIT
          </h2>
        </Link>
        <div className="flex gap-4">
          <Link
            to="/sign-in"
            className="text-sm text-gray-700 rounded-sm px-4 py-3"
          >
            Login
          </Link>
          <Link
            to="/"
            className=" bg-[#9333EA] text-sm text-white font-semibold  rounded-sm px-4 py-3   "
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
