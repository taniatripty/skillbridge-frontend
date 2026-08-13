export const categoryServices = {
  getAllCategories: async () => {
    const res = await fetch(
      "https://skillbridge-backend-nine.vercel.app/api/v1/categories",
      {
        cache: "no-store",
        credentials: "include",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    return res.json();
  },
};
