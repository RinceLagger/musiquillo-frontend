import React from "react";
import { useAuth } from "../../context/AuthContext.utils";
import "./Header.css";

export default function Header() {
  const { user, handleLogout } = useAuth();

  return (
    <div className="header">
      <div className="userImg">
        <img src={user.imgUser} alt="user-profile" />
      </div>
      <h1>MUSIQUILLO</h1>
      <div className="userInfo">
        <h2>Hola, {user.username}</h2>
        <button className="secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
