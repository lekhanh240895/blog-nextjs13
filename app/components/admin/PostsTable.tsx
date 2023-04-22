"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { openDeletePostModal } from "@/app/features/appSlice";
import { postSelector } from "@/app/redux/selector";
import { AppDispatch } from "@/app/redux/store";
import { useEffect } from "react";
import { fetchPosts } from "@/app/features/postSlice";

function PostsTable() {
  const { posts } = useSelector(postSelector);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleEdit = (post: Post) => {
    router.push("/dashboard/posts/" + post._id + "/edit");
  };

  return (
    <div className="overflow-x-auto">
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
              <td className="min-w-[160px]">{post.title}</td>
              <td>
                {post.category?.title}{" "}
                {post.category?.parent
                  ? `, ${post.category?.parent?.title}`
                  : ""}
              </td>
              <td className="min-w-[160px] flex flex-col gap-2">
                <button className="btn" onClick={() => handleEdit(post)}>
                  Edit
                </button>
                <button
                  className="btn"
                  onClick={() => dispatch(openDeletePostModal(post))}
                  type="button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PostsTable;
