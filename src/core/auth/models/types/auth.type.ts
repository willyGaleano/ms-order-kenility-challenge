export type UserAdmin = {
  id: string;
  email: string;
  password: string;
};

export type AuthJwtPayload = {
  sub: string;
  email?: string;
};

export type UserRequest = Omit<UserAdmin, 'email' | 'password'>;
