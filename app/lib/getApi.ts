export const getData = async (
  name: string,
  query?: { [key: string]: string | number }
) => {
  try {
    const queryString = query
      ? Object.entries(query)
          .map(([key, value]) => `${key}=${value}`)
          .join("&")
      : "";
    const url = `http://localhost:3000/api/${name}${
      queryString ? `?${queryString}` : ""
    }`;
    const res = await fetch(url);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getPopularPosts = async () => {
  try {
    const url = `http://localhost:3000/api/posts/popular`;

    const res = await fetch(url);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateView = async (id: string) => {
  try {
    await fetch("http://localhost:3000/api/views/" + id, {
      method: "POST",
    });
  } catch (error) {
    console.log(error);
  }
};
