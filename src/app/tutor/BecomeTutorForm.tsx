

"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Category = {
  id: string;
  name: string;
};

export default function BecomeTutorForm({
  user,
}: {
  user: { name: string; email: string };
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    experience: "",
    education: "",
    hourlyRate: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.data))
      .catch(() => toast.error("Failed to load categories"));
  }, []);

  const toggleCategory = (name: string) => {
    setSelectedCategories((prev) =>
      prev.includes(name)
        ? prev.filter((c) => c !== name)
        : [...prev, name]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          experience: Number(formData.experience),
          education: formData.education,
          hourlyRate: Number(formData.hourlyRate),
          subjects: selectedCategories,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to submit");
      }

      toast.success("Tutor profile created successfully ", {
        description: "You can now start accepting bookings.",
      });

      // optional reset
      setFormData({ experience: "", education: "", hourlyRate: "" });
      setSelectedCategories([]);
    } catch (err: any) {
      toast.error("Something went wrong", {
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-xl shadow bg-background">
      <h2 className="text-2xl font-semibold mb-6">Become a Tutor</h2>

      {/* User Info */}
      <div className="mb-6 space-y-4">
        <Input value={user.name} readOnly />
        <Input value={user.email} readOnly />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="number"
          placeholder="Experience (years)"
          value={formData.experience}
          onChange={(e) =>
            setFormData({ ...formData, experience: e.target.value })
          }
          required
        />

        <Input
          placeholder="Education"
          value={formData.education}
          onChange={(e) =>
            setFormData({ ...formData, education: e.target.value })
          }
          required
        />

        <Input
          type="number"
          placeholder="Hourly Rate"
          value={formData.hourlyRate}
          onChange={(e) =>
            setFormData({ ...formData, hourlyRate: e.target.value })
          }
          required
        />

        {/* Subjects */}
        <div>
          <p className="font-medium mb-2">Select Subjects</p>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <label key={cat.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.name)}
                  onChange={() => toggleCategory(cat.name)}
                  className="accent-blue-600"
                />
                {cat.name}
              </label>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Submitting..." : "Become a Tutor"}
        </Button>
      </form>
    </div>
  );
}
