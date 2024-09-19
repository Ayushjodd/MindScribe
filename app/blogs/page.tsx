/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
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

// Mock data for blog posts
const blogPosts = [
  {
    id: 1,
    title: "The Future of AI in Content Creation",
    excerpt:
      "Explore how artificial intelligence is revolutionizing the way we create and consume content.",
    author: "Alice Johnson",
    date: "2023-06-15",
    category: "Technology",
    likes: 156,
    comments: 23,
    image:
      "https://imgs.search.brave.com/Ox3vaeqxCAVewjV7aZl6BzDl_QMlipedCpMiKSz90rM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTgy/Njc1NzQyL3Bob3Rv/L2Jvb2tzLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz05aVhS/ZE1zM3NOMjVpSHll/NWtBRkJxRDRUcjFJ/VlI0SVk4Z1hHOGJr/VE1VPQ",
  },
  {
    id: 2,
    title: "10 Must-Visit Hidden Gems in Europe",
    excerpt:
      "Discover lesser-known but breathtaking destinations across Europe for your next adventure.",
    author: "Mark Thompson",
    date: "2023-06-10",
    category: "Travel",
    likes: 203,
    comments: 45,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "The Rise of Plant-Based Diets",
    excerpt:
      "Learn about the growing trend of plant-based eating and its impact on health and the environment.",
    author: "Sarah Lee",
    date: "2023-06-05",
    category: "Health",
    likes: 178,
    comments: 32,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    title: "Mastering the Art of Productivity",
    excerpt:
      "Unlock the secrets to boosting your productivity and achieving your goals more efficiently.",
    author: "David Chen",
    date: "2023-05-30",
    category: "Lifestyle",
    likes: 134,
    comments: 19,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 5,
    title: "The Impact of Blockchain on Finance",
    excerpt:
      "Dive into how blockchain technology is transforming the financial industry and what it means for the future.",
    author: "Emily Watson",
    date: "2023-05-25",
    category: "Finance",
    likes: 189,
    comments: 37,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 6,
    title: "Sustainable Fashion: A New Era",
    excerpt:
      "Explore the growing trend of sustainable fashion and its positive impact on the environment.",
    author: "Olivia Green",
    date: "2023-05-20",
    category: "Fashion",
    likes: 167,
    comments: 28,
    image: "/placeholder.svg?height=400&width=600",
  },
];

export default function BlogListing() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
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
              placeholder="Search blogs by title or category..."
              className="pl-10 pr-4 py-2 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        <div className="space-y-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`overflow-hidden ${index === 0 ? "lg:flex" : ""}`}
              >
                <div className={`${index === 0 ? "lg:w-2/3" : "w-full"}`}>
                  <img
                    src={post.image}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className={`${index === 0 ? "lg:w-1/3" : "w-full"}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <Button variant="ghost" size="icon">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardTitle className="text-2xl mb-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
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
                        <p className="text-xs text-gray-500">{post.date}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Heart className="h-4 w-4 mr-1" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {post.comments}
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
