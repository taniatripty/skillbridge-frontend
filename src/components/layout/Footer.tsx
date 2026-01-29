"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
} from "lucide-react";

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
      <div className="container py-16">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">
              SkillBridge
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Bridging the gap between learning and real-world skills.
              Learn. Build. Grow.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">
              Platform
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/courses" className="hover:text-foreground">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-foreground">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/mentors" className="hover:text-foreground">
                  Mentors
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-foreground">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-foreground">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">
              Connect
            </h4>
            <div className="flex items-center gap-4">
              <Link
                href="https://github.com"
                className="text-muted-foreground hover:text-foreground"
              >
                <Github className="size-5" />
              </Link>
              <Link
                href="https://twitter.com"
                className="text-muted-foreground hover:text-foreground"
              >
                <Twitter className="size-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                className="text-muted-foreground hover:text-foreground"
              >
                <Linkedin className="size-5" />
              </Link>
              <Link
                href="mailto:support@skillbridge.com"
                className="text-muted-foreground hover:text-foreground"
              >
                <Mail className="size-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} SkillBridge. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
