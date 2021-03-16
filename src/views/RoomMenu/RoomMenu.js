import React from "react";
import { Link } from "react-router-dom";
import Header from '../../components/Header/Header'


function RoomMenu() {
  return (
    <div>
      <Header/>
      
      <Link to="/newRoom">new Room</Link>
      <Link to="/joinRoom">join Room</Link>
    </div>
  );
}

export default RoomMenu;