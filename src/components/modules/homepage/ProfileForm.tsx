

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

interface ProfileFormProps {
  user: {
    name: string;
    email: string;
    role: string;
    image?: string | null;
    phone?: string | null;
  };
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    image: user.image || "",
    phone: user.phone || "",
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Handle text input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle file input change (image upload)
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();

      if (!res.ok)
        throw new Error(data.error?.message || "Image upload failed");

      setForm({ ...form, image: data.data.url });
      toast.success("Image uploaded successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  // Submit profile form
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/users/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Failed to update profile");

      toast.success("Profile updated successfully 🎉");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-xl shadow bg-background space-y-5">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>

      {/* Profile Image */}
      <div className="flex flex-col items-center">
        <label htmlFor="imageUpload" className="cursor-pointer">
          <img
            src={form.image || "/avatar.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
          />
          <p className="text-sm text-center mt-2 text-blue-600 hover:underline">
            {uploading ? "Uploading..." : "Click to change photo"}
          </p>
        </label>
        <input
          type="file"
          id="imageUpload"
          className="hidden"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      {/* Name */}
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      {/* Email */}
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      {/* Phone */}
      <div className="space-y-1">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
      </div>

      {/* Role */}
      <div className="space-y-1">
        <Label>Role</Label>
        <Input value={user.role} disabled />
      </div>

      <Button
        className="w-full"
        onClick={handleSubmit}
        disabled={loading || uploading}
      >
        {loading ? "Updating..." : "Update Profile"}
      </Button>
    </div>
  );
}
