"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Grid, Heart, MessageCircle, Users } from "lucide-react";
import Image from "next/image";
import NavBar from "@/components/shared/NavBar";
import { useParams, useRouter } from "next/navigation";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IoDiamond } from "react-icons/io5";
import { RiVerifiedBadgeFill } from "react-icons/ri";

interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  imageUrl: string;
  profilePicture: string;
  bio: string | null;
  twitter: string | null;
  linkedIn: string | null;
  personalWebsite: string | null;
  Telegram: string | null;
  posts: Post[];
  likes: LikedBlog[];
  bookmarks: BookmarkedBlog[];
  followers: Follower[];
  following: Following[];
  stats: {
    posts: number;
    likes: number;
    bookmarks: number;
    followers: number;
    following: number;
  };
  membership: {
    type: string;
  };
}

interface Post {
  id: string;
  title: string;
  imageUrl: string | null;
  description: string;
  content: string;
  published: boolean;
  createdAt: string;
  likes: number;
  comments: number;
}

interface LikedBlog {
  blog: {
    id: string;
    title: string;
    imageUrl: string | null;
    description: string;
  };
}

interface BookmarkedBlog {
  blog: {
    id: string;
    title: string;
    imageUrl: string | null;
    description: string;
  };
}

interface Follower {
  id: string;
  name: string;
  username: string;
  imageUrl: string | null;
}

interface Following {
  id: string;
  name: string;
  username: string;
  imageUrl: string | null;
}

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState("posts");
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get<User>(`/api/user/get-user-info/${id}`);
        console.log(response);
        setUserData(response.data);
      } catch (err) {
        setError("Failed to load user data");
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!userData) return <div>No user data available</div>;

  const { posts, likes } = userData;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        {/* Profile Section */}
        <section className="mb-8">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage
                src={userData.profilePicture}
                alt={userData.name || "User Avatar"}
              />
              <AvatarFallback>{userData.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl  mb-2">
              <p
                className={`hover:underline cursor-pointer  font-medium ${
                  userData.membership?.type === "ADVANCE"
                    ? "text-yellow-500"
                    : userData.membership?.type === "PRO"
                    ? "text-blue-500"
                    : "text-white"
                }`}
              >
                {userData.name || userData.username}
                {userData.membership?.type === "ADVANCE" && (
                  <RiVerifiedBadgeFill
                    className="inline ml-1 text-yellow-500"
                    title="Gold Verified"
                  />
                )}
                {userData.membership?.type === "PRO" && (
                  <IoDiamond
                    className="inline ml-1 text-blue-500"
                    title="Pro Member"
                  />
                )}
              </p>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {userData.bio}
            </p>

            <div className="mb-3">
              <div className="flex text-xl gap-4 items-center">
                <FaXTwitter
                  className="hover:text-blue-600 cursor-pointer transition-all text-black dark:text-white"
                  onClick={() => {
                    window.open(`https://x.com/${userData.twitter}`);
                  }}
                />
                <Separator orientation="vertical" className="h-6 bg-gray-300" />
                <FaLinkedin
                  className="hover:text-blue-600 cursor-pointer transition-all text-black dark:text-white"
                  onClick={() => {
                    window.open(userData.linkedIn || "https://linkedin.com");
                  }}
                />
                <Separator orientation="vertical" className="h-6 bg-gray-300" />
                <FaLink
                  className="hover:text-blue-600 cursor-pointer transition-all  text-black dark:text-white"
                  onClick={() => {
                    window.open(
                      userData.personalWebsite || "/humpe-to-hai-hi-naw"
                    );
                  }}
                />
              </div>
            </div>

            <div className="flex justify-center space-x-4 mb-4 text-black dark:text-white">
              <div>
                <span className="font-bold">{userData.stats.posts}</span> posts
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <div className="cursor-pointer">
                    <span className="font-bold">
                      {userData.stats.followers}
                    </span>{" "}
                    followers
                  </div>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Followers</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4 space-y-4">
                    {userData.followers.map((follower: any) => (
                      <div
                        key={follower.id}
                        className="flex items-center space-x-2"
                      >
                        <Avatar>
                          <AvatarImage
                            src={follower?.profilePicture || undefined}
                            alt={follower.name}
                          />
                          <AvatarFallback>
                            {follower.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{follower.name}</p>
                          <p className="text-sm text-gray-500">
                            {follower.bio}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
              <Sheet>
                <SheetTrigger asChild>
                  <div className="cursor-pointer">
                    <span className="font-bold">
                      {userData.stats.following}
                    </span>{" "}
                    following
                  </div>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Following</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4 space-y-4">
                    {userData.following.map((following: any) => (
                      <div
                        key={following.id}
                        className="flex items-center space-x-2"
                      >
                        <Avatar>
                          <AvatarImage
                            src={following.profilePicture || undefined}
                            alt={following.name}
                          />
                          <AvatarFallback>
                            {following.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{following.name}</p>
                          <p className="text-sm text-gray-500">
                            {following.bio}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </section>

        {/* Tabs for Posts and Likes */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="posts" onClick={() => setActiveTab("posts")}>
              <Grid className="mr-2" /> Posts
            </TabsTrigger>
            <TabsTrigger value="likes" onClick={() => setActiveTab("likes")}>
              <Heart className="mr-2" /> Likes
            </TabsTrigger>
          </TabsList>
          <TabsContent value="posts">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>
                      {post.content.substring(0, 100)}...
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {post.imageUrl && (
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        width={500}
                        height={300}
                        className="rounded-lg"
                      />
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      onClick={() => router.push(`/blog/${post.id}`)}
                      variant="link"
                    >
                      Read More
                    </Button>
                    <div className="flex items-center">
                      <Heart className="mr-2" /> {post.likes}
                      <MessageCircle className="ml-4 mr-2" /> {post.comments}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="likes">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userData.likes.map((like: any) => (
                <Card key={like.id}>
                  <CardHeader>
                    <CardTitle>{like.title}</CardTitle>
                    <CardDescription>{like.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {like.imageUrl && (
                      <Image
                        src={like.imageUrl}
                        alt={like.title}
                        width={500}
                        height={300}
                        className="rounded-lg"
                      />
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => router.push(`/blog/${like.id}`)}
                      variant="link"
                    >
                      Read More
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
