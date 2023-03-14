import mongoose, { Document, Schema } from "mongoose";
export interface IUser {
  firstName: string;
  lastName: string;
  emailId: string;
  phoneNumber: number;
}

//  create interface to define model of this type
export interface IUserModel extends IUser, Document {}

//  create schema
const userSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  emailId: { type: String, required: true },
  phoneNumber: { type: Number },
});

export default mongoose.model<IUserModel>("UserModel", userSchema);
