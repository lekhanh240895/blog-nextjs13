"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { categorySelector, postSelector } from "../redux/selector";
import { fetchPosts } from "../features/postSlice";
import BasicMenu from "./BasicMenu";
import { fetchCategories } from "../features/categorySlice";

function Navbar() {
  const { posts } = useSelector(postSelector);
  const { categories } = useSelector(categorySelector);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <nav className="items-center justify-center gap-x-4 hidden md:flex text-xl pt-4">
      <Link href="/" className="px-1 md:px-2 hover:text-primary">
        Home
      </Link>

      <Link href="/products" className="px-1 md:px-2 hover:text-primary">
        Products
      </Link>

      {posts.length > 0 && (
        <BasicMenu items={posts} rotateIconDown>
          <span className="group-hover:text-primary transition-all">
            Top Posts
          </span>
        </BasicMenu>
      )}

      {categories.length > 0 && (
        <BasicMenu items={categories} rotateIconDown itemPreHref="category">
          <span className="group-hover:text-primary transition-all">
            Categories
          </span>
        </BasicMenu>
      )}

      <Link href="/contact" className="px-1 md:px-2 hover:text-primary">
        Contact
      </Link>
    </nav>
  );
}

export default Navbar;
