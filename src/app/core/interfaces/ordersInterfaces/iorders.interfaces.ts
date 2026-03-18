export interface IOrders {
  id: string;
  payment_method: string;
  payment_status: string;
  payment_proof: any;
  total_price: number;
  note: string;
  user: User;
  created_at: string;
  updated_at: string;
  items: Item[];
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  city: string;
  area: string;
}

export interface Item {
  id: string;
  product_type: string;
  quantity: number;
  price: number;
  total_price: number;
  product: Product;
  color: Color;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  discount: number;
  final_price: number;
  status: string;
  product_type: string;
  image_cover: string;
  brand: Brand;
  model_number: string;
  battery: number;
  processor: string;
  storage: string;
  display: string;
  operating_system: string;
  camera: string;
  network_support: string;
  release_year: string;
}

export interface Brand {
  id: string;
  name: string;
  image: string;
}

export interface Color {
  id: string;
  name: string;
  hex_code: string;
}
