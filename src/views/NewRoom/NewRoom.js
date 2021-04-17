import React from "react";
import socketIOClient from "socket.io-client";
import { useSocket } from "../../context/SocketContext";
import { useAuth } from "../../context/AuthContext.utils";
//import { usePlayers } from "../../context/PlayersContext";
import { useTurn } from "../../context/TurnContext";
import { useHistory } from "react-router-dom";
import { useCode } from "../../context/CodeContext";
import { useSongs } from "../../context/SongContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import "./NewRoom.css";

/****REDUX */
import {usePlayersHandlers} from '../../store/reducers/playersReducer';
import {useSelector} from 'react-redux';

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const clipboardImg = <FontAwesomeIcon icon={faClipboard} />;

function getRandom() {
  return String(Math.floor(Math.random() * 100000));
}

export default function NewRoom() {
  //const { players, newPlayer } = usePlayers();
  const { socket, newRoom } = useSocket();
  const { user } = useAuth();
  const { nextTurn } = useTurn();
  const { code, defineCode } = useCode();
  const { defineSongs } = useSongs();

  const {updatePlayers} = usePlayersHandlers();
  const {players} = useSelector((state)=> state.players);

  let history = useHistory();
  if (socket) {
    socket.on("players", ({ players }) => {
      //newPlayer(players);
      updatePlayers(players);
    });

    socket.on("duplicatedRoom", () => {
      console.log("duplicatedRoom");
    });

    socket.on("start", ({ turn, songs }) => {
      nextTurn(turn);
      defineSongs(songs);

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
    socket.off("players");
    socket.off("start");
    socket.off("duplicatedRoom");
    socket.emit("deleteRoom", { roomId: code });
    history.push("/room-menu");
  };

  React.useEffect(() => {
    const random = getRandom();
    defineCode(random);
  }, [defineCode]);

  React.useEffect(() => {
    if (code) {
      const socket = socketIOClient(ENDPOINT);
      newRoom(socket);
      const { username, imgUser } = user;

      socket.emit("createRoom", { username, roomId: code, img: imgUser });
    }
  }, [code, newRoom, user]);

  return (
    <>
      <button className="back back-top" onClick={handleBack}></button>
      <div className="waiting-container">
        <p>COPY AND SHARE!</p>
        <div className="code">
          {code}
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(code);
            }}
          >
            {clipboardImg}
          </button>
        </div>

        <div className="waiting-list">
          <h1>Connected Players:</h1>
          <ul>
            {players.map((player) => (
              <li key={player._id}>
                <img id="avatar" src={player.imgUser} alt="user-img" />
                {player.username}
              </li>
            ))}
          </ul>
        </div>

        {players.length > 1 && (
          <button className="secondary" onClick={handleClick}>
            Start Game!
          </button>
        )}
      </div>
    </>
  );
}
