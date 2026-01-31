
"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

  // Fetch subjects/categories from backend
  useEffect(() => {
    fetch(`http://localhost:5000/api/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data.data))
      .catch(() => alert("Failed to load categories"));
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
      const res = await fetch(`http://localhost:5000/api/tutor`, {
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
      console.log(result);

      if (!res.ok) {
        throw new Error(result.message || "Failed to submit");
      }

      alert("Tutor profile created successfully!");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-xl shadow bg-background dark:bg-gray-900">
      <h2 className="text-2xl font-semibold mb-6 text-foreground dark:text-white">
        Become a Tutor
      </h2>

      {/* User Info */}
      <div className="mb-6 space-y-4">
        <div>
          <p className="text-sm font-medium text-foreground dark:text-white">
            Name
          </p>
          <Input value={user.name} readOnly className="bg-gray-100 dark:bg-gray-800" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground dark:text-white">
            Email
          </p>
          <Input value={user.email} readOnly className="bg-gray-100 dark:bg-gray-800" />
        </div>
      </div>

      {/* Tutor Form */}
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
          type="text"
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
          <p className="font-medium mb-2 text-foreground dark:text-white">
            Select Subjects
          </p>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <label
                key={cat.id}
                className="flex items-center gap-2 text-foreground dark:text-white"
              >
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
