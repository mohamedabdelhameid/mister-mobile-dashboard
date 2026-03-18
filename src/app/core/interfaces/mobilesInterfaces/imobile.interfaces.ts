export interface IMobile {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_cover: string;
  model_number: string;
  battery: number;
  processor: string;
  storage: string;
  display: string;
  operating_system: string;
  camera: string;
  network_support: string;
  total_quantity: any;
  brand: Brand;
  price: string;
  discount: number;
  final_price: number;
  release_year: string;
  status: string;
  product_type: string;
  colors: Color[];
}

export interface Brand {
  id: string;
  name: string;
  image: string;
}

export interface Color {
  id: string;
  stock_quantity: number;
  is_available: boolean;
  color: Color2;
  images: Image[];
}

export interface Color2 {
  id: string;
  name: string;
  hex_code: string;
}

export interface Image {
  id: string;
  image: string;
}

export interface IAddMobileColorAndStock {
  mobile_id: string;
  color_id: string;
  stock_quantity: number;
}

export interface IUpdateMobileColorStock {
  id: string;
  mobile_id: string;
  color_id: string;
  stock_quantity: number;
  created_at: string;
  updated_at: string;
}

export interface IAddImageColorMobile {
  mobile_color_variant_id: string;
  image: string;
  id: string;
  updated_at: string;
  created_at: string;
}
