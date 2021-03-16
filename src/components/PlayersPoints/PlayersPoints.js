import React from "react";
import { usePlayers } from "../../context/PlayersContext";

export default function PlayersPoints ({className}){

    const { players} = usePlayers();


    return(
        <ul className = {className}>{players.map((player)=> <li key = {player._id}>
        <span>{player.username} </span>
        <span>Points: {player.points}</span></li>)}
        </ul>
    )

}