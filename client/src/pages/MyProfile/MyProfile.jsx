import React, { useState, useEffect } from "react";
import "./my-profile.css";
import { AiOutlinePlus } from "react-icons/ai";
import useFetch from "../../hooks/useFetch";
import { useAuth } from "../../context/authContext";
import avatar from "../../assets/drop/user.png";

export default function MyProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { authUser, setAuthUser } = useAuth();

  const { performFetch, cancelFetch } = useFetch(
    `/user/${authUser?._id}`,
    handleSubmit
  );

  useEffect(() => {
    return cancelFetch;
  }, []);

  const handleSubmit = () => {
    const updatedUser = {
      userId: authUser._id,
      firstName,
      lastName,
    };

    setAuthUser(updatedUser);
    performFetch({
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ user: updatedUser }),
    });
  };

  return (
    <div className="my-profile-container">
      <div className="my-profile">
        <div className="my-profile-settings">
          <span className="update-profile">Update Your Account</span>
        </div>
        <form className="my-profile-form" onSubmit={handleSubmit}>
          <label htmlFor="Profile Picture"></label>
          <div className="profile-picture-settings">
            <img
              src={avatar}
              alt=""
              style={{ width: "80px", height: "80px" }}
            />

            <label htmlFor="fileInput">
              <AiOutlinePlus className="pp-icon" />
            </label>
            <input type="file" id="fileInput" style={{ display: "none" }} />
          </div>
          <label>Name</label>
          <input
            type="text"
            defaultValue={authUser?.firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label>Last Name</label>
          <input
            type="text"
            defaultValue={authUser?.lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label>Email</label>
          <input type="email" defaultValue={authUser?.email} disabled />
          <label>Password</label>
          <input type="password" placeholder="************" disabled />
          <button className="profile-update-btn" type="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
