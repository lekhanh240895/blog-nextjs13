"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { openDeletePostModal } from "@/app/features/appSlice";
import { postSelector } from "@/app/redux/selector";
import { fetchPosts } from "@/app/features/postSlice";
import { AppDispatch } from "@/app/redux/store";

function PostsTable() {
  const { posts } = useSelector(postSelector);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  console.log({ posts });

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleEdit = (post: Post) => {
    router.push("/dashboard/post/" + post._id + "/edit");
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
            <td>
              {post.category?.title}{" "}
              {post.category?.parent ? `, ${post.category?.parent?.title}` : ""}
            </td>
            <td className="align-middle space-y-1 space-x-1 text-center">
              <button className="btn" onClick={() => handleEdit(post)}>
                Edit
              </button>
              <button
                className="btn"
                onClick={() => dispatch(openDeletePostModal(post))}
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
