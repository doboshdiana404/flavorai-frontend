export type AuthUser = {
  id: string;
  email: string;
  name: string;
};

export type AuthResponse = {
  access_token: string;
  user: AuthUser;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
  name: string;
};
