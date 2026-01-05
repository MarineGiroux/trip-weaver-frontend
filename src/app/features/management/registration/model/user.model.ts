import { Role } from './role.model';

export type User = {
  id: number;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  degree?: string;
  degreeExpirationDate?: Date;
  roles?: Role[];
  profession?: string[];
  password: string;
};

export type UserTableDTO = {
  id: number;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  degree?: string;
  degreeExpirationDate?: Date;
  roles?: Role[];
  profession?: string[];
  password: string;
};
