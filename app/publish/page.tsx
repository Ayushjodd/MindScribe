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
import { toast, useToast } from "../../hooks/use-toast";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NavBar from "@/components/shared/NavBar";
import axios from "axios";
import confetti from "canvas-confetti";
import { Toaster } from "@/components/ui/toaster";

export default function BlogPublisher() {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [showConfetti, setShowConfetti] = useState(false);

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

    if (!title || !content || !author || !category || !imageUrl) {
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
                      <Label htmlFor="author">Author</Label>
                      <Input
                        id="author"
                        placeholder="Your name"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
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
                      <UploadButton<OurFileRouter>
                        endpoint="imageUploader"
                        onClientUploadComplete={(res: any) => {
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
            <Card>
              <CardHeader>
                <CardTitle>{title || "Your Blog Title"}</CardTitle>
                <CardDescription>
                  By {author || "Author Name"} in {category || "Category"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Cover"
                    className="mb-4 max-w-full rounded"
                  />
                )}
                {content ? (
                  <div className="prose max-w-none">
                    {content.split("\n").map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Preview</AlertTitle>
                    <AlertDescription>
                      Your blog content will appear here. Start writing in the
                      "Write" tab to see a preview.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
