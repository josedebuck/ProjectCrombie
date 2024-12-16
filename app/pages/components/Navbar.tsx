"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 fixed top-0 left-0 w-full z-50">
      <div className="max-w-screen-xl mx-auto p-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-semibold dark:text-white">
          ArtIDE
        </Link>
        <ul className="flex space-x-4">
          <div>
            <li>
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-500 dark:text-white dark:hover:text-blue-500"
              >
                Home
              </Link>
            </li>
          </div>
          <div>
            <li>
              <Link
                href="/pages/login"
                className="text-gray-700 hover:text-blue-500 dark:text-white dark:hover:text-blue-500"
              >
                Login
              </Link>
            </li>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
