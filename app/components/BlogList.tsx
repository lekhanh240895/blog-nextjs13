import Post from "./Post";

type Props = {
  posts: Post[];
};

function BlogList({ posts }: Props) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 grid-flow-dense">
      {posts.length > 0 &&
        posts.map((post) => <Post post={post} key={post._id} />)}
    </ul>
  );
}

export default BlogList;
