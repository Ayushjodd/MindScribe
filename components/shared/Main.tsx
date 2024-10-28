"use client";
import React from "react";
import { Zap, Users, BookOpen } from "lucide-react";
import SpotlightCard from "./WhyChooseUs";
import PopularPosts from "./PopularPosts";
import Hero from "./Hero";
import StartJourney from "./StartJourney";

const cardData = [
  {
    title: "Easy to Use",
    description:
      "Our intuitive platform makes it simple to start writing and sharing your ideas with the world.",
    icon: <Zap size={40} />,
  },
  {
    title: "Vibrant Community",
    description:
      "Connect with like-minded individuals and grow your audience with our engaged community.",
    icon: <Users size={40} />,
  },
  {
    title: "Rich Content",
    description:
      "From articles to stories, our platform supports various content types to suit your creative needs.",
    icon: <BookOpen size={40} />,
  },
];

const Main = () => {
  return (
    <main className="flex-1 bg-white dark:bg-black">
      <Hero />

      <section className="bg-white dark:bg-black w-[80%] mx-auto px-10 py-5 md:py-24 lg:py-32 border-b justify-center items-center rounded-2xl">
        <div className="container px-4 md:px-6 bg-white dark:bg-black">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center text-black  mb-12 dark:text-white">
            Why Choose Us?
          </h2>
          <SpotlightCard cards={cardData} />
        </div>
      </section>

      <PopularPosts />

      <StartJourney />
    </main>
  );
};

export default Main;
