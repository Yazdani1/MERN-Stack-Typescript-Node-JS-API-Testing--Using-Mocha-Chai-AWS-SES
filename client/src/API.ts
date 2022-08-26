import axios from "axios";


import { CreateUserInfo } from "./DataProvider";

////////////////////////////////////////////////////////
//////            User                         ////////
//////////////////////////////////////////////////////

// to create user

export interface CreateUserProps {
  name: string;
  email: string;
  age: string;
}

export const createUser = async ( props: CreateUserProps) => {
  const res = await axios.post("/api/postuser", { ...props });
  return res;
};

// to get all user list

export const getAlluserList = async () => {
  const res = await axios.get("/api/getuserlist");
  return res;
};

// to update user info

export interface UpdateUserProps {
  name?: string;
  email?: string;
  age?: string;
}

export const updateUserInfo = async (id: number, props: UpdateUserProps) => {
  const res = await axios.put("/api/updateuser/" + id, { ...props });
  return res.data;
};

// to get single user to show in the update form

export const getSingleUser = async (id: number) => {
  const res = await axios.get("/api/singleuser/" + id);
  return res;
};

// to delete user

export const deleteUser = async (id: number) => {
  const res = await axios.delete("/api/deleteuser/" + id);
  return res;
};
