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
  views: number;
  readTime: number;
  comments: Comment[];
}

interface User extends Base {
  name: string;
  image: string;
  email: string;
  bio?: string;
  description?: string;
  username: string;
  password: string;
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
  slug: string;
}

interface Order extends Base {
  line_items: [
    {
      quantity: number;
      price_data: {
        currency: string;
        product_data: {
          name: string;
        };
        unit_amount: number;
      };
    }
  ];
  name: string;
  email: string;
  city: string;
  postalCode: string;
  address: string;
  country: string;
  paid: boolean;
}

interface Comment extends Base {
  text: string;
  user: User;
  post: Post;
  replies: [Comment];
}

interface Property {
  [key: string]: any;
}
