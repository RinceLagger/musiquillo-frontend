import React from "react";

import Header from "../../components/Header/Header";
import GenericForm from "../../components/GenericForm/GenericForm";
import socketIOClient from "socket.io-client";
import { useSocket } from "../../context/SocketContext";
import { usePlayers } from "../../context/PlayersContext";
import { useAuth } from "../../context/AuthContext.utils";
import { useHistory } from "react-router-dom";

import { useCode } from "../../context/CodeContext";
import "./JoinRoom.css";

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

function JoinRoom() {
  let history = useHistory();
  const { socket, newRoom } = useSocket();
  const { user } = useAuth();
  const { newPlayer } = usePlayers();

  const { defineCode } = useCode();
  const [showWrongCode, setShowWrongCode] = React.useState(false);
  const [errorTextCode, setErrorTextCode] = React.useState("");

  if (socket) {
    socket.on("players", ({ players }) => {
      newPlayer(players);
      socket.off("players");
      socket.off("wrongCode");
      socket.off("roomFull");
      socket.off("duplicatedRoom");
      history.push("/waiting-room");
    });

    socket.on("wrongCode", () => {
      setErrorTextCode("Wrong Code, try it again!");
      setShowWrongCode(true);
      socket.disconnect(true);
      setTimeout(() => setShowWrongCode(false), 1000);
    });
    socket.on("roomFull", () => {
      setErrorTextCode("Max 6 players per Game");
      setShowWrongCode(true);
      socket.disconnect(true);
      setTimeout(() => setShowWrongCode(false), 1000);
    });
    socket.on("duplicatedRoom", () => {
      setErrorTextCode("Game already started");
      setShowWrongCode(true);
      socket.disconnect(true);
      setTimeout(() => setShowWrongCode(false), 1000);
    });
  }

  const enterCode = (codigo) => {
    const socket = socketIOClient(ENDPOINT);
    newRoom(socket);
    const { username, imgUser } = user;

    socket.emit("join", { username, roomId: codigo, img: imgUser });
    defineCode(codigo);
  };

  const handleBack = (event) => {
    if (socket) {
      socket.off("players");
      socket.off("wrongCode");
    }

    history.push("/room-menu");
  };

  return (
    <div>
      <Header />
      <button className="back" onClick={handleBack}></button>
      <GenericForm
        text={"Enter Room Code"}
        btnTxt={"Join Room"}
        submitAction={enterCode}
      />
      {showWrongCode && <p id="wrong-code">{errorTextCode}</p>}
    </div>
  );
}

export default JoinRoom;
