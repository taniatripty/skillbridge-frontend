export const categoryServices = {
  getAllCategories: async () => {
    const res = await fetch("http://localhost:8080/api/v1/categories", {
      cache: "no-store",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    return res.json();
  },
};
