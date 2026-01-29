


"use client";

import { ArrowDownRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface HeroProps {
  heading?: string;
  description?: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
      className?: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  reviews?: {
    count: number;
    avatars: {
      src: string;
      alt: string;
    }[];
    rating?: number;
  };
  className?: string;
}

const Hero = ({
  heading = "Level Up Your Skills with SkillBridge",
  description = "Join thousands of learners and professionals enhancing their skills through curated courses, projects, and expert guidance.",
  buttons = {
    primary: {
      text: "Get Started",
      url: "/signup",
    },
    secondary: {
      text: "Learn More",
      url: "/about",
    },
  },
  reviews = {
    count: 1200,
    rating: 4.8,
    avatars: [
      {
        src: "https://randomuser.me/api/portraits/women/68.jpg",
        alt: "Avatar 1",
      },
      {
        src: "https://randomuser.me/api/portraits/men/45.jpg",
        alt: "Avatar 2",
      },
      {
        src: "https://randomuser.me/api/portraits/women/12.jpg",
        alt: "Avatar 3",
      },
      {
        src: "https://randomuser.me/api/portraits/men/33.jpg",
        alt: "Avatar 4",
      },
      {
        src: "https://randomuser.me/api/portraits/women/21.jpg",
        alt: "Avatar 5",
      },
    ],
  },
  className,
}: HeroProps) => {
  return (
    <section
      className={cn(
        "relative  bg-background dark:bg-background/80",
        className
      )}
    >
      <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        {/* Left content */}
        <div className="mx-auto flex flex-col items-center text-center md:ml-auto lg:max-w-3xl lg:items-start lg:text-left">
          <h1 className="my-6 text-4xl font-bold text-foreground lg:text-6xl xl:text-7xl">
            {heading}
          </h1>
          <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
            {description}
          </p>

          {/* Reviews */}
          <div className="mb-12 flex w-fit flex-col items-center gap-4 sm:flex-row">
            <span className="inline-flex items-center -space-x-4">
              {reviews.avatars.map((avatar, index) => (
                <Avatar key={index} className="size-12 border border-border">
                  <AvatarImage src={avatar.src} alt={avatar.alt} />
                </Avatar>
              ))}
            </span>
            <div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className="size-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="ml-1 font-semibold">
                  {reviews.rating?.toFixed(1)}
                </span>
              </div>
              <p className="text-left font-medium text-muted-foreground">
                from {reviews.count}+ learners
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
            {buttons.primary && (
              <Button asChild className="w-full sm:w-auto">
                <a href={buttons.primary.url}>{buttons.primary.text}</a>
              </Button>
            )}
            {buttons.secondary && (
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <a href={buttons.secondary.url} className="flex items-center gap-2">
                  {buttons.secondary.text}
                  <ArrowDownRight className="size-4" />
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Right image */}
        <div className="relative flex justify-center">
          <Image
            src="/banner.jpg" // Replace with your hero image path
            alt="SkillBridge hero"
            width={800}
            height={800}
            className="max-h-[600px] w-full rounded-md object-cover lg:max-h-[800px]"
          />
          {/* Optional dark overlay for better contrast */}
          <div className="absolute inset-0 rounded-md bg-background/30 dark:bg-background/60" />
        </div>
      </div>
    </section>
  );
};

export { Hero };
