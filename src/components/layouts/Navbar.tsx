import { Link } from "@tanstack/react-router";

export function Navbar() {
  return (
    <div className="py-2 flex items-center w-full justify-between gap-2 fixed top-0 px-44 z-[10000]">
      <Link to="/" className="font-bold text-white text-3xl ">
        DOWIT
      </Link>
      <div className="flex gap-4">
        <Link to="/login" className=" bg-white text-sm rounded-sm px-4 py-1">
          Login
        </Link>
        <Link
          to="/"
          className="text-sm text-white outline rounded-sm px-4 py-1"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
