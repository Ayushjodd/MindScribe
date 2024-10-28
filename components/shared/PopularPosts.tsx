import React from "react";
import { MagicCard } from "../magicui/MagicCard";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HoverEffect } from "../ui/card-hover-effect";

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

const PopularPosts = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto text-center px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-black dark:text-white">
          Popular Posts
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-center">
          {posts.map((post) => (
            <MagicCard
              key={post.id}
              className="dark:bg-[#0d1016] transition-transform duration-300 hover:scale-105"
            >
              <img
                src={
                  post.imageUrl ||
                  "https://images.unsplash.com/photo-1556983703-27576e5afa24?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8fA%3D%3D"
                }
                alt="Blog post thumbnail"
                width={400}
                height={200}
                className="w-full h-48 object-cover rounded-t-md"
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
  );
};

export default PopularPosts;
