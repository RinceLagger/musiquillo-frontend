import React from "react";

import { useSocket } from "../../context/SocketContext";
//import { usePlayers } from "../../context/PlayersContext";
import { useAuth } from "../../context/AuthContext.utils";
import { useTurn } from "../../context/TurnContext";
import { useHistory } from "react-router-dom";
import { useSongs } from "../../context/SongContext";
import { useCode } from "../../context/CodeContext";

/****REDUX */
import { usePlayersHandlers } from "../../store/reducers/playersReducer";
import { useSelector } from "react-redux";

function WaitingRoom() {
  let history = useHistory();
  const { socket } = useSocket();

  //const {players, newPlayer} = usePlayers();
  const { updatePlayers } = usePlayersHandlers();
  const { players } = useSelector((state) => state.players);

  const { nextTurn } = useTurn();
  const { code } = useCode();
  const { defineSongs } = useSongs();
  const { user } = useAuth();

  const handleBack = (event) => {
    const username = user.username;
    socket.emit("deleteUser", { username, roomId: code });
    history.push("/room-menu");
  };

  if (socket) {
    socket.on("players", ({ players }) => {
      //newPlayer(players);
      updatePlayers(players);
    });

    socket.on("deleteRoom", () => {
      socket.off("players");
      socket.off("start");
      history.push("/room-menu");
    });

    socket.on("start", ({ turn, songs }) => {
      console.log("start");
      nextTurn(turn);
      defineSongs(songs);
      socket.off("players");
      socket.off("start");
      console.log("turno: ", turn);
      history.push("/game-room");
    });
  }

  return (
    <>
      <button className="back back-top" onClick={handleBack}></button>
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
    </>
  );
}

export default WaitingRoom;
