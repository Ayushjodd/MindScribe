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
import { Bookmark, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import NavBar from "@/components/shared/NavBar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface Bookmark {
  id: number;
  title: string;
  category: string;
  image: string;
  excerpt: string;
  author: string;
  profilePicture: string;
  date: string;
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [refetch, setRefetch] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchBookmarks() {
      try {
        setLoading(true);
        const response = await axios.get("/api/blogs/bookmark");
        const bookmarkData = Array.isArray(response.data.bookmarks)
          ? response.data.bookmarks
          : [];
        setBookmarks(bookmarkData);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBookmarks();
  }, [refetch]);

  async function handleBookmarkDelete(blogId: number) {
    try {
      const res = await axios.post("/api/blogs/bookmark", { blogId });
      if (res.data.message.includes("added")) {
        toast.success("Blog bookmarked");
      } else {
        toast("Bookmark removed", {
          icon: "🗑",
        });
        setRefetch(!refetch);
      }
    } catch (e) {
      console.error("Error bookmarking the blog:", e);
      toast.error("Error bookmarking the blog");
    }
  }

  const filteredBookmarks = bookmarks.filter(
    (bookmark) =>
      bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookmark.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Toaster />
      <NavBar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search bookmarks by title or category..."
              className="pl-10 pr-4 py-2 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredBookmarks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <Bookmark className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-semibold mb-2">No bookmarks found</h2>
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm
                ? "Try adjusting your search terms."
                : "Start bookmarking posts to see them here!"}
            </p>
          </motion.div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredBookmarks.map((bookmark, index) => (
              <motion.div
                key={bookmark.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col">
                  <CardHeader className="relative p-0">
                    <Image
                      src={bookmark.image}
                      alt={bookmark.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-2 left-2" variant="default">
                      {bookmark.category}
                    </Badge>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardTitle className="my-3 line-clamp-2">
                      {bookmark.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {bookmark.excerpt}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={bookmark.profilePicture}
                          alt={bookmark.author}
                        />
                        <AvatarFallback>{bookmark.author[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{bookmark.author}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(bookmark.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/blog/${bookmark.id}`}>Read</Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleBookmarkDelete(bookmark.id)}
                        aria-label="Remove bookmark"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
