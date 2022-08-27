import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import CardLayout from "../components/CardLayout";
import "../App.css";
import ListofUsers from "./ListofUsers";
import { createUser, CreateUserProps } from "../API";

const CreatePost = () => {
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userAge, setUserAge] = useState<string>("");
  const [error, setError] = useState(false);

  const submitPost = async (e: any) => {
    e.preventDefault();

    try {
      const payload: CreateUserProps = {
        name: userName,
        email: userEmail,
        age: userAge,
      };
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

      console.log(error.response);

      

      if(error.response){
        setError(error.response && error.response?.data?.error);
        // setError(error.response && error.response.status);

      }

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
          <CardLayout title="Create new post">
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
                        type="text"
                        value={userAge}
                        onChange={(e) => setUserAge(e.target.value)}
                        className="form-control"
                        placeholder="Age..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-success"
                      onClick={(e) => submitPost(e)}
                    >
                      Create User
                    </button>
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
