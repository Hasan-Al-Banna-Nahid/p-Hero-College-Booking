"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "@/app/context/AuthProvider";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { HiOutlineMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const { logOut } = useContext(AuthContext);
  const router = useRouter();

  // Ensure window is defined before accessing localStorage
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null;

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logOut();
    typeof window !== "undefined" && localStorage.removeItem("user");
    typeof window !== "undefined" && window.location.reload();
    router.push("/pages/Auth/Login");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4 md:px-8">
        {/* Brand Logo */}
        <Link href="/">
          <Image
            src={logo}
            alt="logo"
            width={50}
            height={50}
            className="cursor-pointer"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 text-white font-medium text-lg">
          <Link href="/" className="hover:text-gray-300 transition">
            Home
          </Link>
          {user && (
            <Link
              href="/pages/colleges"
              className="hover:text-gray-300 transition"
            >
              Colleges
            </Link>
          )}
          {user && (
            <Link
              href="/pages/admission"
              className="hover:text-gray-300 transition"
            >
              Admission
            </Link>
          )}
          {user && (
            <Link
              href="/pages/myCollege"
              className="hover:text-gray-300 transition"
            >
              My College
            </Link>
          )}
        </div>

        {/* User Profile / Login Button */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-3">
              {/* Profile Icon as a Link */}
              <Link
                href="/pages/profile"
                className="hover:scale-105 transition"
              >
                <FaUserCircle className="text-white text-3xl cursor-pointer" />
              </Link>

              {/* Profile Name as a Link */}
              <Link href="/pages/profile">
                <span className="text-white font-medium hover:text-gray-300 transition cursor-pointer">
                  {user.displayName || user.name}
                </span>
              </Link>

              <button
                onClick={handleLogout}
                className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold shadow hover:bg-gray-200 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/pages/Auth/Login"
              className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold shadow hover:bg-gray-200 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg p-4 flex flex-col items-center space-y-4 shadow-lg">
          <Link
            href="/"
            className="hover:text-gray-300 transition"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          {user && (
            <Link
              href="/pages/colleges"
              className="hover:text-gray-300 transition"
              onClick={() => setMenuOpen(false)}
            >
              Colleges
            </Link>
          )}
          {user && (
            <Link
              href="/pages/admission"
              className="hover:text-gray-300 transition"
              onClick={() => setMenuOpen(false)}
            >
              Admission
            </Link>
          )}
          {user && (
            <Link
              href="/pages/myCollege"
              className="hover:text-gray-300 transition"
              onClick={() => setMenuOpen(false)}
            >
              My College
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
