import Category from "../models/Category";
import Comment from "../models/Comment";
import Order from "../models/Order";
import Post from "../models/Post";
import Product from "../models/Product";
import User from "../models/User";
import { mongooseConnect } from "./mongoose";

interface Options {
  [key: string]: any;
}

export const getPost = async (options?: Options) => {
  await mongooseConnect();

  const post = await Post.findOne(options).populate([
    {
      path: "user",
      model: User,
      select: "-password",
    },
    {
      path: "category",
      model: Category,
      populate: {
        path: "parent",
        model: "Category",
      },
    },
    {
      path: "comments",
      model: Comment,
      populate: [
        {
          path: "user",
          model: User,
          select: "-password",
        },
      ],
    },
  ]);

  return JSON.parse(JSON.stringify(post));
};

export const getPosts = async (options?: Options) => {
  await mongooseConnect();

  const posts = await Post.find(options || {})
    .sort({
      createdAt: "desc",
    })
    .populate([
      {
        path: "user",
        model: User,
        select: "-password",
      },
      {
        path: "category",
        model: Category,
        populate: {
          path: "parent",
          model: "Category",
        },
      },
      {
        path: "comments",
        model: Comment,
        populate: [
          {
            path: "user",
            model: "User",
            select: "-password",
          },
          {
            path: "post",
            model: "Post",
          },
        ],
      },
    ]);

  return JSON.parse(JSON.stringify(posts));
};

export const getPostsByPage = async (
  page: number,
  postsPerPage: number,
  options?: Options
) => {
  await mongooseConnect();

  const posts = await Post.find(options || {})
    .skip((page - 1) * postsPerPage)
    .limit(postsPerPage)
    .sort({
      createdAt: "desc",
    })
    .populate([
      {
        path: "user",
        model: User,
        select: "-password",
      },
      {
        path: "category",
        model: Category,
        populate: {
          path: "parent",
          model: "Category",
        },
      },
      {
        path: "comments",
        model: Comment,
      },
    ]);

  return JSON.parse(JSON.stringify(posts));
};

export const getPopularPosts = async () => {
  await mongooseConnect();

  const posts = await Post.find({})
    .sort({ views: "desc" })
    .populate([
      {
        path: "user",
        model: User,
        select: "-password",
      },
      {
        path: "category",
        model: Category,
        populate: {
          path: "parent",
          model: "Category",
        },
      },
      {
        path: "comments",
        model: Comment,
      },
    ]);

  return JSON.parse(JSON.stringify(posts));
};

export const getCategories = async (options?: Options) => {
  await mongooseConnect();

  if (options) {
    const category = await Category.findOne(options).populate({
      path: "parent",
      model: "Category",
    });

    return JSON.parse(JSON.stringify(category));
  }

  const categories = await Category.find({}).populate({
    path: "parent",
    model: "Category",
  });

  return JSON.parse(JSON.stringify(categories));
};

export const getUsers = async (options?: Options) => {
  await mongooseConnect();

  if (options) {
    const user = await User.findOne(options);

    return JSON.parse(JSON.stringify(user));
  }

  const users = await User.find({});

  return JSON.parse(JSON.stringify(users));
};

export const getProducts = async (options?: Options) => {
  await mongooseConnect();

  if (options) {
    const product = await Product.findOne(options)
      .sort({
        createdAt: "desc",
      })
      .populate([
        {
          path: "category",
          model: Category,
          populate: {
            path: "parent",
            model: "Category",
          },
        },
      ]);

    return JSON.parse(JSON.stringify(product));
  }

  const products = await Product.find({}).populate([
    {
      path: "category",
      model: Category,
      populate: {
        path: "parent",
        model: "Category",
      },
    },
  ]);

  return JSON.parse(JSON.stringify(products));
};

export const getOrders = async (options?: Options) => {
  await mongooseConnect();

  if (options) {
    const order = await Order.findOne(options);

    return JSON.parse(JSON.stringify(order));
  }

  const orders = await Order.find({}).sort({
    createdAt: -1,
  });

  return JSON.parse(JSON.stringify(orders));
};

export const getComments = async (postId?: string, options?: Options) => {
  await mongooseConnect();

  if (options) {
    const comment = await Order.findOne(options).populate([
      {
        path: "user",
        model: User,
        select: "-password",
      },
      {
        path: "post",
        model: Post,
        populate: [
          {
            path: "user",
            model: User,
            select: "-password",
          },
          {
            path: "category",
            model: Category,
            populate: {
              path: "parent",
              model: "Category",
            },
          },
        ],
      },
    ]);

    return JSON.parse(JSON.stringify(comment));
  }

  const comments = await Comment.find({ post: postId })
    .sort({
      createdAt: -1,
    })
    .populate([
      {
        path: "user",
        model: User,
        select: "-password",
      },
      {
        path: "post",
        model: Post,
        populate: [
          {
            path: "user",
            model: User,
            select: "-password",
          },
          {
            path: "category",
            model: Category,
            populate: {
              path: "parent",
              model: "Category",
            },
          },
        ],
      },
    ]);

  return JSON.parse(JSON.stringify(comments));
};

export const updateView = async (id: string) => {
  await mongooseConnect();

  await Post.findByIdAndUpdate(id, {
    $inc: {
      views: 1,
    },
  });

  return true;
};
