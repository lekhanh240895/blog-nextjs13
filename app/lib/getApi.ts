export const getPosts = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/posts", {
      next: {
        revalidate: 30,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/categories", {
      next: {
        revalidate: 30,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getPostBySlug = async (slug: string) => {
  try {
    const res = await fetch("http://localhost:3000/api/posts?slug=" + slug, {
      next: {
        revalidate: 30,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
