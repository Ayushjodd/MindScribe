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
import { Grid, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import NavBar from "@/components/shared/NavBar";
import { useParams, useRouter } from "next/navigation";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";

interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  imageUrl: string;
  profilePicture: string | null;
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
  comments: number; // Add comments if needed
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
        const response = await axios.get<User>(`/api/get-user-info/${id}`);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!userData) return <div>No user data available</div>; // Handle case where userData is null

  const { posts } = userData;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        {/* Profile Section */}
        <section className="mb-8">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage
                src={
                  userData.imageUrl ||
                  "https://i.pinimg.com/236x/5d/62/2f/5d622fd1e10c8a79b3ea7851835989c8.jpg"
                }
                alt={userData.name || "User Avatar"}
              />
            </Avatar>
            <h2 className="text-2xl font-bold mb-2">{userData.name}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {userData.bio}
            </p>

            <div className="mb-3">
              <div className="flex text-xl gap-4 items-center">
                <FaXTwitter
                  className="hover:text-blue-600 cursor-pointer "
                  onClick={() => {
                    window.open(`https://x.com/${userData.twitter}`);
                  }}
                />
                <Separator orientation="vertical" className="h-6 bg-gray-300" />{" "}
                <FaLinkedin
                  className="hover:text-blue-600 cursor-pointer "
                  onClick={() => {
                    window.open(userData.linkedIn || "https://linkedin.com");
                  }}
                />
                <Separator orientation="vertical" className="h-6 bg-gray-300" />{" "}
                <FaLink
                  className="hover:text-blue-600 cursor-pointer "
                  onClick={() => {
                    window.open(
                      userData.personalWebsite || "/humpe-to-hai-hi-naw"
                    );
                  }}
                />
              </div>
            </div>

            <div className="flex justify-center space-x-4 mb-4">
              <div>
                <span className="font-bold">{userData.stats.posts}</span> posts
              </div>
              <div>
                <span className="font-bold">{userData.stats.followers}</span>{" "}
                followers
              </div>
              <div>
                <span className="font-bold">{userData.stats.following}</span>{" "}
                following
              </div>
            </div>
          </div>
        </section>

        {/* Tabs for Posts */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="posts" onClick={() => setActiveTab("posts")}>
              <Grid className="mr-2" /> Posts
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
                    <CardDescription>{like.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src={like.image || "/placeholder.svg"}
                      alt={like.title}
                      width={500}
                      height={300}
                      className="rounded-lg"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
