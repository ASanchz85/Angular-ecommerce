import { Role } from './roles.type';

export interface UserCredentials {
  userName: string;
  password: string;
}

export interface User extends UserCredentials {
  email: string;
  role: Role;
}
