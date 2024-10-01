"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Feather, Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { FaRegBookmark } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";

const NavBar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="dark:shadow-xl dark:shadow-[#0d1016] fixed top-0 left-0 right-0 z-50 py-3 border-b px-4 lg:px-6 h-14 flex items-center bg-white  backdrop-blur-md  dark:bg-[#0d1117] dark:bg-opacity-90">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link className="flex items-center" href="#">
              <Feather className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-primary">
                MindScribe
              </span>
            </Link>
            <nav className="hidden md:flex space-x-4">
              <Link
                className="hover:underline text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-300"
                href="/"
              >
                Home
              </Link>
              <Link
                className="hover:underline text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-300"
                href="/blogs"
              >
                All-Blogs
              </Link>
              <Link
                className="hover:underline text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-300"
                href="/publish"
              >
                Publish
              </Link>
              <Link
                className="hover:underline text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-300"
                href="/about"
              >
                About
              </Link>
            </nav>
            <div className="hidden md:flex items-center space-x-4 text-black dark:text-white">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Conditional Rendering based on session */}
              {session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar>
                      <AvatarImage
                        src={session.user?.image || ""}
                        alt="User Avatar"
                      />
                      <AvatarFallback>
                        {session.user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => {
                        router.push("/profile");
                      }}
                    >
                      <div className="flex">
                        <span className="mr-2 text-lg">
                          <FaRegUser />
                        </span>
                        Profile
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        router.push("/bookmarks");
                      }}
                    >
                      <div className="flex">
                        <span className="mr-2 text-lg">
                          <FaRegBookmark />
                        </span>
                        BookMarks
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()}>
                      <div className="flex">
                        <span className="mr-2 text-lg">
                          <PiSignOutBold />
                        </span>
                        Sign Out{" "}
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  onClick={() => router.push("/signup")}
                  variant="outline"
                >
                  Log in
                </Button>
              )}
            </div>

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-14 left-0 right-0 bg-white dark:bg-[#0d1117] shadow-md">
            <div className="px-4 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                className="hover:underline block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                href="#"
              >
                Home
              </Link>
              <Link
                className="hover:underline block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                href="#"
              >
                Features
              </Link>
              <Link
                className="hover:underline block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                href="#"
              >
                Pricing
              </Link>
              <Link
                className="hover:underline block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                href="#"
              >
                About
              </Link>
              <Link
                className="hover:underline block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                href="#"
              >
                Contact
              </Link>
              <div className="mt-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      System
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-3 px-5">
                {session ? (
                  <Button onClick={() => signOut()} className="w-full">
                    Sign Out
                  </Button>
                ) : (
                  <Button onClick={() => signIn()} className="w-full">
                    Log in
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
      <div className="h-14"></div>{" "}
      {/* Spacer to prevent content from going under the navbar */}
    </>
  );
};

export default NavBar;
