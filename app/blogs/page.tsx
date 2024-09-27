/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bookmark, Heart, MessageCircle, Search } from "lucide-react";
import Link from "next/link";
import NavBar from "@/components/shared/NavBar";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
interface Blog {
  id: string;
  title: string;
  description: string;
  author: string;
  createdAt: string;
}

export default function BlogListing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session) {
      toast.error("Login required");
    }
  }, [session, router]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/blogs/allBlogs");
        if (response.status === 200) {
          setBlogs(response.data.blogs);
        }
      } catch (error) {
        toast.error("Error fetching blogs");
      }
    }
    fetchData();
  }, []);

  if (status === "loading") {
    return null;
  }

  const filteredPosts = blogs.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Toaster />
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <motion.h1
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore Our Blog
        </motion.h1>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search blogs by title or description..."
              className="pl-10 pr-4 py-2 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        <div className="space-y-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id} // No more 'never' type error here
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`overflow-hidden ${index === 0 ? "lg:flex" : ""}`}
              >
                <div className={`${index === 0 ? "lg:w-2/3" : "w-full"}`}>
                  {/* Placeholder for image, you can add this later */}
                  <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
                    Image Placeholder
                  </div>
                </div>
                <div className={`${index === 0 ? "lg:w-1/3" : "w-full"}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">Category Placeholder</Badge>
                      <Button variant="ghost" size="icon">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardTitle className="text-2xl mb-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription>{post.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage
                          src={`https://i.pravatar.cc/150?u=${post.author}`}
                          alt={post.author}
                        />
                        <AvatarFallback>{post.author[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{post.author}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Heart className="h-4 w-4 mr-1" />0{" "}
                        {/* Placeholder for likes */}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="h-4 w-4 mr-1" />0{" "}
                        {/* Placeholder for comments */}
                      </Button>
                    </div>
                    <Button variant="outline" size="sm">
                      <Link href={`/blog/${post.id}`}>Read More</Link>
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
