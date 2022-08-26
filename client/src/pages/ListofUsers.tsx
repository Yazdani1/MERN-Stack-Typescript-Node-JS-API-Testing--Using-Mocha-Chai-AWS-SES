import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../config";
import { getAlluserList, deleteUser } from "../API";
import "./listuser.css";
import UserComponent from "../components/UserComponent";

const ListofUsers = () => {
  const [userList, setUserList] = useState<any[]>([]);
  const [error, setError] = useState(false);

  // to get user list

  const getUsers = async () => {
    try {
      const response = await getAlluserList();
      setUserList(response.data);
    } catch (error: any) {
      setError(error.response && error.response.data.error);
    }
  };

  // to delete user

  const deleteSingleUser = async (id: any) => {


    try {
      const res = await deleteUser(id);

      if (res) {
        toast.success("User Deleted Successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        getUsers();
      }
    } catch (error: any) {
      toast.success(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <React.Fragment>
      <div>
        <h1>{showError()}</h1>

        {userList.map((item, index) => (
          <UserComponent {...item} deleteSingleUser={deleteSingleUser} key={index}/>
        ))}
      </div>
      <ToastContainer autoClose={8000} />
    </React.Fragment>
  );
};

export default ListofUsers;
