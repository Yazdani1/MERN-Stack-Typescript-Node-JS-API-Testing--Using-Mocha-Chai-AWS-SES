const axios = require("axios");

const {API_URL} = require("./config");

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
  const res = await axios.post(API_URL+"/postuserinfo", { ...props });
  return res;
};

// to get all user list

export const getAlluserList = async () => {
  const res = await axios.get(API_URL+"/getuserinfo");
  return res;
};

// to update user info

export interface UpdateUserProps {
  name?: string;
  email?: string;
  age?: string;
}

export const updateUserInfo = async (id: number, props: UpdateUserProps) => {
  const res = await axios.put(API_URL+"/updateuser/" + id, { ...props });
  return res.data;
};

// to get single user to show in the update form

export const getSingleUser = async (id: number) => {
  const res = await axios.get(API_URL+"/singleuser/" + id);
  return res;
};

// to delete user

export const deleteUser = async (id: number) => {
  const res = await axios.delete(API_URL+"/deleteuser/" + id);
  return res;
};
