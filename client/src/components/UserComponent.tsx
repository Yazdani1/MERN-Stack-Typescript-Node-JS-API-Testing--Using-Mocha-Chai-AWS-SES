import React, { useState, useEffect } from "react";
import { IPropsUser } from "../DataProvider";
import { updateUserInfo, UpdateUserProps, getSingleUser } from "../API";
import axios from "axios";
import { API_URL } from "../config";
import CardLayout from "../components/CardLayout";

// {name,email,age,deleteSingleUser,_id}

const UserComponent = ({
  name,
  email,
  age,
  deleteSingleUser,
  _id,
}: IPropsUser) => {
  const [updateuserName, setupdateName] = useState<string>("");
  const [updateEmail, setpdateEmail] = useState<string>("");
  const [updateAge, setupdateAge] = useState<string>("");
  const [error, setError] = useState(false);

  const [show, setShow] = useState(false);

  const hideEditForm = () => {
    setShow(false);
  };

  // to load single user to show in the updated form

  const getSingleUserInfo = async (id: number) => {
    try {
      const res = await getSingleUser(id);
      setupdateName(res.data.name);
      setpdateEmail(res.data.email);
      setupdateAge(res.data.age);
    } catch (error: any) {
      setError(error.response && error.response.data.error);
    }
  };

  // to update user info

  const userInfoUpdate = async (e: any, id: number) => {
    e.preventDefault();

    try {
      const payload: UpdateUserProps = {
        name: updateuserName,
        email: updateEmail,
        age: updateAge,
      };
      const res = await updateUserInfo(id, payload);

      if(res){
        hideEditForm();
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


  useEffect(() => {
    getSingleUserInfo(_id);
  }, []);

  return (
    <div>
      <div className="useritem" onClick={() => setShow(true)}>
        <h5>{name}</h5>
        <h5>{email}</h5>
        <h5>{_id}</h5>
        <h5>{age}</h5>
        <button
          className="btn btn-danger"
          onClick={() => deleteSingleUser(_id)}
        >
          Delete
        </button>
      </div>
      {show && (
        <CardLayout
          title="Create new post"
          buttonText="Submit"
          buttonColor="white"
          closeButton={hideEditForm}
          closeButtonText="Close"
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
                      value={updateuserName}
                      onChange={(e) => setupdateName(e.target.value)}
                      className="form-control"
                      placeholder="Name..."
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      value={updateEmail}
                      onChange={(e) => setpdateEmail(e.target.value)}
                      className="form-control"
                      placeholder="E-mail..."
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="number"
                      value={updateAge}
                      onChange={(e) => setupdateAge(e.target.value)}
                      className="form-control"
                      placeholder="Age..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-success"
                    onClick={(e) => userInfoUpdate(e, _id)}
                  >
                    Update User
                  </button>
                </form>
              </div>
            </div>
          </div>
        </CardLayout>
      )}
    </div>
  );
};

export default UserComponent;
