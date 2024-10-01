"use client";
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Link from "next/link";
import { RainbowButton } from "../magicui/RaindowButton";
import { MagicCard } from "../magicui/MagicCard";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Zap, Users, BookOpen } from "lucide-react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

const posts = [
  {
    id: 1,
    title: "The Future of AI in Writing",
    description: "By John Doe • 5 min read",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content:
      "Explore how artificial intelligence is revolutionizing the writing industry and what it means for authors.",
  },
  {
    id: 2,
    title: "Mastering the Art of Remote Work",
    description: "By Jane Smith • 7 min read",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1664193968929-d9d9544296e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVtb3RlJTIwd29ya3xlbnwwfHwwfHx8MA%3D%3D",
    content:
      "Discover essential tips and tools for becoming a productive remote worker in the modern age.",
  },
  {
    id: 3,
    title: "Building Resilience in the Age of Change",
    description: "By Alex Lee • 6 min read",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1661762503491-815404e48a7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3RyYXRlZ3l8ZW58MHx8MHx8fDA%3D",
    content:
      "Learn strategies to stay resilient and adapt to constant change in a fast-paced world.",
  },
  {
    id: 4,
    title: "The Ultimate Guide to Minimalist Living",
    description: "By Emily Clark • 4 min read",
    imageUrl:
      "https://media.istockphoto.com/id/1292399474/photo/woman-meditating-at-park.webp?a=1&b=1&s=612x612&w=0&k=20&c=f65oRoFPmvElvTIAzHv6tDu8gkeea-nOoctcdF8CSok=",
    content:
      "Embrace simplicity and declutter your life with this complete guide to minimalist living.",
  },
  {
    id: 5,
    title: "Why Blockchain is the Future of Finance",
    description: "By Michael Chang • 8 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1694219782948-afcab5c095d3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvY2tjaGFpbiUyMHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D",
    content:
      "Understand how blockchain technology is transforming the financial industry and what the future holds.",
  },
  {
    id: 6,
    title: "Sustainable Tech: A Path to Greener Future",
    description: "By Sarah Green • 6 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D",
    content:
      "Explore how sustainable technology is paving the way towards an environmentally friendly future.",
  },
];

const Main = () => {
  const router = useRouter();
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
              <RainbowButton
                onClick={() => {
                  router.push("/blogs");
                }}
              >
                Start Reading
                <span>
                  <ArrowRightIcon className="ml-1 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5 " />
                </span>
              </RainbowButton>
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
      <section className="w-[80%] mx-auto px-10 py-5 md:py-24 lg:py-32 border-b justify-center items-center rounded-2xl">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center  mb-12 dark:text-white">
            Why Choose Us?
          </h2>
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12 ">
            <MagicCard>
              <div className="p-4 ">
                <Zap className="w-8 h-8 mb-2" />
                <h3 className="text-xl font-bold">Easy to Use</h3>
                <p>
                  Our intuitive platform makes it simple to start writing and
                  sharing your ideas with the world.
                </p>
              </div>
            </MagicCard>
            <MagicCard>
              <div className="p-4">
                <Users className="w-8 h-8 mb-2" />
                <h3 className="text-xl font-bold">Vibrant Community</h3>
                <p>
                  Connect with like-minded individuals and grow your audience
                  with our engaged community.
                </p>
              </div>
            </MagicCard>
            <MagicCard>
              <div className="p-4">
                <BookOpen className="w-8 h-8 mb-2" />
                <h3 className="text-xl font-bold">Rich Content</h3>
                <p>
                  From articles to stories, our platform supports various
                  content types to suit your creative needs.
                </p>
              </div>
            </MagicCard>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto text-center px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
            Popular Posts
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-center ">
            {posts.map((post) => (
              <MagicCard key={post.id} className="dark:bg-[#0d1016]">
                <img
                  src={
                    post.imageUrl ||
                    "https://images.unsplash.com/photo-1556983703-27576e5afa24?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8fA%3D%3D"
                  }
                  alt="Blog post thumbnail"
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>{post.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{post.content}</p>
                </CardContent>
              </MagicCard>
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
