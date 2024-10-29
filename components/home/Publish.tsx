/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "../../hooks/use-toast";
import { Bookmark, Heart } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NavBar from "@/components/shared/NavBar";
import axios from "axios";
import confetti from "canvas-confetti";
import { Toaster } from "@/components/ui/toaster";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useSession } from "next-auth/react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { IoDiamond } from "react-icons/io5";

export default function BlogPublisher() {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [showConfetti, setShowConfetti] = useState(false);
  const session = useSession();
  const [userData, setUserData] = useState<any>();
  const [loading, setLoading] = useState(true);

  if (session.status !== "authenticated") {
    return;
  }

  useEffect(() => {
    if (showConfetti) {
      const colors = ["#bb0000", "#ffffff"];
      let animationFrame: number;

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          startVelocity: 60,
          origin: { x: 0, y: 0.5 },
          colors: colors,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          startVelocity: 60,
          origin: { x: 1, y: 0.5 },
          colors: colors,
        });

        animationFrame = requestAnimationFrame(frame);
      };

      frame();

      setTimeout(() => {
        cancelAnimationFrame(animationFrame);
        setShowConfetti(false);
      }, 4000);
    }
  }, [showConfetti]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content || !category || !imageUrl) {
      toast({
        title: "All fields are required",
        description: "Please fill out all the fields before publishing.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/blogs/publish", {
        title,
        description: content.substring(0, 150),
        content,
        author,
        category,
        published: true,
        imageUrl,
      });

      if (response.data.success) {
        toast({
          title: "Blog post published!",
          description: "Your blog post has been successfully published.",
        });

        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);

        setTitle("");
        setContent("");
        setAuthor("");
        setCategory("");
        setImageUrl("");
      } else {
        toast({
          title: "Error",
          description: response.data.message || "Failed to publish blog.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while publishing the blog.",
        variant: "destructive",
      });
      console.error("Error publishing blog:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/user/get-user-info/${session.data?.user.id}`
        );
        console.log(response);
        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    if (session.data?.user.id) {
      fetchData();
    }
  }, [session.data?.user.id]);

  if (loading) {
    return;
  }

  return (
    <>
      <Toaster />
      <NavBar />

      <div className="container mx-auto px-4 py-8">
        {showConfetti && <div id="confetti" />}
        <h1 className="text-3xl font-bold mb-8">Publish Your Blog</h1>
        <Tabs defaultValue="write">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="write">
            <Card>
              <CardHeader>
                <CardTitle>Create a new blog post</CardTitle>
                <CardDescription>
                  Fill in the details of your blog post here.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter your blog title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        placeholder="Write your blog content here"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="min-h-[200px]"
                      />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        onValueChange={(value: string) => setCategory(value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="Health">Health</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Politics">Politics</SelectItem>
                          <SelectItem value="Sports">Sports</SelectItem>
                          <SelectItem value="Geopolitics">
                            Geopolitics
                          </SelectItem>
                          <SelectItem value="Programming">
                            Programming
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label className="text-center" htmlFor="image">
                        Cover Image
                      </Label>
                      <UploadButton<OurFileRouter, "imageUploader">
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          setImageUrl(res?.[0]?.url || "");
                          toast({
                            title: "Image uploaded successfully",
                            description: "Your cover image has been uploaded.",
                          });
                        }}
                        onUploadError={(error: Error) => {
                          toast({
                            title: "Error uploading image",
                            description: error.message,
                            variant: "destructive",
                          });
                        }}
                      />
                      {imageUrl && (
                        <img
                          src={imageUrl}
                          alt="Cover"
                          className="mt-2 max-w-xs rounded"
                        />
                      )}
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Save Draft</Button>
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Publishing..." : "Publish"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="preview">
            <div className="">
              <Card className="overflow-hidden lg:flex">
                <div className="w-full">
                  <div className="w-full h-96 flex text-gray-500">
                    <img
                      src={
                        imageUrl ||
                        "https://i.pinimg.com/236x/d4/b9/e2/d4b9e26d2227182276017e4a39eedaed.jpg"
                      }
                      alt={title || "Your Blog Title"}
                    />
                  </div>
                </div>

                <div className="w-full p-4">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">
                        {category || "Category"}
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <Bookmark className={"h-5 w-5 z-40 text-gray-500"} />
                      </Button>
                    </div>
                    <CardTitle className="text-3xl font-bold mb-2">
                      {title || "Your Blog Title"}
                    </CardTitle>
                    <CardDescription>
                      {content
                        ? content.split(" ").slice(0, 27).join(" ") +
                          (content.split(" ").length > 27 ? "..." : "")
                        : "A brief description of the blog post."}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage
                          className="w-10"
                          src={userData?.profilePicture}
                        />
                        <AvatarFallback>
                          {userData?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p
                          className={`text-sm font-medium ${
                            userData?.membership.type === "ADVANCE"
                              ? "text-yellow-500"
                              : userData?.membership.type === "PRO"
                              ? "text-blue-500"
                              : "text-white"
                          }`}
                        >
                          {userData?.name || "Author Name"}
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
                        <p className="text-xs text-gray-500">{"69/69/6969"}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center space-x-4">
                      <Heart className="h-5 w-5 text-gray-500" />
                    </div>
                    <Button className="z-40" variant="default" size="lg">
                      Read More
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
