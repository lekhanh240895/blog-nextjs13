interface Base {
  _createdAt: string;
  _id: string;
  _updatedAt: string;
}

interface Post extends Base {
  categories: Category[];
  mainImage: string;
  slug: Slug;
  title: string;
  description: string;
  content: string;
  user: User;
}

interface User extends Base {
  name: string;
  image: string;
  email: string;
}

interface Reference {
  _ref: string;
  _type: "reference";
}

interface Slug {
  _type: "slug";
  current: string;
}

interface Block {
  _key: string;
  _type: "block";
  children: Span[];
  markDefs: any[];
  style: "normal" | "hi" | "h2" | "h3" | "h4" | "blockquote";
}

interface Span {
  _key: string;
  _type: "span";
  marks: string[];
  text: string;
}

interface Category extends Base {
  description: string;
  title: string;
  slug: Slug;
}

interface MainImage {
  _type: "image";
  assets: Reference;
}

interface Title {
  _type: "string";
  current: string;
}
