import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./RoomMenu.css";
function RoomMenu() {
  return (
    <>
      <Header />
      <div className="container-menu">
        <div>
          <Link to="/newRoom">
            <button className="primary">New Game</button>
          </Link>
          <Link to="/joinRoom">
            <button className="secondary">Join Game</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default RoomMenu;
