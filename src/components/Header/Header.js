import React from "react";
import { useAuth } from "../../context/AuthContext.utils";
import "./Header.css";

import background from "../../assests/images/avatar.png";

const initialStyle = {
    width: "100px",
  aspectRatio: "1/1",
  backgroundImage: `url(${background})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: "100%",
  border: "1px solid white",
  
}

export default function Header() {
  const { user, handleLogout } = useAuth();
  const [imgStyle, setImgStyle] = React.useState(initialStyle);

  return (
    <div className="header">
      <div className="userImg" style= {imgStyle}></div>
      <div className="userInfo">
        <h2>Hola, {user.username}</h2>
        <button className="secondary" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
