interface Base {
  createdAt: string;
  _id: string;
  updatedAt: string;
}

interface Post extends Base {
  category: Category;
  mainImage: string;
  slug: string;
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

interface Category extends Base {
  description: string;
  title: string;
  parent: Category;
  properties: Property[];
  slug: string;
}

interface Product extends Base {
  title: string;
  description: string;
  price: number;
  images: string[];
  category: Category;
  properties: object;
}

interface Property {
  [key: string]: any;
}
