import express from "express";
import Logging from "../library/logging";
import { searchUser } from "../libs/service-types/user";
const router = express.Router();

export = router;

import { UserService } from "../services/user";

router.post("/register", async (request, response) => {
  Logging.info("Registering new user");
  const userService = new UserService();
  try {
    const { firstName, lastName, emailId, phoneNumber } = request.body;
    const user = await userService.register({
      firstName,
      lastName,
      emailId,
      phoneNumber,
    });
    return response.status(200).json(user);
  } catch (error) {
    Logging.error(`Error in registering user`);
    return response
      .status(404)
      .send(error)
      .json({ message: "Internal server error" });
  }
});

router.get("/getUserById/:id", async (request, response) => {
  Logging.info("Fetching user with id");
  const userService = new UserService();
  const userId = request.params.id;
  try {
    const user = await userService.getUserById(userId);
    if (user) {
      return response
        .status(200)
        .send(user)
        .json({ message: "Getting user successfull" });
    } else {
      return response.status(404).send({ message: "user with id not found" });
    }
  } catch (error) {
    Logging.error(`Internal server error`);
    return response
      .status(500)
      .send("error")
      .json({ message: "Internal Server Error" });
  }
});

router.get("/listAllUsers", async (request, response) => {
  Logging.info("Listing all users");
  const userService = new UserService();
  try {
    const userList = await userService.listAllUsers();
    if (userList.length > 0) {
      return response
        .status(200)
        .send(userList)
        .json({ message: "Getting users successfull" });
    } else {
      return response.status(201).send({ message: "Users not found" });
    }
  } catch (error) {
    Logging.error(`Internal server error`);
    return response
      .status(500)
      .send("error")
      .json({ message: "Internal Server Error" });
  }
});

router.get("/listAllUsersByFilter/filter", async (request, response) => {
  Logging.info("Listing all users with specified filter");
  const myFilter = request.body as searchUser;
  console.log(request.body);
  const userService = new UserService();
  try {
    const filteredUsers = await userService.listAllUsersByFilter(myFilter);
    if (filteredUsers.length > 0) {
      return response
        .status(200)
        .send(filteredUsers)
        .json({ message: "Getting filtered users successfull" });
    } else {
      return response.status(201).send({ message: "Users not found" });
    }
  } catch (error) {
    Logging.error(`Internal server error`);
    return response
      .status(500)
      .send("error")
      .json({ message: "Internal Server Error" });
  }
});

router.put("/updateUserDetails/:id", async (request, response) => {
  Logging.info("Updating user details");
  const userId = request.params.id;
  const { body: updateInput } = request;
  const userService = new UserService();
  try {
    const updatedUser = await userService.updateUserDetails(
      userId,
      updateInput
    );
    if (updatedUser) {
      return response
        .status(200)
        .send(updatedUser)
        .json({ message: "User details updated successfully" });
    } else {
      return response.status(404).send({ message: "User with id not found" });
    }
  } catch (error) {
    Logging.error(`Internal server error`);
    return response
      .status(500)
      .send("error")
      .json({ message: "Internal Server Error" });
  }
});

router.delete("/deleteUser/:id", async (request, response) => {
  Logging.info("Deleting user");
  const userId = request.params.id;
  const userService = new UserService();
  try {
    const deletedUser = await userService.deleteUser(userId);
    if (deletedUser) {
      return response
        .status(200)
        .send(deletedUser)
        .json({ message: "User deleted successfully" });
    } else {
      return response.status(404).send({ message: "User with id not found" });
    }
  } catch (error) {
    Logging.error(`Internal server error`);
    return response
      .status(500)
      .send("error")
      .json({ message: "Internal Server Error" });
  }
});
