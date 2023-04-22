import Avatar from "@/app/components/Avatar";
import BlogList from "@/app/components/BlogList";
import Pagination from "@/app/components/Pagination";
import { getPosts, getPostsByPage, getUsers } from "@/app/lib/api";
import { notFound } from "next/navigation";

interface Props {
  params: {
    username: string;
    number: string;
  };
}

export const revalidate = 60;

async function Author({ params }: Props) {
  const { username, number } = params;

  const user: User = await getUsers({ username });

  if (!user) return notFound();

  const postsPerPage: Post[] = await getPostsByPage(parseInt(number, 10), 6, {
    user: user._id,
  });
  const userPosts: Post[] = await getPosts({ user: user._id });

  return (
    <article>
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 py-10 gap-4 lg:gap-10 tracking-wide lg:tracking-widest lg:leading-7">
        <div className="flex justify-center items-stretch gap-x-3 md:gap-x-6 min-w-[288px]">
          <Avatar
            src={user.image}
            className="w-20 h-20 md:w-30 md:h-30 object-cover object-center"
          />

          <div className="md:space-y-1">
            <h2 className="text-lg md:text-3xl text-black font-bold whitespace-nowrap">
              {user.name}
            </h2>

            <div className="flex items-center gap-x-2">
              <div className="w-2 h-2 text-black bg-primary rounded-full"></div>
              <h3 className="text-gray-600">{userPosts.length} Articles</h3>
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-center lg:text-left">
          {user.description}
        </p>
      </div>

      <BlogList posts={postsPerPage} />

      {userPosts.length > 0 && (
        <Pagination
          itemsLength={userPosts.length}
          numberPerPage={6}
          destination={`/author/${user.username}/page/`}
        />
      )}
    </article>
  );
}

export default Author;
