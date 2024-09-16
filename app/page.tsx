import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to MyBlog</h1>
      <p className="text-xl mb-8 max-w-2xl">
        Discover stories, thinking, and expertise from writers on any topic.
      </p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/signup">Start Writing</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/blogs">Start Reading</Link>
        </Button>
      </div>
    </div>
  );
}
