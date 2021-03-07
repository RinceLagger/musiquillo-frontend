import React from "react";

import { Link } from "react-router-dom";
import Header from '../../components/Header/Header'
import GenericForm from '../../components/GenericForm/GenericForm'
import socketIOClient from "socket.io-client";
import { useSocket } from "../../context/SocketContext";
import { usePlayers } from "../../context/PlayersContext";
import { useAuth } from "../../context/AuthContext.utils";
import { useHistory } from "react-router-dom";
const ENDPOINT = "http://localhost:4000/";

function JoinRoom() {

    let history = useHistory();
    const {socket, newRoom} = useSocket();
    const { user} = useAuth();
    const {players, newPlayer} = usePlayers();
    console.log(newRoom)

    if(socket){
        socket.on("players", ({players}) => {
            newPlayer(players);
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
        socket.emit("join", { username, roomId: codigo})

      };

  return (
    <div>
      <Header/>
      <GenericForm text= {"Enter Room Code"} btnTxt= {"Join Room"} submitAction= {enterCode}/>
      
    </div>
  );
}

export default JoinRoom;