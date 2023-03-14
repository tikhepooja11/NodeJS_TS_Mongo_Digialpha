import { RegisterUser, searchUser } from "../libs/service-types/user";
import { IUser } from "../models/user";
import { UserRepository } from "../repository/user-repository";

// All Business logic will be here
export class UserService {
  private repository: UserRepository;
  constructor() {
    this.repository = new UserRepository();
  }

  register = async (registerObj: RegisterUser): Promise<IUser> => {
    console.log("inside registerUser() method");
    const user = await this.repository.register(registerObj);
    return user;
  };

  getUserById = async (id: string): Promise<IUser | null> => {
    const user = await this.repository.findById(id);
    return user;
  };

  listAllUsers = async (): Promise<IUser[]> => {
    const userList = await this.repository.listAllUsers();
    return userList;
  };

  listAllUsersByFilter = async (filterInput: searchUser): Promise<IUser[]> => {
    const input: Record<string, unknown> = filterInput.field;
    const userList = await this.repository.listAllUsersByFilter(input);
    return userList;
  };

  updateUserDetails = async (
    userId: string,
    updateInput: searchUser
  ): Promise<IUser> => {
    const userList = await this.repository.updateUserDetails(
      userId,
      updateInput
    );
    return userList;
  };

  deleteUser = async (userId: string): Promise<IUser> => {
    const userList = await this.repository.deleteUser(userId);
    return userList;
  };
}
