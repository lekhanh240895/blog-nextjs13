export const getPosts = async (id?: string) => {
  try {
    if (id) {
      const res = await fetch("http://localhost:3000/api/posts?id=" + id, {
        next: {
          revalidate: 5,
        },
      });
      return res.json();
    }

    const res = await fetch("http://localhost:3000/api/posts", {
      next: {
        revalidate: 5,
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
        revalidate: 5,
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
        revalidate: 5,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryBySlug = async (slug: string) => {
  try {
    const res = await fetch(
      "http://localhost:3000/api/categories?slug=" + slug,
      {
        next: {
          revalidate: 5,
        },
      }
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async (id?: string) => {
  try {
    if (id) {
      const res = await fetch("http://localhost:3000/api/products?id=" + id, {
        next: {
          revalidate: 5,
        },
      });
      return res.json();
    }
    const res = await fetch("http://localhost:3000/api/products", {
      next: {
        revalidate: 5,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
