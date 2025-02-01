"use client";

import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { BiSolidLogIn } from "react-icons/bi";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import MenuMobile from "./MenuMobile";
import ToggleDarkMode from "./ToggleDarkMode"; // Importar el botón de toggle

const Navbar = () => {
  return (
    <div className="h-24 flex items-center justify-between bg-white dark:bg-gray-900 px-4 md:px-8">
      {/* Contenido a la izquierda */}
      <div className="lg:block w-[20%]">
        <Link href="/" className="font-bold text-xl text-blue-600 dark:text-blue-400">
          Elys
        </Link>
      </div>
      {/* Contenido al centro */}
      <div className="hidden md:flex w-[50%] text-sm">
        <div className="flex gap-6 text-gray-600 dark:text-gray-300">
          <Link href="/" className="flex items-center gap-2">
            <FaHome className="text-lg w-4 h-4" />
            <span>Home</span>
          </Link>
        </div>
      </div>
      {/* Contenido a la derecha */}
      <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
        <ClerkLoading>
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-black" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <div className="cursor-pointer"></div>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in" className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <BiSolidLogIn className="text-lg w-4 h-4" />
              <span>Login/Register</span>
            </Link>
          </SignedOut>
        </ClerkLoaded>

        {/* Botón de toggle visible en todas las pantallas */}
        <div className="flex items-center">
          <ToggleDarkMode />
        </div>

        <MenuMobile />
      </div>
    </div>
  );
};

export default Navbar;
