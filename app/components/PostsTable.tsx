"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function PostsTable() {
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  const fetchPost = async () => {
    const res = await axios.get("/api/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const handleEdit = (post: Post) => {
    router.push("/dashboard/post/" + post._id + "/edit");
  };

  const handleDelete = async (id: string) => {
    await axios.delete("/api/posts?id=" + id);
    fetchPost();
  };

  return (
    <table className="basic table-auto">
      <thead>
        <tr>
          <th>Name</th>
          <th>Categories</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {posts.map((post) => (
          <tr key={post._id}>
            <td>{post.title}</td>
            <td>Love</td>
            <td className="align-middle space-y-1 space-x-1 text-center">
              <button className="btn grow" onClick={() => handleEdit(post)}>
                Edit
              </button>
              <button
                className="btn grow"
                onClick={() => handleDelete(post._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PostsTable;
