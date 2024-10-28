import React from "react";
import { RainbowButton } from "../magicui/RaindowButton";
import { useRouter } from "next/navigation";
import { ArrowRightIcon } from "lucide-react";
import Safari from "../ui/safari";
import { BorderBeam } from "../ui/BorderBeam";
import BlurIn from "../ui/blur-in";

const Hero = () => {
  const router = useRouter();

  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-32 min-h-screen flex items-center justify-center dark:bg-black bg-white">
      <div className="container relative z-10 px-4 md:px-6 mt-32">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className=" text-4xl font-bold sm:text-5xl md:text-6xl lg:text-8xl/none tracking-tight text-black dark:text-white whitespace-nowrap ">
              Welcome to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600 animate-gradient-x">
                <BlurIn
                  className="lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600 animate-gradient-x inline-block"
                  word="MindScribe"
                />
              </span>
            </h1>
            <p className="mx-auto max-w-[700px] text-[#9ea3ae] md:text-xl lg:text-2xl pt-3 pb-8">
              Discover, write, and connect with a community of passionate
              readers and writers.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-0 sm:space-x-4 pb-32">
            <RainbowButton
              onClick={() => {
                router.push("/blogs");
              }}
            >
              Start Reading
              <span>
                <ArrowRightIcon className="ml-1 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </span>
            </RainbowButton>
          </div>

          <div className="relative w-full flex justify-center mt-48">
            <div className="relative">
              <Safari
                url="MindScribe.com"
                className="size-full"
                src="https://utfs.io/f/cHapAD391eLrRiwyNm9u78uQHsKvdS9MGXE6xZfnBitq5W1c"
              />

              <BorderBeam
                className="rounded-lg"
                size={250}
                duration={12}
                delay={9}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
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
  );
};

export default Hero;
