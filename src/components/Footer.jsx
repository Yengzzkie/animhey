"use client";

import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";

export default function FooterComponent() {
  return (
    <Footer container className="bg-transparent text-white">
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
        <Link to={"/"} className="text-yellow-400 text-2xl font-semibold">
          <span className="text-yellow-400">Anim</span>
          <span className="text-red-500">Hey!</span>
        </Link>
          <Footer.LinkGroup>
            <Footer.Link href="#">About</Footer.Link>
            <Footer.Link href="#">Privacy Policy</Footer.Link>
            <Footer.Link href="#">Licensing</Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright by="Designed and Developed by Yengzzkie DzignTech" />
      </div>
    </Footer>
  );
}
