/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Zap, Users, BookOpen } from "lucide-react";

const Main = () => {
  return (
    <main className="flex-1 ">
      <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-32 min-h-screen flex items-center">
        <img
          src={
            "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="Hero background"
          className=" rounded-2xl ml-32"
          height={600}
          width={600}
          style={{ filter: "brightness(1.1)" }}
        />
        <div className="container relative z-10 px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-white">
                Welcome to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600 animate-gradient-x">
                  MindScribe
                </span>
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl lg:text-2xl">
                Discover, write, and connect with a community of passionate
                readers and writers.
              </p>
            </div>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-200"
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-black"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <svg
            xmlns=""
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white animate-bounce"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </section>
      <section className="w-[80%] mx-auto px-10 py-5 md:py-24 lg:py-32 bg-[#3b3b3b] justify-center items-center rounded-2xl">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center  mb-12 dark:text-white">
            Why Choose Us?
          </h2>
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <Card>
              <CardHeader>
                <Zap className="w-8 h-8 mb-2" />
                <CardTitle>Easy to Use</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Our intuitive platform makes it simple to start writing and
                  sharing your ideas with the world.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Users className="w-8 h-8 mb-2" />
                <CardTitle>Vibrant Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Connect with like-minded individuals and grow your audience
                  with our engaged community.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <BookOpen className="w-8 h-8 mb-2" />
                <CardTitle>Rich Content</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  From articles to stories, our platform supports various
                  content types to suit your creative needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto text-center px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
            Popular Posts
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-center ">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card className="dark:bg-[#0d1016]" key={i}>
                <Image
                  src={``}
                  alt="Blog post thumbnail"
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle>The Future of AI in Writing</CardTitle>
                  <CardDescription>By John Doe • 5 min read</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Explore how artificial intelligence is revolutionizing the
                    writing industry and what it means for authors.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-black">
        <div className="container mx-auto text-center px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px] justify-center">
            <img
              src="https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Blogging illustration"
              width={550}
              height={550}
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Start Your Writing Journey Today
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  Join thousands of writers who have found their voice on our
                  platform. It’s free to get started!
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2 mx-auto">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit">Sign Up</Button>
                </form>
                <p className="text-xs text-gray-500">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Main;
