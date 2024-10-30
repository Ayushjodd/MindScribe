"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bookmark,
  Heart,
  MessageCircle,
  Search,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import NavBar from "@/components/shared/NavBar";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { IoDiamond } from "react-icons/io5";
import { FaCrown } from "react-icons/fa";
import { AnimatedGradientText } from "../ui/MagicUiAnimatedBtn";
import { cn } from "@/lib/utils";
import { FaArrowRightLong } from "react-icons/fa6";

const categories = [
  "Programming",
  "Technology",
  "Health",
  "Finance",
  "Sports",
  "Geopolitics",
  "Politics",
];

interface Author {
  id: string;
  username: string;
  name: string;
  image: string;
  profilePicture: string | null;
  membership: {
    type: string;
  };
}

interface Blog {
  id: string;
  title: string;
  description: string;
  author: Author;
  createdAt: string;
  likes: number;
  category: string;
  imageUrl: string;
}

export default function AllBlogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showExclusive, setShowExclusive] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [bookmarkedBlogs, setBookmarkedBlogs] = useState<string[]>([]);
  const [likedBlogs, setLikedBlogs] = useState<string[]>([]);
  const [profile, setProfile] = useState<Boolean>(true);

  useEffect(() => {
    if (!session) {
      toast.error("Login required");
    }
  }, [session]);

  useEffect(() => {
    async function fetchUserDetails() {
      if (session) {
        try {
          const response = await axios.get(
            `/api/user/get-user-info/${session.user.id}`
          );
          if (
            !response.data?.Telegram ||
            !response.data?.bio ||
            !response.data?.linkedIn ||
            !response.data?.personalWebsite ||
            !response.data?.profilePicture ||
            !response.data?.twitter
          ) {
            setProfile(false);
          }
          const { likes, bookmarks } = response.data;
          setLikedBlogs(likes.map((like: any) => like.id));
          setBookmarkedBlogs(bookmarks.map((bookmark: any) => bookmark.id));
        } catch (error) {
          console.error("Error fetching user details:", error);
          toast.error("Error fetching user details");
        }
      }
    }

    fetchUserDetails();
  }, [session]);

  useEffect(() => {
    async function fetchData() {
      try {
        const blogsResponse = await axios.get("/api/blogs/allBlogs");
        if (blogsResponse.status === 200) {
          setBlogs(blogsResponse.data.blogs);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching blogs");
      }
    }

    fetchData();
  }, [session]);

  const handleLike = async (blogId: string, index: number) => {
    try {
      const response = await axios.post("/api/blogs/like", { blogId });
      if (response.status === 200) {
        const updatedBlogs = [...blogs];
        updatedBlogs[index].likes = response.data.likes;

        setLikedBlogs((prev) => {
          const newLikedBlogs = prev.includes(blogId)
            ? prev.filter((id) => id !== blogId)
            : [...prev, blogId];
          return newLikedBlogs;
        });
        setBlogs(updatedBlogs);
      }
    } catch (error) {
      toast.error("Error liking the blog");
    }
  };

  const handleBookmark = async (blogId: string) => {
    try {
      const res = await axios.post("/api/blogs/bookmark", { blogId });
      if (res.data.message.includes("added")) {
        setBookmarkedBlogs((prev) => [...prev, blogId]);
        toast.success("Blog bookmarked");
      } else {
        setBookmarkedBlogs((prev) => prev.filter((id) => id !== blogId));
        toast.success("Bookmark removed");
      }
    } catch (e) {
      console.error("Error bookmarking the blog:", e);
      toast.error("Error bookmarking the blog");
    }
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const filteredPosts = blogs.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    const matchesExclusive = showExclusive
      ? post.author.membership?.type !== "BASIC"
      : true;

    return matchesSearch && matchesCategory && matchesExclusive;
  });

  if (status === "loading") {
    return;
  }

  return (
    <>
      <Toaster />
      <NavBar />
      {!profile && (
        <div
          onClick={() => {
            router.push("/profile");
          }}
          className="flex justify-center w-full border bg-purple-500 py-2 hover:cursor-pointer hover:bg-purple-600 transition-all"
        >
          <span className="flex items-center space-x-2 text-center">
            😇 Please complete your profile to get the most out of our platform
            <FaArrowRightLong className="ml-2" />
          </span>
        </div>
      )}
      <div className="w-full h-screen dark:bg-black bg-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl mb-8 text-center pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)">
            Explore Our Blogs
          </h1>

          <div className="flex items-center space-x-4 mb-8">
            <div className="relative flex-1 focus-within:ring-4 focus-within:ring-blue-200 dark:focus-within:ring-blue-700 rounded-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 dark:text-gray-400 text-slate-700" />
              <Input
                type="text"
                placeholder="Search blogs by title or description..."
                className="pl-10 pr-4 py-2 w-full text-slate-700 dark:text-gray-400 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select onValueChange={handleCategoryChange} defaultValue="all">
              <SelectTrigger className="w-[180px] text-black dark:text-white">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <AnimatedGradientText className="z-40 cursor-pointer">
              🤫 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
              <span
                className={cn(
                  `inline animate-gradient bg-gradient-to-r from-[#ff6b40] via-[#9c40ff] to-[#40afff] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                )}
              >
                Exclusive Members Only
              </span>
              <FaCrown className="ml-1 size-4 text-[#e5c56d] transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedGradientText>
          </div>

          <div className="space-y-6">
            {filteredPosts.map((post, index) => (
              <div key={post.id}>
                <Card className="overflow-hidden lg:flex">
                  <div className="w-full ">
                    <div className="w-full h-96 flex text-gray-500">
                      <img src={post.imageUrl || ""} alt={post.title} />
                    </div>
                  </div>

                  <div className="w-full p-4">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{post.category}</Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleBookmark(post.id)}
                        >
                          <Bookmark
                            className={`h-5 w-5 z-50 ${
                              bookmarkedBlogs.includes(post.id)
                                ? "text-blue-500"
                                : "text-gray-500"
                            }`}
                          />
                        </Button>
                      </div>
                      <CardTitle className="text-3xl font-bold mb-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription>{post.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage
                            src={
                              post?.author?.profilePicture || post.author.image
                            }
                          />
                          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p
                            onClick={() =>
                              router.push(`/user/${post.author.id}`)
                            }
                            className={`hover:underline cursor-pointer text-sm font-medium ${
                              post.author.membership?.type === "ADVANCE"
                                ? "text-yellow-500"
                                : post.author.membership?.type === "PRO"
                                ? "text-blue-500"
                                : "dark:text-white text-black "
                            }`}
                          >
                            {post.author.name || post.author.username}
                            {post.author.membership?.type === "ADVANCE" && (
                              <RiVerifiedBadgeFill
                                className="inline ml-1 text-yellow-500"
                                title="Gold Verified"
                              />
                            )}
                            {post.author.membership?.type === "PRO" && (
                              <IoDiamond
                                className="inline ml-1 text-blue-500"
                                title="Pro Member"
                              />
                            )}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex items-center space-x-4">
                        <Button
                          className=""
                          variant="ghost"
                          size="icon"
                          onClick={() => handleLike(post.id, index)}
                        >
                          <Heart
                            className={`h-5  w-5 z-10 ${
                              likedBlogs.includes(post.id)
                                ? "text-red-500"
                                : "text-gray-500"
                            }`}
                          />
                          {post.likes > 0 && (
                            <span className="text-xs ml-1">{post.likes}</span>
                          )}
                        </Button>
                        {/* <Button variant="ghost" size="sm">
                          <MessageCircle className="h-5 w-5 mr-1" />0
                        </Button> */}
                      </div>
                      <Button className="z-40" variant="default" size="lg">
                        <Link href={`/blog/${post.id}`}>Read More</Link>
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
