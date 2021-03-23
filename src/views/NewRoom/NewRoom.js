import React from "react";
import socketIOClient from "socket.io-client";
import { useSocket } from "../../context/SocketContext";
import { useAuth } from "../../context/AuthContext.utils";
import { usePlayers } from "../../context/PlayersContext";
import { useTurn } from "../../context/TurnContext";
import { useHistory } from "react-router-dom";
import { useCode } from "../../context/CodeContext";
import { useSongs } from "../../context/SongContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'
import "./NewRoom.css";

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const clipboardImg = <FontAwesomeIcon icon={faClipboard} />

function getRandom() {
  return String(Math.floor(Math.random() * 100000));
}

export default function NewRoom() {
  //const [codigo, setCodigo] = React.useState("");
  const { players, newPlayer } = usePlayers();
  const { socket, newRoom } = useSocket();
  const { user } = useAuth();
  const { nextTurn } = useTurn();
  const { code, defineCode } = useCode();
  const { defineSongs } = useSongs();

  let history = useHistory();
  if (socket) {
    socket.on("players", ({ players }) => {
      newPlayer(players);
      console.log(players);
    });

    socket.on("duplicatedRoom", () => {
      console.log("duplicatedRoom");
    });

    socket.on("start", ({ turn, songs }) => {
      console.log("start");
      nextTurn(turn);
      defineSongs(songs);
      console.log("turno: ", turn);
      socket.off("players");
      socket.off("start");
      socket.off("duplicatedRoom");
      history.push("/game-room");
    });
  }

  const handleClick = (event) => {
    const username = user.username;
    const numPlayers = players.length;
    socket.emit("start", { username, roomId: code, numPlayers });
  };

  const handleBack = (event) => {
    
    socket.emit("deleteRoom", { roomId: code });
    history.push("/room-menu");
  };

  React.useEffect(() => {
    const random = getRandom();
    defineCode(random);
  }, []);

  React.useEffect(() => {
    if (code) {
      const socket = socketIOClient(ENDPOINT);
      newRoom(socket);
      const username = user.username;
      socket.emit("createRoom", { username, roomId: code });
    }
  }, [code]);

  return (
    <div className="waiting-container">
    <button className="back" onClick={handleBack}>BACK</button>
      <p>
        COPY AND SHARE!</p>
        <div className="code">
          {code}
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(code);
            }}
          >{clipboardImg}</button>
        </div>
      
      <div className="waiting-list">
      <h1>Connected Players:</h1>
      <ul>
        {players.map((player) => (
          <li key={player._id}>{player.username}</li>
        ))}
      </ul>
      </div>
     
      {players.length > 1 && <button className="secondary" onClick={handleClick}>Start Game!</button>}
    </div>
  );
}
