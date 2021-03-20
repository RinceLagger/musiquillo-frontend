import React from "react";
import { usePlayers } from "../../context/PlayersContext";
import "./PlayerPoints.css";

export default function PlayersPoints ({styleName:{playersStyle}}){

    const { players} = usePlayers();


    return(
        <ul className = {playersStyle}>{players.map((player)=> <li key = {player._id}>
        <span>{player.username} </span>
        <span>Points: {player.points}</span></li>)}
        </ul>
    )

}