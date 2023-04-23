import Link from "next/link";

export default async function Posts() {
  const res = await fetch("http://localhost:3000/api/posts", {
    next: {
      revalidate: 30,
    },
  });
  const posts: Post[] = await res.json();
  console.log({ posts });
  return (
    <main>
      <h2 className="text-3xl text-blue-900 uppercase mb-4">Posts</h2>

      <Link
        href="/dashboard/posts/create"
        className="btn btn-primary inline-block mb-4"
      >
        Create new post
      </Link>

      <table>
        <thead>
          <tr>
            {posts.map((post) => (
              <th key={post._id}>{post.title}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
