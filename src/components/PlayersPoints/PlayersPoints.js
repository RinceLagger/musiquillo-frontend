import React from "react";
//import { usePlayers } from "../../context/PlayersContext";
import "./PlayerPoints.css";
import { useTurn } from "../../context/TurnContext";

/****REDUX */

import {useSelector} from 'react-redux';

export default function PlayersPoints({ styleName: { playersStyle } }) {
  const { turn } = useTurn();

  //const { players } = usePlayers();
  const {players} = useSelector((state)=> state.players);
  
  return (
    <ul className={playersStyle}>
      {players.map((player, index) => {
        if (turn === index && playersStyle === "ingame-points") {
          return (
            <li key={player._id} id="turn">
              <span>{player.username} </span>
              <span>Points: {player.points}</span>
            </li>
          );
        } else {
          return (
            <li key={player._id}>
              {playersStyle !== "ingame-points" && (
                <img id="avatar" src={player.imgUser} alt="user-img" />
              )}

              <span>{player.username} </span>
              <span>Points: {player.points}</span>
            </li>
          );
        }
      })}
    </ul>
  );
}
