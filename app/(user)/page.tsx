import BlogList from "../components/BlogList";
import { getData } from "../lib/getApi";

export default async function Home() {
  const posts = await getData("posts");

  if (!posts) return;

  return (
    <section>
      <BlogList posts={posts} />
    </section>
  );
}
