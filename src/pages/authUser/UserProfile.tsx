import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./userProfile.css";
import { logOut } from "../../store/authSlice/authSlice";
import type { RootState } from "../../store/store";

type userProfileProps = {
  onClose: () => void;
};
const UserProfile: React.FC<userProfileProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logOut());
    localStorage.removeItem("user");
    navigate("/login");
    onClose();
  };

  return (
    <div className="profile-dropdown">
      <div className="user-profile-container">
        <div className="first-word-box">
          {user?.name.charAt(0).toUpperCase() || "U"}
        </div>
        <h4>{user?.name || "Name not to set"}</h4>
        <p>{user?.email || "Email not to set"}</p>
      </div>

      <NavLink to="/profile" onClick={onClose}>
        Edit Profile
      </NavLink>
      <NavLink to="/settings" onClick={onClose}>
        Settings
      </NavLink>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserProfile;
