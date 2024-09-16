import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
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
        <main className="container mx-auto p-4">{children}</main>
        <footer className="border-t">
          <div className="container mx-auto p-4 text-center text-sm text-gray-500">
            © 2023 MyBlog. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
