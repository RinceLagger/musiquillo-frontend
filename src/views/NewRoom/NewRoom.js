import React from "react";
import socketIOClient from "socket.io-client";
import { useSocket } from "../../context/SocketContext";
import { useAuth } from "../../context/AuthContext.utils";
import { usePlayers } from "../../context/PlayersContext";
import { useTurn } from "../../context/TurnContext";
import { useHistory } from "react-router-dom";
import { useCode } from "../../context/CodeContext";
import { useSongs } from "../../context/SongContext";
const ENDPOINT = process.env.REACT_APP_ENDPOINT;

function getRandom() {
  return String(Math.floor(Math.random() * 100000));
}

export default function NewRoom() {
  //const [codigo, setCodigo] = React.useState("");
  const { players, newPlayer } = usePlayers();
  const { socket, newRoom } = useSocket();
  const { user } = useAuth();
  const { turn, nextTurn  } = useTurn();
  const { code, defineCode  } = useCode();
  const { songs, defineSongs  } = useSongs();

  let history = useHistory();
  if (socket) {
    socket.on("players", ({ players }) => {
      newPlayer(players);
      console.log(players);
    });

    socket.on("duplicatedRoom", () => {
      console.log("duplicatedRoom");
    });

    socket.on("start", ({turn, songs}) => {
        console.log("start");
        nextTurn(turn);
        defineSongs(songs);
        console.log("turno: ", turn);
        socket.off('players');
        socket.off('start');
        socket.off('duplicatedRoom');
        history.push("/game-room");
      });
  }

  const handleClick = (event) => {
    const username = user.username;
    const numPlayers = players.length;
    socket.emit("start", { username, roomId: code, numPlayers });
  }
  

  React.useEffect(() => {
    const random = getRandom();
    defineCode(random);
  }, []);

  React.useEffect(() => {
    if (code) {
      const socket = socketIOClient(ENDPOINT);
      newRoom(socket);
      const username = user.username;
      socket.emit("join", { username, roomId: code });
    }
  }, [code]);

  return (
    <div>
      <p>
        Copia y comparte el código! <span>{code}</span>
      </p>
      <h1>Connected Players:</h1>
      <ul>
        {players.map((player) => (
          <li key={player._id}>{player.username}</li>
        ))}
      </ul>
      {players.length > 1 && <button onClick={handleClick}>Start Game!</button>}
    </div>
  );
}
