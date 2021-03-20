import React from "react";

import Header from "../../components/Header/Header";
import GenericForm from "../../components/GenericForm/GenericForm";
import socketIOClient from "socket.io-client";
import { useSocket } from "../../context/SocketContext";
import { usePlayers } from "../../context/PlayersContext";
import { useAuth } from "../../context/AuthContext.utils";
import { useHistory } from "react-router-dom";

import { useCode } from "../../context/CodeContext";

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

function JoinRoom() {
  let history = useHistory();
  const { socket, newRoom } = useSocket();
  const { user } = useAuth();
  const { newPlayer } = usePlayers();

  const { defineCode } = useCode();

  if (socket) {
    socket.on("players", ({ players }) => {
      newPlayer(players);
      socket.off("players");
      socket.off("wrongCode");
      history.push("/waiting-room");
      //console.log(players);
    });

    socket.on("wrongCode", () => {
      console.log("wrongCode");
    });
  }

  const enterCode = (codigo) => {
    const socket = socketIOClient(ENDPOINT);
    newRoom(socket);
    const username = user.username;
    socket.emit("join", { username, roomId: codigo });
    defineCode(codigo);
  };

  return (
    <div>
      <Header />
      <GenericForm
        text={"Enter Room Code"}
        btnTxt={"Join Room"}
        submitAction={enterCode}
      />
    </div>
  );
}

export default JoinRoom;
