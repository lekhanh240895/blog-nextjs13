import BlogList from "../components/BlogList";
import { getPosts } from "../lib/getApi";

export default async function Home() {
  const posts = await getPosts();

  if (!posts) return;

  return (
    <main>
      <BlogList posts={posts} />
    </main>
  );
}
