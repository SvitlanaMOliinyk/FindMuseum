import React, { useEffect } from "react";
import "./my-profile.css";
import useFetch from "../../hooks/useFetch";
import { useAuth } from "../../context/authContext";
import avatar from "../../assets/drop/user.png";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function MyProfile() {
  const { authUser, setAuthUser } = useAuth();
  const { id } = useParams();

  const onSuccess = () => {
    toast.success(<div>User updated!</div>, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };

  const { performFetch, cancelFetch } = useFetch(`/user/${id}`, onSuccess);

  useEffect(() => {
    return cancelFetch;
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    performFetch({
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ authUser }),
    });
  };

  return (
    <div className="my-profile-container">
      <div className="my-profile">
        <div className="my-profile-settings">
          <span className="update-profile-header">Update Your Account</span>
        </div>
        <form className="my-profile-form" onSubmit={handleSubmit}>
          <div className="profile-settings">
            <img src={avatar} alt="" className="profile-picture" />

            <label>Name</label>
            <input
              type="text"
              defaultValue={authUser?.firstName}
              onChange={(e) =>
                setAuthUser({ ...authUser, firstName: e.target.value })
              }
            />
            <label>Last Name</label>
            <input
              type="text"
              defaultValue={authUser?.lastName}
              onChange={(e) =>
                setAuthUser({ ...authUser, lastName: e.target.value })
              }
            />
            <label>Email</label>
            <input type="email" defaultValue={authUser?.email} disabled />
            <label>Password</label>
            <input type="password" placeholder="************" disabled />
            <button className="profile-update-btn" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
