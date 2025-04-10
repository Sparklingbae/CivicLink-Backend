import {
  IUser,
  IAuthResponse
} from "./interfaces";
import UserModel from "./model";
import { generateToken } from "./utils";

export async function createUser(userData: IUser): Promise<IAuthResponse> {
  const existingUser = await UserModel.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const user = await UserModel.create(userData);
  const { _id, email, role } = user.toObject() as IUser;
  const rolecheck = role || "user";
  const token = generateToken({ id: _id, role: rolecheck });

  return { email, token };
}

export async function getUserById(userId: string): Promise<IUser | null> {
  const user = await UserModel.findById(userId).select("-password");
  if (!user) {
    throw new Error("User not found");
  }
  return user.toObject();
}

export async function getAllUsers(): Promise<IUser[]> {
  const users = await UserModel.find().select("-password");
  return users.map((user) => user.toObject());
}

export async function updateUser(
  userId: string,
  updateData: Partial<IUser>
): Promise<IUser | null> {
  if (updateData.password) {
    delete updateData.password;
  }
  const user = await UserModel.findByIdAndUpdate(userId, updateData, {
    new: true,
  }).select("-password");

  if (!user) {
    throw new Error("User not found");
  }
  return user.toObject();
}

export async function deleteUser(userId: string): Promise<boolean> {
  const result = await UserModel.findByIdAndDelete(userId);
  if (!result) {
    throw new Error("User not found");
  }
  return true;
}

export async function loginUser(
  userEmail: string,
  password: string
): Promise<IAuthResponse> {
  const user = await UserModel.findOne({ email: userEmail });
  if (!user) {
    throw new Error("Invalid credentials - user not found");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid credentials - password does not match");
  }
  const { _id, email, role } = user.toObject() as IUser;
  const rolecheck = role || "user";
  const token = generateToken({ id: _id, role: rolecheck });

  return { email, token };
}
