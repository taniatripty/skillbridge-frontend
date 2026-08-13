"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://skillbridge-backend-nine.vercel.app";

export default function CreateCategory() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/v1/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 🔥 Important for cookies
        body: JSON.stringify({ name }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create category");
      }

      toast.success("Category created successfully", {
        description: `Category "${data.data.name}" added`,
      });

      setName("");
    } catch (error: any) {
      toast.error("Failed to create category", {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-9/12 mx-auto mt-10 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Create Category</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Enter category name (e.g. Math)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create Category"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
