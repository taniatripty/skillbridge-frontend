export const categoryServices = {
  getAllCategories: async () => {
    const res = await fetch("http://localhost:5000/api/categories", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    return res.json();
  },
};
