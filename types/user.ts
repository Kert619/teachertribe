import type { BaseUser } from "./common";

export interface User extends BaseUser {}

export interface LoginCredentials {
  email: string;
  password: string;
}
