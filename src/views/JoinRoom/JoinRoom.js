import React from "react";

import { Link } from "react-router-dom";
import Header from '../../components/Header/Header'
import GenericForm from '../../components/GenericForm/GenericForm'
import socketIOClient from "socket.io-client";
import { useSocket } from "../../context/SocketContext";
import { usePlayers } from "../../context/PlayersContext";
import { useAuth } from "../../context/AuthContext.utils";
import { useHistory } from "react-router-dom";
import { useTurn } from "../../context/TurnContext";
import { useCode } from "../../context/CodeContext";
import { useSongs } from "../../context/SongContext";
const ENDPOINT = process.env.REACT_APP_ENDPOINT;

function JoinRoom() {

    let history = useHistory();
    const {socket, newRoom} = useSocket();
    const { user} = useAuth();
    const {players, newPlayer} = usePlayers();
    const { turn, nextTurn  } = useTurn();
    const { code, defineCode  } = useCode();
    const { songs, defineSongs  } = useSongs();

    

    if(socket){
        socket.on("players", ({players}) => {
            newPlayer(players);
            socket.off('players');
            socket.off('wrongCode');
            history.push("/waiting-room");
            //console.log(players);
          });

          socket.on("wrongCode", () => {

            console.log("wrongCode");
          });

          // socket.on("start", ({turn, songs}) => {
          //   console.log("start");
          //   nextTurn(turn);
          //   defineSongs(songs);
          //   socket.off('players');
          //   socket.off('wrongCode');
          //   socket.off('start');
          //   console.log("turno: ", turn);
          //   history.push("/game-room");
          // });
    }

    const enterCode = (codigo) => {
        const socket = socketIOClient(ENDPOINT);
        newRoom(socket);
        const username = user.username;
        socket.emit("join", { username, roomId: codigo});
        defineCode(codigo);

      };

  return (
    <div>
      <Header/>
      <GenericForm text= {"Enter Room Code"} btnTxt= {"Join Room"} submitAction= {enterCode}/>
      
    </div>
  );
}

export default JoinRoom;