import React from "react";
import { Link } from "react-router-dom";

function RoomMenu() {
  return (
    <div>
      <h2>hola, {sessionStorage.getItem("user").username}</h2>
      <Link to="/newRoom">new Room</Link>
      <Link to="/joinRoom">join Room</Link>
    </div>
  );
}

export default RoomMenu;