"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

interface AboutSectionProps {
  heading?: string;
  description?: string;
  features?: { title: string; description: string }[];
  className?: string;
}

const AboutSection = ({
  heading = "Empowering Learners, Connecting Opportunities",
  description = "SkillBridge is a modern learning platform designed to bridge the gap between knowledge and real-world skills. Our mission is to help learners unlock their potential and connect with opportunities through curated courses, practical projects, and expert guidance.",
  features = [
    { title: "Curated Courses", description: "Access high-quality courses handpicked by industry experts." },
    { title: "Hands-On Projects", description: "Apply your knowledge through real-world projects." },
    { title: "Expert Mentorship", description: "Learn directly from professionals guiding your growth." },
    { title: "Community Support", description: "Join a thriving community of learners and mentors." },
  ],
  className,
}: AboutSectionProps) => {
  return (
    <section className={cn("py-32 bg-background dark:bg-background/90", className)}>
      <div className="container grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-24">
        {/* Left: Image */}
        <div className="relative w-full h-80 sm:h-[400px] lg:h-[500px]">
          <Image
            src="/aboutsection.jpg" 
            alt="About SkillBridge"
            fill
            className="rounded-xl object-cover shadow-lg"
          />
        </div>

        {/* Right: Text content */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-6">
          <h2 className="text-4xl font-bold text-foreground lg:text-5xl">{heading}</h2>
          <p className="max-w-xl text-muted-foreground lg:text-lg">{description}</p>

          {/* Features */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border border-border bg-card dark:bg-card-dark shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <CardHeader className="flex items-center gap-3">
                  <CheckCircle className="size-5 text-primary" />
                  <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button asChild>
              <a href="/signup">Join SkillBridge</a>
            </Button>
            <Button asChild variant="outline">
              <a href="/courses">Explore Courses</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { AboutSection };