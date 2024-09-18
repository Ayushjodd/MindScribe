import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
const Header = () => {
  return (
    <header className="border-b">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold">
          MyBlog
        </Link>
        <div className="space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/blogs">Blogs</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/publish">Publish</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
