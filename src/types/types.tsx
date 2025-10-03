 export type Product = {
  _id: string;
  title: string;
  reference: string;
  productSummery: string;
  images: string[]; // API always sends an array
  category: string;
  price: number;
  description: string;
  status: string;
  comment: string;
  metaTitle: string;
  metaKeywords: string;
  metaDesc: string;
  rating: {
    rate: number;
    count: number;
  };
  quantity?: number;
 
};

export type CartItem = {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  category:string;
  images: string[];
  subtotal: number;
};

export type CartApiResponse = {
  cart: CartItem[]; // This is the API response structure
  message: string;
};

export type CartState = {
  cart: CartApiResponse | null; // This object will hold the cart and message
  loading: boolean;
  error?: string | null;
};