import axios from "axios";

import { API_URL } from "./config";
import { UpdateUserInfo, CreateUserInfo } from "./DataProvider";

////////////////////////////////////////////////////////
//////            User                         ////////
//////////////////////////////////////////////////////

// to create user

export interface CreateUserProps {
  name: string;
  email: string;
  age: string;
}

export const createUser = async ( props: CreateUserProps): Promise<CreateUserInfo> => {
  const res = await axios.post(API_URL + "/postuser", { ...props });
  return res.data;
};

// to get all user list

export const getAlluserList = async () => {
  const res = await axios.get(API_URL + "/getuserlist");
  return res;
};

// to update user info

export interface UpdateUserProps {
  name?: string;
  email?: string;
  age?: string;
}

export const updateUserInfo = async (id: number, props: UpdateUserProps) => {
  const res = await axios.put(API_URL + "/updateuser/" + id, { ...props });
  return res.data;
};

// to get single user to show in the update form

export const getSingleUser = async (id: number) => {
  const res = await axios.get(API_URL + "/singleuser/" + id);
  return res;
};

// to delete user

export const deleteUser = async (id: number) => {
  const res = await axios.delete(API_URL + "/deleteuser/" + id);
  return res;
};
