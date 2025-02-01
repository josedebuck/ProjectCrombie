"use client";

import Link from "next/link";
import { useState } from "react";

const MenuMobile = () => {
  const [isOpen, setIsOpen] = useState(false); // Función para abrir y cerrar el menú

  return (
    <div className="md:hidden">
      <div
        className="flex flex-col gap-[4.5px] cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div
          className={`w-6 h-1 bg-blue-500 rounded-sm ${
            isOpen ? "rotate-45" : ""
          } origin-left ease-in-out duration-500`}
        />
        <div
          className={`w-6 h-1 bg-blue-500 rounded-sm ${
            isOpen ? "opacity-0" : ""
          } ease-in-out duration-500`}
        />
        <div
          className={`w-6 h-1 bg-blue-500 rounded-sm ${
            isOpen ? "-rotate-45" : ""
          } origin-left ease-in-out duration-500`}
        />
      </div>
      {isOpen && (
  <div className="absolute left-0 top-24 w-full h-[calc(100vh-96px)] bg-white dark:bg-gray-800 flex flex-col items-center justify-center gap-8 font-medium text-xl z-10">
    <Link href="/" className="text-gray-600 dark:text-gray-300">Home</Link>
    <Link href="" className="text-gray-600 dark:text-gray-300">Login/Register</Link>
  </div>
)}
    </div>
  );
};

export default MenuMobile;
