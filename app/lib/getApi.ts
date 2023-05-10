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

export const getProductBySlug = async (slug: string) => {
  try {
    const res = await fetch("http://localhost:3000/api/products?slug=" + slug, {
      next: {
        revalidate: 5,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getOrders = async (id?: string) => {
  try {
    if (id) {
      const res = await fetch("http://localhost:3000/api/orders?id=" + id, {
        next: {
          revalidate: 5,
        },
      });
      return res.json();
    }
    const res = await fetch("http://localhost:3000/api/orders", {
      next: {
        revalidate: 5,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = async (query?: { [key: string]: string }) => {
  try {
    const queryString = query
      ? Object.entries(query)
          .map(([key, value]) => `${key}=${value}`)
          .join("&")
      : "";
    const url = `http://localhost:3000/api/posts${
      queryString ? `?${queryString}` : ""
    }`;
    const res = await fetch(url, {
      next: {
        revalidate: 5,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getComments = async (query?: { [key: string]: string }) => {
  try {
    const queryString = query
      ? Object.entries(query)
          .map(([key, value]) => `${key}=${value}`)
          .join("&")
      : "";
    const url = `http://localhost:3000/api/comments${
      queryString ? `?${queryString}` : ""
    }`;
    const res = await fetch(url, {
      next: {
        revalidate: 5,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
