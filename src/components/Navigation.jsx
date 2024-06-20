"use client";

import { Link } from "react-router-dom";
import { Navbar } from "flowbite-react";

export default function Navigation() {
  return (
    <Navbar fluid className="bg-transparent py-6">
      <div className="flex">
        <Link to={"/"} className="text-yellow-400 text-2xl font-semibold">
          <span className="text-yellow-400">Anim</span>
          <span className="text-red-500">Hey!</span>
        </Link>
      </div>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Link to={"/"} className="hover:text-yellow-400 lg:text-lg">Home</Link>
        <Link to={"/"} className="hover:text-yellow-400 lg:text-lg">Genres</Link>
        <Link to={"/"} className="hover:text-yellow-400 lg:text-lg">Trending</Link>
        <Link to={"/"} className="hover:text-yellow-400 lg:text-lg">Popular</Link>
        <Link to={"/videoplayer"} className="hover:text-yellow-400 lg:text-lg">Upcoming</Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
