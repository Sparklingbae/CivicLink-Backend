import mongoose from "mongoose";


export interface IUser {
  _id: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  location?: string;
  role?: "user" | "admin";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserDocument extends IUser {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IAuthResponse {
  email: string;
  token: string;
}

