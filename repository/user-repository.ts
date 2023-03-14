import mongoose from "mongoose";
import Logging from "../library/logging";
import { RegisterUser, searchUser } from "../libs/service-types/user";
import UserModel, { IUser } from "../models/user";

//Dealing with data base operations
export class UserRepository {
  register = async (registerObj: RegisterUser): Promise<IUser> => {
    Logging.info("inside reposiroty");
    const { firstName, lastName, emailId, phoneNumber } = registerObj;
    const user = new UserModel({
      _id: new mongoose.Types.ObjectId(),
      firstName,
      lastName,
      emailId,
      phoneNumber,
    });
    const savedUser = await user.save();
    return savedUser;
  };

  findById = async (id: string): Promise<IUser | null> => {
    const result = await UserModel.findById(id).where("deletedAt").equals(null);
    return result;
  };

  listAllUsers = async (): Promise<IUser[]> => {
    const result = await UserModel.find();
    return result;
  };

  listAllUsersByFilter = async (
    filterInput: Record<string, unknown>
  ): Promise<IUser[]> => {
    const result = await UserModel.find(filterInput);
    return result;
  };

  updateUserDetails = async (
    userId: string,
    updateInput: searchUser
  ): Promise<IUser> => {
    const result = (await UserModel.findByIdAndUpdate(
      userId,
      updateInput
    )) as IUser;
    return result;
  };

  deleteUser = async (userId: string): Promise<IUser> => {
    const result = (await UserModel.findByIdAndDelete(userId)) as IUser;
    return result;
  };
}
