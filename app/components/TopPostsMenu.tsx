import { Menu, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { postSelector } from "../redux/selector";
import { fetchPosts } from "../features/postSlice";

export default function TopPostsMenu() {
  const { posts } = useSelector(postSelector);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Menu
      as="div"
      className="relative text-left z-10 inline-block transition-all"
    >
      {({ open }) => (
        <>
          <Menu.Button>
            <div className="group transition-all flex gap-x-1 items-center">
              <span className="group-hover:text-primary transition-all">
                Top Posts
              </span>

              <ChevronUpIcon
                className={`w-3 h-3 inline-block transition-all ${
                  open ? "" : "rotate-180"
                }`}
              />
            </div>
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-300"
            enterFrom="transform opacity-0 -translate-y-3"
            enterTo="transform opacity-100 translate-y-0"
            leave="transition ease-in duration-300"
            leaveFrom="transform opacity-100 translate-y-0"
            leaveTo="transform opacity-0 -translate-y-3"
          >
            <Menu.Items className="absolute right-0 translate-y- mt-2 duration w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {posts.length > 0 &&
                posts.map((post) => (
                  <div className="p-1" key={post._id}>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href={"/" + post.slug}
                          className={`${
                            active ? "bg-primary text-white" : "text-gray-900"
                          } flex w-full items-center rounded-md px-2 py-2 transition-all`}
                        >
                          {post.title}
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
