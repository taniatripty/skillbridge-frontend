
// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { toast } from "sonner";

// interface ProfileFormProps {
//   user: {
//     name: string;
//     email: string;
//     role: string;
//     image?: string | null;
//     phone?: string | null;
//   };
// }

// export default function ProfileForm({ user }: ProfileFormProps) {
//   const [form, setForm] = useState({
//     name: user.name,
//     email: user.email,
//     image: user.image || "",
//     phone: user.phone || "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);

//       const res = await fetch("http://localhost:5000/api/users/profile", {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include", // ✅ cookie auth
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data?.message || "Failed to update profile");
//       }

//       toast.success("Profile updated successfully 🎉");
//     } catch (error: any) {
//       toast.error(error.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-5">
//       {/* Name */}
//       <div className="space-y-1">
//         <Label htmlFor="name">Name</Label>
//         <Input
//           id="name"
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//         />
//       </div>

//       {/* Email */}
//       <div className="space-y-1">
//         <Label htmlFor="email">Email</Label>
//         <Input
//           id="email"
//           name="email"
//           value={form.email}
//           onChange={handleChange}
//         />
//       </div>

//       {/* Phone */}
//       <div className="space-y-1">
//         <Label htmlFor="phone">Phone</Label>
//         <Input
//           id="phone"
//           name="phone"
//           value={form.phone}
//           onChange={handleChange}
//         />
//       </div>

//       {/* Image */}
//       <div className="space-y-1">
//         <Label htmlFor="image">Profile Image URL</Label>
//         <Input
//           id="image"
//           name="image"
//           value={form.image}
//           onChange={handleChange}
//         />
//       </div>

//       {/* Role (Readonly) */}
//       <div className="space-y-1">
//         <Label>Role</Label>
//         <Input value={user.role} disabled />
//       </div>

//       <Button className="w-full" onClick={handleSubmit} disabled={loading}>
//         {loading ? "Updating..." : "Update Profile"}
//       </Button>
//     </div>
//   );
// }

// "use client";

// import { useRef, useState } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { toast } from "sonner";

// interface ProfileFormProps {
//   user: {
//     name: string;
//     email: string;
//     role: string;
//     image?: string | null;
//     phone?: string | null;
//   };
// }

// export default function ProfileForm({ user }: ProfileFormProps) {
//   const fileRef = useRef<HTMLInputElement>(null);

//   const [form, setForm] = useState({
//     name: user.name,
//     email: user.email,
//     phone: user.phone || "",
//     image: user.image || "",
//   });

//   const [uploading, setUploading] = useState(false);
//   const [saving, setSaving] = useState(false);

//   /* ---------------- Image Upload (imgBB) ---------------- */
//   const handleImageUpload = async (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setUploading(true);

//     try {
//       const formData = new FormData();
//       formData.append("image", file);

//       const res = await fetch(
//         `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const data = await res.json();

//       if (!data.success) {
//         throw new Error("Image upload failed");
//       }

//       setForm((prev) => ({
//         ...prev,
//         image: data.data.url,
//       }));

//       toast.success("Photo uploaded successfully");
//     } catch (err: any) {
//       toast.error(err.message || "Image upload failed");
//     } finally {
//       setUploading(false);
//     }
//   };

//   /* ---------------- Profile Update ---------------- */
//   const handleSubmit = async () => {
//     try {
//       setSaving(true);

//       const res = await fetch("http://localhost:5000/api/users/profile", {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data?.message || "Failed to update profile");
//       }

//       toast.success("Profile updated successfully 🎉");
//     } catch (err: any) {
//       toast.error(err.message || "Something went wrong");
//     } finally {
//       setSaving(false);
//     }
//   };

//   /* ---------------- UI ---------------- */
//   return (
//     <div className="max-w-xl mx-auto space-y-6">
//       {/* Profile Image */}
//       <div className="flex items-center gap-5">
//         <div className="relative h-24 w-24 rounded-full overflow-hidden border">
//           <Image
//             src={form.image || "/avatar.png"}
//             alt="Profile"
//             fill
//             className="object-cover"
//           />
//         </div>

//         {/* Hidden File Input */}
//         <Input
//           ref={fileRef}
//           type="file"
//           accept="image/*"
//           className="hidden"
//           onChange={handleImageUpload}
//         />

//         {/* CLICKABLE BUTTON (FIXED) */}
//         <Button
//           type="button"
//           variant="outline"
//           disabled={uploading}
//           onClick={() => fileRef.current?.click()}
//         >
//           {uploading ? "Uploading..." : "Change Photo"}
//         </Button>
//       </div>

//       {/* Name */}
//       <div className="space-y-1">
//         <Label>Name</Label>
//         <Input
//           value={form.name}
//           onChange={(e) =>
//             setForm({ ...form, name: e.target.value })
//           }
//         />
//       </div>

//       {/* Email */}
//       <div className="space-y-1">
//         <Label>Email</Label>
//         <Input
//           value={form.email}
//           onChange={(e) =>
//             setForm({ ...form, email: e.target.value })
//           }
//         />
//       </div>

//       {/* Phone */}
//       <div className="space-y-1">
//         <Label>Phone</Label>
//         <Input
//           value={form.phone}
//           onChange={(e) =>
//             setForm({ ...form, phone: e.target.value })
//           }
//         />
//       </div>

//       {/* Role */}
//       <div className="space-y-1">
//         <Label>Role</Label>
//         <Input value={user.role} disabled />
//       </div>

//       {/* Save */}
//       <Button
//         className="w-full"
//         disabled={saving}
//         onClick={handleSubmit}
//       >
//         {saving ? "Updating..." : "Update Profile"}
//       </Button>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
     
     
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error?.message || "Image upload failed");

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
      const res = await fetch("http://localhost:5000/api/users/profile", {
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
