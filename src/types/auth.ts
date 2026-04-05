export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};
