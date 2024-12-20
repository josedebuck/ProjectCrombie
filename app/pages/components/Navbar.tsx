"use client";

import Link from "next/link";
import MenuMobile from "./MenuMobile";
import { FaHome } from "react-icons/fa";
import { BiSolidLogIn } from "react-icons/bi";


const Navbar = () => {
  return (
    <div className="h-24 flex items-center justify-between">
      {/* Contenido a la izquierda */}
      <div className="lg:block w-[20%]">
        <Link href="/" className="font-bold text-xl text-blue-600">
          Elys
        </Link>
      </div>
      {/* Contenido al centro */}
      <div className="hidden md:flex w-[50%] text-sm">
        {/* Aca van los links */}
        <div className="flex gap-6 text-gray-600">
          <Link href="/" className="flex items-center gap-2">
            <FaHome className="text-lg w-4 h-4" />
            <span>Home</span>
          </Link>
          <Link href="/login" className="flex items-center gap-2">
            <BiSolidLogIn className="text-lg w-4 h-4" />
            <span>Login/Register</span>
          </Link>
        </div>
      </div>
      {/* Contenido a la derecha */}
      <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
        <MenuMobile />
      </div>
    </div>
  );
};

export default Navbar;
