/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import NavBar from "@/components/shared/NavBar";
import axios from "axios";

export default function BlogPublisher() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState(""); // New state for category
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/blogs/publish", {
        title,
        description: content.substring(0, 150),
        content,
        author,
        category, // Include category in the request
        published: true,
      });

      if (response.data.success) {
        toast({
          title: "Blog post published!",
          description: "Your blog post has been successfully published.",
        });

        setTitle("");
        setContent("");
        setAuthor("");
        setCategory(""); // Reset category
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
      <NavBar />
      <div className="container mx-auto px-4 py-8">
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
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="Health">Health</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                        </SelectContent>
                      </Select>
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
