export interface IOldAdmin {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  token_type: string;
  access_token: string;
  expires_in: number;
}

export interface Admin {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  city: string;
  area: string;
  email: string;
  email_verified_at: string;
  verification_token: any;
  verification_token_expires_at: any;
  reset_token: string;
  reset_token_expires_at: string;
  created_at: string;
  updated_at: string;
}

export interface JWTDecode {
  id: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}

export interface Account {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  city: string;
  area: string;
  email: string;
  email_verified_at: string;
  verification_token: any;
  verification_token_expires_at: any;
  reset_token: string;
  reset_token_expires_at: string;
  created_at: string;
  updated_at: string;
}
