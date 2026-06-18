export type RegisterPayload = {
  display_name: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type TokenResponse = {
  access_token: string;
  token_type: string;
};

export function register(data: RegisterPayload): Promise<any>;
export function login(data: LoginPayload): Promise<TokenResponse>;
export function logout(): Promise<any>;
export function updateProfile(data: Record<string, any>, token: string): Promise<any>;
