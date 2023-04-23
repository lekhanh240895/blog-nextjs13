export const toDate = (time: string) => {
  const date = new Date(time).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return date;
};
