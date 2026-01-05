export type LoginRequestType = {
  email: string;
  password: string;
};

export type DecodedToken = {
  sub: string;
  roles: Role[];
  fullName?: string;
  exp: number;
  iat: number;
};

export type Role = {
  authority: string;
};

export type LoginResponse = {
  token: string;
};
