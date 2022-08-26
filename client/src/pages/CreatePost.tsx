import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import CardLayout from "../components/CardLayout";
import "../App.css";
import ListofUsers from "./ListofUsers";
import { createUser, getAlluserList, deleteUser } from "../API";
import { API_URL } from "../config";
import {CreateUserProps } from "../API";

const CreatePost = () => {
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userAge, setUserAge] = useState<string>("");
  const [error, setError] = useState(false);


  const submitPost = async () => {
    try {
      const payload:CreateUserProps = { name:userName, email:userEmail, age:userAge };
      const res = await createUser(payload);
      if (res) {
        setUserName("");
        setUserEmail("");
        setUserAge("");
        toast.success("User Created Successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error: any) {
      setError(error.response && error.response.data.error);
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
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <CardLayout
            title="Create new post"
            buttonText="Submit"
            buttonColor="white"
            submitPost={submitPost}
          >
            {showError()}
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="form-design ">
                  <form>
                    <div className="text-center"></div>
                    <div className="form-group">
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="form-control"
                        placeholder="Name..."
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="text"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="form-control"
                        placeholder="E-mail..."
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="number"
                        value={userAge}
                        onChange={(e) => setUserAge(e.target.value)}
                        className="form-control"
                        placeholder="Age..."
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </CardLayout>
        </div>
      </div>
      <ToastContainer autoClose={8000} />

      <ListofUsers />
    </div>
  );
};

export default CreatePost;
