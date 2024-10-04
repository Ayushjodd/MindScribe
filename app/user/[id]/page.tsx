"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Grid, Heart, MessageCircle, Calendar } from "lucide-react";
import Image from "next/image";
import NavBar from "@/components/shared/NavBar";
import { useParams } from "next/navigation";

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState("posts");
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [userLikes, setUserLikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { userId } = useParams();

  // Fetch data from APIs using axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [profileRes, postsRes, likesRes] = await Promise.all([
          axios.get("/api/user/profile"),
          axios.get("/api/get-user-posts"),
          axios.get("/api/user/likes"),
        ]);

        setUserProfile(profileRes.data);
        setUserPosts(postsRes.data);
        setUserLikes(likesRes.data);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        {/* Profile Section */}
        <section className="mb-8">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage
                src={userProfile?.profileImage || "/placeholder.svg"}
                alt={userProfile?.name}
              />
              <AvatarFallback>{userProfile?.name?.[0]}</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold mb-2">{userProfile?.name}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {userProfile?.bio}
            </p>
            <div className="flex justify-center space-x-4 mb-4">
              <div>
                <span className="font-bold">{userProfile?.postsCount}</span>{" "}
                posts
              </div>
              <div>
                <span className="font-bold">{userProfile?.followersCount}</span>{" "}
                followers
              </div>
              <div>
                <span className="font-bold">{userProfile?.followingCount}</span>{" "}
                following
              </div>
            </div>
            <div className="flex space-x-2">
              <Button>Edit Profile</Button>
              <Button variant="outline">Share Profile</Button>
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
              {userPosts.map((post) => (
                <Card key={post.id}>
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={500}
                      height={300}
                      className="rounded-lg"
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="link">Read More</Button>
                    <Button variant="outline" className="flex items-center">
                      <MessageCircle className="mr-2" /> {post.commentsCount}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="likes">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userLikes.map((like) => (
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
