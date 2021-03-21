import React from "react";
import { usePlayers } from "../../context/PlayersContext";
import "./PlayerPoints.css";
import { useTurn } from "../../context/TurnContext";

export default function PlayersPoints({ styleName: { playersStyle } }) {
  const { turn } = useTurn();

  const { players } = usePlayers();

  return (
    <ul className={playersStyle}>
      {players.map((player, index) => {
        if (turn === index && playersStyle==="ingame-points") {
          return (
            <li key={player._id} id="turn">
              <span>{player.username} </span>
              <span>Points: {player.points}</span>
            </li>
          );
        } else {
          return (
            <li key={player._id}>
              <span>{player.username} </span>
              <span>Points: {player.points}</span>
            </li>
          );
        }
      })}
    </ul>
  );
}
