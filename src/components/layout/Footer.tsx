
"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Github, Linkedin, Mail } from "lucide-react";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  return (
    <footer
      className={cn(
        "border-t border-border bg-background",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Brand */}
          <div className="text-center md:text-left">
            <Link
              href="/"
              className="text-xl font-bold text-foreground"
            >
              SkillBridge
            </Link>

            <p className="mt-2 text-sm text-muted-foreground">
              Bridging the gap between learning and real-world skills.
            </p>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-5 text-sm">
            <Link
              href="/"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Home
            </Link>

            <Link
              href="/about"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </Link>

           
          </nav>

          {/* Social */}
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="size-5" />
            </Link>

            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Linkedin className="size-5" />
            </Link>

            <Link
              href="mailto:support@skillbridge.com"
              aria-label="Email"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="size-5" />
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-border pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SkillBridge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export { Footer };

