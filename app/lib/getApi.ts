export const getData = async (
  name: string,
  query?: { [key: string]: string }
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
