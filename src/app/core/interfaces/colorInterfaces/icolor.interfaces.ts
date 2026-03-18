export interface IColor {
  id: string;
  name: string;
  hex_code: string;
  created_at: string;
  updated_at: string;
}

export interface IColorRequest {
  name?: string;
  hex_code?: string;
}

export interface IColorResponseDelete {
  success: boolean;
  message: string;
  data: any[];
}
