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

const NavBar = () => {
  const { data: session } = useSession();
  console.log({ data: session });
  console.log(session?.user?.image);
  const router = useRouter();
  const { setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="border rounded-full mx-40 mt-8 bg-opacity-90 backdrop-blur-md shadow-sm dark:bg-[#0d1117] dark:bg-opacity-90">
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
                href="#"
              >
                Home
              </Link>
              <Link
                className="hover:underline text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-300"
                href="#"
              >
                All-Blogs
              </Link>
              <Link
                className="hover:underline text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-300"
                href="#"
              >
                Publish
              </Link>
              <Link
                className="hover:underline text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-300"
                href="#"
              >
                About
              </Link>
            </nav>
            <div className="hidden md:flex items-center space-x-4">
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
                    <DropdownMenuItem>{session.user?.name}</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()}>
                      Sign Out
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

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
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
    </>
  );
};

export default NavBar;
