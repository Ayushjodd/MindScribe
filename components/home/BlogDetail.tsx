/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/seperator";
import { Bookmark } from "lucide-react";
import NavBar from "@/components/shared/NavBar";
import axios from "axios";
import { useParams } from "next/navigation";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import Footer from "@/components/shared/Footer";
import { IoDiamond } from "react-icons/io5";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

interface BlogPost {
  claps: number;
  title: string;
  author: Author;
  date: string;
  category: string;
  content: string;
  authorBio: string;
  imageUrl: string;
  createdAt: string;
  likes: number;
  id: string;
}

interface Author {
  id: string;
  username: string;
  name: string;
  profilePicture: string;
  email: string;
  emailVerified: boolean | null;
  image: string;
  bio: string;
  twitter: string;
  linkedIn: string;
  Telegram: string;
  personalWebsite: string;
  membership: {
    type: string;
  };
}

const calculateReadingTime = (content: string) => {
  const wordsPerMinute = 200;
  const textLength = content.split(/\s+/).length;
  const readingTime = Math.ceil(textLength / wordsPerMinute);
  return `${readingTime} min read`;
};

export default function BlogPost() {
  const [claps, setClaps] = useState<number>(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [blogData, setBlogData] = useState<BlogPost | null>(null);
  const { id } = useParams();
  const session = useSession();

  useEffect(() => {
    async function fetchData() {
      const data = await axios.get(`/api/blogs/${id}`);
      const blog = data.data.blog;
      console.log(data);
      setBlogData(blog);
      setClaps(blog?.claps);
    }
    fetchData();
  }, [id]);

  if (!blogData) {
    return;
  }

  async function handleClap(blogId: string) {
    try {
      const res = await axios.post("/api/blogs/clap", { blogId });
      console.log(res);
      setClaps(res.data.claps);
    } catch (e) {
      console.log("error caught during clap");
    }
  }

  const handleBookmark = async (blogId: string) => {
    try {
      const res = await axios.post("/api/blogs/bookmark", { blogId });
      if (res.data.message.includes("added")) {
        toast.success("Blog bookmarked");
      } else {
        toast("Bookmark removed", { icon: "🗑" });
      }
    } catch (e) {
      console.error("Error bookmarking the blog:", e);
      toast.error("Error bookmarking the blog");
    }
  };

  async function handleFollow() {
    try {
      const response = await axios.post("/api/user/follow", {
        followingId: blogData?.author.id,
      });

      if (response.data.message.includes("Unfollowed")) {
        setIsFollowing(false);
      } else {
        setIsFollowing(true);
      }
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
    }
  }

  return (
    <>
      <Toaster />
      <div className={`min-h-screen `}>
        <div className="bg-white dark:bg-[#0e1119] text-gray-900 dark:text-gray-100 transition-colors duration-300">
          <NavBar />
          <main className="container mx-auto px-4 py-8 max-w-3xl">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold mb-4">
                {blogData?.title || ""}
              </h1>

              <div className="flex items-center space-x-4 mb-6">
                <Avatar>
                  <AvatarImage
                    src={blogData.author.profilePicture}
                    alt={blogData.author.image}
                  />
                  <AvatarFallback>{blogData.author.image}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-lg font-semibold">
                    <Link href={`/user/${blogData.author.id}`}>
                      <p
                        className={`hover:underline cursor-pointer  font-medium ${
                          blogData.author.membership?.type === "ADVANCE"
                            ? "text-yellow-500"
                            : blogData.author.membership?.type === "PRO"
                            ? "text-blue-500"
                            : "text-white"
                        }`}
                      >
                        {blogData.author.name || blogData.author.username}
                        {blogData.author.membership?.type === "ADVANCE" && (
                          <RiVerifiedBadgeFill
                            className="inline ml-1 text-yellow-500"
                            title="Gold Verified"
                          />
                        )}
                        {blogData.author.membership?.type === "PRO" && (
                          <IoDiamond
                            className="inline ml-1 text-blue-500"
                            title="Pro Member"
                          />
                        )}
                      </p>
                    </Link>
                  </h2>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>
                      {new Date(blogData.createdAt).toLocaleDateString()}
                    </span>
                    <span className="mx-2">·</span>
                    <span>{calculateReadingTime(blogData.content)}</span>
                  </div>
                </div>
                {session.data?.user.id === blogData.author.id ? (
                  <span></span>
                ) : (
                  <Button
                    variant={isFollowing ? "destructive" : "secondary"}
                    onClick={handleFollow}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                )}
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <Badge variant="secondary">{blogData.category}</Badge>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      window.open(`https://x.com/${blogData.author.twitter}`);
                    }}
                  >
                    <BsTwitterX className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      window.open(`https://t.me/${blogData.author.Telegram}`);
                    }}
                  >
                    <FaTelegramPlane className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      window.open(blogData.author.linkedIn);
                    }}
                  >
                    <FaLinkedin className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      window.open(blogData.author.personalWebsite);
                    }}
                  >
                    <FaLink />
                  </Button>
                </div>
              </div>

              <img
                src={blogData.imageUrl}
                alt={blogData.title}
                width={1200}
                height={600}
                className="w-full h-[400px] object-cover rounded-lg mb-8"
              />

              <div
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: blogData.content }}
              />

              <Separator className="my-8" />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => handleClap(blogData.id)}
                  >
                    👏 {claps}
                  </Button>
                </div>
                <Button
                  className=" "
                  variant="ghost"
                  size="icon"
                  onClick={() => handleBookmark(blogData.id)}
                >
                  <Bookmark className={`h-5 w-5 z-50 `} />
                </Button>
              </div>

              <Separator className="my-8" />

              <div className="flex items-start space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src={blogData.author.profilePicture}
                    alt={blogData.author.image}
                  />
                  <AvatarFallback>{blogData.author.image}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold flex gap-2">
                    Written by{" "}
                    <Link href={`/user/${blogData.author.id}`}>
                      <p
                        className={`hover:underline cursor-pointer  font-medium ${
                          blogData.author.membership?.type === "ADVANCE"
                            ? "text-yellow-500"
                            : blogData.author.membership?.type === "PRO"
                            ? "text-blue-500"
                            : "text-white"
                        }`}
                      >
                        {blogData.author.name || blogData.author.username}
                        {blogData.author.membership?.type === "ADVANCE" && (
                          <RiVerifiedBadgeFill
                            className="inline ml-1 text-yellow-500"
                            title="Gold Verified"
                          />
                        )}
                        {blogData.author.membership?.type === "PRO" && (
                          <IoDiamond
                            className="inline ml-1 text-blue-500"
                            title="Pro Member"
                          />
                        )}
                      </p>
                    </Link>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    {blogData.author.bio}
                  </p>
                  {session.data?.user.id === blogData.author.id ? (
                    <span></span>
                  ) : (
                    <Button
                      variant={isFollowing ? "destructive" : "secondary"}
                      onClick={handleFollow}
                    >
                      {isFollowing ? "Following" : "Follow"}
                    </Button>
                  )}
                </div>
              </div>
            </motion.article>
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
}
